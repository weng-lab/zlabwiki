---
title: Software Tools
subtitle: Tutorials for commonly used software tools
authors:
  - name: Christian S. Ramirez
    email: christian.ramirez1@umassmed.edu
---
# CLI Text Editor
Sometime you may need to quickly edit a config file or make changes to you .bashrc file. In these cases, the quickest way is almost always to use a CLI text editor. 

## `vim`
`vim` has more functionality and configurability. However, it notoriously has a steep learning curve. Here is [a good tutorial](https://github.com/iggredible/Learn-Vim/blob/master/ch00_read_this_first.md) if you are interested.

### A quick `vim` tutorial

#### Basic Navigation
- `h/j/k/l` - Move cursor left/down/up/right 
- `w/b` - Jump forward/backward by word
- `0/$` - Move to start/end of line
- `gg/G` - Go to first/last line

#### Modes
- `i` - Enter insert mode before cursor
- `a` - Enter insert mode after cursor
- `ESC` or `CTRL+[` - Return to normal mode
- `v` - Enter visual mode for selection

#### Essential Commands
- `:w` - Save file
- `:q` - Quit (`:q!` to force quit without saving)
- `:wq` - Save and quit
- `u` - Undo
- `CTRL+r` - Redo
- `dd` - Delete line
- `yy` - Copy line
- `p` - Paste after cursor

#### Text Operations
- `x` - Delete character
- `dw` - Delete word
- `cw` - Change word
- `/pattern` - Search forward
- `n/N` - Next/previous search result
- `:%s/old/new/g` - Replace all occurrences

### Full tutorial
You can find a more in-depth tutorial [here](https://github.com/iggredible/Learn-Vim/blob/master/ch00_read_this_first.md) if you are interested.

# Git
[See *_Git in a nutshell_*](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)

## A quick `git` tutorial

### Initial Setup
- `git config --global user.name "Your Name"` - Set your name for all Git repositories
- `git config --global user.email "your.email@example.com"` - Set your email
- `git init` - Create a new Git repository in your current directory

### Basic Commands
- `git status` - Show the current state of your working directory and staging area
- `git add <file>` - Add a specific file to the staging area
- `git add .` - Add all changed files to the staging area
- `git commit -m "message"` - Create a commit with your staged changes
- `git log` - View the commit history
- `git diff` - Show unstaged changes in your working directory
- `git diff --staged` - Show changes staged for commit

### Branching and Merging
- `git branch` - List all local branches
- `git branch <branch-name>` - Create a new branch
- `git checkout <branch-name>` - Switch to a different branch
- `git checkout -b <branch-name>` - Create and switch to a new branch
- `git merge <branch-name>` - Merge specified branch into current branch
- `git branch -d <branch-name>` - Delete a branch

### Remote Repository Commands
- `git remote add origin <url>` - Connect your local repository to a remote one
- `git push origin <branch-name>` - Upload your changes to the remote repository
- `git pull origin <branch-name>` - Download and merge changes from the remote repository
- `git clone <url>` - Copy a remote repository to your local machine

## Typical Git Workflow

1. **Create a new feature branch**
```bash
git checkout -b username/feature
```

2. **Make changes and track them**
```bash
# Edit your files
git status  # Check what files have changed
git add script.py notebook.ipynb
git commit -m "Add new script and notebook"
```

3. **Update your branch with main branch changes**
```bash
git checkout main
git pull origin main
git checkout username/feature
git merge main  # Merge main into your feature branch
```

4. **Push your changes and create a pull request**
```bash
git push origin username/feature
```

5. **After pull request approval, merge and cleanup**
```bash
git checkout main
git pull origin main
git branch -d username/feature # Delete the feature branch locally
```

### Common Scenarios

**Undo changes to a file:**
```bash
git restore HEAD <file>
```

**Amending the last commit:**
```bash
git commit --amend -m "New commit message"
```

**Creating a .gitignore file:**
```bash
# Create .gitignore
echo "node_modules/" > .gitignore
echo "*.log" >> .gitignore
git add .gitignore
git commit -m "Add .gitignore file"
```

## Full tutorial
You can find the official Git tutorial [here](https://git-scm.com/docs/gittutorial) which is more in-depth.

# [Terminal multiplexers](https://en.wikipedia.org/wiki/Terminal_multiplexer)

## Screen
Screen allows you to manage multiple terminal sessions within a single window and keeps processes running even if your connection drops, making it useful running remote jobs.

### Options
```
screen -S [name]   # Start new named session
screen -ls         # List sessions
screen -r [name]   # Reattach to session
screen -d -r       # Detach existing and reattach here
```

### Shortcut keys
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
````{dropdown} Optional
### All screen command flags and shortcuts
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
###Shortcut keys
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
````

## tmux (alternative to screen)
> Check out this comprehensive [cheatsheet](https://tmuxcheatsheet.com/) to quickly get familiar with tmux.

# Local Development

## micromamba
Micromamba is a standalone version of Mamba which is an alternative to Conda. Refer to the installation instructions [here](https://mamba.readthedocs.io/en/latest/installation/micromamba-installation.html).

## `python -m venv` Wrapper
This wrapper script simplifies the usage of `python -m venv` for creating native python virtual environments. This is especially handy if you are using Homebrew on MacOS since, by default, Homebrew disallows the usage of pip in the global environment.

### Wrapper Script
Add the following to your `.zshrc` or `.bashrc`:
```{code} bash
:filename: ~/.zshrc
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

# SLURM
SLURM (Simple Linux Utility for Resource Management) is a workload manager and job scheduler for Linux clusters that allows users to submit, manage, and monitor jobs on computing clusters. It handles the allocation of resources (like CPUs, GPUs, and memory) to jobs and manages job queues to ensure fair and efficient utilization of cluster resources.

## A quick SLURM tutorial
You can follow this [tutorial](https://docs.google.com/presentation/d/1g8Es6akTtoYsEACwH1i0gnmvlS4ugLjj-L3RPMJA65o/edit?usp=sharing) to get started with SLURM.

# UMass SCI Cluster
Please refer to the [getting started page](https://hpc.umassmed.edu/doc/index.php?title=Getting_started) on the HPC wiki at `hpc.umassmed.edu`. Make sure that you are connected to the UMMS network (on-premises) or [VPN](getting_started.md#vpn_setup).

## Useful bash aliases
Add the following to you bashrc.
```{code} bash
:filename: ~/.bashrc
# add aliases to the bottom of your .bashrc file ...
alias gpu='bsub -q gpu -gpu "num=1:gmodel=TeslaV100_SXM2_32GB" -W 1440 -n 10 -R "rusage[mem=8000]" -R "span[hosts=1]" -Is bash'
alias cpu='bsub -q interactive -n 10 -R "rusage[mem=8000]" -R "span[hosts=1]" -Is bash'
```
Run `source ~/.bashrc`. Now, by running `gpu` or `cpu` in the terminal, you can now reserve a gpu and cpu for 24 hours and start an interactive bash shell.

## Monitor GPU usage
Say you are running a gpu intensive program. If you want to make sure you program is still running based on the gpu usage, you can run `watch -n 1 nvidia-smi` in the terminal. You should see something like this:
```
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
