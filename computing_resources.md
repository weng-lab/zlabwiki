---
title: Computing Resources
subtitle: Technical guides for commonly used software tools
authors:
  - name: Christian S. Ramirez
    email: christian.ramirez1@umassmed.edu
---
# Secure Jupyter
## Why?
HTTPS encrypts data between your browser and JupyterLab to prevent eavesdropping/tampering, while password authentication ensures only authorized users can access your notebooks and execute code on your system.
## Setting up your HTTPS and `jupyter_server_config.py`
### Make jupyter password and `certfile` directory
```bash
mkdir -p ~/.jupyter/certfiles
jupyter lab --generate-config
jupyter lab password 
```
### Create your private (.key) and public key (.pem)
Make sure to replace `HOSTNAME` with the machine you are on (i.e. z014).
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ~/.jupyter/certfiles/jupyter.key \
  -out ~/.jupyter/certfiles/jupyter.pem \
  -subj "/CN=HOSTNAME"
chmod 600 ~/.jupyter/certfiles/jupyter.key
```
### Add config options to your `jupyter_server_conifg.py`
Make sure to replace `HOSTNAME` with the machine you are on (i.e. z014) and `USERNAME` with your username.
```python
c.ServerApp.certfile = '/Users/USERNAME/.jupyter/certfiles/jupyter.pem'
c.ServerApp.keyfile = '/Users/USERNAME/.jupyter/certfiles/jupyter.key'
c.ServerApp.ip = 'HOSTNAME'
c.ServerApp.port = 8888
c.ServerApp.allow_remote_access = True
c.ServerApp.password_required = True
c.ServerApp.config_file = '/Users/USERNAME/.jupyter/jupyter_server_config.json'
c.ServerApp.notebook_dir = '/data/GROUP/USERNAME'
```
Now start jupyter lab using your preferred method. [See Getting Started](getting_started.md) if you are unsure. Navigate to `https://127.0.0.1:8888/lab`. If this is you first time doing this, your browser may return a self-signed certificate warning. Ignore this error, and connect to the url. Now you can login using the password you made at the beginning.

Defining our config options in `jupyter_server_config.py` allows you be less declarative when starting jupyter in the terminal. For example, when using singularity we can start jupyter lab with:
```bash
singularity exec --writable -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics jupyter lab
```
As opposed to:
```bash
singularity exec --writable -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics jupyter lab --port=8888 --ip=HOSTNAME --no-browser --notebook-dir=/data/GROUP/$(whoami)
```
# Screen
## Why?
Screen allows you to manage multiple terminal sessions within a single window and keeps processes running even if your connection drops, making it useful running remote jobs.
### Commonly used screen options and shortcuts
#### Options
```
screen -S [name]   # Start new named session
screen -ls         # List sessions
screen -r [name]   # Reattach to session
screen -d -r       # Detach existing and reattach here
```
#### Shortcut keys
```
Ctrl-a + c       # Create new window
Ctrl-a + "       # List/select windows
Ctrl-a + n/p     # Next/previous window
Ctrl-a + d       # Detach session
Ctrl-a + k       # Kill window
Ctrl-a + S       # Split horizontal
Ctrl-a + |       # Split vertical 
Ctrl-a + <TAB>   # Switch split regions
Ctrl-a + X       # Close active split
```
### All screen command flags and shortcuts
#### Options
```
-a               # Force all capabilities into each window’s termcap.
-A -[r|R]        # Adapt all windows to the new display width & height.
-c [file]        # Read configuration file instead of ‘.screenrc’.
-d (-r)          # Detach the elsewhere running screen (and reattach here).
-dmS [name]      # Start as daemon: Screen session in detached mode.
-D (-r)          # Detach and logout remote (and reattach here).
-h [lines]       # Set the size of the scrollback history buffer.
-i               # Interrupt output sooner when flow control is on.
-l               # Make the login mode on (update /var/run/utmp), -ln = off.
-ls [match]      # Display all the attached screens.
-L               # Turn on output logging.
-m               # Ignore $STY variable, do create a new screen session.
-O               # Choose optimal output rather than exact vt100 emulation.
-p [window]      # Preselect the named window if it exists.
-q               # Quiet startup. Exits with non-zero return code if unsuccessful.
-Q               # Commands will send the response to the stdout of the querying process.
-r [session]     # Reattach to a detached screen process.
-R               # Reattach if possible, otherwise start a new session.
-S [sockname]    # Name this session .sockname instead of …
-t [title]       # Set title. (window’s name).
-T [term]        # Use term as $TERM for windows, rather than “screen”.
-U               # Tell screen to use UTF-8 encoding.
-v               # Print Screen version.
-x               # Attach to a not detached screen. (Multi display mode).
-X               # Execute as a screen command in the specified session.
```
#### Shortcut keys
```
Ctrl-a + c        # Create a new window.
Ctrl-a + "        # Window selector
Ctrl-a + w        # Displays the list of all the windows currently opened.
Ctrl-a + A        # Renames the current windows. The name will appear when you will list the list of windows opened with Ctrl-a + w.
Ctrl-a + n        # Go to the next windows.
Ctrl-a + p        # Go to the previous windows.
Ctrl-a + Ctrl-a   # Go back to the last windows used.
Ctrl-a + k        # Close the current windows (kill).
Ctrl-a + S        # Split the current windows horizontally. To switch between the windows, do Ctrl-a + <TAB>.
Ctrl-a + |        # Split the current windows vertically.
Ctrl-a + X        # Close active Split window
Ctrl-a + Q        # Close all Split windows
Ctrl-a + d        # Detach a screen session without stopping it.
Ctrl-a + r        # Reattach a detached screen session.
Ctrl-a + <ESC>    # Start the copy mode.
```
# tmux (alternative to screen)
## [cheatsheet](https://tmuxcheatsheet.com/)
# Local Development
## micromamba
Micromamba is a standalone version of Mamba which is an alternative to Conda. Refer to the installation instructions [here](https://mamba.readthedocs.io/en/latest/installation/micromamba-installation.html).
## `python -m venv` Wrapper
This wrapper script simplifies the usage of `python -m venv` for creating native python virtual environments. This is especially handy if you are using Homebrew on MacOS since, by default, Homebrew disallows the usage of pip in the global environment.
### Wrapper Script
Add the following to your `.zshrc` or `.bashrc`:
```bash
# Usage
# $ mkvenv myvirtualenv            # creates venv with default python3
# $ mkvenv myvirtualenv 3.8        # creates venv with python3.8
# $ mkvenv myvirtualenv python3.9  # creates venv with python3.9
# $ venv myvirtualenv              # activates venv
# $ deactivate                     # deactivates venv
# $ rmvenv myvirtualenv            # removes venv

export VENV_HOME="$HOME/.virtualenvs"
[[ -d $VENV_HOME ]] || mkdir $VENV_HOME

lsvenv() {
  ls -1 $VENV_HOME
}

venv() {
  if [ $# -eq 0 ]; then
    echo "Please provide venv name"
  else
    source "$VENV_HOME/$1/bin/activate"
  fi
}

mkvenv() {
  if [ $# -eq 0 ]; then
    echo "Please provide venv name"
  else
    local venv_name=$1
    local python_cmd="python3"
    
    # Check if a Python version was specified
    if [ $# -eq 2 ]; then
      # If version starts with "python", use as is, otherwise prepend "python"
      if [[ $2 == python* ]]; then
        python_cmd=$2
      else
        python_cmd="python$2"
      fi
    fi
    
    # Check if the specified Python version exists
    if command -v $python_cmd >/dev/null 2>&1; then
      $python_cmd -m venv $VENV_HOME/$venv_name
      echo "Created virtualenv '$venv_name' with $python_cmd"
    else
      echo "Error: $python_cmd not found"
      return 1
    fi
  fi
}

rmvenv() {
  if [ $# -eq 0 ]; then
    echo "Please provide venv name"
  else
    rm -r $VENV_HOME/$1
  fi
}
```
Make sure to run `source ~/.bashrc` or `source ~/.zshrc` after adding the script.
# UMass SCI Cluster
Please refer to the [getting started page](https://hpc.umassmed.edu/doc/index.php?title=Getting_started) on the HPC wiki at `hpc.umassmed.edu`. Make sure that you are connected to the UMMS network (on-premises) or {doc}`VPN <getting_started#vpn_setup>`
## Useful bash aliases
Add the following to you bashrc.
```bash
alias gpu='bsub -q gpu -gpu "num=1:gmodel=TeslaV100_SXM2_32GB" -W 1440 -n 10 -R "rusage[mem=8000]" -R "span[hosts=1]" -Is bash'
alias cpu='bsub -q interactive -n 10 -R "rusage[mem=8000]" -R "span[hosts=1]" -Is bash'
```
Run `source ~/.bashrc`. Now, by running `gpu` or `cpu` in the terminal, you can now reserve a gpu and cpu for 24 hours and start an interactive bash shell.
## Monitor GPU usage
Say you are running a gpu intensive program. If you want to make sure you program is still running based on the gpu usage, you can run `watch -n 1 nvidia-smi` in the terminal. You should see something like this:
```{code}
:linenos:
:emphasize-lines: 10
Thu Dec 19 15:04:21 2024
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 565.57.01              Driver Version: 565.57.01      CUDA Version: 12.7     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  Tesla V100-SXM2-32GB           Off |   00000000:AF:00.0 Off |                    0 |
| N/A   63C    P0            162W /  300W |     640MiB /  32768MiB |     69%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A   3257189      C   /opt/venv/bin/python3                         636MiB |
+-----------------------------------------------------------------------------------------+
```
