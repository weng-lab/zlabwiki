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
> [Exercism](https://exercism.org/tracks/python) is a website that teaches programming languages in an "learn-by-example" manner. By enrolling in their python language tracks, you gain access to a library of exercises which teach basic python concepts. The exercises eventually become more challenging, requiring you to synthesize a solution to a specific coding problem from all previous concepts you've learnt. 

Once you have a handle on the basics, I strongly advise moving on to learning specific python libraries (i.e. numpy, pandas, tensorflow, pytorch, etc). While continuing to gain proficiency in python itself is good, most of the work in our lab will exclusively involve certain libraries which have their own learning curves.
> [DataCamp](https://app.datacamp.com/) is a great place to start learning these libraries (ask Zhiping for access), but as before -- chose whatever learning material best suits you!
## Command Line Basics
First start with learning the basics of Linux [here](https://linuxjourney.com/). I suggest only completing the "Grasshopper" courses, as these cover most of what you need to know. After you've gotten a good grasp of the basics, then move on to learning bash scripting [here](https://exercism.org/tracks/bash). While bash scripting is useful, know when to grab for fully-featured programming language as you requirements become more complex.
> [Bash Cheatsheet](https://devhints.io/bash)
## CLI Text Editor
Sometime you may need to quickly edit a config file or make changes to you .bashrc file. In these cases, the quickest way is almost always to use a CLI text editor. 
### `vim`
`vim` has more functionality and configurability. However, it notoriously has a steep learning curve. Here is [a good tutorial](https://github.com/iggredible/Learn-Vim/blob/master/ch00_read_this_first.md) if you are interested.
### A Quick `vim` Tutorial
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

You can find a more in-depth tutorial [here](https://github.com/iggredible/Learn-Vim/blob/master/ch00_read_this_first.md) if you are interested.
## Version Control
### Git
The official Git documentation includes a tutorial [here](https://git-scm.com/docs/gittutorial).

# Data Types and File Formats

## Sequence Data Formats

### FASTQ (.fastq, .fq)
Text-based format for storing both biological sequence data (usually nucleotide sequences) and their corresponding quality scores. 

*Each sequence entry contains four lines*:
1. Sequence identifier with description
2. Raw sequence letters
3. Plus sign (optional description)
4. Quality scores encoded in ASCII characters

| Element | Requirements | Description |
| --- | --- | --- |
| `@` | @ | Each sequence identifier line starts with @ |
| `<instrument>` | Characters allowed: a–z, A–Z, 0–9 and underscore | Instrument ID |
| `<run number>` | Numerical | Run number on instrument |
| `<flowcell ID>` | Characters allowed: a–z, A–Z, 0–9 | Flowcell ID |
| `<lane>` | Numerical | Lane number |
| `<tile>` | Numerical | Tile number |
| `<x_pos>` | Numerical | X coordinate of cluster |
| `<y_pos>` | Numerical | Y coordinate of cluster |
| `<read>` | Numerical | Read number. 1 can be single read or Read 2 of paired-end |
| `<is filtered>` | Y or N | Y if the read is filtered (did not pass), N otherwise |
| `<control number>` | Numerical | 0 when none of the control bits are on, otherwise it is an even number. On HiSeq X systems, control specification is not performed and this number is always 0 |
| `<sample number>` | Numerical | Sample number from sample sheet |

#### Example
``` {code} text
:filename: example.fastq
@071112_SLXA-EAS1_s_7:5:1:817:345
GGGTGATGGCCGCTGCCGATGGCGTC
AAATCCCACC
+
IIIIIIIIIIIIIIIIIIIIIIIIII
IIII9IG9IC
@071112_SLXA-EAS1_s_7:5:1:801:338
GTTCAGGGATACGACGTTTGTATTTTAAGAATCTGA
+
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII6IBI
```

### SAM/BAM/CRAM (.sam, .bam, .cram)
- SAM (Sequence Alignment/Map): Text format for storing sequence alignments against a reference genome
- BAM: Binary version of SAM, compressed and indexed for faster processing
- CRAM: Highly compressed reference-based alternative to BAM, designed for long-term storage

### FASTA (.fasta, .fa)
Simple text-based format for representing nucleotide or peptide sequences. Typically, FASTA is used to store reference data (such as those from curtated databases).

*Each entry consists of*:
- A description line (starts with '>')
- The sequence data on subsequent lines

#### Example
``` {code} text
:filename: example.fasta
>Mus_musculus_tRNA-Ala-AGC-1-1 (chr13.trna34-AlaAGC)
GGGGGTGTAGCTCAGTGGTAGAGCGCGTGCTTAGCATGCACGAGGcCCTGGGTTCGATCC
CCAGCACCTCCA
>Mus_musculus_tRNA-Ala-AGC-10-1 (chr13.trna457-AlaAGC)
GGGGGATTAGCTCAAATGGTAGAGCGCTCGCTTAGCATGCAAGAGGtAGTGGGATCGATG
CCCACATCCTCCA
```

## Variant Formats

### VCF/BCF (.vcf, .bcf)
- VCF (Variant Call Format): Text file format for storing gene sequence variations
- BCF: Binary version of VCF

*Contains information about*:
- Genomic position of variants
- Reference and alternative alleles
- Quality scores
- Filter statuses
- Additional annotations

## Genome Annotation Formats

### BED (.bed)
Browser Extensible Data format for defining genomic features. 

*Contains*:
- Chromosome name
- Start position
- End position
- Optional fields (name, score, strand, etc.)
Commonly used for displaying data tracks in genome browsers

| Column number | Title | Definition | Required |
| --- | --- | --- | --- |
| **1** | **chrom** | Chromosome (e.g. chr3, chrY, chr2_random) or scaffold (e.g. scaffold10671) name | Yes |
| **2** | **chromStart** | Start coordinate on the chromosome or scaffold for the sequence considered (the first base on the chromosome is numbered 0 i.e. the number is zero-based) | Yes |
| **3** | **chromEnd** | End coordinate on the chromosome or scaffold for the sequence considered. This position is non-inclusive, unlike chromStart (the first base on the chromosome is numbered 1 i.e. the number is one-based) | Yes |
| **4** | **name** | Name of the line in the BED file | No |
| **5** | **score** | Score between 0 and 1000 | No |
| **6** | **strand** | DNA strand orientation (positive ["+"] or negative ["-"] or "." if no strand) | No |
| **7** | **thickStart** | Starting coordinate from which the annotation is displayed in a thicker way on a graphical representation (e.g.: the start codon of a gene) | No |
| **8** | **thickEnd** | End coordinates from which the annotation is no longer displayed in a thicker way on a graphical representation (e.g.: the stop codon of a gene) | No |
| **9** | **itemRgb** | RGB value in the form R, G, B (e.g. 255,0,0) determining the display color of the annotation contained in the BED file | No |
| **10** | **blockCount** | Number of blocks (e.g. exons) on the line of the BED file | No |
| **11** | **blockSizes** | List of values separated by commas corresponding to the size of the blocks (the number of values must correspond to that of the "blockCount") | No |
| **12** | **blockStarts** | List of values separated by commas corresponding to the starting coordinates of the blocks, coordinates calculated relative to those present in the chromStart column (the number of values must correspond to that of the "blockCount") | No |

### GFF/GTF (.gff, .gtf)
- GFF (General Feature Format): Describes genes and other features of DNA, RNA, and protein sequences
- GTF (Gene Transfer Format): More specialized version of GFF

*Contains*:
- Feature coordinates
- Feature types
- Score
- Strand information
- Frame
- Attribute-value pairs

| Column number | Title | Definition | Required |
| --- | --- | --- | --- |
| **1** | **seqname** | Name of the chromosome or scaffold; chromosome names can be given with or without the 'chr' prefix. Must be a standard chromosome name or an Ensembl identifier such as a scaffold ID, without additional content like species or assembly | Yes |
| **2** | **source** | Name of the program that generated this feature, or the data source (database or project name) | Yes |
| **3** | **feature** | Feature type name, e.g. Gene, Variation, Similarity | Yes |
| **4** | **start** | Start position of the feature, with sequence numbering starting at 1 | Yes |
| **5** | **end** | End position of the feature, with sequence numbering starting at 1 | Yes |
| **6** | **score** | A floating point value | Yes (use '.' if empty) |
| **7** | **strand** | Defined as + (forward) or - (reverse) | Yes (use '.' if empty) |
| **8** | **frame** | One of '0', '1' or '2'. '0' indicates that the first base of the feature is the first base of a codon, '1' that the second base is the first base of a codon, and so on | Yes (use '.' if empty) |
| **9** | **attribute** | A semicolon-separated list of tag-value pairs, providing additional information about each feature | Yes |

### WIG (.wig)
The WIG (wiggle) format is used for displaying continuous-valued data in track format. It is particularly useful for showing expression data, probability scores, and GC percentage.

WIG files  be formatted in two main ways:
#### 1. Fixed Step
```
fixedStep chrom=chrN start=pos step=stepInterval [span=windowSize]
dataValue
dataValue
dataValue
```
##### Required Fields
| Field | Description |
| --- | --- |
| **chrom** | Chromosome name (e.g., chr1) |
| **start** | Starting position |
| **step** | Distance between starts of adjacent windows |
| **dataValue** | Numerical data value for each position |

##### Optional Fields
| Field | Description |
| --- | --- |
| **span** | Size of window (defaults to step size) |

#### 2. Variable Step
```
variableStep chrom=chrN [span=windowSize]
chromStart  dataValue
chromStart  dataValue
chromStart  dataValue
```
##### Required Fields
| Field | Description |
| --- | --- |
| **chrom** | Chromosome name |
| **chromStart** | Start position of each window |
| **dataValue** | Numerical data value for each position |

##### Optional Fields
| Field | Description |
| --- | --- |
| **span** | Size of window (defaults to 1) |

#### Common Use Cases
1. Gene expression levels
2. ChIP-seq signal intensity
3. RNA-seq coverage
4. Conservation scores
5. GC content
6. Probability scores
7. Transcription factor binding signals

#### Example
``` {code} text
:filename: example.wig
# Fixed-step example showing expression values
fixedStep chrom=chr3 start=400601 step=100 span=100
11.0
22.0
33.0

# Variable-step example showing conservation scores
variableStep chrom=chr3 span=150
500701  5.0
500801  3.0
500901  8.0
```

## Phylogenetic Formats

### Newick (.nwk)
Standard format for representing phylogenetic trees using nested parentheses. 

*Contains*:
- Tree topology
- Branch lengths
- Node labels
- Bootstrap values

### NEXUS (.nex)
Rich format for storing multiple types of biological data:
- Character matrices
- Trees
- Distance matrices
- Analysis assumptions
Supports multiple data blocks and commands

## Index Formats

### BAI/CSI (.bai, .csi)
- BAI: Index format for BAM files
- CSI: Coordinate-sorted index format

These index files are typically required by common [CLI tools]()

*Enables*:
- Random access to compressed files
- Quick retrieval of alignments
- Efficient genome browsing

## Genome Browser Formats

### bigWig/bigBed (.bw, .bb)
- bigWig: Binary format of `.wig` files
- bigBed: Binary format of `.bed` files

*Advantages*:
- Efficient random access
- Reduced memory usage
- Fast display in genome browsers

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
├── LICENSE.md                 # Project license (e.g., MIT, GPL)
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
