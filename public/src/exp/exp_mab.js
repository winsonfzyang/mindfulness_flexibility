/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// =TODO: instructions

// Factors
let mab_factors_neutral = [
    {critical: 'neutral', congruency: '', probe_loc: 'left', correct_response: 'g'},
    {critical: 'neutral', congruency: '', probe_loc: 'left', correct_response: 'g'},
    {critical: 'neutral', congruency: '', probe_loc: 'right', correct_response: 'h'},
    {critical: 'neutral', congruency: '', probe_loc: 'right', correct_response: 'h'},
];

let mab_factors_critical = [

    {critical: 'critical', congruency: 'congruent', probe_loc: 'left', correct_response: 'g'},
    {critical: 'critical', congruency: 'incongruent', probe_loc: 'left', correct_response: 'g'},
    {critical: 'critical', congruency: 'congruent', probe_loc: 'right', correct_response: 'h'},
    {critical: 'critical', congruency: 'incongruent', probe_loc: 'right', correct_response: 'h'},
]


// Set instructions helpers
let mab_instructions = {};

mab_instructions.instructions =
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

mab_instructions.endpractice =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this practice." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";

mab_instructions.endtask =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this task." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";


/* functions */
function stim_variable_mab(pic1, pic2){

    return '<div class="mab_row">' +
        '  <div class="column1">' +
        '    <img src= "' + pic1 + '" style="width:100%">' +
        '  </div>' +
        '  <div class="column2">' +
        '  </div>' +
        '  <div class="column3">' +
        '    <img src= "' + pic2 + '" style="width:100%">' +
        '  </div>' +
        '</div>'
}

function probe_variable_mab(pic1, pic2){

    return '<div class="mab_row">' +
        '  <div class="column1">' +
        '    <img src= ' + pic1 +  ' style="width:100%">' +
        '  </div>' +
        '  <div class="column2">' +
        '  </div>' +
        '  <div class="column3">' +
        '    <img src= ' + pic2 + ' style="width:100%">' +
        '  </div>' +
        '</div>'
}

function createstim_mab(TYPE) {

    let factors_length = mab_factors_neutral.length + mab_factors_critical.length;

    let trials = [];
    let sets = [];

    // create stimuli set
    if (TYPE === 'practice'){sets = MAB_PRACTRIALS/factors_length;}
    if (TYPE === 'exp'){sets = MAB_EXPTRIALS/factors_length;}

    let mab_set_neutral = jsPsych.randomization.repeat(mab_factors_neutral, sets, false);
    let mab_set_critical = jsPsych.randomization.repeat(mab_factors_critical, sets, false);
    let mab_set_factors = [...mab_set_neutral, ...mab_set_critical];

    // create MAB idx
    let idx_mab_set_factors = [...Array(mab_set_factors.length).keys()];
    let n_mab_awareness = mab_set_factors.length * PERCENT_MAB;
    let idx_mab_awareness = idx_mab_set_factors.sort(() => Math.random() - Math.random()).slice(0, n_mab_awareness);
    idx_mab_awareness = idx_mab_awareness.sort();
    idx_mab_set_factors = idx_mab_set_factors.fill('no');
    for (let i = 0; i < idx_mab_awareness.length; i++) {idx_mab_set_factors[idx_mab_awareness[i]] = 'yes';}

    // Set stimuli for each
    // Congruent: probe occurs on emotional stimulus
    // Incongruent: probe occurs on neutral stimulus
    let set_neutral_stim0 = [];
    let set_negative_stim0 = [];
    for (let idx = 0; idx < mab_set_neutral.length*2/mab_neutral_stim.length; idx++) {
        set_neutral_stim0[idx] = jsPsych.randomization.sampleWithoutReplacement(mab_neutral_stim, mab_neutral_stim.length);
        set_negative_stim0[idx] = jsPsych.randomization.sampleWithoutReplacement(mab_negative_stim, mab_negative_stim.length);
    }

    set_neutral_stim0 = set_neutral_stim0.flat();
    set_negative_stim0 = set_negative_stim0.flat();

    let set_critical_stim = [];

    set_critical_stim[0] = jsPsych.randomization.sampleWithoutReplacement(set_neutral_stim0, mab_set_critical.length)
    set_critical_stim[1] = jsPsych.randomization.sampleWithoutReplacement(set_negative_stim0, mab_set_critical.length);

    let set_neutral_stim = [];
    while(set_neutral_stim0.length > 0) {
        set_neutral_stim.push(set_neutral_stim0.splice(0,2));
    }

    let neutral_counter = 0;
    let critical_counter = 0;

    for (let i = 0; i < mab_set_factors.length; i++) {
        if (mab_set_factors[i].critical === 'neutral'){
            mab_set_factors[i].pic1 = '../img/MAB/neutral/' + set_neutral_stim[neutral_counter][0];
            mab_set_factors[i].pic2 = '../img/MAB/neutral/' + set_neutral_stim[neutral_counter][1];
            neutral_counter += 1;
        }
        if (mab_set_factors[i].critical === 'critical'){
            if(mab_set_factors[i].congruency === 'congruent' && mab_set_factors[i].probe_loc === 'left'){
                mab_set_factors[i].pic1 = '../img/MAB/negative/' + set_critical_stim[1][critical_counter];
                mab_set_factors[i].pic2 = '../img/MAB/neutral/' + set_critical_stim[0][critical_counter];
                critical_counter += 1;
            }
            if(mab_set_factors[i].congruency === 'congruent' && mab_set_factors[i].probe_loc === 'right'){
                mab_set_factors[i].pic1 = '../img/MAB/neutral/' + set_critical_stim[0][critical_counter];
                mab_set_factors[i].pic2 = '../img/MAB/negative/' + set_critical_stim[1][critical_counter];
                critical_counter += 1;
            }

            if(mab_set_factors[i].congruency === 'incongruent' && mab_set_factors[i].probe_loc === 'left'){
                mab_set_factors[i].pic1 = '../img/MAB/neutral/' + set_critical_stim[0][critical_counter];
                mab_set_factors[i].pic2 = '../img/MAB/negative/' + set_critical_stim[1][critical_counter];
                critical_counter += 1;
            }
            if(mab_set_factors[i].congruency === 'incongruent' && mab_set_factors[i].probe_loc === 'right'){
                mab_set_factors[i].pic1 = '../img/MAB/negative/' + set_critical_stim[1][critical_counter];
                mab_set_factors[i].pic2 = '../img/MAB/neutral/' + set_critical_stim[0][critical_counter];
                critical_counter += 1;
            }
        }

        mab_set_factors[i].stimulus = stim_variable_mab(mab_set_factors[i].pic1, mab_set_factors[i].pic2);
        mab_set_factors[i].awareness = idx_mab_set_factors[i];
    }

    // Create trials
    trials = mab_set_factors.map(function(i) {
        return {
            stimulus: i.stimulus,
            data: {
                exp_id: 'mab',
                phase: TYPE,
                trial_id: 'pic',
                pic1: i.pic1,
                pic2: i.pic2,
                critical: i.critical,
                congruency: i.congruency,
                probe_loc: i.probe_loc,
                awareness: i.awareness,
                correct_response: i.correct_response
            },
        }
    });

    return trials
}

function createseq_mab(TYPE) {
    let seq_timeline = [];
    let mab_procedure = [];
    let mab_stim = createstim_mab(TYPE);
    mab_stim = jsPsych.randomization.repeat(mab_stim, 1);

    let mab_pic_trial = {
        on_start: function (trial) {
            // add phase=practice or trial
            let stimulus = jsPsych.timelineVariable('stimulus', true);

            let data = jsPsych.timelineVariable('data', true);
            trial.stimulus = stimulus;
            trial.data = {
                exp_id: data.exp_id,
                phase: data.phase,
                trial_id: data.trial_id,
                pic1: data.pic1,
                pic2: data.pic2,
                critical: data.critical,
                congruency: data.congruency,
                awareness: data.awareness,
                probe_loc: data.probe_loc,
                correct_response: data.correct_response,
            };
        },
        type: 'html-keyboard-response',
        stimulus: '',
        response_ends_trial: true,
        trial_duration: PICSTIM_DURATION,
    }

    let probe_trial = {
        on_start: function (trial) {
            // add phase=practice or trial

            let data = jsPsych.timelineVariable('data', true);
            if (data.probe_loc === 'left'){pic1 = "../img/MAB/probe.jpg"; pic2 = "../img/MAB/mab_black.jpg";}
            if (data.probe_loc === 'right'){pic1 = "../img/MAB/mab_black.jpg"; pic2 = "../img/MAB/probe.jpg";}
            trial.stimulus = probe_variable_mab(pic1, pic2);
            trial.data = {
                exp_id: data.exp_id,
                phase: data.phase,
                trial_id: 'probe',
                pic1: pic1,
                pic2: pic2,
                critical: data.critical,
                congruency: data.congruency,
                probe_loc: data.probe_loc,
                correct_response: data.correct_response,
            };
        },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: ['g', 'h'],
        response_ends_trial: true,
        trial_duration: PROBE_DURATION,
        on_finish: function (data) {
            keyconvert = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
            if (keyconvert===data.correct_response) {
                data.accuracy = 1;
            } else {
                data.accuracy = 0;
            }
        }
    }

    let awareness1_trial = {
        on_start: function (trial) {
            let data = jsPsych.timelineVariable('data', true);
            if (data.awareness === 'yes'){awareness_set = awareness_yes;}
            if (data.awareness === 'no'){awareness_set = awareness_no;}

            trial.stimulus = awareness_set.stimulus1;
            trial.data = {
                exp_id: data.exp_id,
                phase: data.phase,
                trial_id: 'awareness1',
                stimulus: 'awareness1',
                awareness: awareness_set.awareness,
                critical: data.critical,
                congruency: data.congruency,
                probe_loc: data.probe_loc,
                correct_response: data.correct_response,
            };
            trial.choices = awareness_set.choices1;
            trial.trial_duration = awareness_set.trial_duration;
            },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: '',
        response_ends_trial: true,
        trial_duration: '',
    }

    let awareness2_trial = {
        on_start: function (trial) {
            let data = jsPsych.timelineVariable('data', true);
            if (data.awareness === 'yes'){awareness_set = awareness_yes;}
            if (data.awareness === 'no'){awareness_set = awareness_no;}

            trial.stimulus = awareness_set.stimulus2;
            trial.data = {
                exp_id: data.exp_id,
                phase: data.phase,
                trial_id: 'awareness2',
                stimulus: 'awareness2',
                awareness: awareness_set.awareness,
                critical: data.critical,
                congruency: data.congruency,
                probe_loc: data.probe_loc,
                correct_response: data.correct_response,
            };
            trial.choices = awareness_set.choices2;
            trial.trial_duration = awareness_set.trial_duration;
        },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: '',
        response_ends_trial: true,
        trial_duration: '',
    }

    // If TYPE is practice
    if (TYPE === 'practice') {seq_timeline = [mab_fixation, mab_pic_trial, probe_trial, mab_feedback, awareness1_trial, awareness2_trial];}

    // If TYPE is exp
    if (TYPE === 'exp') {seq_timeline = [mab_fixation, mab_pic_trial, probe_trial, awareness1_trial, awareness2_trial];}

    mab_procedure = {
        timeline: seq_timeline,
        timeline_variables: mab_stim,
        randomize_order: false,
    };

    return mab_procedure
}

/* Instructions */
let mab_instr = {
    type: 'instructions',
    data: {
        exp_id: "mab",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        mab_instructions.instructions
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let mab_postpractice_instr = {
    type: 'instructions',
    data: {
        exp_id: "mab",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        mab_instructions.endpractice
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let mab_posttask_instr = {
    type: 'instructions',
    data: {
        exp_id: "mab",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        mab_instructions.endtask
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
/* Fixation */
let mab_fixation = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'mab',
        trial_id: 'fixation',
        stimulus: "fixation"
    },
    stimulus: SWITCH_FIXATION,
    choices: jsPsych.NO_KEYS,
    trial_duration: SWITCH_FIXATION_DURATION, // milliseconds
};

/* feedback */
var mab_feedback = {
    type: 'html-keyboard-response',
    data: {
        exp_id: "mab",
        trial_id: "feedback",
    },
    stimulus: function() {
        // let last_trial_set = jsPsych.data.getLastTimelineData().values();
        // last_trial_set = last_trial_set.slice(-5);
        // let check = last_trial_set[2].accuracy;
        check = JSON.parse(jsPsych.data.getLastTrialData().values()[0]["accuracy"]);
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
let mab_practice_block = [];
let mab_practice_procedure = createseq_mab('practice')
mab_practice_block.push(mab_instr);
mab_practice_block.push(mab_practice_procedure);
mab_practice_block.push(mab_postpractice_instr);

// Create task block procedure
let mab_exp_block = [];
let mab_procedure = createseq_mab('exp')
mab_exp_block.push(mab_instr);
mab_exp_block.push(mab_procedure);
mab_exp_block.push(mab_posttask_instr);


