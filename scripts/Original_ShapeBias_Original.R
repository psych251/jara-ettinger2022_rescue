#Load libraries
library(tidyverse)
library(boot)
library(lme4)

# Load data ------------
data_file <- "Original_ShapeBias_Data.csv"
data_path <- file.path(getwd(), 'Github', 'jara-ettinger2022_rescue', 'data', data_file)
data <- read.csv(data_path)

table(data$Experiment) # 7 experiments.

# Experiment stats---------------------------------------------

# Number of participants
data %>% group_by(AgeGroup,Location) %>% summarise(subjects=n())
# Stats by experiment
summarydata <- data %>% group_by(Experiment) %>% summarise(subjects=n(),
                                                           average=mean(Age,na.rm=TRUE),
                                                           minage=min(Age,na.rm=TRUE),
                                                           maxage=max(Age,na.rm=TRUE),
                                                           stdev=sd(Age,na.rm=TRUE),
                                                           ShapeNo=sum(Choice=="Shape"),
                                                           MatNo=sum(Choice=="Material"),
                                                           ColorNo=sum(Choice=="Color"),
                                                           DistNo=sum(Choice=="Distractor"),
                                                           ShapePerc=ShapeNo/subjects,
                                                           MatPerc=MatNo/subjects,
                                                           ColorPerc=ColorNo/subjects,
                                                           DistPerc=DistNo/subjects)
summarydata$ExpNo <- c(6,7,2,4,3,1,5)
summarydata <- arrange(summarydata,ExpNo)

# Demographics
summarydata %>% dplyr::select(ExpNo,Experiment,subjects,average,minage,maxage,stdev)

# Tsimane' adult demographics
demo <- read_csv("Tsimane_Adult_Demographics.csv")
mean(demo$Spanish) # 6.85
sd(demo$Spanish) # 2.36
mean(demo$School) # 2.78
sd(demo$School) # 2.16

# Results
summarydata %>% dplyr::select(ExpNo,Experiment, subjects, ShapeNo, MatNo, ColorNo, DistNo, ShapePerc, MatPerc, ColorPerc, DistPerc)

# Main analysis------------------------------------
CurrExp <- data %>% filter(Experiment %in% c("Tsi_Adults_Objects","Tsi_Adults_wDistractor",
                                             "US_Turk_Adults","Tsi_Child_Objects","US_Children")) %>%
  filter(Choice!="Distractor")
CurrExp$Offset <- logit(1/3)
m <- glmer(Choice=="Shape" ~ offset(Offset) + Location * AgeGroup + (1 + Location + AgeGroup| Example) + (1 | Experiment),CurrExp,family="binomial")
summary(m)
m0 <- glmer(Choice=="Shape" ~ offset(Offset) + Location + AgeGroup + (1 + Location + AgeGroup | Example) + (1 | Experiment),CurrExp,family="binomial")
anova(m,m0)
summary(m0)

# Do Tsimane' children select the distractor object?----------------------------------------------
CurrExp <- data %>% filter(Experiment %in% c("Tsi_Child_ShapeVsMaterial","Tsi_Child_ShapeVsColor"))
CurrExp$Offset <- logit(1/3)
m <- glmer(Choice=="Distractor" ~ offset(Offset) + (1 | Example) + (1|Experiment),CurrExp,family="binomial")
summary(m)

# Is there a material bias?----------------------
CurrExp <- data %>% filter(Experiment %in% c("Tsi_Adults_Objects","Tsi_Adults_wDistractor",
                                             "Tsi_Child_Objects")) %>%
  filter(Choice!="Distractor")
CurrExp$Offset <- logit(1/3)
CurrExp$AgeGroup <- factor(CurrExp$AgeGroup,levels=c("Children","Adults"))
m <- glmer(Choice=="Material" ~ offset(Offset) + AgeGroup + (1 + AgeGroup | Example) + (1 | Experiment),CurrExp,family="binomial")
summary(m)
