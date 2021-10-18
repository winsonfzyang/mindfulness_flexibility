/* **************************************** */
/* Set up experiment procedure and timeline */
/* **************************************** */

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
    stimulus: "We are done with the practice session. please notify the researcher",
};
closing_block = [];
closing_block.push(closing_screen);

// Set up full screen mode
// bc_exp.push({type: 'fullscreen', fullscreen_mode: true}); /* enter fullscreen mode */
// bc_exp.push({type: 'fullscreen', fullscreen_mode: false }); /* exit fullscreen mode */

// For Training
function cogswitch_practice() {

    /* start the experiment */
    jsPsych.init({
        show_progress_bar: false,
        timeline: [
            ...welcome_block,
            ...cogswitch_pract_procedure,
            ...closing_screen
        ],

    });
}

