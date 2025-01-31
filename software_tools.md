---
title: Software Tools
subtitle: Tutorials for commonly used software tools
authors:
  - name: Christian S. Ramirez
    email: christian.ramirez1@umassmed.edu
  - name: Ben Kresge
    email: ben.kresge@umassmed.edu
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

# Globus file transfer
[Globus](https://www.globus.org/) is a service that allows you to transfer files between "endpoints" (computers).

## Login to the Globus

1. Go to [https://www.globus.org/](https://www.globus.org/) and select **log in**.
2. Under **use your existing organizational login**, start typing "University of Massachusetts Medical School" and select the item from the dropdown list.
3. You will be redirected to a **CILogon** page:
   - Enter your **short form username**. This is the first five characters of your last name, followed by the first letter of your first name, and ends with a number if your email has one. For example, `Ben.Kresge@umassmed.edu` is `kresgb`.
   - Enter your **umassmed.edu password**.
4. You will be prompted to authenticate using **2FA (two-factor authentication)**.
5. On the next screen, you will see an **information release** prompt:
   - You can choose any option. I chose "Ask me again if information to be provided to this service changes." but ANY should be fine.
6. Press **accept** to proceed.

After completing these steps, you should land on the main Globus screen titled **file manager**.

## Download Globus endpoint software
``` {note}
If you have already installed and set up Globus Connect Personal, you can skip to Step 4 by navigating to your existing installation directory (e.g., `cd globusconnectpersonal-3.2.6`).
```

1. Once you are logged into the server of your choice, run the following command to download Globus Connect Personal:
   ```bash
   wget https://downloads.globus.org/globus-connect-personal/linux/stable/globusconnectpersonal-latest.tgz
   ```
2. Extract the file using the following command:
   ```bash
   tar xzf globusconnectpersonal-latest.tgz
   ```

## Create Globus endpoint

1. Navigate to the newly created directory. The directory name should follow the format `globusconnectpersonal-x.y.z` (e.g., `globusconnectpersonal-3.2.6`):
   ```bash
   cd globusconnectpersonal-3.2.6
   ```
2. Run the following command to set up Globus Connect Personal:
   ```bash
   ./globusconnectpersonal -setup
   ```
3. You will be prompted to log in via a large URL starting with `https://auth.globus.org`. The prompt will wait for an authentication code:
   - Follow the link (usually **CTRL/CMD + Left Mouse Click**).
   - The site will ask for certain permissions. Click **allow**.
   - The site will display a **native app authorization code**. Copy this code.
   - Paste the code back into the shell prompt.
``` {important}
The code only lasts 10 minutes!
```

4. Next, the shell prompt will display:
   ```
   == starting endpoint setup

   Input a value for the Endpoint Name:
   ```
   - You can choose what you want to name the endpoint, but you will need to remember this name later when transferring files.
   - For example, if you are on `z012`, you might name it `Ben-z012`.

## Start Globus endpoint service

1. After setup is complete, start the Globus Connect Personal service:
   ```bash
   ./globusconnectpersonal -start &
   ```
   This will run the service in the background.
   ``` {note}
   You can confiure whcih folders are accessible by using the --restrict-folders flag (e.g., `--retrict-folders /home/user/data,/home/user/dev`)
   ```

2. To verify the service is running, you can use:
   ```bash
   ./globusconnectpersonal -status
   ```
   We expect to see something like
   ```
   Globus Online:   connected
   Transfer Status: idle
   ```

## Transfer files

1. Return to the Globus web interface at [https://app.globus.org/file-manager](https://app.globus.org/file-manager)
   - If you are transfering file from a client device (such as a laptop), you will need to first install the Globus endpoint software on the client device [here](https://www.globus.org/globus-connect-personal). Once you've installed the software for your client device's operating system and see the collection appear in the Globus file manger web interface, you can proceed to the next step.

2. In the File Manager:
   - On the left panel, search for and select your source endpoint (where your files are currently located).
   - On the right panel, search for and select your destination endpoint (the one you created in Step 3).

3. Navigate to the desired directories:
   - In the source panel, browse to select the files/folders you want to transfer.
   - In the destination panel, you will only have access to your home directory on the zerver due to Globus Connect Personal's permission restrictions (you can move files to their final location after the transfer is complete using the `mv` command).
4. Click the blue **start** button.

5. Monitor your transfer status in the "Activity" panel

## Stopping the sendpoint service

When you're done transferring files, you can stop the Globus Connect Personal service:
```bash
./globusconnect -stop
```

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

## Automatically start tmux session on login
Add the following to your `.bashrc` on the remote server
```{code} bash
:filename: ~/.bashrc
# If using tmux
if [[ -z $TMUX ]] && [[ -n $SSH_TTY ]]; then
    exec tmux new-session -A -s SESSION_NAME
fi

# If using screen
if [[ -z $STY ]] && [[ -n $SSH_TTY ]]; then
    exec screen -d -r SESSION_NAME
fi
```

# Local Development

## micromamba
Micromamba is a standalone version of Mamba which is an alternative to Conda. Refer to the installation instructions [here](https://mamba.readthedocs.io/en/latest/installation/micromamba-installation.html).

## pyenv
`pyenv` is a tool to manage multiple Python versions. It allows you to easily switch between different Python versions and manage them in a virtual environment. Refer to the installation instructions [here](https://github.com/pyenv/pyenv).

# Setup ollama and open-webui: A step-by-step guide

1. **Install Homebrew**
   - Follow instructions [here](https://brew.sh/) to install homebrew.

2. **Install Docker Desktop**
   - If using Homebrew, run the following command to install Docker Desktop:
     ```bash
     brew install --cask docker
     ```
   - Otherwise, refer to the official [Docker Desktop installation guide](https://docs.docker.com/engine/install/) for your operating system.
   - If you installed with homebrew, open Docker Desktop.
   - After opening Docker Desktop, you should see a menu bar icon with the Docker logo. Click on it to make sure Docker Desktop is running.
   - Now, in your terminal, run `docker run hello-world` to confirm it's running.

3. **Install Ollama**
   - Download the install Ollama from [here](https://ollama.com/download) according to your operating system.

4. **Run Open WebUI in Docker**
   - In your terminal, run the provided command to start the container:
     ```bash
     docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/Open-WebUI/Open-WebUI:main
     ```
   - The container will now be running in the background. You can check its status with `docker ps -a`.

5. **Access Open WebUI**
   - Once the container is up, visit your local machine's port 3000 to access Open WebUI:
     ```bash
     curl http://localhost:3000
     ```

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
