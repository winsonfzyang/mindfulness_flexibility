/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// Constants
const SEEDS = ['Paper', 'Snow', 'Table', 'Candle', 'Bear', 'Toaster']
const N_WORDS = 20  // No. of words for participant to fill in

// Scales
const scale_valence = ["Negative valence",  "Positive valence"];
const scale_arousal = ["Not at all aroused",  "Very aroused"];
const scale_vivid = ["Not at all vivid",  "Very vivid"];
const scale_importance = ["Not at all relevant",  "Very relevant"];


// Set instructions helpers
let cfat_instrhelper = {};

cfat_instrhelper.page1 =
    "<div class='cfat_instr'>" +
    "<p>On this page, starting with the word ‘[seed word]’, your job is to write down the next word that follows in your mind from the previous word. " +
    "Please put down only single words, and do not use proper nouns (such as names, brands, etc.).</p>" +
    "</div>";

cfat_instrhelper.page2 =
    "<div class='cfat_instr'>" +
    "<p>In the next page, you will be asked to rate each word with regards to your mental state at that time</p>" +
    "<ul>\n" +
    "  <li>Valence: How positive or negative your emotion was when you thought of that word</li>\n" +
    "  <li>Arousal: How positive or negative your emotion was when you thought of that word</li>\n" +
    "  <li>Vividness: How vivid was the word to you?</li>\n" +
    "  <li>Relevance: How important is the word to you?</li>\n" +
    "</ul>  " +
    "</div>";


/* Instructions */
let cfat_instr = {
    type: 'instructions',
    data: {
        exp_id: "cfat",
        trial_id: "instructions1"
    },
    pages: [
        // Page 1
        cfat_instrhelper.page1
    ],
    key_forward: 'SPACE',
    show_clickable_nav: true,
    show_page_number: true,
};

 /* Create N blanks for each seed word */
function pop_cfat(seed, N_WORDS){
    word_no_html = ''
    for (let i = 0; i < N_WORDS; i++) {
        word_no =  seed + '_word_' + i
        word_no_html += "<p><input name=" + word_no + " type='text'/></p>"
    }
    return word_no_html
}

let cfat_block = [];
let counter = 0;
for (let seed of SEEDS) {
    // Spontaneous thought trial
    cfat_trial = {
        type: 'survey-html-form',
        on_start: function(trial){
            trial.data = {
                exp_id: 'spon',
                trial_id: 'stimulus',
                word: seed,
            };
        },
        preamble: '<p>On this page, starting with the word ' + '<b>"' + seed + '</b>"' + ', your job is to write down the next word that follows in your mind from the previous word. ' +
            'Please put down only single words, and do not use proper nouns (such as names, brands, etc.).</p>' +
            '<p> Seed word: <b>'+ seed + '</b></p>',
        html: pop_cfat(seed, N_WORDS),
    };
    cfat_block.push(cfat_trial);

    // Quality of spontaneous thought trial
    for (let i = 0; i < N_WORDS; i++) {
        quality_word = qualityinput(i, counter);
        cfat_block.push(quality_word);
    }
    counter += N_WORDS + 1
}



/* Create quality for each named word */
// 1: Valence
// 2: Arousal
// 3: Vividness
// 4: Self-relevance

function qualityinput(i, counter) {
    likert_page = {
        type: 'survey-slider',
        on_start: function(trial) {
            responses = JSON.parse(jsPsych.data.get().values()[counter].responses);
            stim = responses[Object.keys(responses)[i]];
            trial.preamble = stim;
            trial.data = {
                exp_id: 'spon',
                trial_id: 'stimulus',
                word: jsPsych.data.get().values()[0].word,
            };
        },
        questions: [
            {prompt: "Valence", name: 'Valence', min: 0, max: 100, slider_start: 0, labels: scale_valence},
            {prompt: "Arousal", name: 'Arousal', min: 0, max: 100, slider_start: 0, labels: scale_arousal},
            {prompt: "Vividness", name: 'Vividness', min: 0, max: 100, slider_start: 0, labels: scale_vivid},
            {prompt: "Importance", name: 'Self-relevance', min: 0, max: 100, slider_start: 0, labels: scale_importance},
        ],
        slider_width: 500,
        require_movement: true,
        randomize_question_order: false
    };
    return likert_page
}
