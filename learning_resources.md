---
title: Learning Resources
subtitle: Curated collection of bioinformatics learning materials 
authors:
  - name: Christian S. Ramirez
    email: christian.ramirez1@umassmed.edu
---
# Foundation Skills 
## Programming Essentials (Python)
While there are many ways to go about this, here are some suggestions on how to get with started with python.
* [Exercism](https://exercism.org/tracks/python) is a website that teaches programming languages in an "learn-by-example" manner. By enrolling in their python language tracks, you gain access to a library of exercises which teach basic python concepts. The exercises eventually become more challenging, requiring you to synthesize a solution to a specific coding problem from all previous concepts you've learnt. 

Once you have a handle on the basics, I strongly advise moving on to learning specific python libraries (i.e. numpy, pandas, tensorflow, pytorch, etc). While continuing to gain proficiency in python itself is good, most of the work in our lab will exclusively involve certain libraries which have their own learning curves.
* [DataCamp](https://app.datacamp.com/) is a great place to start learning these libraries (ask Zhiping for access), but as before -- chose whatever learning material best suits you!
## Command Line Basics
First start with learning the basics of Linux [here](https://linuxjourney.com/). I suggest only completing the "Grasshopper" courses, as these cover most of what you need to know. After you've gotten a good grasp of the basics, then move on to learning bash scripting [here](https://exercism.org/tracks/bash). While bash scripting is useful, know when to grab for fully-featured programming language as you requirements become more complex.
* [Bash Cheatsheet](https://devhints.io/bash)
## Version Control
### Git
The official Git documentation includes a tutorial [here](https://git-scm.com/docs/gittutorial).
# Data Types and File Formats
## Sequence Data Formats
### FASTQ (.fastq, .fq)
- Official spec: https://www.ncbi.nlm.nih.gov/sra/docs/submitformats/#fastq-files
- Illumina format: https://emea.support.illumina.com/help/BaseSpace_OLH_009008/Content/Source/Informatics/BS/FileFormat_FASTQ-files_swBS.htm
### SAM/BAM/CRAM (.sam, .bam, .cram)
- Official spec: https://samtools.github.io/hts-specs/
- SAM: https://samtools.github.io/hts-specs/SAMv1.pdf
- CRAM: https://samtools.github.io/hts-specs/CRAMv3.pdf
- BAM: https://samtools.github.io/hts-specs/SAMv1.pdf
### FASTA (.fasta, .fa)
- NCBI spec: https://www.ncbi.nlm.nih.gov/genbank/fastaformat/
- UniProt guide: https://www.uniprot.org/help/fasta-headers
## Variant Formats
### VCF/BCF (.vcf, .bcf)
- Official spec: https://samtools.github.io/hts-specs/VCFv4.3.pdf
- Format guide: https://www.internationalgenome.org/wiki/Analysis/vcf4.0/
## Genome Annotation Formats
### BED (.bed)
- UCSC spec: https://genome.ucsc.edu/FAQ/FAQformat.html#format1
- Extended BED: https://genome.ucsc.edu/FAQ/FAQformat.html#format1.7
### GFF/GTF (.gff, .gtf)
- GFF3 spec: https://github.com/The-Sequence-Ontology/Specifications/blob/master/gff3.md
- GTF spec: http://mblab.wustl.edu/GTF22.html
- Ensembl GTF: https://www.ensembl.org/info/website/upload/gff.html
## Expression Data
### GCT (.gct)
- Broad Institute spec: https://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats
## Phylogenetic Formats
### Newick (.nwk)
- Format spec: http://evolution.genetics.washington.edu/phylip/newicktree.html
- Extended spec: https://doi.org/10.1093/bioinformatics/btg190
### NEXUS (.nex)
- Original paper: http://dx.doi.org/10.1093/sysbio/46.4.590
- Format guide: http://wiki.christophchamp.com/index.php?title=NEXUS_file_format
## Index Formats
### BAI/CSI (.bai, .csi)
- Specs included in SAMtools: https://samtools.github.io/hts-specs/
- CSI spec: https://samtools.github.io/hts-specs/CSIv1.pdf
## Genome Browser Formats
### bigWig/bigBed (.bw, .bb)
- UCSC spec: https://genome.ucsc.edu/goldenPath/help/bigWig.html
- Format guide: https://genome.ucsc.edu/FAQ/FAQformat.html
# Pipeline Development
## Snakemake
Snakemake is a workflow management system that helps automate data analysis pipelines. The functionality of snakemake cannot be covered here in meaningful detail. Please read through the [snakemake documentation](https://snakemake.readthedocs.io/en/stable/) and play around with example pipelines to gain familiarity with this powerful tool.
# Project Management
## Documentation Standards
(WIP)
## Project Folder Structure
```
project_name/
├── README.md                  # Project overview, setup instructions, and usage
├── LICENSE                    # Project license (e.g., MIT, GPL)
├── .gitignore                 # Git ignore rules
├── environment.yml            # Conda environment specification
├── requirements.txt           # Python package dependencies
│
├── config/                    # Configuration files
│   └── config.yml             # Main configuration parameters
│
├── data/                      # Data directory (often symlinked to storage)
│   ├── raw/                   # Raw, immutable data
│   ├── interim/               # Intermediate processed data
│   └── processed/             # Final processed data for analysis
│
├── docs/                      # Documentation
│   ├── protocol.md            # Experimental/analysis protocol
│   ├── workflow.md            # Pipeline documentation
│   └── quality_control.md     # QC documentation
│ 
├── notebooks/                 # Jupyter notebooks
│   ├── 01_qc.ipynb            # Quality control analysis
│   ├── 02_eda.ipynb           # Exploratory data analysis
│   └── 03_analysis.ipynb      # Main analysis notebooks
│
├── results/                   # All output from workflows and analyses
│   ├── figures/               # Generated graphics and figures
│   ├── tables/                # Generated data tables
│   └── reports/               # Generated reports
│
├── src/                       # Source code for use in this project
│   ├── __init__.py 
│   ├── data/                  # Scripts to download or generate data
│   ├── processing/            # Data processing scripts
│   ├── analysis/              # Analysis scripts
│   └── visualization/         # Visualization scripts
│
└── workflow/                 # Workflow management files
    ├── Snakefile             # Snakemake workflow definition
    ├── rules/                # Snakemake rules
    ├── scripts/              # Workflow-specific scripts
    └── logs/                 # Log files
```
This is not an absolute standard to follow. The above directory tree is meant more as a guideline for how to approach project organization.
