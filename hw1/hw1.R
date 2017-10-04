library(readr)
library(haven)
library(dplyr)
library(tidyr)
library(tidyverse)
library(stringr)
library(ggplot2)

# set the current directory from source file
# cd = getwd()
# newdir = paste0(cd, "/hw1")
# setwd(newdir)

acc2014 = read_sas('accident.sas7bdat')
acc2015 = read_csv('accident.csv')
fips = read_csv('fips.csv')
ls()

acc2014 <- acc2014 %>%
  mutate(TWAY_ID2 = na_if(TWAY_ID2,""))

table(is.na(acc2014$TWAY_ID2))

setdiff(colnames(acc2015), colnames(acc2014))
# "RUR_URB"  "FUNC_SYS" "RD_OWNER" are not in 2014
setdiff(colnames(acc2014), colnames(acc2015))
# "ROAD_FNC" is not in 2014

acc <- bind_rows(
  acc2014,
  acc2015
)

count(acc, RUR_URB)
# there are 30000 missing because RUR_URB was introduced in 2015, not in 2014 data.

glimpse(fips)

# Convert the State and County variables to join to FIPS dataset
acc <- acc %>% mutate(
  STATE = str_pad(as.character(STATE), 2, "left", pad=0),
  COUNTY = str_pad(as.character(COUNTY), 3, "left", pad=0)
)
acc <- plyr::rename(acc, c(STATE = "StateFIPSCode", COUNTY = "CountyFIPSCode"))
acc <- left_join(acc, fips, by=c("StateFIPSCode", "CountyFIPSCode"))

# Exploratory Analysis
#Create total fatalities tibble
agg <- acc %>% 
  group_by(StateName, YEAR, add=TRUE) %>%
  summarise(TOTAL = sum(FATALS)) %>%
  spread(StateName, YEAR)

# rewritten
agg <- acc %>% 
  group_by(StateName, YEAR, add=TRUE) %>%
  summarise(TOTAL = sum(FATALS)) %>%
  spread(YEAR, TOTAL) %>%
  rename("Year2014" = "2014", "Year2015" = "2015") %>% 
  mutate(Diff_Percent = Year2015/Year2014 - 1) %>%
  arrange(desc(Diff_Percent)) %>%
  filter(Diff_Percent > .15) %>%
  drop_na()
