/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// =TODO: instructions

// Stimuli
var affswitch_factors = [
    {condition: 'gender'},
    {condition: 'emotion'},
];

const AFFSWITCH_CHOICES = ['g', 'h', 'b', 'n'];

aff_factors = [MAN, FAN, MHA, FHA];

// Set instructions helpers
let affswitch_instructions = {};

affswitch_instructions.instructions =
    "<div class='switch_instr'>" +
    "<p>If the picture is on the top, do the female/male discrimination task. " +
    "Press <b style='color:#ff0000;'>'G'</b> if the presented face is <b style='color:#ff0000;'>female</b>. " +
    "Press <b style='color:#0077ff;'>'H'</b> if the presented face is <b style='color:#0077ff;'>male</b>. </p>" +
    "<p>If the picture is on the bottom, do the angry/happy discrimination task. " +
    "Press <b style='color:#ff0000;'>'B'</b> if the presented face is <b style='color:#ff0000;'>happy</b>. " +
    "Press <b style='color:#0077ff;'>'N'</b> if the presented face is <b style='color:#0077ff;'>angry</b>. </p>" +
    "<p>It is important that you respond as quickly and accurately as possible. </p>" +
    "<p>Press SPACEBAR to continue. </p>" +
    "</div>";

affswitch_instructions.endpractice =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this practice." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";

affswitch_instructions.endtask =
    "<div class='switch_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this task." +
    "<br>Press SPACEBAR to continue.</p>" +
    "</div>";

/* functions */
function stim_variable_aff(pic1, pic2){

    pic1_path = '../img/affswitch/' + pic1
    pic2_path = '../img/affswitch/' + pic2

    if(pic1 === ''){pic1_path = '../img/black_stim.jpg'}
    if(pic2 === ''){pic2_path = '../img/black_stim.jpg'}

    stim = '\n' +
        '<div class="outer-container">' +
        '   <img class="affstim" src=' + pic1_path + '>' +
        '   <div class="middle_fix">' + AFF_SWITCH_FIX + '</div>' +
        '   <img class="affstim" src='+ pic2_path + '>' +
        '</div>'
    return stim
}

function create_combiset(uniq_comb, N_SWITCHES) {
    let arrays = [];
    let indices = [];
    let idx = uniq_comb.indexOf('break');
    while (idx != -1) {
        indices.push(idx);
        idx = uniq_comb.indexOf('break', idx + 1);
    }

    let index_start = [];
    let index_end = [];
    for (let i = 0; i < indices.length-1; ++i) {
        index_start = indices[i]+1; // start
        index_end = indices[i+1]; // end
        arrays[i] = uniq_comb.slice(index_start, index_end);
    }
    let arrays_new = []
    let counter = 0
    for (i = 0; i < arrays.length; ++i) {
        if (arrays[i][0].length === N_SWITCHES+1) { // ERROR HERE
            arrays_new[counter] = jsPsych.randomization.shuffle(arrays[i][0]);
            counter += 1;
        }
    }
    return arrays_new
}

function trial_distribute(trials, condition){
    let n_repeats = ~~(trials.reduce((a, b) => a + b, 0)/4);
    let n_to_add = trials.reduce((a, b) => a + b, 0) % 4;

    let stim_set = [Array(n_repeats).fill(aff_factors).flat(), jsPsych.randomization.sampleWithoutReplacement(aff_factors, n_to_add)];
    stim_set = stim_set.flat();
    stim_set = jsPsych.randomization.shuffle(stim_set);

    stim_set = stim_set.map(v => ({...v, condition: condition}))

    let counter = 0
    let arr = [];
    for (var i = 0; i < trials.length; ++i) {
        let index_start = counter;
        let index_end = counter+trials[i];
        counter += trials[i];

        arr[i] = stim_set.slice(index_start, index_end)

    }
    return arr
}

function createstim_aff(factors, TYPE) {
    let trials = [];
    let N_SWITCHES = [];
    let sets = [];

    // if TYPE === 'practice': 40 trials for practice
    if (TYPE === 'practice'){
        sets = NPRACTTRIALS_AFF*PERCENTCRIT;
        n_set_repeats = NPRACTTRIALS_AFF/factors.length;
        N_SWITCHES = NPRACTTRIALS_AFF*PERCENTCRIT;
    }
    // if TYPE === 'exp': 240 trials
    if (TYPE === 'exp'){
        sets = NEXPTRIALS_AFF*PERCENTCRIT;
        n_set_repeats = NEXPTRIALS_AFF/factors.length;
        N_SWITCHES = NEXPTRIALS_AFF*PERCENTCRIT;
    }

    // create combination sets
    uniq_comb = [];
    if (TYPE === 'practice'){uniq_comb = combinationSum(n_follow_trials, NPRACTTRIALS_AFF)}
    if (TYPE === 'exp'){uniq_comb = combinationSum(n_follow_trials, NEXPTRIALS_AFF)}
    uniq_comb = ['break'].concat(uniq_comb)


    let arrays_new = create_combiset(uniq_comb, sets)
    if (TYPE === 'exp'){arrays_new = Array(6).fill(arrays_new).flat()}
    arrays_new = jsPsych.randomization.sampleWithoutReplacement(arrays_new, N_SWITCHES/sets)
    // create stimuli set
    // let n_reps = N_SWITCHES/affswitch_factors.length;
    // let affswitch_stim_set = [Array(n_reps).fill(affswitch_factors).flat(), affswitch_factors[0]];
    // affswitch_stim_set = affswitch_stim_set.flat();

    let participant_arrays_new = arrays_new.flat();
    participant_arrays_new = jsPsych.randomization.shuffle(participant_arrays_new);

    // Create equal distribution of trials
    let gender_trials = participant_arrays_new.filter(function(element, index, array) {
        return (index % 2 === 0);
    });
    let affect_trials = participant_arrays_new.filter(function(element, index, array) {
        return (index % 2 === 1);
    });

   let gender_dist_trials = trial_distribute(gender_trials,'gender');
   let affect_dist_trials = trial_distribute(affect_trials, 'affect');

   let complete_arr = [];

   for (i = 0; i < affect_dist_trials.length; ++i){
       complete_arr.push(gender_dist_trials[i]);
       complete_arr.push(affect_dist_trials[i]);
       if (i === affect_dist_trials.length-1){
           if (gender_dist_trials.length>affect_dist_trials.length){complete_arr.push(gender_dist_trials[affect_dist_trials.length]);}
       }
    }
   complete_arr = complete_arr.flat();

   let correct_response = '';
   let stim_group = [];
    // Create trials
    for (var i = 0; i < complete_arr.length; ++i) {

        if (complete_arr[i].gender === 'F' & complete_arr[i].emotion === 'happy') {stim_group = stim_female_ha;}
        if (complete_arr[i].gender === 'F' & complete_arr[i].emotion === 'angry') {stim_group = stim_female_an;}
        if (complete_arr[i].gender === 'M' & complete_arr[i].emotion === 'happy') {stim_group = stim_male_ha;}
        if (complete_arr[i].gender === 'M' & complete_arr[i].emotion === 'angry') {stim_group = stim_male_an;}


        // if condition is gender
        if (complete_arr[i].condition === 'gender') {
            if (complete_arr[i].gender === 'F') {correct_response ='g'}
            if (complete_arr[i].gender === 'M') {correct_response ='h'}

            pic1 = jsPsych.randomization.sampleWithoutReplacement(stim_group, 1); // Stimuli picture
            pic2 = '';
        }

        // if condition is affect
        if (complete_arr[i].condition === "affect") {
            if (complete_arr[i].emotion === 'happy') {correct_response ='b'}
            if (complete_arr[i].emotion === 'angry') {correct_response ='n'}

            pic1 = ''
            pic2 =  jsPsych.randomization.sampleWithoutReplacement(stim_group, 1); // Stimuli picture
        }

        // Create trial i
        trials[i] = {
            stimulus: stim_variable_aff(pic1, pic2),
            data: {
                exp_id: 'affswitch',
                condition: complete_arr[i].condition,
                phase: TYPE,
                trial_id: 'stimulus',
                correct_response: correct_response,
            },
            trial_duration: SWITCH_STIM_DURATION, // milliseconds
        }
    }

    return trials
}
function createseq_aff(factors, TYPE) {
    let seq_timeline = [];
    let affswitch_procedure = [];
    let affswitch_stim = createstim_aff(factors, TYPE);

    let affswitch_trial = {
        on_start: function (trial) {
            // add phase=practice or trial
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            trial_duration = jsPsych.timelineVariable('trial_duration', true);
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
            trial.trial_duration = trial_duration
        },
        type: 'html-keyboard-response',
        stimulus: '',
        choices: AFFSWITCH_CHOICES,
        data: '',
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
    if (TYPE === 'practice') {seq_timeline = [affswitch_fixation, affswitch_trial, affswitch_feedback];}

    // If TYPE is exp
    if (TYPE === 'exp') {seq_timeline = [affswitch_fixation, affswitch_trial];}

    affswitch_procedure = {
        timeline: seq_timeline,
        timeline_variables: affswitch_stim,
        randomize_order: false,
    };

    return affswitch_procedure
}

/* Instructions */
let affswitch_instr = {
    type: 'instructions',
    data: {
        exp_id: "affswitch",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        affswitch_instructions.instructions
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let affswitch_postpractice_instr = {
    type: 'instructions',
    data: {
        exp_id: "affswitch",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        affswitch_instructions.endpractice
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
let affswitch_posttask_instr = {
    type: 'instructions',
    data: {
        exp_id: "affswitch",
        trial_id: "instructions"
    },
    pages: [
        // Page 1
        affswitch_instructions.endtask
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};
/* Fixation */
var affswitch_fixation = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'affswitch',
        trial_id: 'fixation',
        stimulus: "fixation"
    },
    stimulus: SWITCH_FIXATION,
    choices: jsPsych.NO_KEYS,
    trial_duration: SWITCH_FIXATION_DURATION, // milliseconds
};
/* feedback */
var affswitch_feedback = {
    type: 'html-keyboard-response',
    data: {
        exp_id: "affswitch",
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
var affswitch_practice_block = [];
var affswitch_pract_procedure = createseq_aff(affswitch_factors, 'practice')
affswitch_practice_block.push(affswitch_instr);
affswitch_practice_block.push(affswitch_pract_procedure);
affswitch_practice_block.push(affswitch_postpractice_instr);

// Create task block procedure
var affswitch_exp_block = [];
var affswitch_procedure = createseq_aff(affswitch_factors, 'exp')
affswitch_exp_block.push(affswitch_instr);
affswitch_exp_block.push(affswitch_procedure);
affswitch_exp_block.push(affswitch_posttask_instr);


