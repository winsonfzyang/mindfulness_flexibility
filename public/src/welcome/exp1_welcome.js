// Set Date
const TODAY = new Date();
const DD = String(TODAY.getDate()).padStart(2, '0');
const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
const YYYY = TODAY.getFullYear();
const DATE = YYYY + MM + DD;

var welcome = {};

// --------------  things that vary from task to task --------------
welcome.task = {};
welcome.task.blurb = '<b>"Improving mental flexibility via mindfulness meditation"</b> ' +
    'aims to explore the individual differences in response to mental training. ' +
    'We hope that this study will provide valuable information about the effects of training on behavior.';

// --------------  things that vary between ethics approvals --------------
welcome.ethics = {};
welcome.ethics.name = 'Improving performances through attention and self-control training';
welcome.ethics.invite = "This is the one-month follow-up following the completion of a 10-day Brain Stimulation";
welcome.ethics.description = 'You will complete the two tasks + some questionnaires, similar to the 1st, 5th, and 10th day of intervention';


// ----------------------- function to start the task ------------------
welcome.run = function() {
    document.getElementById("welcome").innerHTML =
        welcome.section.header +
        welcome.section.consent;
};

// ------------- actions to take at the end of each click ----------------
welcome.click = {};
welcome.click.start = function() {
    welcome.helpers.setDisplay('start', 'none');
    welcome.helpers.setDisplay('consent', '');
    welcome.helpers.setHeader(' ');
};


welcome.click.consent = function() {
    partID = document.getElementById("partID").value;
    if(partID === ""){
        alert("Please input your ID!");
    } else {
        // Get Day number
        daynumber = "follow-up";
        partID = partID;
        welcome.helpers.setDisplay("demographics", "none");
        welcome.helpers.setDisplay("header", "none");
        jsPsych.data.addProperties({  // record the condition assignment in the jsPsych data
            ID: partID,
            ID_DATE: partID + "_" + DATE,
            daynumber: daynumber
        });
        // start the jsPsych experiment
        start_BS_followup()
    }
};



// ------------- html for the various sections ----------------
welcome.section = {};
welcome.section.header =
    '<!-- ####################### Heading ####################### -->' +
    '<a name="top"></a>' +
    '<h1 style="text-align:center; width:1200px" id="header" class="header">' +
    '   &nbsp; Improving attention and self-control using brain stimulation</h1>';

welcome.section.consent =
    '	<!-- ####################### Consent ####################### -->' +
    '	<div class="consent" style="width:1000px">' +
    '		<!-- Text box for the splash page -->' +
    '		<div class="consent" style="text-align:left; border:0px solid; padding:10px;  width:800px; font-size:90%; float:right">' +
    '			<p align="center"><b>TEXAS TECH UNIVERSITY<br></b>' + welcome.ethics.name + '</p>' +
    // PURPOSE OF STUDY
    '			<p><b>Purpose of Study</b></p>' +
    '			<p>' + welcome.ethics.invite + '</p>' +
    // DESCRIPTION OF STUDY AND RISKS
    '			<p><b>Description of Study</b></p>' +
    '			<p>' + welcome.ethics.description + '</p><br>' +
    // PARTICIPANT CONSENT
    '			<p align="center">' +
    '           <input type="button" id="consentButton" class="consent jspsych-btn" value="Continue" onclick="welcome.click.consent()" >' +
    '			</p>' +
    '		</div><br><br></div>';


// ----------------------- helper functions ------------------

welcome.helpers = {};
welcome.helpers.setDisplay = function(theClass, theValue) { // toggle display status
    var i, classElements = document.getElementsByClassName(theClass);
    for (i = 0; i < classElements.length; i = i + 1) {
        classElements[i].style.display = theValue;
    }
};

welcome.helpers.setHeader = function(theValue) { // alter the header
    document.getElementById("header").innerText = theValue;
};