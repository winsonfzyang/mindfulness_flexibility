/* **************************************** */
/* Set up experiment procedure and timeline */
/* **************************************** */

// Set up Training Save functions
function CloseExp1Save() {
    $.ajax({
        type: "POST",
        url: "/exp1-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
    // jsPsych.data.displayData()
}

function FinishExp1Save() {
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
            var filename = jsPsych.data.get().values()[0].ID_DATE + "_day_" + jsPsych.data.get().values()[0].daynumber + ".csv";
            downloadCSV(csv, filename);
            window.location.href = "finish";
        });
    // jsPsych.data.displayData()
}



// define welcome message trial
var welcome_screen = {
    type: "html-button-response",
    data: {
        exp_id: "welcome",
        trial_id: "welcome"
    },
    choices: ['Click here to continue'],
    on_trial_start: function() { setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)},
    stimulus: "Welcome to the experiment.",
};
welcome_block = [];
welcome_block.push(welcome_screen);

var closing_screen = {
    type: "html-button-response",
    data: {
        exp_id: "closing",
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

// For Training
function start_cogswitch() {

    /* start the experiment */
    jsPsych.init({
        show_progress_bar: false,
        on_interaction_data_update: function(data) {
            trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            // ...welcome_block,
            // ...affswitch_practice
            ...primeaff_practice
        ],

        /* on_close currently not working */
        on_close: function() {
            CloseExp1Save()
        },
        on_finish: function() {
            // FinishExp1Save()
            // jsPsych.data.displayData();
        }


    });
}

