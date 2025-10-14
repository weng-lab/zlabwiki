Cluster Usage
Apart from having access to the MGHPCC cluster, zlab also runs a small private slurm cluster (see). The following links point to more information on its usage.

Tutorial
Slurm example

Attention!
Try to copy your data to /tmp/ before you submit your job, in case of I/O overloaded.
We have 24 or 64 cores per node. Better to use just 1 node for a single job, except the jobs are MPI-aware.


ENCODE data
All the ENCODE data should be on /data/projects/encode/data/experimentID/.
Tutorial and Example


Contact
In case of technical questions or difficulties, contact:

Arjan van der Velde <vandervelde.ag@gmail.com> (+1 917-214-7818)
Michael Purcaro <purcaro@gmail.com> (+1 203-808-2532)

---

Resources on each machine are plenty but limited. Be considerate when using the Zlab servers, try to not hog machines by exhausting any of the available resources described below. If for some reason you need more resources, consider chopping up your jobs into smaller parts that can be run sequentially or move your jobs to the GHPCC cluster. 

Recommend scicluster at end