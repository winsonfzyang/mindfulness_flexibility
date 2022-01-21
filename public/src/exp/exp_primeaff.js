/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// TODO: instructions
const PRIMEAFF_CHOICES = ['g', 'h'];

// Set instructions helpers
let primeaff_ = {};

primeaff_.instructions =
    "<div class='switch_instr'>" +
    "<p>Press <b style='color:#ff0000;'>'G'</b> if the presented face is an <b style='color:#ff0000;'>angry</b> face. </p>" +
    "<p>Press <b style='color:#0077ff;'>'H'</b> if the presented face is a <b style='color:#0077ff;'>happy</b> face. </p>" +
    "<p>It is important that you respond as quickly and accurately as possible. </p>" +
    "<p>Press SPACEBAR to continue. </p>" +
    "</div>";

primeaff_.endpractice =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this practice." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";

primeaff_.endtask =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this task." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";


/* functions */

function stim_variable_aff(pic, type, word){
    let pic_path = '../img/affswitch/' + pic
    let stim = '';
    if(type === 'prime'){
        stim = '<div class="container">' +
            '<img class="affstim" src=' + pic_path + '>'+
            '</div>'
    }

    if(type === 'target'){
        stim = '<div class="container">' +
            '<img class="affstim" src=' + pic_path + '>'+
            '<div class="centered">'+ word + '</div>' +
            '</div>'
    }

    return stim
}

function primefactors(emostim, emotion, word, congruency, sex, reps) {
    if (emotion === 'angry') {correct_response = 'g'}
    if (emotion === 'happy') {correct_response = 'h'}
    factors = {
        pic: emostim,
        emotion: [emotion],
        word: [word],
        stimulus_type: [congruency],
        sex: [sex],
        correct_response: [correct_response]
    }
    full_design = jsPsych.randomization.factorial(factors, reps);
    return full_design
}

let factors_FAN_CON = primefactors(stim_female_an, 'angry', 'angry','congruent', 'female',1)
let factors_FAN_INCON = primefactors(stim_female_an, 'angry', 'happy','incongruent', 'female',1)
let factors_FHA_CON = primefactors(stim_female_ha, 'happy', 'happy','congruent', 'female',1)
let factors_FHA_INCON = primefactors(stim_female_ha, 'happy', 'angry','incongruent', 'female',1)
let factors_MAN_CON = primefactors(stim_male_an, 'angry', 'angry','congruent', 'male',1)
let factors_MAN_INCON = primefactors(stim_male_an, 'angry', 'happy','incongruent', 'male',1)
let factors_MHA_CON = primefactors(stim_male_ha, 'happy', 'happy','congruent', 'male',1)
let factors_MHA_INCON = primefactors(stim_male_ha, 'happy', 'angry','incongruent', 'male',1)


function createstim_prime(TYPE) {
    let NINCONGRTRIALS = [];
    let NCONGRTRIALS = [];
    let trials = [];
    if (TYPE === "exp"){NINCONGRTRIALS = NPRIMETRIALS*PERCENTINCONGR; NCONGRTRIALS = NPRIMETRIALS-NINCONGRTRIALS}
    if (TYPE === "practice"){NINCONGRTRIALS = NPRIMEPRACTRIALS*PERCENTINCONGR; NCONGRTRIALS = NPRIMEPRACTRIALS-NINCONGRTRIALS}

    let primeaff_incongrfactors = [
        ...jsPsych.randomization.sampleWithoutReplacement(factors_FAN_INCON, NINCONGRTRIALS/4),
        ...jsPsych.randomization.sampleWithoutReplacement(factors_FHA_INCON, NINCONGRTRIALS/4),
        ...jsPsych.randomization.sampleWithoutReplacement(factors_MAN_INCON, NINCONGRTRIALS/4),
        ...jsPsych.randomization.sampleWithoutReplacement(factors_MHA_INCON, NINCONGRTRIALS/4)
    ];

    let primeaff_congrfactors = [
        ...jsPsych.randomization.sampleWithReplacement(factors_FAN_CON, NCONGRTRIALS/4),
        ...jsPsych.randomization.sampleWithReplacement(factors_FHA_CON, NCONGRTRIALS/4),
        ...jsPsych.randomization.sampleWithReplacement(factors_MAN_CON, NCONGRTRIALS/4),
        ...jsPsych.randomization.sampleWithReplacement(factors_MHA_CON, NCONGRTRIALS/4)
    ]


    mystroopfactors = [...primeaff_congrfactors, ...primeaff_incongrfactors];

    mystroopfactors = jsPsych.randomization.sampleWithReplacement(mystroopfactors, mystroopfactors.length);

    trials = mystroopfactors.map(function(i) {
        return {
            stimulus: i.pic,
            data: {
                exp_id: 'primeaff',
                phase: TYPE,
                trial_id: 'stimulus',
                pic: i.pic,
                emotion: i.emotion,
                word: i.word,
                congruency: i.congruency,
                sex: i.sex,
                stimulus_type: i.stimulus_type,
                correct_response: i.correct_response
            },
        }
    });
    return trials
}

function createseq_prime(TYPE) {
    let seq_timeline = [];
    let primeaff_procedure = [];
    let primeaff_stim = createstim_prime(TYPE);

    // PRIME TRIAL
    let primeaff_prime = {
        on_start: function (trial) {
            // add phase=practice or trial
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            trialstimulus = stim_variable_aff(trialstimulus, 'prime')
            data = jsPsych.timelineVariable('data', true);
            trial.stimulus = trialstimulus;
            trial.data = {
                exp_id: data.exp_id,
                trial_id: 'prime',
                phase: data.phase,
                stimulus: trialstimulus,
                emotion: data.emotion,
                word: data.word,
                congruency: data.congruency,
                sex: data.sex,
            };
        },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: jsPsych.NO_KEYS,
        trial_duration: PRIME_DURATION, // milliseconds
        data: '',
    }

    // TARGET TRIAL
    let primeaff_target = {
        on_start: function (trial) {
            // add phase=practice or trial
            data = jsPsych.timelineVariable('data', true);
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            trialstimulus = stim_variable_aff(trialstimulus, 'target', data.word)

            trial.stimulus = trialstimulus;
            trial.data = {
                exp_id: data.exp_id,
                trial_id: data.trial_id,
                emotion: data.emotion,
                word: data.word,
                congruency: data.congruency,
                sex: data.sex,
                phase: data.phase,
                stimulus: trialstimulus,
                correct_response: data.correct_response,
            };
            trial.trial_duration = STIM_DURATION
        },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: PRIMEAFF_CHOICES,
        data: '',
        // trial_duration: SWITCH_STIM_DURATION,
        response_ends_trial: true,
        post_trial_gap: SWITCH_POSTTRIAL_DURATION,
        on_finish: function (data) {
            keyconvert = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
            if (keyconvert===data.correct_response) {
                data.accuracy = 1;
            } else {
                data.accuracy = 0;
            }
        }
    }

    // If TYPE is practice
    if (TYPE === 'practice') {seq_timeline = [primeaff_fixation, primeaff_prime, primeaff_mask, primeaff_target, feedback];}
    // If TYPE is exp
    if (TYPE === 'exp') {seq_timeline = [primeaff_fixation, primeaff_prime, primeaff_mask, primeaff_target];}

    primeaff_procedure = {
        timeline: seq_timeline,
        timeline_variables: primeaff_stim,
        randomize_order: false,
    };

    return primeaff_procedure
}

/* Instructions */
let primeaff_instr = {
    type: 'instructions',
    data: {
        exp_id: "primeaff",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        primeaff_.instructions
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let primeaff_postpractice_instr = {
    type: 'instructions',
    data: {
        exp_id: "primeaff",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        primeaff_.endpractice
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let primeaff_posttask_instr = {
    type: 'instructions',
    data: {
        exp_id: "primeaff",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        primeaff_.endtask
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
/* Fixation */
let primeaff_fixation = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'primeaff',
        trial_id: 'fixation',
        stimulus: "fixation"
    },
    stimulus: SWITCH_FIXATION,
    choices: jsPsych.NO_KEYS,
    trial_duration: SWITCH_FIXATION_DURATION, // milliseconds
};


/* feedback */
var feedback = {
    type: 'html-keyboard-response',
    data: {
        exp_id: "primeaff",
        trial_id: "feedback",
    },
    stimulus: function() {
        let check = JSON.parse(jsPsych.data.getLastTrialData().values()[0]["accuracy"]);
        if (check === 1) {
            return "<div class='cogswitch_feedback' style='color:#00ff00;'>Correct!</div>";
        } else {
            return "<div class='cogswitch_feedback' style='color:#ff0000;'>Incorrect!</div>";
        }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: SWITCH_FDBCK_DURATION,
};

// Create practice procedure
let primeaff_practice_block = [];
let primeaff_pract_procedure = createseq_prime('practice')
primeaff_practice_block.push(primeaff_instr);
primeaff_practice_block.push(primeaff_pract_procedure);
primeaff_practice_block.push(primeaff_postpractice_instr);

// Create task block procedure
let primeaff_exp_block = [];
let primeaff_procedure = createseq_prime('exp')
primeaff_exp_block.push(primeaff_instr);
primeaff_exp_block.push(primeaff_procedure);
primeaff_exp_block.push(primeaff_posttask_instr);


