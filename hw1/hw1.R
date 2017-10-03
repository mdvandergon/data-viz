library(readr)
library(haven)
library(dplyr)
library(tidyr)
library(tidyverse)
library(stringr)
library(ggplot2)

# set the current directory from source file
# cd = getwd()
# newdir = paste0(cd, "/hw1/data")
# setwd(newdir)

acc2014 = read_sas('accident.sas7bdat')
acc2015 = read_csv('accident.csv')
