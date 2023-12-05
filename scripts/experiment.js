//Initialize jspsych
var jspsych = initJsPsych(
  {
      on_finish: function() {
        window.location.href = "https://www.prolific.com/"
      }
  }
);

//Create timeline (array)
var timeline = [];

//Create experiment
var welcome = {
  type: jsPsychInstructions,
  pages: [
  'Welcome to the experiment! Please click "Next" to begin.'
  ],
  show_clickable_nav: true
}

//Main experiment instructions
var instructions_1 = {
  type: jsPsychInstructions,
  pages: [
  'In the first part of this experiment, we will ask you to answer some questions about a group of objects.'
  ],
  show_clickable_nav: true
}

//All possible object names 
var object_names = ['fep', 'dax', 'coba'];

//All possible exemplar images 
var exemplar_stimuli = [
'red_crepe_snowman_exemplar.png',
'yellow_foam_lamp_exemplar.png',
'blue_yarn_arch_exemplar.png'
];

//All possible counterbalanced orders of the extension images  
var extension_stimuli = [
{ left_obj: 'red_foam_arch_extension.png', center_obj: 'yellow_yarn_snowman_extension.png', right_obj: 'blue_crepe_lamp_extension.png' },
{ left_obj: 'red_foam_arch_extension.png', center_obj: 'blue_crepe_lamp_extension.png', right_obj: 'yellow_yarn_snowman_extension.png'},
{ left_obj: 'yellow_yarn_snowman_extension.png', center_obj: 'red_foam_arch_extension.png', right_obj: 'blue_crepe_lamp_extension.png'},
{ left_obj: 'yellow_yarn_snowman_extension.png', center_obj: 'blue_crepe_lamp_extension.png', right_obj: 'red_foam_arch_extension.png'},
{ left_obj: 'blue_crepe_lamp_extension.png', center_obj: 'red_foam_arch_extension.png', right_obj: 'yellow_yarn_snowman_extension.png'},
{ left_obj: 'blue_crepe_lamp_extension.png', center_obj: 'yellow_yarn_snowman_extension.png', right_obj: 'red_foam_arch_extension.png'},
]; 

//Find every combination of the stimuli 
function findCombos(object_names, exemplar_stimuli, extension_stimuli) {
stimuli_combos = object_names.flatMap(d => exemplar_stimuli.map(v => extension_stimuli.map(t => [d, v, t])))
return stimuli_combos
}

//Identify a specific condition
function findCondition(stimuli_combos, condition) {
condition = parseInt(condition) - 1
stimuli = stimuli_combos[Math.floor(condition / 6)][condition % 6]
return stimuli
}

//Set stimuli condition based on CONDITION 
stimuli = findCondition(findCombos(object_names, exemplar_stimuli, extension_stimuli), CONDITION)

//Set the specific conditions
let exemplarName = stimuli[0];
let exemplarImg = stimuli[1]; 
let extensionLeftImg = stimuli[2].left_obj;
let extensionCenterImg = stimuli[2].center_obj;
let extensionRightImg = stimuli[2].right_obj;

//Preload the images
var intro_preload = {
  type: jsPsychPreload,
  images: exemplar_stimuli,
}

var test_preload = {
  type: jsPsychPreload,
  auto_preload: true,
}

//Build stimulus text in HTML
var intro_stimulus = 
`<p>This is a ${exemplarName}.</p> 
<img src="${exemplarImg}" height="300" width="300"></img>`

var test_stimulus = 
`<p>This is a ${exemplarName}.</p> 
<img src="${exemplarImg}" height="300" width="300"></img>
<p>One of these is also a ${exemplarName}.</p>`

var intro_trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: intro_stimulus,
  choices: "",
  trial_duration: 5000,
}; 

var test_trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: test_stimulus,
  prompt: `Which one is the other ${exemplarName}?`,
  button_html: '<img height="300" src="%choice%"></img>',
  choices: [
    extensionLeftImg,
    extensionCenterImg,
    extensionRightImg,
  ],
};

//Attention check questions 
var attention_check_1 = {
type: jsPsychSurveyText,
preamble: `<img src="${exemplarImg}" height="300" width="300"></img><img src="${extensionLeftImg}" height="300" width="300"></img>`,
questions: [
  {prompt: 'You just saw these two objects. What do they have in common?', rows: 3, required: true}
],
};

var attention_check_2 = {
type: jsPsychSurveyText,
preamble: `<img src="${extensionCenterImg}" height="300" width="300"></img><img src="${exemplarImg}" height="300" width="300"></img>`,
questions: [
  {prompt: 'You just saw these two objects. What do they have in common?', rows: 3, required: true}
],
};

var attention_check_3 = {
type: jsPsychSurveyText,
preamble: `<img src="${exemplarImg}" height="300" width="300"></img><img src="${extensionRightImg}" height="300" width="300"></img>`,
questions: [
  {prompt: 'You just saw these two objects. What do they have in common?', rows: 3, required: true}
],
};

//Demographic instructions
var instructions_2 = {
  type: jsPsychInstructions,
  pages: [
    'We are now going to ask you some questions about yourself. You are welcome to skip any questions that you are not comfortable answering.'
  ],
  show_clickable_nav: true
};

//Collect demographic information
var demographic_survey_age = {
type: jsPsychSurveyText,
questions: [
  {
    prompt: 'How old are you (in years)?',
    rows: 1, 
    required: false
  },
]
};

var demographic_survey_location = {
type: jsPsychSurveyMultiChoice,
questions: [
  {
    prompt: 'Were you born in the United States?', 
    name: 'BornUSA', 
    options: ['Yes', "No"], 
    required: false,
    horizontal: true
  }, 
  {
    prompt: 'Did you spend more than a year in the United States before age 10?', 
    name: 'ChildhoodUSA', 
    options: ['Yes', "No"], 
    required: false,
    horizontal: true
  }, 
  {
    prompt: 'Do you currently live in the United States?', 
    name: 'CurrentUSA', 
    options: ['Yes', "No"], 
    required: false,
    horizontal: true
  }, 
]
};

var demographic_survey_zipcode = {
type: jsPsychSurveyText,
questions: [
  {
    prompt: `<p>What are the first three characters or digits of your <b>current</b> zip code?`, 
    rows: 1, 
    required: false
  }, 
  {
    prompt: `What were the first three characters or digits of the zip code <b>for the place where you spent the most time in growing up</b>?`, 
    rows: 1, 
    required: false
  }, 
]
};

var demographic_survey_language = {
type: jsPsychSurveyText,
questions: [
  {
    prompt: 'What was the first language you learned?', 
    rows: 1, 
    required: false
  }, 
  {
    prompt: 'Please list all languages that you currently speak.', 
    rows: 2, 
    required: false
  }, 
]
};

var demographic_survey_current_urbanicity = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>How would you describe the location <b>where you currently live</b>?</p>`,
  require_movement: true,
  labels: ['Rural', 'Suburban', 'Urban']
}; 

var demographic_survey_childhood_urbanicity = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>How would you describe the location <b>where you grew up</b> (if multiple, choose the one that you spent the most time in before 18 years old)?</p>`,
  require_movement: true,
  labels: ['Rural', 'Suburban', 'Urban']
}; 

var thankyou = {
  type: jsPsychInstructions,
  pages: [
  `<p>You have completed the experiment. Thank you for your participation!</p> 
  <small>This experiment tests whether adults categorize objects by their shape (known as the "shape bias") more so than by color or material. We are also interested in testing if various demographic factors, including early environments, might influence the prevalence of the shape bias.
  <p>If you have questions about this research, please contact us at stanfordpsych251@gmail.com.</p></small>
  <b>Please submit your data by pressing "Next."</b>`
  ],
  show_clickable_nav: true,
}; 

//Add stuff to timeline

//Welcome screen
timeline.push(welcome); 

//Fullscreen mode 
timeline.push({
type: jsPsychFullscreen,
fullscreen_mode: true
});

//Instructions Part I
timeline.push(instructions_1); 

//Main experiment 
timeline.push(intro_preload);
timeline.push(intro_trial);
timeline.push(test_preload);
timeline.push(test_trial); 
timeline.push(attention_check_1, attention_check_2, attention_check_3);

//Instructions Part II
timeline.push(instructions_2); 

//Demographic information
timeline.push(demographic_survey_age, demographic_survey_location, demographic_survey_zipcode, demographic_survey_language, demographic_survey_current_urbanicity, demographic_survey_childhood_urbanicity);

//Debrief and thank you 
timeline.push(thankyou); 

//Have jspsych run the timeline
jspsych.run(timeline);