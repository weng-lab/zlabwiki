---
title: rclone with Dropbox
sidebar:
  hide: true
---

## Overview

[rclone](https://rclone.org/) is a command-line tool for syncing, copying, and managing files on cloud storage. It works well as a replacement for the Dropbox desktop client on Linux servers, and handles large transfers more reliably than tools like `dropbox-uploader`.

This page covers setting up rclone with Dropbox on a lab server. Because the server has no browser, authentication requires a brief SSH tunnel from your local machine.

> **Note — Before reading**
>
> Please be aware of the following placeholder terms:
>
> | Placeholder   | Meaning                                                     |
> | ------------- | ----------------------------------------------------------- |
> | `USERNAME`    | your ZLab username                                          |
> | `HOSTNAME`    | hostname of server                                          |
> | `REMOTE_NAME` | the name you choose for your rclone remote (e.g. `dropbox`) |

---

## Prerequisites

- rclone installed on the server (check with `rclone version`)
- SSH access to the server configured per the [getting started guide](https://wiki.wenglab.org/getting-started/#ssh)

> **Caution:** The commands in this tutorial assume your `~/.ssh/config` is set up exactly as described in the [getting started guide](https://wiki.wenglab.org/getting-started/#ssh). Without it, the SSH tunnel command will not work as written.

---

## Step 1: Open the SSH Tunnel

OAuth authentication requires rclone to briefly communicate with a local web browser. Since the server is headless, you need to forward the auth port to your local machine first.

**First, open an SSH connection to the server** in a new terminal on your local machine:

```bash title="Terminal window"
ssh USERNAME@HOSTNAME
```

> **Note:** This connects directly to `HOSTNAME` without manually stepping through the bastion server — `~/.ssh/config` handles the proxy hop transparently. This is also what makes the tunnel command work correctly.

**Then, in a second new terminal on your local machine**, open the tunnel:

```bash title="Terminal window"
ssh -N -L localhost:53682:localhost:53682 USERNAME@HOSTNAME
```

| Command                              | Description                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `ssh`                                | The secure shell program that creates encrypted connections                 |
| `-N`                                 | Flag that means "don't execute a remote command/shell" — just forward ports |
| `-L localhost:53682:localhost:53682` | Forward port 53682 on the server to port 53682 on your local machine        |
| `USERNAME@HOSTNAME`                  | Your username and the server to connect to                                  |

> **Note:** No output is expected — silence means the tunnel is working. The terminal will remain held until you close it. If you see an error, double-check your `~/.ssh/config` against the [getting started guide](https://wiki.wenglab.org/getting-started/#ssh).

Leave both terminals running while you complete the next step. You can close the tunnel terminal once configuration is done.

---

## Step 2: Configure the Remote

In your **first terminal (the SSH session on the server)**, run:

```bash title="Terminal window"
rclone config
```

Follow the prompts as shown below.

**Create a new remote:**

```
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
```

**Name your remote.** You can use any name — `dropbox` is a reasonable choice if you only have one Dropbox account. You will use this name in all subsequent rclone commands (referred to as `REMOTE_NAME` on this page).

```
name> REMOTE_NAME
```

**Select Dropbox as the storage type.** A long list of storage providers will be printed — enter `dropbox` to select Dropbox.

```
Storage> dropbox
```

**Leave the App ID fields blank** to use rclone's default shared App ID, which is fine for lab use:

```
** See help for dropbox backend at: https://rclone.org/dropbox/ **

OAuth Client Id
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_id>

OAuth Client Secret
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_secret>
```

**Skip advanced config:**

```
Edit advanced config? (y/n)
y) Yes
n) No (default)
y/n> n
```

**Choose auto config** (this is what uses the SSH tunnel you opened in Step 1):

```
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes (default)
n) No
y/n> y
```

rclone will print a URL and wait:

```
If your browser doesn't open automatically go to the following link:
http://127.0.0.1:53682/auth?state=XXXXXXXXXXX
Log in and authorize rclone for access
Waiting for code...
```

Open that URL in your **local machine's browser**. Log in to Dropbox and authorize rclone. The tunnel forwards the callback back to the server automatically.

Once authorized, the terminal will show:

```
Got code
--------------------
[REMOTE_NAME]
token = {"access_token":"...","token_type":"bearer","expiry":"0001-01-01T00:00:00Z"}
--------------------
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y
```

Confirm with `y`, then quit the config:

```
e/n/d/r/c/s/q> q
```

You can now close the SSH tunnel terminal.

---

## Basic Usage

> **Note:** The `:` after `REMOTE_NAME` is required in all rclone commands — it tells rclone you are referring to a remote, not a local path.

```bash title="Terminal window"
# List top-level folders in your Dropbox
rclone lsd REMOTE_NAME:

# List all files in your Dropbox (can be verbose)
rclone ls REMOTE_NAME:

# List a specific folder
rclone ls REMOTE_NAME:my-folder

# Copy a local file or folder to Dropbox
rclone copy /local/path REMOTE_NAME:remote/path

# Copy from Dropbox to local
rclone copy REMOTE_NAME:remote/path /local/path

# Sync a local folder to Dropbox (one-way mirror — deletes on destination)
rclone sync /local/path REMOTE_NAME:remote/path
```

> **Caution:** `rclone sync` deletes files at the destination that are not present at the source. Use `rclone copy` if you want a one-way transfer without deletions.

---

## More Information

- `rclone copy` and `rclone sync` have help entries with more options: `rclone copy --help` and `rclone sync --help`
  - The `-P` flag (`--progress`) prints live transfer progress to the terminal, which is useful for large transfers
- [rclone Dropbox documentation](https://rclone.org/dropbox/) (or you can run command `rclone help backend dropbox` on the server for backend-specific help)

---

## Notes

- **Shared folders owned by others** cannot be accessed via rclone with a personal token — this is a Dropbox API limitation. Only folders owned by your own Dropbox account are accessible.
- **App ID:** rclone uses a shared App ID by default, which is sufficient for most lab use. If you need your own (e.g., for rate limit reasons), see the [rclone Dropbox "Get your own App ID"](https://rclone.org/dropbox/#get-your-own-dropbox-app-id).

