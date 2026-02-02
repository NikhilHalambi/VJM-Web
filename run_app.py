import subprocess
import sys
import os
import time
import signal
from pathlib import Path

# ANSI color codes for better terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_header(message):
    """Print a formatted header message"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{message.center(60)}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}\n")

def print_success(message):
    """Print a success message"""
    print(f"{Colors.OKGREEN}✓ {message}{Colors.ENDC}")

def print_error(message):
    """Print an error message"""
    print(f"{Colors.FAIL}✗ {message}{Colors.ENDC}")

def print_info(message):
    """Print an info message"""
    print(f"{Colors.OKCYAN}ℹ {message}{Colors.ENDC}")

def print_warning(message):
    """Print a warning message"""
    print(f"{Colors.WARNING}⚠ {message}{Colors.ENDC}")

# Get the project root directory
PROJECT_ROOT = Path(__file__).parent.absolute()
CLIENT_DIR = PROJECT_ROOT / "client"
SERVER_DIR = PROJECT_ROOT / "server"

# Store process references
processes = []

def cleanup_processes(signum=None, frame=None):
    """Clean up all running processes"""
    print_warning("\nShutting down servers...")
    for process in processes:
        try:
            process.terminate()
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
        except Exception as e:
            print_error(f"Error terminating process: {e}")
    print_success("All servers stopped.")
    sys.exit(0)

# Register signal handlers for graceful shutdown
signal.signal(signal.SIGINT, cleanup_processes)
signal.signal(signal.SIGTERM, cleanup_processes)

def check_directory_exists(directory, name):
    """Check if a directory exists"""
    if not directory.exists():
        print_error(f"{name} directory not found at: {directory}")
        return False
    print_success(f"{name} directory found")
    return True

def check_node_modules(directory, name):
    """Check if node_modules exists, if not suggest installation"""
    node_modules = directory / "node_modules"
    if not node_modules.exists():
        print_warning(f"{name} dependencies not installed")
        print_info(f"Run 'npm install' in {directory}")
        return False
    print_success(f"{name} dependencies installed")
    return True

def run_server(name, directory, command, shell=True):
    """Run a server process"""
    try:
        print_info(f"Starting {name}...")
        process = subprocess.Popen(
            command,
            cwd=directory,
            shell=shell,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True,
            bufsize=1
        )
        processes.append(process)
        print_success(f"{name} started (PID: {process.pid})")
        return process
    except Exception as e:
        print_error(f"Failed to start {name}: {e}")
        return None

def monitor_output(process, name, success_indicator):
    """Monitor process output for success indicator"""
    try:
        for line in process.stdout:
            line = line.strip()
            if line:
                print(f"{Colors.OKBLUE}[{name}]{Colors.ENDC} {line}")
                if success_indicator in line.lower():
                    return True
    except Exception as e:
        print_error(f"Error monitoring {name}: {e}")
    return False

def main():
    """Main function to run the application"""
    print_header("VJM NGO Website Launcher")
    
    # Check if directories exist
    print_info("Checking project structure...")
    if not check_directory_exists(CLIENT_DIR, "Client"):
        sys.exit(1)
    if not check_directory_exists(SERVER_DIR, "Server"):
        sys.exit(1)
    
    # Check if dependencies are installed
    print_info("\nChecking dependencies...")
    client_deps_ok = check_node_modules(CLIENT_DIR, "Client")
    server_deps_ok = check_node_modules(SERVER_DIR, "Server")
    
    if not client_deps_ok or not server_deps_ok:
        print_warning("\nSome dependencies are missing. Install them? (y/n): ")
        response = input().strip().lower()
        if response == 'y':
            if not client_deps_ok:
                print_info("Installing client dependencies...")
                subprocess.run("npm install", cwd=CLIENT_DIR, shell=True)
            if not server_deps_ok:
                print_info("Installing server dependencies...")
                subprocess.run("npm install", cwd=SERVER_DIR, shell=True)
        else:
            print_error("Cannot proceed without dependencies. Exiting.")
            sys.exit(1)
    
    # Start the servers
    print_header("Starting Servers")
    
    # Start backend server
    backend = run_server(
        "Backend Server",
        SERVER_DIR,
        "npm start"
    )
    
    if not backend:
        print_error("Failed to start backend server")
        sys.exit(1)
    
    # Give backend a moment to start
    time.sleep(2)
    
    # Start frontend server
    frontend = run_server(
        "Frontend Server",
        CLIENT_DIR,
        "npm run dev"
    )
    
    if not frontend:
        print_error("Failed to start frontend server")
        cleanup_processes()
        sys.exit(1)
    
    # Wait for servers to be ready
    print_info("\nWaiting for servers to be ready...")
    time.sleep(3)
    
    # Display success message
    print_header("Application Running")
    print_success("Both servers are running!")
    print_info("\n📱 Frontend: http://localhost:5173/")
    print_info("🔧 Backend:  http://localhost:5000/ (or configured port)")
    print_warning("\nPress Ctrl+C to stop all servers\n")
    
    # Keep the script running and display output
    try:
        while True:
            # Check if processes are still running
            if backend.poll() is not None:
                print_error("Backend server stopped unexpectedly")
                cleanup_processes()
                sys.exit(1)
            if frontend.poll() is not None:
                print_error("Frontend server stopped unexpectedly")
                cleanup_processes()
                sys.exit(1)
            time.sleep(1)
    except KeyboardInterrupt:
        cleanup_processes()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print_error(f"Unexpected error: {e}")
        cleanup_processes()
        sys.exit(1)
