# HW2
library(ggplot2)
library(ggedit)
library(tidyverse)
library(readxl)
library(lubridate)

# setwd("~/data-viz/hw2")

# FRB Philly Real-time Data Center
rinvest <- read_excel('rinvresid_q2q_growth.xlsx') %>% 
  separate(Date, c("Year", "Quarter"), ":", remove=FALSE)
rgdp <- read_excel('routput_q2q_growth.xlsx') %>% 
  separate(Date, c("Year", "Quarter"), ":",remove=FALSE)
econ <- left_join(rinvest, rgdp, by=c("Date","Year","Quarter"), suffix=c(".rinvest",".rgdp"), copy=TRUE)
econ$Date <- lubridate::yq(econ$Date)

ggplot(data=econ, aes(x=Date, y=Most_Recent.rinvest)) +
      geom_line(color = "#AAA333") +
      labs(y = "Quarter to Quarter Growth",
           x = "Date",
           title="Real Gross Private Domestic Investment: Residential",
           subtitle="Quarterly Growth of investment (source:Federal Reserve Bank of Philadelphia)")

ggplot(data=econ, aes(x=Date,y=Most_Recent.rgdp)) +
  geom_bar(stat="identity", aes(color=Most_Recent.rinvest)) +
  scale_color_gradient2(low = "#3154e0", high = "#e00f32") +
  labs(y = "Quarter to Quarter Growth",
       x = "Date",
       color = "Investment Growth",
       title="Real GDP Growth",
       subtitle="color denotes investment growth (source:Federal Reserve Bank of Philadelphia)") +
  theme(legend.position = c(0.8, 0.8))

# Two ways of reviewing the seasonality of Real Estate Investment
ggplot(data=econ, aes(x=Most_Recent.rinvest)) +
  geom_histogram() +
  facet_wrap(~Quarter, ncol=2) +
  labs(y = "Quarter to Quarter Growth",
       x = "Date",
          colour = "Dataset",
          title="Seasonality of Real Gross Private Domestic Investment: Residential)",
          subtitle="(source:Federal Reserve Bank of Philadelphia)")

ggplot(data=econ, aes(x=Most_Recent.rinvest, fill=Quarter)) +
  geom_density(alpha=0.5) +
  labs(y = "Quarter to Quarter Growth",
       x = "Date",
       colour = "Dataset",
       title="Seasonality of Real Gross Private Domestic Investment: Residential)",
       subtitle="(source:Federal Reserve Bank of Philadelphia)")

# Cavallo, Alberto, and Roberto Rigobon (2016) "The Billion Prices Project"
pp <- read_csv('pricestats_bpp_arg_usa.csv')
pp$date <- dmy(pp$date)
t <- c(1000)
pp_recent <- pp %>%
              filter(country == "USA") %>%
              top_n(t, date) 

ggplot(pp_recent, aes(x=date, y=indexCPI, group=1)) +
  geom_line(colour = "#f45f09")+
  stat_smooth(span=0.5, color="#DDDDDD") +
  labs(x="Date", 
       y="CPI",
       title="Consumer Price Index: 2013 to 2015",
       subtitle="(source:Billion Prices)")

ggplot(pp_recent, aes(x=date, y=indexCPI)) + 
  geom_line(color="#333333") +
  geom_point(aes(color = monthlyCPI)) +
  scale_color_gradient2(low = "#3154e0", high = "#e00f32") +
  labs(x="Date", 
       y="CPI",
       title="Consumer Price Index: 2013 to 2015",
       subtitle="Noting changes in the monthly CPI in red-blue scale (source:Billion Prices)")