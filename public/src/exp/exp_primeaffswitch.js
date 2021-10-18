/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// =TODO: instructions


// Set instructions helpers
let primeaff_ = {};

primeaff_.instructions =
    "<div class='switch_instr'>" +
    "<p>If the picture is on the top, do the female/male discrimination task. " +
    "Press <b style='color:#ff0000;'>'F'</b> if the presented face is <b style='color:#ff0000;'>female</b>. " +
    "Press <b style='color:#0077ff;'>'J'</b> if the presented face is <b style='color:#0077ff;'>male</b>. </p>" +
    "<p>If the picture is on the bottom, do the angry/happy discrimination task. " +
    "Press <b style='color:#ff0000;'>'F'</b> if the presented face is <b style='color:#ff0000;'>happy</b>. " +
    "Press <b style='color:#0077ff;'>'J'</b> if the presented face is <b style='color:#0077ff;'>angry</b>. </p>" +
    "<p>It is important that you respond as quickly and accurately as possible. </p>" +
    "<p>Press SPACEBAR to continue. </p>" +
    "</div>";

primeaff_.endpractice =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this practice." +
    "<br>Press SPACEBAR to continue to the next practice.</p>" +
    "</div>";

primeaff_.endtask =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this task." +
    "<br>Press SPACEBAR to continue to the next task.</p>" +
    "</div>";


/* functions */

function stim_variable_aff(pic){
    let pic_path = '../img/affswitch/' + pic
    let stim = '<img class="affstim" src=' + pic_path + '>'
    return stim
}

function primefactors(emostim, emotion, word, conguency, sex, reps) {
    if (emotion === 'angry') {correct_response = 'f'}
    if (emotion === 'happy') {correct_response = 'j'}
    factors = {
        pic: emostim,
        word: [word],
        stimulus_type: [conguency],
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
let primeaff_congrfactors = factors_FAN_CON.concat(factors_FHA_CON, factors_MAN_CON, factors_MHA_CON);
let primeaff_incongrfactors = factors_FAN_INCON.concat(factors_FHA_INCON, factors_MAN_INCON, factors_MHA_INCON);
let primeaff_factors = {congruent: primeaff_congrfactors, incongruent: primeaff_incongrfactors}; //TODO: Equal happy/angry, male/female
let primeaff_practfactors = {congruent: primeaff_congrfactors.slice(1,17), incongruent: jsPsych.randomization.sampleWithoutReplacement(primeaff_incongrfactors, 4)};



function createstim_prime(factors, TYPE) {
    trials = [];
    if (TYPE === "exp"){type_primeaff_practfactors =  primeaff_factors;}
    if (TYPE === "practice"){type_primeaff_practfactors =  primeaff_practfactors;}

    NINCONGRUENTTRIALS = type_primeaff_practfactors.incongruent.length // gives 2
    TOTALN = NINCONGRUENTTRIALS/PERCENTINCONGR // should give 10
    NCONGRUENTTRIALS = TOTALN - NINCONGRUENTTRIALS // gives 8
    CONGRMULTIPLIER = NCONGRUENTTRIALS/type_primeaff_practfactors.congruent.length // should give 4
    stroop2_congruent = [];
    while(CONGRMULTIPLIER--){stroop2_congruent = stroop2_congruent.concat(type_primeaff_practfactors.congruent);}
    stroop2_incongruent = type_primeaff_practfactors.incongruent;
    mystroopfactors = [...stroop2_congruent, ...stroop2_incongruent];

    for (var i = 0; i < mystroopfactors.length; ++i) {
        trials[i] = {
            stimulus: mystroopfactors[i].pic,
            data: {
                exp_id: 'primeaff',
                phase: TYPE,
                trial_id: 'stimulus',
                pic: mystroopfactors[i].pic,
                word: mystroopfactors[i].word,
                stimulus_type: mystroopfactors[i].stimulus_type,
                correct_response: mystroopfactors[i].correct_response
            },
        }
    }
    return trials
}

function createseq_prime(factors, TYPE) {
    let seq_timeline = [];
    let primeaff_procedure = [];
    let primeaff_stim = createstim_prime(factors, TYPE);

    // PRIME TRIAL
    let primeaff_prime = {
        on_start: function (trial) {
            // add phase=practice or trial
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            trialstimulus = stim_variable_aff(trialstimulus)
            data = jsPsych.timelineVariable('data', true);
            trial.stimulus = trialstimulus;
            trial.data = {
                exp_id: data.exp_id,
                trial_id: 'prime',
                phase: data.phase,
                stimulus: trialstimulus,
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
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            trialstimulus = stim_variable_aff(trialstimulus)
            data = jsPsych.timelineVariable('data', true);
            trial.stimulus = trialstimulus;
            trial.data = {
                exp_id: data.exp_id,
                trial_id: data.trial_id,
                phase: data.phase,
                stimulus: trialstimulus,
                correct_response: data.correct_response,
            };
            trial.trial_duration = STIM_DURATION
        },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: ['f', 'j'],
        data: '',
        // trial_duration: SWITCH_STIM_DURATION,
        response_ends_trial: true,
        post_trial_gap: SWITCH_POSTTRIAL_DURATION,
        on_finish: function (data) {
            keyconvert = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
            if (data.condition === 'ambiguous') {data.correct_response = keyconvert}
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
    if (TYPE === 'exp') {seq_timeline = [primeaff_fixation, primeaff_target];}

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

/* Prime */

/* Target trial */
var TARGET = '<img class="affstim" src="../img/affswitch/F1_02HAS.JPG">'; //TODO: change to function

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
let primeaff_practice = [];
let primeaff_pract_procedure = createseq_prime(primeaff_factors, 'practice')

// primeaff_practice.push(primeaff_instr);
primeaff_practice.push(primeaff_pract_procedure);
// primeaff_practice.push(primeaff_postpractice_instr);

// Create task block procedure
let primeaff_block = [];
let primeaff_procedure = createseq_prime(primeaff_factors, 'exp')

primeaff_block.push(primeaff_instr);
primeaff_block.push(primeaff_procedure);
primeaff_block.push(primeaff_posttask_instr);


