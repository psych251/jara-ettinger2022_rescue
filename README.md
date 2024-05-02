# Replication Project - Jara-Ettinger et al. 2022

This is a copy of the GitHub template used for replications projects in PSYCH 251. The project in this repository is a rescue of a replication of *The Origins of the Shape Bias: Evidence From the Tsimane'* by Jara-Ettinger et al. 2022. 

* data/

This folder contains data from the original Jara-Ettinger et al. 2022 paper (`Original_ShapeBias_Data.csv`), as well as the anonymized version of the data from this rescue project (`full_sample_anonymized.csv`). The data containing the results from the mini meta-analysis are in `meta_analysis_data.csv`. 

* figures/

This folder contains the image files generated in the writeup for both the original paper, first replication, and this rescue replication.

* original_paper/

This folder contains a link to a PDF of the original paper. 

* scripts/

This folder contains the script to run the analyses on the data from the original paper (`Original_ShapeBias_Original.R`), two different versions of an anonymization script specifically written for cognition.run data (the `anonymize_cognition_run.R` file combines multiple files and then anonymizes the data, while the `anonymize_multiple_files.R` file anonymizes multiple files without combining them first). The jsPsych code running in the background of the [cognition.run experiment](https://g5esfxmrfk.cognition.run/) is also included in `experiment.js` and `trial`. The `img/` folder contains the stimuli used in the original paper and this rescue replication.    

* writeup/

This folder contains the `jara-ettinger2022_rescue.qmd` file used to generate the writeup accessible on RPubs [here](https://rpubs.com/echen/1180957), as well as the corresponding `.html` file and `.Rproj` environment. The two images in the folder are used in the writeup to compare the two types of figures from the original paper, first replication, and this rescue replication. 