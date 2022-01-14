/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// TODO: set up ID_DATE

// Stimuli
var top_range = range(0, 83);
var bottom_range = range(168, 250);
var middle_range = range(108, 112); middle_range = arrayRemove(middle_range, 110);

var cogswitch_stimuli = [1, 2, 3, 4, 6, 7, 8, 9];
// var combi_set_234 = [[2, 4, 4],[4, 2, 4], [4, 4, 2], [3, 3, 4], [3, 4, 3], [4, 3, 3]];
// var combi_set_345 = [[2, 3, 5], [2, 5, 3], [3, 2, 5], [3, 5, 2], [5, 2, 3], [5, 3, 2]];
// var combi_set = combi_set_234.concat(combi_set_345);
combi_set = Array(10).fill([[2, 2, 3], [2, 3, 2], [3, 2, 2]]).flat();

var cogswitch_factors_follow = [{condition: 'follow', dot: 'none'}];
var cogswitch_factors_crit = [
    {condition: 'distract', dot: 'top', button: 'f'},
    {condition: 'distract', dot: 'top', button: 'j'},
    {condition: 'switch', dot: 'bottom', button: 'd'},
    {condition: 'switch', dot: 'bottom', button: 'k'},
    {condition: 'distract', dot: 'top', button: 'f'},
    {condition: 'distract', dot: 'top', button: 'j'},
    {condition: 'switch', dot: 'bottom', button: 'd'},
    {condition: 'switch', dot: 'bottom', button: 'k'},
    {condition: 'ambiguous', dot: 'middle', button: 'f'},
    {condition: 'ambiguous', dot: 'middle', button: 'j'},
    {condition: 'ambiguous', dot: 'middle', button: 'd'},
    {condition: 'ambiguous', dot: 'middle', button: 'k'}
];

var cogswitch_factors = {follow: jsPsych.randomization.repeat(cogswitch_factors_follow, cogswitch_factors_crit.length/PERCENTCRIT), critical: cogswitch_factors_crit};

// Set instructions helpers
let cogswitch_instructions = {};

cogswitch_instructions.instructions_baseline =
    "<div class='switch_instr'>" +
    "<p>If the circle is on the top, do the odd/even task. Press <b style='color:#ff0000;'>'G'</b> if the number is an <b style='color:#ff0000;'>odd number</b>. " +
    "Press <b style='color:#0077ff;'>'H'</b> if the number is an <b style='color:#0077ff;'>even number</b>. </p>" +
    "</div>";

cogswitch_instructions.instructions_switch =
    "<div class='switch_instr'>" +
    "<p>If the circle is on the bottom, do the less/greater than 5 task. Press <b style='color:#ff0000;'>'B'</b> if the number is an <b style='color:#ff0000;'>less than 5</b>. " +
    "Press <b style='color:#0077ff;'>'N'</b> if the number is an <b style='color:#0077ff;'>more than 5</b>. </p>" +
    "</div>";

cogswitch_instructions.instructions_ambiguous =
    "<div class='switch_instr'>" +
    "<p>If the circle is in the middle, you can decide if you want to perform th top or bottom task. " +
    "If you decide to perform the top task (odd/even), press <b style='color:#ff0000;'>'G'</b> if the number is <b style='color:#ff0000;'>odd</b> and " +
    "press <b style='color:#0077ff;'>'H'</b> if the number is <b style='color:#0077ff;'>even</b>. </p>" +
    "If you decide to perform the bottom task (less/greater than 5), press <b style='color:#ff0000;'>'B'</b> if the number is <b style='color:#ff0000;'>less than 5</b> and " +
    "press <b style='color:#0077ff;'>'N'</b> if the number is <b style='color:#0077ff;'>more than 5</b>. </p>" +
    "<p>It is important that you respond as quickly and accurately as possible. </p>" +
    "<p>Press SPACEBAR to continue. </p>" +
    "</div>";


cogswitch_instructions.endpractice =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this practice." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";

cogswitch_instructions.endtask =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this task." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";

/* functions */
function stim_variable_cogswitch(num1, num2, dotpos){
    dotpos_html = "<div class='circle' style='margin-top:"+ dotpos + "px'></div>"

    let stim = '\n' +
        '<div class="outer-container">' +
        '   <div class="top-section"><div class="bottom-aligner"></div>' + num1 + '</div>' +
        '   <div class="middle-section">' + dotpos_html + '</div>' +
        '   <div class="bottom-section">' + num2 + '</div>' +
        '</div>'
    return stim
}
function createstim_cogswitch(factors, TYPE) {
    let trials = [];
    let NCRITTRIALS = factors.critical.length // should give 12
    let TOTALN = NCRITTRIALS/PERCENTCRIT  // should give 40
    let cogswitch_critical = factors.critical;

    let stim_combi_set = [];
    let stim_crit_set = [];
    // if TYPE === 'practice': 10 choose 1 combi
    if (TYPE === 'practice'){n_set_repeats = NCRITTRIALS/3*NPRACTTRIALS/TOTALN;}
    // if TYPE === 'exp': 10 choose 10 combi
    if (TYPE === 'exp'){n_set_repeats = NCRITTRIALS/3*NEXPTRIALS/TOTALN;}
    TOTAL_TRIALS = n_set_repeats*10

    crit_reps = PERCENTCRIT*TOTAL_TRIALS/NCRITTRIALS;
    combi_reps = Math.ceil((1-PERCENTCRIT)*TOTAL_TRIALS/10);
    stim_combi_set = jsPsych.randomization.sampleWithoutReplacement(combi_set, combi_reps);
    stim_combi_set = stim_combi_set.flat();
    stim_crit_set = jsPsych.randomization.repeat(cogswitch_critical, crit_reps);
    stim_crit_set = stim_crit_set.flat();
    // create combination sets
    let mycogswitchfactors = [];

    for (i = 0; i < stim_combi_set.length; ++i) {
        let i_follow = jsPsych.randomization.repeat(cogswitch_factors_follow, stim_combi_set[i]);
        let i_crit = stim_crit_set[i];
        let i_cogswitchfactors = [...i_follow, i_crit];
        mycogswitchfactors = mycogswitchfactors.concat(i_cogswitchfactors);
    }

    // create stimuli set
    n_reps = ~~(mycogswitchfactors.length/cogswitch_stimuli.length);
    to_add = mycogswitchfactors.length % cogswitch_stimuli.length;
    cogswitch_stim_set = [Array(n_reps).fill(cogswitch_stimuli).flat(), jsPsych.randomization.sampleWithReplacement(cogswitch_stimuli, to_add)];
    cogswitch_stim_set = cogswitch_stim_set.flat();
    cogswitch_stim_set = jsPsych.randomization.sampleWithoutReplacement(cogswitch_stim_set, cogswitch_stim_set.length);

    let correct_response = '';
    let button = ''
    // Create trials
    for (i = 0; i < mycogswitchfactors.length; ++i) {

        button = mycogswitchfactors[i].button;
        num1 = cogswitch_stim_set[i];
        // if condition is follow
        if (mycogswitchfactors[i].condition === "follow") {
            num2 = '';
            dotpos = jsPsych.randomization.sampleWithoutReplacement(top_range, 1);
            if (num1 % 2 == 0) {correct_response = 'h'} else {correct_response = 'g'}
        }

        // if condition is distract
        if (mycogswitchfactors[i].condition === "distract") {
            if (button === 'g') {num2 = jsPsych.randomization.sampleWithoutReplacement([2, 4, 6, 8], 1);} // CORRECT RESPONSE IS ODD, BOTTOM SHOULD BE EVEN
            if (button === 'h') {num2 = jsPsych.randomization.sampleWithoutReplacement([1, 3, 7, 9], 1);} // CORRECT RESPONSE IS EVEN, BOTTOM SHOULD BE ODD
            dotpos = jsPsych.randomization.sampleWithoutReplacement(top_range, 1);
            if (num1 % 2 == 0) {correct_response = 'h'} else {correct_response = 'g'}
        }

        // if condition is switch
        if (mycogswitchfactors[i].condition === "switch") {
            if (button === 'b') {num2 = jsPsych.randomization.sampleWithoutReplacement([1, 2, 3, 4], 1);} // CORRECT RESPONSE IS <5, BOTTOM SHOULD BE >5
            if (button === 'n') {num2 = jsPsych.randomization.sampleWithoutReplacement([6, 7, 8, 9], 1);} // CORRECT RESPONSE IS >5, BOTTOM SHOULD BE <5
            dotpos = jsPsych.randomization.sampleWithoutReplacement(bottom_range, 1);
            if (num2 > 5) {correct_response = 'n'} else {correct_response = 'b'}
        }

        // if condition is ambiguous
        if (mycogswitchfactors[i].condition === "ambiguous") {
            if (button === 'g') {num2 = jsPsych.randomization.sampleWithoutReplacement([2, 4, 6, 8], 1);} // CORRECT RESPONSE IS ODD, BOTTOM SHOULD BE EVEN
            if (button === 'h') {num2 = jsPsych.randomization.sampleWithoutReplacement([1, 3, 7, 9], 1);} // CORRECT RESPONSE IS EVEN, BOTTOM SHOULD BE ODD
            if (button === 'b') {num2 = jsPsych.randomization.sampleWithoutReplacement([1, 2, 3, 4], 1);} // CORRECT RESPONSE IS <5, BOTTOM SHOULD BE >5
            if (button === 'n') {num2 = jsPsych.randomization.sampleWithoutReplacement([6, 7, 8, 9], 1);} // CORRECT RESPONSE IS >5, BOTTOM SHOULD BE <5
            dotpos = jsPsych.randomization.sampleWithoutReplacement(middle_range, 1);
            if (num1 % 2 == 0) {correct_response1 = 'h'} else {correct_response1 = 'g'}
            if (num2 > 5) {correct_response2 = 'n'} else {correct_response2 = 'b'}
            correct_response = [correct_response1 , correct_response2];
        }

        // Create trial i

        trials[i] = {
            stimulus: stim_variable_cogswitch(num1, num2, dotpos),
            data: {
                exp_id: 'cogswitch',
                condition: mycogswitchfactors[i].condition,
                phase: TYPE,
                trial_id: 'stimulus',
                correct_response: correct_response,
            },
            trial_duration: SWITCH_STIM_DURATION, // milliseconds
        }

    }


    return trials
}
function createseq_cogswitch(factors, TYPE) {
    let seq_timeline = [];
    let cogswitch_procedure = [];
    let cogswitch_stim = createstim_cogswitch(factors, TYPE);

    let cogswitch_trial = {
        on_start: function (trial) {
            // add phase=practice or trial
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            data = jsPsych.timelineVariable('data', true);

            trial.stimulus = trialstimulus;
            trial.data = {
                exp_id: data.exp_id,
                condition: data.condition,
                trial_id: data.trial_id,
                phase: data.phase,
                stimulus: trialstimulus,
                correct_response: data.correct_response,
            };
        },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: ['g', 'h', 'b', 'n'],
        data: '',
        trial_duration: SWITCH_STIM_DURATION,
        response_ends_trial: true,
        post_trial_gap: SWITCH_POSTTRIAL_DURATION,
        on_finish: function (data) {
            keyconvert = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
            // if (data.condition === 'ambiguous') {data.correct_response = keyconvert}
            if (data.correct_response.indexOf(keyconvert) >= 0) {
                data.accuracy = 1;
            } else {
                data.accuracy = 0;
            }
        }
    }

    // If TYPE is practice
    if (TYPE === 'practice') {seq_timeline = [cogswitch_fixation, cogswitch_trial, feedback];}

    // If TYPE is exp
    if (TYPE === 'exp') {seq_timeline = [cogswitch_fixation, cogswitch_trial];}

    cogswitch_procedure = {
        timeline: seq_timeline,
        timeline_variables: cogswitch_stim,
        randomize_order: false,
    };

    return cogswitch_procedure
}

/* Instructions */

let cogswitch_instr = {
    type: 'instructions',
    data: {
        exp_id: "cogswitch",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        cogswitch_instructions.instructions_baseline,
        cogswitch_instructions.instructions_switch,
        cogswitch_instructions.instructions_ambiguous,
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let cogswitch_postpractice_instr = {
    type: 'instructions',
    data: {
        exp_id: "cogswitch",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        cogswitch_instructions.endpractice
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let cogswitch_posttask_instr = {
    type: 'instructions',
    data: {
        exp_id: "cogswitch",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        cogswitch_instructions.endtask
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
/* Fixation */
var cogswitch_fixation = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'cogswitch',
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
        exp_id: "cogswitch",
        trial_id: "feedback",
    },
    stimulus: function() {
        var check = JSON.parse(jsPsych.data.getLastTrialData().values()[0]["accuracy"]);
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
var cogswitch_practice_block = [];
var cogswitch_pract_procedure = createseq_cogswitch(cogswitch_factors, 'practice')
cogswitch_practice_block.push(cogswitch_instr);
cogswitch_practice_block.push(cogswitch_pract_procedure);
cogswitch_practice_block.push(cogswitch_postpractice_instr);

// Create task block procedure
var cogswitch_exp_block = [];
var cogswitch_procedure = createseq_cogswitch(cogswitch_factors, 'exp')
cogswitch_exp_block.push(cogswitch_instr);
cogswitch_exp_block.push(cogswitch_procedure);
cogswitch_exp_block.push(cogswitch_posttask_instr);


