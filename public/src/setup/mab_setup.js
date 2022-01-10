/* **************************************** */
/* Set up experiment procedure and timeline */
/* **************************************** */

// Set up Training Save functions
function close_mab_save() {
    $.ajax({
        type: "POST",
        url: "/exp1-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
    // jsPsych.data.displayData()
}

function finish_mab_save() {
    $.ajax({
        type: "POST",
        url: "/exp1-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
        .done(function() {
            window.location.href = "finish";
        })
        .fail(function() {
            alert("Problem occurred while writing data to Dropbox. " +
                "Data will be saved to your computer. " +
                "Please contact the experimenter regarding this issue!");
            var csv = jsPsych.data.get().csv();
            var filename = jsPsych.data.get().values()[0].ID_DATE + "_mab_" + jsPsych.data.get().values()[0].daynumber + ".csv";
            downloadCSV(csv, filename);
            window.location.href = "finish";
        });
    // jsPsych.data.displayData()
}

// define welcome message trial
let preload_images = [
    mab_negative_stim.map(i => '../img/MAB/negative/' + i),
    mab_neutral_stim.map(i => '../img/MAB/neutral/' + i),
    "../img/MAB/mab_black.jpg",
    "../img/MAB/mab_black.jpg",
];

var welcome_screen = {
    on_start: function(trial){
        jsPsych.data.addProperties({  // record the condition assignment in the jsPsych data
            ID: window.opener.partID,
            DATE: window.opener.MYDATE,
            ID_DATE: window.opener.ID_DATE,
        })
    },
    type: "html-button-response",
    data: {
        exp_id: "mab",
        trial_id: "welcome"
    },
    choices: ['Click here to continue'],
    on_trial_start: function() { setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)},
    stimulus: "Welcome to the experiment.",
};
welcome_block = [];
welcome_block.push(welcome_screen);

var welcome_screen_practice = {
    type: "html-button-response",
    data: {
        exp_id: "mab",
        trial_id: "welcome",
    },
    choices: ['Click here to continue'],
    on_trial_start: function() { setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)},
    stimulus: "Welcome to the experiment.",
};
welcome_block_practice = [];
welcome_block_practice.push(welcome_screen_practice);

var closing_screen = {
    type: "html-button-response",
    data: {
        exp_id: "mab",
        trial_id: "closing"
    },
    choices: ['Click here to continue'],
    on_trial_start: function() { setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)},
    stimulus: "The system may ask you to save the file. If so, please save the file and send it to us",
};
closing_block = [];
closing_block.push(closing_screen);

// Set up full screen mode
// bc_exp.push({type: 'fullscreen', fullscreen_mode: true}); /* enter fullscreen mode */
// bc_exp.push({type: 'fullscreen', fullscreen_mode: false }); /* exit fullscreen mode */

// For Experiment
function start_mab() {
    /* start the experiment */
    jsPsych.init({
        preload_images: preload_images,
        auto_preload: true,
        show_progress_bar: false,
        on_interaction_data_update: function(data) {
            trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...mab_exp_block,
            ...closing_block,
        ],

        /* on_close currently not working */
        on_close: function() {
            close_mab_save()
        },
        on_finish: function() {
            finish_mab_save()
            // jsPsych.data.displayData();
        }
    });
}

// For Training
function mab_practice() {
    /* start the experiment */
    jsPsych.init({
        preload_images: preload_images,
        auto_preload: true,
        show_progress_bar: false,
        timeline: [
            ...welcome_block_practice,
            ...mab_practice_block
        ],
    });
}