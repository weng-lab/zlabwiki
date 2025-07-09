---
title: UCSC genome browser tutorial
subtitle: Onboarding tutorials for new lab members
date: 2025-07-07
authors:
  - name: Mingshi Gao
    email: mingshi.gao@umassmed.edu
---

## List of Contents

1. Overview of USCS genome browser
2. Supported data types
3. Commonly used data types in Zlab
4. Data preparation
   - ENCODE data
   - Custom data transformation
5. How to make custome track
6. How to build track hub
7. Useful links\

## 1. Overview of USCS genome browser

The [UCSC Genome Browser](https://genome.ucsc.edu/) provides a rapid and reliable display of any requested genomic region at any scale. It supports a wide range of genome assemblies across various species (eg. human GRCh38 and mouse mm10) and includes dozens of aligned annotation tracks.

![genome_browser_sc](images/genome_sc.png)\

## 2. Supported data types

**bam/cram**: Compressed Sequence Alignment/Map tracks
**bigBed**: Item or region tracks
**bigBarChart**: Bar charts of categorical variables displayed over genomic regions
**bigChain**: Genome-wide Pairwise Alignments
**bigGenePred**: Gene Annotations
**bigInteract**: Pairwise interactions
**bigLolly**: Lollipops
**bigNarrowPeak**: Peaks
**bigMaf**: Mulitple Alignments
**bigPsl**: Pairwise Alignments
**bigWig**: Signal graphing tracks
**hic: Hi-C** contact matrices
**halSnake**: HAL Snake Format
**vcfTabix**: Variant Call Format
**vcfPhasedTrio**: Variant Call Format Trios\

## 3. Commonly used data types in Zlab

1. **bigBed**: Visualize regions such as varians, repeats, cCREs and ChIP-seq peaks.
![bigBed example](images/bigbed_example.png)

2. **bigWig**: Visualize signals for assays such as ChIP-seq, ATAC-seq, DNase-seq and RNA-seq.
![bigWig](images/bigwig_example.png)

3. **bigInteract**: Visualize pairwise interactions for assays such as HiC and ChIA-PET.
![3D genome](images/3d_genome_example.png)
![biginteract example](images/biginteract_example.png)\

## 4. Data preparation

### ENCODE data

Find the data you want to visualize on the ENCODE portal, right click the download logo and copy the data URL(*copy link address*) for Genome Browser visualization

![encode data](images/encode_data.png)

Note: Most ENCODE data is available on the Zervers at ***/data/projects/encode/data/EID*** .

----

### Custom data transformation

UCSC developed various [tools](https://hgdownload.soe.ucsc.edu/admin/exe/linux.x86_64/) for data transformation.

#### bigBed

[BED](https://genome.ucsc.edu/FAQ/FAQformat#format1) (Browser Extensible Data) format

```mermaid
graph LR
bed -- bedToBigBed --> bigBed
```

#### bigWig

[bedGraph](https://genome.ucsc.edu/goldenpath/help/bedgraph.html) format

```mermaid
graph LR
bedGraph -- bedGraphToBigWig--> bigWig
```

#### bigInteract

[bedpe](https://bedtools.readthedocs.io/en/latest/content/general-usage.html) format,  [bigInteract](https://genome.ucsc.edu/goldenPath/help/interact.html) format

```mermaid
graph LR
bedpe ---> bed5+13 -- bedToBigBed--> bigInteract
```

![bedpe](images/bedpe.png)

![biginteract](images/biginteract.png)\

## 5. How to make custom track

Custom track is useful for quickly browse one or a few datasets.
To add custom track, click **Custom Tracks** under the **My Data** tab and then click **Add custom tracks**. In the [page](https://genome.ucsc.edu/cgi-bin/hgCustom), paste in the data URL or upload from local.
![ct1](images/ct1.png)

![ct2](images/ct2.png)\

## 6. How to make track hub

Track hubs enable quick and organized visualization of large datasets. They also make it easy to share data, since collaborators can view your tracks directly in the genome browser with a simple URL.

### Public directory on Zerver

***/zata/public_html_users/username*** is available as ***<http://users.wenglab.org/username>*** (eg. <http://users.wenglab.org/gaomingshi>). Please contact Greg, Michael or Arjan if you need help setting up your own directory.

### Set up a folder for track hub

1. Classic 3-file style (useful if you have data from more than 1 genome assembly)

   - **hub.txt** (description of the track hub)
   - **genmoes.txt** (specify the genome assmelies and corresponding trackDb.txt)
   - **trackDb.txt** (define the tracks)

track hub directory setup example:
![track hub folder set up](images/track_folder_setup.png)

1. 1-file style (easy setup for data from the same genome assembly, eg, GRCh38
   - **hub.txt** (add ***useOneFile on*** and ***genome xxx*** )

![enter image description here](images/enter_image_desc.png)

### Entries of trackDb.txt

Specify each track in the trackDb.txt.

![define track](images/define_track.png)

5 basic parameters needed for a track are:

- `track` (track id, needs to be unique)
- `type` (data type)
- `bigDataUrl` (the path of data, supports both local path and URL)
  - local file (eg. ENCFF122BJN.bigWig, if the file is in the same directory as trackDb.txt)
  - URLs (<https://www.encodeproject.org/files/ENCFF122BJN/@@download/ENCFF122BJN.bigWig>)
- `short label` (label that shows up at the right side of the track in genome browser view)
- `long label` (label that shows up above the track in genome browser view)

other useful parameters:

- `autoScale On` (useful for scaling bigWig view)
- `maxHeightPixels` (height of track)
- `negateValues On` (useful for set - strand RNA-seq signal as negative value)
- `color` (set track color, supports RGB)
- `visibility` (set each track to ideal visibility)

### Share track hub with collaborators

1. Share the URL of ***hub.txt*** for people to load at **[track hub page](https://genome.ucsc.edu/cgi-bin/hgHubConnect)**, eg. <http://users.wenglab.org/gaomingshi/ENCODE_Reg/hub.txt>

2. Create a ***session*** and share session URL (for advanced users, need to create a UCSC Genome Browser account)
 see the following links for more details:
 <https://genome.ucsc.edu/cgi-bin/hgSession>
 <https://genome.ucsc.edu/goldenPath/help/hgSessionHelp.html>

## Useful links

- [Hub Track Database Definition](https://genome.ucsc.edu/goldenPath/help/trackDb/trackDbHub.html)

- Public Track Hub’s TrackDb files on Github (Example: [ENCODE regulation track hub](https://github.com/ucscGenomeBrowser/kent/blob/master/src/hg/makeDb/trackDb/human/hg38/wgEncodeReg.ra))

- Lab Custom Track Color [Google sheet](https://docs.google.com/spreadsheets/d/1ugUQ_YngTJ8nZIvWFkCX0Pw7pm_TIwrNHfv5HzDru3Q/edit?usp=sharing)

- Kaili’s [slides](https://docs.google.com/presentation/d/100eeBsRgikA5TUX82qygyXFOTkhRbCTBSv8hAql_D-w/edit?usp=sharing) on downloading ENCODE data in batch

- My ENCODE metadata tutorial Google [colab](https://colab.research.google.com/drive/1-KfgiZKIlZ8pyL8y0JZobfV_2x6dNJra?usp=sharing)
