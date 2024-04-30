# import libraries
library(tidyverse)
library(here)

process_file <- function(path_to_data) {
  
  # read data
  df_raw = read_csv(here(path_to_data))
  
  # create unique IDs
  df_ids = df_raw %>% 
    group_by(PROLIFIC_PID) %>% 
    mutate(prolific_id = cur_group_id()) %>% 
    ungroup()
  
  # anonymize
  df_anon = df_ids %>% 
    select(-c(PROLIFIC_PID, STUDY_ID, SESSION_ID,
              run_id, source_code_version, 
              ip, user_agent, 
              browser, browser_version, platform,
              platform_version, referer, internal_node_id,
              accept_language,
              recorded_at)) %>%
    select(prolific_id, condition, view_history,
           rt, trial_type, trial_index, 
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
  
  # Generate unique output path
  output_path <- sub("data_raw", "data", sub(".csv", paste0("_processed_", ".csv"), path_to_data))
  
  # Save data
  write_csv(df_anon, here(output_path))
}

# List of file paths
file_paths <- list.files(path = "/Users/emilychen/GitHub/jara-ettinger2022_rescue/data_raw", 
                         pattern = "*.csv", full.names = TRUE)

# Process each file
walk(file_paths, process_file)