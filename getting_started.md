---
title: Getting Started
subtitle: Onboarding tutorials for new lab members
authors:
  - name: Greg Andrews
  - name: Christian S. Ramirez
    email: christian.ramirez1@umassmed.edu
---
# Before reading

In the following tutorials I will use placeholder terms

* Replace `USERNAME` with your ZLab username.
* Replace `GROUP` with `zusers` if you are in ZLab, `musers` if you are in Moore Lab, or `rusers` if you are a rotation student in either group. If you are still unsure, run `groups` in your terminal. This will return a list of user groups that you belong to. Among them should be one of the previously mentioned groups.
* Replace `HOSTNAME` with one of the hostnames defined in your ssh config file (i.e. z011, z012 ... z014)

This page is meant to be read in sequential order.

If you haven't already, you may also want to check out the [onboarding document](https://docs.google.com/document/d/13stqSCGI-b3YhrTVcqsORaNqT1fq6N5KM2XLYV9futQ/edit?tab=t.0).

# Computing Access

## Terminal Emulators

### iTerm2 (macOS)

[iTerm2](https://iterm2.com/) supports multiple tabs, is much more customizable, and has many more features compared to the stock terminal.

You can change your key bindings to natural language processing. Open iTerm2 and press `CMD + ,` to bring up the settings page. Navigate to `Preferences -> Profiles -> Keys -> Load Preset ... -> Natural Text Editing`.

````{dropdown} Optional
### Ghostty (macOS)
[ghostty](https://ghostty.org/docs/install/binary) is a relatively new terminal emulator avialable on macOS, but it is both performant and highly customizable. However, it requires some extra setup!

#### ~/.config/ghostty/config
After install ghostty, you'll need to make a config file
```bash
mkdir -p ~/.config/ghostty && touch ~/.config/ghostty/config
vim ~/.config/ghostty/config
```
There are *_many_* settings you can adjust in this config file, all of which you read up on in the [documentation](https://ghostty.org/docs/docs).

Here's my config
```{code} python
:filename: ~/.config/ghostty/config
:linenos:
theme = Monokai Remastered
font-size = 18
background-opacity = 0.5
macos-titlebar-style = hidden
window-padding-y = 8,8
window-padding-x = 8,8
window-padding-balance = true
```

#### SSH config env variable
For ssh to work on ghostty, you need to add this to every host in your `~/.ssh/config` file which will be discussed [later](#ssh_config_file)
```
SetEnv TERM=xterm-256color
```
````

(vpn_setup)=

## VPN Setup

Refer to instructions [here](https://umassmed.sharepoint.com/sites/information-technology/SitePages/VPN-Connect.aspx) (you will be prompted to login to your umassmed.edu microsoft account).

## WSL (Windows)

If on windows, you will have to install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) to launch a Linux VM from which you can SSH into the ZLab servers.

[WSL basic commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)

From your powershell start your linux VM with:

```bash
wsl.exe -d ubuntu
```

(ssh_config_file)=

## Update ssh config file

Your ssh config file will be created in `~/.ssh/config`.

Create `~/.ssh` directory if it does not exist already.

```bash
mkdir -p ~/.ssh
```

Create a blank ssh config file

```bash
touch ~/.ssh/config
```  

Then open the file in your preferred text editor with

```bash
# For example, on macOS
open -a TextEdit ~/.ssh/config`
```

Add the following to the config file

```{code} text
:filename: ~/.ssh/config
Host *
     TCPKeepAlive = yes
     ServerAliveCountMax = 3
     ServerAliveInterval = 30
     ForwardX11 = yes
     ForwardX11Trusted = yes
     ControlMaster auto
     ControlPath ~/.ssh/sockets/%r@%h:%p
     ControlPersist 60

Host z010 z011 z012 z013 z014
     ProxyCommand=ssh -W %h:%p -l %r bastion.wenglab.org
     ForwardX11 yes
     ForwardAgent yes
     ForwardX11Timeout 7d
     ServerAliveCountMax 3
     ServerAliveInterval 15
     GSSAPIAuthentication yes
     User USERNAME
```

````{important}
Create the `~/.ssh/sockets` if it does not exist already.
```bash
mkdir -p ~/.ssh/sockets
```
````

## Logging in

```bash
ssh USERNAME@bastion.wenglab.org
```

````{dropdown} Diectory Structure
```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'fontFamily': 'arial', 'textColor': '#e0e0e0', 'lineColor': '#e0e0e0' }}}%%
graph TD
    root["/"] --> tank["/tank"]
    root --> zata["/zata"]
    root --> data["/data"]
    
    tank --> tank_home["/tank/home"]
    tank_home --> regular["Regular Users<br/>(directories in tank/home)"]
    tank_home --> datasets["ZFS Datasets<br/>(mounted to /home/username)"]
    
    zata --> zata_data["data (4.1P Ceph)"]
    zata_data --> zlab["zlab/"]
    data -.->|bind mount| zlab
    
    zata --> zippy["zippy (259T Ceph)"]
    zata --> public["public_html (450T Ceph)"]

    classDef default stroke:#e0e0e0
    classDef ceph stroke:#ff88ff,color:#ff88ff
    
    class zata,zata_data,zlab,zippy,public ceph
```
````

If it's your first time, you will be prompted to scan the QR code with any two-factor authentication app. You should also be prompted to change your password.

```{important}
Save this QR code somewhere!
```

I personally recommend using Microsoft Authenticator, since this is the 2FA app used by your UMass Microsoft account. However, it may also be convenient to choose a 2FA app that has a desktop client.

```{important}
From this point forward, every time you login, you will promted toprovide your password + two-factor code with no spaces.
```

From bastion, you can then `ssh` into any of the ZLab servers:

```bash
ssh HOSTNAME
```

## Server Usage Guidelines

```{important}
Please read the [server usage guidelines](https://docs.google.com/document/d/1X3gSpfv0avT3M3pN5HDbY3Etal_is9be-B6wJ4DJ7Fw/edit?usp=sharing) before using any of the servers.
```

# SSH

## Fixing permissions issue with `~/.ssh` and `~/.ssh/config`

Set the permissions of directories, keys and config file to the following numeric codes using `chmod`.

| Item | Sample | Numeric | Bitwise |
|------|--------|---------|---------|
| SSH folder | `~/.ssh` | `700` | `drwx------` |
| Public key | `~/.ssh/id_rsa.pub` | `644` | `-rw-r--r--` |
| Private key | `~/.ssh/id_rsa` | `600` | `-rw-------` |
| Config | `~/.ssh/config` | `600` | `-rw-------` |
| Home folder | `~` | `755` at most | `drwxr-xr-x` at most |

## Fixing double login issue

As you may have noticed, you needed to enter your password + 2FA twice!

This is because you are logging-in twice

1. Once on the bastion server
2. and another time to access an internal server (i.e. z011, z012 ... z014)

The `sshd_config` on the bastion server does not have `PubkeyAuthentication` enabled. However, it is enabled on the internal server!

### Generate key pair

On your client machine, run `ssh-keygen`. Give the identity file pair a custom name (e.g. 'zervers'). Do not set a passphrase for the key file.

```bash
ssh-keygen -t ed25519 -a 100 -f ~/.ssh/zervers
```

### Send public key file to internal server

```bash
ssh-copy-id -i ~/.ssh/zervers USERNAME@HOSTNAME 
```

This adds your public key to the `~/.ssh/authorized_users` file on the remote machine.

### Edit your ssh config

On you client machine edit the ssh config file.

```bash
vim ~/.ssh/config
```

Add the following line to the indicated host in your ssh_config file.

```bash
Host z010 z011 z012 z013 z014
    # previous config options ...
    IdentityFile ~/.ssh/zervers
```

### Test it out

Now when you log in to the zervers, you should only have to login **once**!

```bash
ssh HOSTNAME
```

```{note}
If you access multiple machines on the internal network frequently (e.g. z014 & z010), you will have to repeat this process for each machine.
```

## Setting up SSH keys with GitHub

If you are using GitHub for version control, you can set up SSH keys to authenticate with your GitHub account without having to enter your password every time.

First, generate a new SSH key pair:

```bash
ssh-keygen -t ed25519 -a 100 -f ~/.ssh/github
```

This will generate a public and private key pair.

Now edit you `~/.ssh/config` file and add the following lines:

```{code} text
:filename: ~/.ssh/config
Host github.com
    AddKeysToAgent yes
    UseKeychain yes # macOS only, comment out otherwise
    IdentityFile ~/.ssh/github
```

You can then add the public key to your GitHub account by following these steps:

1. Open your GitHub account settings.
2. Go to the "SSH and GPG keys" section.
3. Click on "New SSH key".
4. Enter a title for your key.
5. Paste the contents of your public key file into the "Key" field.
6. Click "Add SSH key".

Test the connection by running `ssh -T git@github.com` and you should see a message indicating that the connection was successful.

Now, you can use the SSH key to log in to your GitHub account without having to enter your password every time.

# Installing Software

## Enviornment management

### Virtual environments

Typically, a collection of dependencies (could be language specific) that ensure the application or program of interest runs in isolation from global, system dependencies. `conda` is a widely-used in bioinformatics as the defacto virtual environment manager and dependency resolver.

### Containers

A different technology altogether, 'containerization' isolates the application or program of interest in a virtual process. This method usually offers a higher level of abstraction/isolation, in which each virtual process can have its own space, file system, network space, etc. Two widely-used programs for containerization are `docker` and `singularity`.

## `conda`

```bash
curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$(uname)-$(uname -m).sh"
bash Miniforge3-$(uname)-$(uname -m).sh -p /zata/zippy/$(whoami)/Miniforge3
source ~/.bashrc
```

`$(whoami)` is evaluating to your Zlab username.

While this is optional, you may want to use the `mamba` dependency resolver which tends to be faster than native `conda`. You can still use conda if you are prefer, but in the following examples will use `mamba`. You may need to run `mamba init` if this is your first time using `mamba` and then update your bashrc file with `source ~/.bashrc`.

Create your first conda environment:

```bash
mamba create -n myenv jupyterlab numpy pandas matplotlib bedtools -c bioconda
```

## `singularity`

### Build singularity image

The remote docker image `clarity001/bioinformatics` contains a full suite of bioinformatics software that you will most likely need.

Create the destination folder and build the singularity sandbox container:

```bash
mkdir -p /zata/zippy/$(whoami)/bin/
singularity build /zata/zippy/$(whoami)/bin/bioinformatics.sif docker://clarity001/bioinformatics:base
```

To start an interactive shell in the container (optional):

```bash
singularity shell -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics.sif
```

(rootless_docker_setup)=

## `docker`

### Why use rootless Docker?

Rootless Docker enables users to run containers without administrator privileges. This is the version of docker which you will be configuring.

### Setup

```{note}
The following setup commands are known to not work sometimes. If you encounter issues, reach out to one of the admins on the *_#compute-support_* channel on Slack.
```

```bash
mkdir -p ~/.config/docker/
echo '{"data-root":"/rootless/docker/'$(whoami)'/docker"}' > ~/.config/docker/daemon.json
dockerd-rootless-setuptool.sh install
```

# JupyterLab

## Start a JupyterLab server using singularity

Using the sandbox container you just built, start the JupyterLab server with the following command:

```bash
singularity exec -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics.sif jupyter lab --port=8888 --ip=HOSTNAME --no-browser --notebook-dir=/data/GROUP/$(whoami)
```

## Start a JupyterLab server in a conda environment

Activate your environment from the previous example:

```bash
conda activate myenv
```

Start your jupyterlab server:

```bash
jupyter-lab --port=8888 --ip=HOSTNAME --no-browser
```

## Accessing your JupyterLab server

Access the notebook server from another terminal on your computer with `ssh -N -L 8888:HOSTNAME:8888 USERNAME@HOSTNAME`.

If you are curious, this is what the previous command is doing:

```
ssh                  # The secure shell program that creates encrypted connections
-N                   # Flag that means "don't execute a remote command/shell" - just forward ports
-L                   # Flag for "local port forwarding"
8888:                # The local port on your compute
HOSTNAME:            # The destination server's address (check your ssh config for available hosts)
8888                 # The remote port on the destination server
USERNAME@HOSTNAME    # Username and server address to login to
```

You can then open your notebook server in your favorite web browser by navigating to <http://127.0.0.1:8888/lab>.

````{dropdown} Optional
## Configuring JupyterLab for HTTPS
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
singularity exec -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics.sif jupyter lab
```
As opposed to:
```bash
singularity exec -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics.sif jupyter lab --port=8888 --ip=HOSTNAME --no-browser --notebook-dir=/data/GROUP/$(whoami)
```
````

## Common issues with JupyterLab

### Unable to delete files

This is an issue that has come up before. To fix, you first need to find you jupyter config file. It will most likely be located at `/home/USERNAME/.jupyter`. First, change into that directory:

```bash
cd /home/$(whoami)/.jupyter
```

If you cannot find `jupyter_server_config.py` in that directory, run:

```bash
jupyter server --generate-config
```

Edit `jupyter_server_config.py` with your preferred text editor:

```bash
vim jupyter_server_config.py
```

Look for the config option `c.FileContentsManager.delete_to_trash`. If it is set to `True`, change it to `False`. Now you should be able to delete files in JupyterLab

# VSCode

If you want a more fully-featured IDE, here is how you can setup a remote vscode server instance on the zervers.

## Clone docker repository

In `/zata/zippy` run

```bash
mkdir -p ~/.config/code-server/config
git clone https://github.com/christian728504/docker.git
cd docker/bioinformatics/code-server
```

## Inspect dockerfile (optional)

At this stage, I encourage you to look at the `dockerfile` and understand what is being installed on the container. In my experience, this docker image contains all the bioinformatics dependencies you could need.

```{note}
If there are certain dependencies that you expect to use which aren't specified in the `dockerfile`, edit it to suite your use case. By default, the `docker-compose.yml` file pulls from a remote image based on the `dockerfile`. You will need to update this if behavior in the `docker-compose.yml` if you plan on making changes to the dockerfile. Simply uncomment `build: .` and comment out `image: clarity001/bioinformatics:code-server`.
```

```{important}
If you do install any packages during runtime, remember **they are not persistent**!
```

## Run docker compose

Now run docker compose in the directory with `docker-compose.yml`.

```bash
docker compose up -d
```

## Authenticate with github

```{note}
Before proceeding with this step, make sure you have a [github account](https://github.com/signup).
```

If the docker container was successfully, you should be able to inspect the logs by running `docker compose logs code-server`. Your are looking for an output like this

```
code-server  | *
code-server  | * Visual Studio Code Server
code-server  | *
code-server  | * By using the software, you agree to
code-server  | * the Visual Studio Code Server License Terms (https://aka.ms/vscode-server-license) and
code-server  | * the Microsoft Privacy Statement (https://privacy.microsoft.com/en-US/privacystatement).
code-server  | *
code-server  | [2024-12-31 22:33:18] info Using GitHub for authentication, run `code tunnel user login --provider <provider>` option to change this.
code-server  | To grant access to the server, please log into https://github.com/login/device and use code XXXX-XXXX
```

From the logs, you'll want to note a couple of things

1. The github link `https://github.com/login/device`
2. and the code `XXXX-XXXX` (placeholder)

When you go to the github link, you should be prompted to authenticate with the 8 character code.

Now, go to the VSCode IDE on your client machine and open the command palette with `CMD + SHIFT + P` (macOS) and type `Remote-Tunnels: Connect to Tunnel`. Select the Github authentication option. Wait a bit, and you should see one remote resource "online." Once you've added the remote connection and opened a remote directory, you should be all set!

## Reconnecting tunnel

After you close VSCode, the tunnel will automatically close. However, the server will still be running on the remote machine. To reconnect the tunnel, you will need to `ssh` back into that machine.

## Usage of jupyter notebooks and kernels

If you want to make use of jupyter notebooks, you'll need to install the `Jupyter` extension (on both local and remote machine). After this you should be able to select from the available kernels (python, bash or R).
