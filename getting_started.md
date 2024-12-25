---
title: Getting Started
subtitle: Onboarding tutorials for new lab members
authors:
  - name: Christian S. Ramirez
  - name: Greg Andrews
---
# Computing Access


## iTerm2 (Mac)
If you are on Mac, I prefer to user [iTerm2](https://iterm2.com/) as opposed to the stock terminal, it supports multiple tabs, is much more customizable, and has many additional features.

Make sure to change your key bindings to natural language processing.

## VPN Setup
Refer to instructions [here](https://umassmed.sharepoint.com/sites/information-technology/SitePages/VPN-Connect.aspx) (note: you will need to login to you umassmed.edu microsoft account).

## WSL (Windows)
If on windows, you will have to install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) to launch a Linux VM from which you can SSH into the ZLab servers.

[WSL basic commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)

From your powershell start your linux VM with:
```
wsl.exe -d ubuntu
```
## Update ssh config file
Your ssh config file should be placed in `~/.ssh/config`.

If `~/.ssh` directory does not exists, run `mkdir ~/.ssh`.

On a Mac, you can create a blank ssh config file with `touch ~/.ssh/config`, and then open it in TextEdit with `Open -a TextEdit ~/.ssh/config`, then you can just copy and paste the contents below, save and exit.

Replace `USERNAME` with your ZLab username.

You will have to make `~/.ssh/sockets` if it does not exist with `mkdir ~/.ssh/sockets`.
```
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
## Logging in
`ssh USERNAME@bastion.wenglab.org`

If it's your first time, you will be prompted to scan the QR code with any two-factor authentication app. You should also be prompted to change your password. 
***
🔴 **IMPORTANT** 🔴 Save this QR code somewhere!
***
I personally recommend using Microsoft Authenticator, since this is the 2FA app used by your UMass Microsoft account. However, it may also be convenient to choose a 2FA app that has a desktop client. 
***
🔴 **IMPORTANT** 🔴 From this point forward, every time you login, you will provide your password + two-factor code with no spaces.
***
From bastion, you can then `ssh` into any of the ZLab servers:
```
ssh HOSTNAME
```
Replace `HOSTNAME` with one of the hostnames defined in your ssh config file (i.e. z011, z012 ... z014).

# Installing Software
## Install conda
Conda is a great way to quickly install software and create separate environments for projects requiring different, and potentially conflicting, pieces of software. The conda (Miniforge3) installation instructions have been adapted from default installation instructions so it is available across all our machines.

```
curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$(uname)-$(uname -m).sh"
bash Miniforge3-$(uname)-$(uname -m).sh -p /zata/zippy/$(whoami)/Miniforge3
source ~/.bashrc
```
`$(whoami)` is evaluating to your Zlab username.

While this is optional, you may want to use the `mamba` dependency resolver which tends to be faster than native `conda`. You can still use conda if you are prefer, but in the following examples will use `mamba`. You may need to run `mamba init` if this is your first time using `mamba` and then update your bashrc file with `source ~/.bashrc`.

Create your first conda environment:
```
mamba create -n myenv jupyterlab numpy pandas matplotlib bedtools
```
## Singularity
### Why _containerizing_ your environment is best practice
Containers are useful in bioinformatics because they ensure reproducibility by packaging all software, dependencies, and configurations into a single unit that will run identically across different computers and systems. Hence, they solve the notorious "dependency hell" problem,  allowing you to run multiple versions of tools without conflicts and easily share pipelines with others.

### Build singularity image
The remote docker image `clarity001/bioinformatics` contains a full suite of bioinformatics software that you will most likely need.

Create the destination folder and build the singularity sandbox container:
```
mkdir -p /zata/zippy/$(whoami)/bin/
singularity build --sandbox /zata/zippy/$(whoami)/bin/bioinformatics docker://clarity001/bioinformatics
```
To start an interactive shell in the *writable* container (optional):
```
singularity shell --writable -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics
```
# JupyterLab
In the following examples:
* Replace `USERNAME` with your ZLab username.
* Replace `GROUP` with `zusers` if you are in ZLab, `musers` if you are in Moore Lab, or `rusers` if you are a rotation student in either group. If you are still unsure, run `groups` in your terminal. This will return a list of user groups that you belong to. Among them should be one of the previously mentioned groups.
* Replace `HOSTNAME` with one of the hostnames defined in your ssh config file (i.e. z011, z012 ... z014)

## Start a JupyterLab server using singularity
Using the sandbox container you just built, start the JupyterLab server with the following command:
```
singularity exec --writable -B /data,/zata /zata/zippy/$(whoami)/bin/bioinformatics jupyter lab --port=8888 --ip=HOSTNAME --no-browser --notebook-dir=/data/GROUP/$(whoami)
```
## Start a JupyterLab server using docker
First see [rootless docker setup](rootless_docker_setup)
```
docker container run -it --rm -p 8888:8888 --mount type=bind,src=/data,target=/data --mount type=bind,src=/zata,target=/zata clarity001/bioinformatics jupyter-lab --port=8888 --ip=* --no-browser --allow-root --notebook-dir=/data/GROUP/$(whoami)/
```
## Start a JupyterLab server in a conda environment
Activate your environment from the previous example:
```
conda activate myenv
```
Start your jupyterlab server:
```
jupyter-lab --port=8888 --ip=HOSTNAME --no-browser
```
## Accessing your JupyterLab server
Access the notebook server from another terminal on your computer with `ssh -N -L 8888:HOSTNAME:8888 USERNAME@HOSTNAME`.

If you are curious, this is what the previous command is doing:
```
ssh                  # The secure shell program that creates encrypted connections
-N                   # Flag that means "don't execute a remote command/shell" - just forward ports
-L                   # Flag for "local port forwarding"
8888:                # The local port on your computer
HOSTNAME:            # The destination server's address (check your ssh config for available hosts)
8888                 # The remote port on the destination server
USERNAME@HOSTNAME    # Username and server address to login to
```
You can then open your notebook server in your favorite web browser by navigating to http://127.0.0.1:8888/lab.

## Common issues with JupyterLab
### Unable to delete files
This is an issue that has come up before. To fix, you first need to find you jupyter config file. It will most likely be located at `/home/USERNAME/.jupyter`. First, change into that directory:
```
cd /home/$(whoami)/.jupyter
```
If you cannot find `jupyter_server_config.py` in that directory, run:
```
jupyter server --generate-config
```
Edit `jupyter_server_config.py` with your preferred text editor:
```
vim jupyter_server_config.py
```
Look for the config option `c.FileContentsManager.delete_to_trash`. If it is set to `True`, change it to `False`. Now you should be able to delete files in JupyterLab
(rootless_docker_setup)=
# Rootless Docker setup
## Why use rootless Docker?
Rootless Docker enables users to run containers without administrator privileges, making it ideal for shared HPC environments where granting root access to multiple users would pose security risks.
## Setup
```
mkdir -p ~/.config/docker/
echo '{"data-root":"/rootless/docker/'$(whoami)'/docker"}' > ~/.config/docker/daemon.json
dockerd-rootless-setuptool.sh install
```
