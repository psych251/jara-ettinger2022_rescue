# Import libraries
library(tidyverse)
library(here)

# Combine files 
path_to_files <- list.files(path = "/Users/emilychen/GitHub/jara-ettinger2022_rescue/data_raw", 
                         pattern = "*.csv", full.names = TRUE)

# Read and combine all files
combined_df <- path_to_files %>% 
  map_dfr(~ read_csv(here(.)))

# Save the combined data to a new file
output_path_combined_data <- "/Users/emilychen/GitHub/jara-ettinger2022_rescue/data_raw/combined_data.csv"
write_csv(combined_df, here(output_path_combined_data))
  
# Read data
path_to_data = "/Users/emilychen/GitHub/jara-ettinger2022_rescue/data_raw/combined_data.csv"
df_raw = read_csv(here(path_to_data))

# Create unique IDs
df_ids = df_raw %>% 
  group_by(PROLIFIC_PID) %>% 
  mutate(prolific_id = cur_group_id()) %>% 
  ungroup()

# Anonymize data
df_anon = df_ids %>% 
  select(-c(PROLIFIC_PID, STUDY_ID, SESSION_ID,
                               source_code_version, 
                               ip, user_agent, 
                               browser, browser_version, platform,
                               platform_version, referer, internal_node_id,
                               accept_language,
                               recorded_at)) %>%
  select(prolific_id, condition, view_history,
         rt, run_id, trial_type, trial_index, 
         time_elapsed, device, 
         success, timeout, 
         failed_images, failed_audio, failed_video, 
         stimulus, response, 
         exemplar_name = exemplarName, 
         exemplar_img = exemplarImg, 
         extension_left_img = extensionLeftImg, 
         extension_center_img = extensionCenterImg, 
         extension_right_img = extensionRightImg, 
         question_order, 
         slider_start)    

# Save data
output_path = "/Users/emilychen/GitHub/jara-ettinger2022_rescue/data/full_sample_anonymized.csv"
write_csv(df_anon, here(output_path))
