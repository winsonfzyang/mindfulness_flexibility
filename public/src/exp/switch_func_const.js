// SWITCHING CONSTANTS
const SWITCH_FIXATION_DURATION = 500; // 500
const SWITCH_STIM_DURATION = 2000; // 2000
const SWITCH_POSTTRIAL_DURATION = 500; // 500
const SWITCH_FDBCK_DURATION = 1000; // 1000
const PERCENTCRIT = 0.30; // 30%
const NPRACTTRIALS = 40; // 40 trials
const NEXPTRIALS = 240; // 240 trials
const SWITCH_FIXATION = "<div style='font-size: 72px'>+</div>";
const AFF_SWITCH_FIX = "<div class='aff_fix'>+</div>";

// AFFECTIVE FLEXIBILITY
const NPRACTTRIALS_AFF = 40; // 40 trials
const NEXPTRIALS_AFF = 240; // 240 trials

// PRIME AFFECTIVE STROOP
const PERCENTINCONGR = 0.3; // 30%
const NPRIMETRIALS = 240; // 240 trials
const NPRIMEPRACTRIALS = 20;
const PRIME_DURATION = 120;
const MASK_DURATION = 60;
const STIM_DURATION = 1000;
const MASK = '<img class="affstim" src="../img/whitemask.jpg">'

// META-AWARENESS OF BIAS
const PICSTIM_DURATION = 500;
const PROBE_DURATION = 1000;
const MAB_PRACTRIALS = 40; // 40 practice trials
const MAB_EXPTRIALS = 240; // 240 experiment trials
const PERCENT_MAB = 0.25; // 25%

const awareness_yes = {
    trial_duration: null,
    stimulus1: '<p><b>Did one of the pictures influence your response?</b>'+
        '<br> 1. The left picture' +
        '<br> 2. The right picture' +
        '<br> 3. Neither picture' +
        '</p>',
    awareness: 'yes',
    choices1: ['1', '2', '3'],
    stimulus2: '<p><b>How did the pictures influence your response?</b>'+
        '<br> 1. My attention moved away from it' +
        '<br> 2. My attention focused on it' +
        '</p>',
    choices2: ['1', '2'],
};

const awareness_no = {
    trial_duration: 0,
    stimulus1: '',
    awareness: 'no',
    choices1: jsPsych.NO_KEYS,
    stimulus2: '',
    choices2: jsPsych.NO_KEYS
};


/* Mask */
primeaff_mask = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'primeaff',
        trial_id: 'prime',
        stimulus: "prime"
    },
    stimulus: MASK,
    choices: jsPsych.NO_KEYS,
    trial_duration: MASK_DURATION, // milliseconds
}; // DONE

// Stimuli
const stim_female_an = [
    "F1_02ANS.JPG", "F1_03ANS.JPG", "F1_04ANS.JPG", "F1_05ANS.JPG", "F1_06ANS.JPG", "F1_07ANS.JPG",
    "F1_08ANS.JPG", "F1_09ANS.JPG", "F1_10ANS.JPG", "F1_11ANS.JPG", "F1_13ANS.JPG", "F1_14ANS.JPG",
    "F1_16ANS.JPG", "F1_17ANS.JPG", "F1_18ANS.JPG", "F1_19ANS.JPG", "F1_20ANS.JPG", "F1_21ANS.JPG",
    "F1_22ANS.JPG", "F1_23ANS.JPG", "F1_24ANS.JPG", "F1_25ANS.JPG", "F1_26ANS.JPG", "F1_27ANS.JPG",
    "F1_29ANS.JPG", "F1_30ANS.JPG", "F1_31ANS.JPG", "F1_32ANS.JPG",  "F1_33ANS.JPG", "F1_34ANS.JPG"];

const stim_female_ha = [
    "F1_02HAS.JPG", "F1_03HAS.JPG", "F1_04HAS.JPG", "F1_05HAS.JPG", "F1_06HAS.JPG", "F1_07HAS.JPG",
    "F1_08HAS.JPG", "F1_09HAS.JPG", "F1_10HAS.JPG", "F1_11HAS.JPG", "F1_13HAS.JPG", "F1_14HAS.JPG",
    "F1_16HAS.JPG", "F1_17HAS.JPG", "F1_18HAS.JPG", "F1_19HAS.JPG", "F1_20HAS.JPG", "F1_21HAS.JPG",
    "F1_22HAS.JPG", "F1_23HAS.JPG", "F1_24HAS.JPG", "F1_25HAS.JPG", "F1_26HAS.JPG", "F1_27HAS.JPG",
    "F1_29HAS.JPG", "F1_30HAS.JPG", "F1_31HAS.JPG", "F1_32HAS.JPG", "F1_33HAS.JPG", "F1_34HAS.JPG",
];

const stim_male_an = [
    "M1_02ANS.JPG", "M1_03ANS.JPG", "M1_04ANS.JPG", "M1_05ANS.JPG", "M1_06ANS.JPG", "M1_07ANS.JPG",
    "M1_08ANS.JPG", "M1_09ANS.JPG", "M1_10ANS.JPG", "M1_11ANS.JPG", "M1_13ANS.JPG", "M1_14ANS.JPG",
    "M1_16ANS.JPG", "M1_17ANS.JPG", "M1_18ANS.JPG", "M1_19ANS.JPG", "M1_20ANS.JPG", "M1_21ANS.JPG",
    "M1_22ANS.JPG", "M1_23ANS.JPG", "M1_24ANS.JPG", "M1_25ANS.JPG", "M1_26ANS.JPG", "M1_27ANS.JPG",
    "M1_29ANS.JPG", "M1_30ANS.JPG", "M1_31ANS.JPG", "M1_32ANS.JPG", "M1_33ANS.JPG", "M1_34ANS.JPG",
];

const stim_male_ha = [
    "M1_02HAS.JPG", "M1_03HAS.JPG", "M1_04HAS.JPG", "M1_05HAS.JPG", "M1_06HAS.JPG", "M1_07HAS.JPG",
    "M1_08HAS.JPG", "M1_09HAS.JPG", "M1_10HAS.JPG", "M1_11HAS.JPG", "M1_13HAS.JPG", "M1_14HAS.JPG",
    "M1_16HAS.JPG", "M1_17HAS.JPG", "M1_18HAS.JPG", "M1_19HAS.JPG", "M1_20HAS.JPG", "M1_21HAS.JPG",
    "M1_22HAS.JPG", "M1_23HAS.JPG", "M1_24HAS.JPG", "M1_25HAS.JPG", "M1_26HAS.JPG", "M1_27HAS.JPG",
    "M1_29HAS.JPG", "M1_30HAS.JPG", "M1_31HAS.JPG", "M1_32HAS.JPG", "M1_33HAS.JPG", "M1_34HAS.JPG",
];


const MAN = {'gender': 'M', 'emotion': 'angry'};
const FAN = {'gender': 'F', 'emotion': 'angry'};
const MHA = {'gender': 'M', 'emotion': 'happy'};
const FHA = {'gender': 'F', 'emotion': 'happy'};

const stimuli = stim_male_ha.concat(stim_male_an, stim_female_ha, stim_female_an);
const n_follow_trials = [3, 4, 5, 6, 7];

const mab_negative_stim = [
    "Animal carcass 1.jpg", "Animal carcass 2.jpg", "Animal carcass 3.jpg", "Animal carcass 4.jpg",
    "Animal carcass 5.jpg", "Animal carcass 6.jpg", "Bee 1.jpg", "Bloody knife 1.jpg",
    "Bloody knife 2.jpg", "Car accident 1.jpg", "Car accident 2.jpg", "Car accident 3.jpg",
    "Car accident 4.jpg", "Car crash 1.jpg", "Car crash 2.jpg", "Car crash 3.jpg",
    "Cockroach 1.jpg", "Cockroach 2.jpg", "Cockroach 3.jpg", "Cockroach 4.jpg",
    "Destruction 10.jpg", "Destruction 2.jpg", "Destruction 3.jpg", "Destruction 6.jpg",
    "Destruction 7.jpg", "Destruction 8.jpg", "Dummy 1.jpg", "Injury 1.jpg",
    "Injury 2.jpg", "Injury 3.jpg", "Injury 4.jpg", "Scary face 1.jpg",
    "Snake 1.jpg", "Snake 2.jpg", "Snake 3.jpg", "Snake 4.jpg",
    "Snake 5.jpg", "Snake 6.jpg", "Spider 1.jpg", "Spider 2.jpg"
];

const mab_neutral_stim = [
    "Bark 1.jpg", "Bark 2.jpg", "Bark 3.jpg", "Billiards 1.jpg",
    "Bricks 1.jpg", "Cardboard 1.jpg", "Cardboard 2.jpg", "Cardboard 3.jpg",
    "Keyboard 1.jpg", "Keyboard 2.jpg", "Keyboard 3.jpg", "Keys 1.jpg",
    "Office supplies 1.jpg", "Office supplies 2.jpg", "Office supplies 4.jpg", "Office supplies 5.jpg",
    "Paintbrush 1.jpg", "Paper 1.jpg", "Paper 2.jpg", "Paper 3.jpg",
    "Paper 4.jpg", "Paper 5.jpg", "Phone 1.jpg", "Rocks 1.jpg",
    "Rocks 2.jpg", "Roofing 1.jpg", "Roofing 2.jpg", "Roofing 3.jpg",
    "Roofing 4.jpg", "Roofing 5.jpg", "Sidewalk 1.jpg", "Sidewalk 3.jpg",
    "Skyscraper 1.jpg", "Skyscraper 2.jpg", "Storage 1.jpg", "Storage 2.jpg",
    "Wall 1.jpg", "Wall 2.jpg", "Yarn 1.jpg", "Yarn 2.jpg",
];


// functions
const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);
function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
}

// Function to find all combination of the given elements
function unique_combination(l, sum, K, local, A, counter) {

    // If a unique combination is found
    if (sum === K) {

        uniq_comb = uniq_comb.concat(local, 'break');

        counter += 1
        return local;
    }

    // For all other combinations
    for (let i = l; i < A.length; i++) {

        // Check if the sum exceeds K
        if (sum + A[i] > K)
            continue;

        // Check if it is repeated or not
        if (i > l && A[i] === A[i - 1])
            continue;

        // Take the element leto the combination
        local.push(A[i]);

        // Recursive call
        unique_combination(i + 1, sum + A[i], K, local, A, counter);

        // Remove element from the combination
        local.pop();
    }
}

function Combination(A, K) {
    let counter = 0;
    // Sort the given elements
    A.sort((a, b) => a - b);

    // To store combination
    let local = [];

    unique_combination(0, 0, K, local, A, counter)

}

var combinationSum = function (nums, target) {
    let combinations = [];
    nums.sort((a, b) => a - b);

    function backtrack(tempList, remaining, start) {
        for (let i = start; i < nums.length && nums[i] <= remaining; i++) {
            if (nums[i] === remaining) {
                combinations.push([...tempList, nums[i]]);
                combinations.push('break')
            } else {
                backtrack([...tempList, nums[i]], remaining - nums[i], i);
            }
        }
    }

    backtrack([], target, 0);
    return combinations;
};

// Sum array
var sumArray = function() {
    // Use one adding function rather than create a new one each
    // time sumArray is called
    function add(a, b) {return a + b}

    return function(arr) {return arr.reduce(add)};
};

