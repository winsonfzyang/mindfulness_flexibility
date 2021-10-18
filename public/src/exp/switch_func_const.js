// SWITCHING CONSTANTS
const SWITCH_FIXATION_DURATION = 300; // 500
const SWITCH_STIM_DURATION = 2000; // 2000
const SWITCH_POSTTRIAL_DURATION = 500; // 500
const SWITCH_FDBCK_DURATION = 1000; // 1000
const PERCENTCRIT = 0.20; // 20%
const NPRACTTRIALS = 30; // 1 set = 10 trials
const NEXPTRIALS = 240; // 150 trials
const SWITCH_FIXATION = "<div style='font-size: 72px'>+</div>";
const AFF_SWITCH_FIX = "<div class='aff_fix'>+</div>";

// AFFECTIVE FLEXIBILITY
const NSWITCHTRIALS_AFF = 4;
const NFOLLOWTRIALS_AFF = 16;
const NPRACTTRIALS_AFF = 40;
const NEXPTRIALS_AFF = 240;

// PRIME AFFECTIVE STROOP
const PERCENTINCONGR = 0.2;
const NPRIMETRIALS = 240;
const NPRIMEPRACTRIALS = 30;
const PRIME_DURATION = 100;
const MASK_DURATION = 33;
const STIM_DURATION = 1000;
MASK = '<img class="affstim" src="../img/whitemask.jpg">'

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
    "F1_29ANS.JPG", "F1_30ANS.JPG", "F1_31ANS.JPG", "F1_32ANS.JPG",  "F1_33ANS.JPG",  "F1_34ANS.JPG"];

const stim_female_ha = [
    "F1_02HAS.JPG", "F1_03HAS.JPG", "F1_04HAS.JPG", "F1_05HAS.JPG", "F1_06HAS.JPG", "F1_07HAS.JPG",
    "F1_08HAS.JPG", "F1_09HAS.JPG", "F1_10HAS.JPG", "F1_11HAS.JPG", "F1_13HAS.JPG", "F1_14HAS.JPG",
    "F1_16HAS.JPG", "F1_17HAS.JPG", "F1_18HAS.JPG", "F1_19HAS.JPG", "F1_20HAS.JPG", "F1_21HAS.JPG",
    "F1_22HAS.JPG", "F1_23HAS.JPG", "F1_24HAS.JPG", "F1_25HAS.JPG", "F1_26HAS.JPG", "F1_27HAS.JPG",
    "F1_29HAS.JPG", "F1_30HAS.JPG", "F1_31HAS.JPG", "F1_32HAS.JPG", "F1_33HAS.JPG", "F1_34HAS.JPG",
];

const stim_male_an = [
    "M1_02HAS.JPG", "M1_03HAS.JPG", "M1_04HAS.JPG", "M1_05HAS.JPG", "M1_06HAS.JPG", "M1_07HAS.JPG",
    "M1_08HAS.JPG", "M1_09HAS.JPG", "M1_10HAS.JPG", "M1_11HAS.JPG", "M1_13HAS.JPG", "M1_14HAS.JPG",
    "M1_16HAS.JPG", "M1_17HAS.JPG", "M1_18HAS.JPG", "M1_19HAS.JPG", "M1_20HAS.JPG", "M1_21HAS.JPG",
    "M1_22HAS.JPG", "M1_23HAS.JPG", "M1_24HAS.JPG", "M1_25HAS.JPG", "M1_26HAS.JPG", "M1_27HAS.JPG",
    "M1_29HAS.JPG", "M1_30HAS.JPG", "M1_31HAS.JPG", "M1_32HAS.JPG", "M1_33HAS.JPG", "M1_34HAS.JPG",
];

const stim_male_ha = [
    "M1_02ANS.JPG", "M1_03ANS.JPG", "M1_04ANS.JPG", "M1_05ANS.JPG", "M1_06ANS.JPG", "M1_07ANS.JPG",
    "M1_08ANS.JPG", "M1_09ANS.JPG", "M1_10ANS.JPG", "M1_11ANS.JPG", "M1_13ANS.JPG", "M1_14ANS.JPG",
    "M1_16ANS.JPG", "M1_17ANS.JPG", "M1_18ANS.JPG", "M1_19ANS.JPG", "M1_20ANS.JPG", "M1_21ANS.JPG",
    "M1_22ANS.JPG", "M1_23ANS.JPG", "M1_24ANS.JPG", "M1_25ANS.JPG", "M1_26ANS.JPG", "M1_27ANS.JPG",
    "M1_29ANS.JPG", "M1_30ANS.JPG", "M1_31ANS.JPG", "M1_32ANS.JPG", "M1_33ANS.JPG", "M1_34ANS.JPG",
];

const MAN = {'gender': 'M', 'emotion': 'angry'};
const FAN = {'gender': 'F', 'emotion': 'angry'};
const MHA = {'gender': 'M', 'emotion': 'happy'};
const FHA = {'gender': 'F', 'emotion': 'happy'};

const MAN_CON = {'gender': 'M', 'emotion': 'angry', 'word': 'angry'};
const MAN_INCON = {'gender': 'M', 'emotion': 'angry', 'word': 'happy'};
const FAN_CON = {'gender': 'F', 'emotion': 'angry', 'word': 'angry'};
const FAN_INCON = {'gender': 'F', 'emotion': 'angry', 'word': 'happy'};
const MHA_CON = {'gender': 'M', 'emotion': 'happy', 'word': 'happy'};
const MHA_INCON = {'gender': 'M', 'emotion': 'happy', 'word': 'angry'};
const FHA_CON = {'gender': 'F', 'emotion': 'happy', 'word': 'happy'};
const FHA_INCON = {'gender': 'F', 'emotion': 'happy', 'word': 'angry'};

const stimuli = stim_male_ha.concat(stim_male_an, stim_female_ha, stim_female_an);
const n_follow_trials = [3, 4, 5, 6, 7];


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
    if (sum == K) {

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
        if (i > l && A[i] == A[i - 1])
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

// Sum array
var sumArray = function() {
    // Use one adding function rather than create a new one each
    // time sumArray is called
    function add(a, b) {
        return a + b;
    }

    return function(arr) {
        return arr.reduce(add);
    };
}();

