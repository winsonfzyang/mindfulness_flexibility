/* ************************************ */
/* Define experimental variables */
/* ************************************ */

let emostim_angry = [
    "../img/emostroop/066ymaa.jpg", "../img/emostroop/066ymab.jpg",
    "../img/emostroop/116mmaa.jpg", "../img/emostroop/116mmab.jpg",
    "../img/emostroop/140yfaa.jpg", "../img/emostroop/140yfab.jpg",
    "../img/emostroop/168mfaa.jpg", "../img/emostroop/168mfab.jpg"]

let emostim_happy = [
    "../img/emostroop/066ymha.jpg", "../img/emostroop/066ymhb.jpg",
    "../img/emostroop/116mmha.jpg", "../img/emostroop/116mmhb.jpg",
    "../img/emostroop/140yfha.jpg", "../img/emostroop/140yfhb.jpg",
    "../img/emostroop/168mfha.jpg", "../img/emostroop/168mfhb.jpg"
]

// Set instructions helpers
let emostroop_instrhelper = {};

emostroop_instrhelper.page1 =
    "<div class='stroop_instr'>" +
    "<p>You will be shown a word and picture. The word and picture will either be angry or happy.</p><br>" +
    "<p>If the word is angry, press the f key.</p>" +
    "<p>If the word is happy, press the j key.</p><br>" +
    "<p>Press any button to begin. </p>" +
    "</div>";

emostroop_instrhelper.endpractice =
    "<div class='stroop_instr'>" +
    "<p>Great job and thank you for completing the practice block. We will now proceed to the experimental block.</p>" +
    "<p>This time, there will not be any feedback, so you will have to carry on until the task is finished." +
    "<p>The experiment will start once you press the button.</p>" +
    "</div>";

emostroop_instrhelper.end_block =
    "<div class='stroop_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this test." +
    "<br>Please continue to the next block.</p>" +
    "</div>";

emostroop_instrhelper.posttest =
    "<div class='stroop_instr'>" +
    "<p>You will be shown a word and picture. The word and picture will either be angry or happy.</p><br>" +
    "<p>If the word is angry, press the f key.</p>" +
    "<p>If the word is happy, press the j key.</p><br>" +
    "<p>Press any button to begin. </p>" +
    "<p>It is important that you respond as quickly and accurately as possible. </p>" +
    "<p>The experiment will start once you press the button.</p>" +
    "</div>";

/* Instructions */
let emostroop2_instr = {
    type: 'instructions',
    data: {
        exp_id: "emostroop",
        trial_id: "instructions2"
    },
    pages: [
        // Page 1
        emostroop_instrhelper.page1
    ],
    show_clickable_nav: true,
    show_page_number: true,
};

var emostroop_post_instr = {
    type: 'instructions',
    data: {
        exp_id: "emostroop",
        trial_id: "instructions2"
    },
    pages: [
        // Page 1
        emostroop_instrhelper.posttest
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};

/* Transition */
var emostroop_endpractice = {
    type: 'instructions',
    data: {
        exp_id: "emostroop",
        trial_id: "endpractice"
    },
    pages: [
        // Page 1
        emostroop_instrhelper.endpractice,
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};


/* Fixation */
let emostroop_fixation = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'emostroop',
        stimulus: "fixation"
    },
    stimulus: stroop_fixation_stim,
    choices: jsPsych.NO_KEYS,
    trial_duration: COGSWITCH_FIXATION_DURATION, // milliseconds
};


// Function to create stimuli
function createstim(factors, BLOCK, TYPE) {
    trials = [];
    if (BLOCK === "stroop2"){
        NINCONGRUENTTRIALS = emostroop2_factors.incongruent.length // gives 2
        TOTALN = NINCONGRUENTTRIALS/PERCENTINCONGR // should give 10
        NCONGRUENTTRIALS = TOTALN - NINCONGRUENTTRIALS // gives 8
        CONGRMULTIPLIER = NCONGRUENTTRIALS/emostroop2_factors.congruent.length // should give 4
        stroop2_congruent = [];
        while(CONGRMULTIPLIER--){stroop2_congruent = stroop2_congruent.concat(emostroop2_factors.congruent);}
        stroop2_incongruent = emostroop2_factors.incongruent;
        mystroopfactors = [...stroop2_congruent, ...stroop2_incongruent];
    } else {
        NINCONGRUENTTRIALS = emostroop2_practfactors.incongruent.length // gives 2
        TOTALN = NINCONGRUENTTRIALS/PERCENTINCONGR // should give 10
        NCONGRUENTTRIALS = TOTALN - NINCONGRUENTTRIALS // gives 8
        CONGRMULTIPLIER = NCONGRUENTTRIALS/emostroop2_practfactors.congruent.length // should give 4
        stroop2_congruent = [];
        while(CONGRMULTIPLIER--){stroop2_congruent = stroop2_congruent.concat(emostroop2_practfactors.congruent);}
        stroop2_incongruent = emostroop2_practfactors.incongruent;
        mystroopfactors = [...stroop2_congruent, ...stroop2_incongruent];

    }

    for (var i = 0; i < mystroopfactors.length; ++i) {
        trials[i] = {
            stimulus: mystroopfactors[i].pic,
            data: {
                exp_id: 'emostroop',
                block: BLOCK,
                phase: TYPE,
                trial_id: 'stimulus',
                pic: mystroopfactors[i].pic,
                word: mystroopfactors[i].word,
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

            data = jsPsych.timelineVariable('data', true);
            trialstimulus = data.pic;
            trialword = data.word;

            stim_img = "<img class='emostim' src=" + trialstimulus + ">";
            stim_word = "<div class='emostimword'>"+ trialword + "</div>";
            trial_stim = "<div class='emostimcontainer'>" + stim_img + stim_word + "</div>";

            trial.stimulus = trial_stim;
            trial.data = {
                exp_id: 'emostroop',
                block: data.block,
                phase: data.phase,
                stimulus: trialstimulus,
                pic: data.pic,
                word: data.word,
                stimulus_type: data.stimulus_type,
                correct_response: data.correct_response,
            };
        },
        type: 'html-keyboard-response',
        choices: ['F', 'J'],
        stimulus: '',
        data: '',
        trial_duration: STROOP_STIM_DURATION,
        response_ends_trial: true,
        post_trial_gap: COGSWITCH_POSTTRIAL_DURATION,
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
            timeline: [emostroop_fixation, stroop_trial, feedback],
            timeline_variables: stroop_stim,
            randomize_order: true,
            repetitions: NPRACTTRIALS/stroop_stim.length
        };
    }

    if (TYPE === 'exp') {
        stroop_procedure = {
            timeline: [emostroop_fixation, stroop_trial],
            timeline_variables: stroop_stim,
            randomize_order: true,
            repetitions: NEXPTRIALS/stroop_stim.length
        };
    }
    return stroop_procedure
}

let emostroop2_procedure = createseq(emostroop2_factors, 'stroop2', 'exp')
let emostroop2_pract_procedure = createseq(emostroop2_practfactors, 'practice', 'practice');

// TODO: repeat practice if accuracy less than 50%
let emostroop_block = [];
emostroop_block.push(emostroop2_instr);
emostroop_block.push(emostroop2_pract_procedure);
emostroop_block.push(emostroop_endpractice);
emostroop_block.push(emostroop_post_instr);
emostroop_block.push(emostroop2_procedure);
