/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// Constants
const STROOP_FIXATION_DURATION = 500; // 500
const STROOP_STIM_DURATION = 2000; // 2000
const STROOP_POSTTRIAL_DURATION = 500; // 500
const STROOP_FDBCK_DURATION = 1000; // 1000
const PERCENTINCONGR = 0.20; // 20%
const NPRACTTRIALS = 20; // 1 set = 10 trials
const NEXPTRIALS = 120; // 60 trials
const stroop_fixation_stim = "<div style='font-size: 72px'>+</div>";


// Set instructions helpers
var stroop_instrhelper = {};

stroop_instrhelper.page1 =
    "<div class='stroop_instr'>" +
    "<p>In this task you will see colored word appear one at a time. </p>" +
    "<p>Your task is to press the button corresponding to the <strong> ink color </strong> of the word. </p>" +
    "<p>If the word is colored <span class='color_red'>red</span>, press the <span class='color_red'>R</span> key." +
    "<br>If the word is colored <span class='color_blue'>blue</span>, press the <span class='color_blue'>B</span> key." +
    "<br>If the word is colored <span class='color_green'>green</span>, press the <span class='color_green'>G</span> key." +
    "<br>If the word is colored <span class='color_yellow'>yellow</span>, press the <span class='color_yellow'>Y</span> key.</p>" +
    "<p>It is important that you respond as quickly and accurately as possible. </p>" +
    "<p>We will start with some practice. Press <b>SPACEBAR</b> to start. </p>" +
    "</div>";


stroop_instrhelper.endpractice =
    "<div class='stroop_instr'>" +
    "<p>Great job and thank you for completing the practice block. We will now proceed to the experimental block.</p>" +
    "<p>This time, there will not be any feedback, so you will have to carry on until the task is finished." +
    "<p>The experiment will start once you press the button.</p>" +
    "</div>";

stroop_instrhelper.end_block =
    "<div class='stroop_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this test." +
    "<br>Please continue to the next block.</p>" +
    "</div>";

stroop_instrhelper.conditional =
    "<div class='WMT_instr'>" +
    "<p>Great job and thank you for completing the practice block.</p>" +
    "<p>Would you like to practice the task one more time?" +
    "<p>Press <b style='color:#677be9 !important;'>y</b> to practice again. Press <b style='color:#d72965 !important;'>n</b> to skip the practice.</p>" +
    "</div>";

stroop_instrhelper.posttest =
    "<div class='stroop_instr'>" +
    "<p>In this task you will see colored word appear one at a time. </p>" +
    "<p>Your task is to press the button corresponding to the <strong> ink color </strong> of the word. </p>" +
    "<p>If the word is colored <span class='color_red'>red</span>, press the <span class='color_red'>R</span> key." +
    "<br>If the word is colored <span class='color_blue'>blue</span>, press the <span class='color_blue'>B</span> key." +
    "<br>If the word is colored <span class='color_green'>green</span>, press the <span class='color_green'>G</span> key." +
    "<br>If the word is colored <span class='color_yellow'>yellow</span>, press the <span class='color_yellow'>Y</span> key.</p>" +
    "<p>It is important that you respond as quickly and accurately as possible. </p>" +
    "<p>The experiment will start once you press the button.</p>" +
    "</div>";


/* Instructions */
var stroop2_instr = {
    type: 'instructions',
    data: {
        exp_id: "stroop",
        trial_id: "instructions1"
    },
    pages: [
        // Page 1
        stroop_instrhelper.page1
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
var stroop_post_instr = {
    type: 'instructions',
    data: {
        exp_id: "stroop",
        trial_id: "instructions2"
    },
    pages: [
        // Page 1
        stroop_instrhelper.posttest
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
/* Fixation */
var stroop_fixation = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'stroop',
        trial_id: 'fixation',
        stimulus: "fixation"
    },
    stimulus: stroop_fixation_stim,
    choices: jsPsych.NO_KEYS,
    trial_duration: STROOP_FIXATION_DURATION, // milliseconds
};

/*  Stimuli */
var stroop2_congrfactors = [
    {color_class: 'color_red', word:'RED', color: '#ff0000', color2: 'red', stimulus_type: 'congruent', correct_response: 'r'},
    {color_class: 'color_yellow', word:'YELLOW', color: '#ffe908', color2: 'yellow', stimulus_type: 'congruent', correct_response: 'y'},
    {color_class: 'color_green', word:'GREEN', color: '#04ff2e', color2: 'green', stimulus_type: 'congruent', correct_response: 'g'},
    {color_class: 'color_blue', word:'BLUE', color: '#00caff', color2: 'blue', stimulus_type: 'congruent', correct_response: 'b'}
];
var stroop2_incongrfactors = [
    {color_class: 'color_red', word:'YELLOW', color: '#ff0000', color2: 'red', stimulus_type: 'incongruent', correct_response: 'r'},
    {color_class: 'color_red', word:'GREEN', color: '#ff0000', color2: 'red', stimulus_type: 'incongruent', correct_response: 'r'},
    {color_class: 'color_red', word:'BLUE', color: '#ff0000', color2: 'red', stimulus_type: 'incongruent', correct_response: 'r'},

    {color_class: 'color_yellow', word:'RED', color: '#ffe908', color2: 'yellow', stimulus_type: 'incongruent', correct_response: 'y'},
    {color_class: 'color_yellow', word:'GREEN', color: '#ffe908', color2: 'yellow', stimulus_type: 'incongruent', correct_response: 'y'},
    {color_class: 'color_yellow', word:'BLUE', color: '#ffe908', color2: 'yellow', stimulus_type: 'incongruent', correct_response: 'y'},

    {color_class: 'color_green', word:'RED', color: '#04ff2e', color2: 'green', stimulus_type: 'incongruent', correct_response: 'g'},
    {color_class: 'color_green', word:'YELLLOW', color: '#04ff2e', color2: 'green', stimulus_type: 'incongruent', correct_response: 'g'},
    {color_class: 'color_green', word:'BLUE', color: '#04ff2e', color2: 'green', stimulus_type: 'incongruent', correct_response: 'g'},

    {color_class: 'color_blue', word:'RED', color: '#00caff', color2: 'blue', stimulus_type: 'incongruent', correct_response: 'b'},
    {color_class: 'color_blue', word:'YELLLOW', color: '#00caff', color2: 'blue', stimulus_type: 'incongruent', correct_response: 'b'},
    {color_class: 'color_blue', word:'GREEN', color: '#00caff', color2: 'blue', stimulus_type: 'incongruent', correct_response: 'b'},
];
var stroop2_factors = {congruent: stroop2_congrfactors, incongruent: stroop2_incongrfactors};
var stroop2_practfactors = {congruent: stroop2_congrfactors, incongruent: jsPsych.randomization.sampleWithoutReplacement(stroop2_incongrfactors, 4)};

/* feedback */
var feedback = {
    type: 'html-keyboard-response',
    data: {
        exp_id: "stroop",
        trial_id: "feedback",
    },
    stimulus: function() {
        var check = JSON.parse(jsPsych.data.getLastTrialData().values()[0]["accuracy"]);
        if (check === 1) {
            return "<div class='stroop_feedback' style='color:#00ff00;'>Correct!</div>";
        } else {
            return "<div class='stroop_feedback' style='color:#ff0000;'>Incorrect!</div>";
        }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: STROOP_FDBCK_DURATION,
};

/* Transition */
var stroop_endpractice = {
    type: 'instructions',
    data: {
        exp_id: "stroop",
        trial_id: "endpractice"
    },
    pages: [
        // Page 1
        stroop_instrhelper.endpractice,
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};

// Function to create stimuli
function createstim(factors, BLOCK, TYPE) {
    trials = [];
    if (BLOCK === "stroop2"){
        NINCONGRUENTTRIALS = factors.incongruent.length // gives 12
        TOTALN = NINCONGRUENTTRIALS/PERCENTINCONGR // should give 60
        NCONGRUENTTRIALS = TOTALN - NINCONGRUENTTRIALS // gives 48
        CONGRMULTIPLIER = NCONGRUENTTRIALS/factors.congruent.length // should give 12
        stroop2_congruent = [];
        while(CONGRMULTIPLIER--){stroop2_congruent = stroop2_congruent.concat(factors.congruent);}
        stroop2_incongruent = factors.incongruent;
        mystroopfactors = [...stroop2_congruent, ...stroop2_incongruent];
    } else {
        mystroopfactors = factors;
    }

    for (var i = 0; i < mystroopfactors.length; ++i) {
        trials[i] = {
            stimulus: "<p class=" + mystroopfactors[i].color_class + " style='font-size:72px;'>" + mystroopfactors[i].word + "</p>",
            data: {
                exp_id: 'stroop',
                block: BLOCK,
                phase: TYPE,
                trial_id: 'stimulus',
                word: mystroopfactors[i].word,
                color: mystroopfactors[i].color2,
                stimulus_type: mystroopfactors[i].stimulus_type,
                correct_response: mystroopfactors[i].correct_response
            },
            trial_duration: STROOP_STIM_DURATION, // milliseconds
        }
    }

    return trials
}
function createseq(factors, BLOCK, TYPE) {
    stroop_procedure = [];
    stroop_stim = createstim(factors, BLOCK, TYPE)
    stroop_trial = {
        on_start: function(trial) {
            // add phase=practice or trial
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            data = jsPsych.timelineVariable('data', true);
            trial.stimulus = trialstimulus;
            trial.data = {
                exp_id: 'stroop',
                trial_id: 'stimulus',
                block: data.block,
                phase: data.phase,
                stimulus: trialstimulus,
                word: data.word,
                color: data.color,
                stimulus_type: data.stimulus_type,
                correct_response: data.correct_response,
            };
        },
        type: 'html-keyboard-response',
        choices: ['r', 'g', 'b', 'y'],
        stimulus: "",
        data: "",
        trial_duration: STROOP_STIM_DURATION,
        response_ends_trial: true,
        post_trial_gap: STROOP_POSTTRIAL_DURATION,
        on_finish: function (data) {
            keyconvert = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)

            if (keyconvert===data.correct_response) {
                data.accuracy = 1;
            } else {
                data.accuracy = 0;
            }
        }
    }

    if (TYPE === 'practice'){
        stroop_procedure = {
            timeline: [stroop_fixation, stroop_trial, feedback],
            timeline_variables: stroop_stim,
            randomize_order: true,
            repetitions: NPRACTTRIALS/stroop_stim.length
        };
    } else if (TYPE === 'exp') {
        stroop_procedure = {
            timeline: [stroop_fixation, stroop_trial],
            timeline_variables: stroop_stim,
            randomize_order: true,
            repetitions: NEXPTRIALS/stroop_stim.length
        };
    }
    return stroop_procedure
}

var stroop2_pract_procedure = createseq(stroop2_practfactors, 'stroop2', 'practice');
var stroop2_procedure = createseq(stroop2_factors, 'stroop2', 'exp')


// TODO: repeat practice if accuracy less than 50%
var stroop_prac_block = [];
stroop_prac_block.push(stroop2_instr);
stroop_prac_block.push(stroop2_pract_procedure);

var stroop_block = [];
stroop_block.push(stroop2_instr);
stroop_block.push(stroop2_pract_procedure);
stroop_block.push(stroop_endpractice);
stroop_block.push(stroop2_procedure);

// Transition and condition to practice again or proceeed to experiment
var pre_if_stroop = {
    type: 'html-keyboard-response',
    stimulus: stroop_instrhelper.conditional,
    choices: ['y', 'n']
}
var if_node_stroop = {
    timeline: [...stroop_prac_block, pre_if_stroop],
    loop_function: function(){
        check = jsPsych.data.getLastTrialData().values()[0];
        if(check.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('n')){
            return false; // skip repeat
        } else {
            return true;
        }
    }
};

var stroop_conditional_block = [];
stroop_conditional_block.push(if_node_stroop);
stroop_conditional_block.push(stroop_endpractice);


var stroop_post_block = [];
stroop_post_block.push(stroop_post_instr);
stroop_post_block.push(stroop2_procedure);
