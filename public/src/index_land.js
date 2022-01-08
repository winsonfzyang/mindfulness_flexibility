const TODAY = new Date();
const DD = String(TODAY.getDate()).padStart(2, '0');
const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
const YYYY = TODAY.getFullYear();
const MYDATE = YYYY + MM + DD;

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function PracticeDrop() {document.getElementById("PracticeDropdown").classList.toggle("show");}
function ExpDrop() {document.getElementById("ExpDropdown").classList.toggle("show");}
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Functions for experiment task buttons
function checkID_cogswitch() {
    partID = document.getElementById("partID").value;
    if(partID === ""){
        alert("Please input your ID!");
        return false;
    } else {
        var w = window.open("exp_cogswitch",'_blank');
        w.partID = partID;
        w.MYDATE = MYDATE;
        ID_DATE = partID + '_' + MYDATE
        w.ID_DATE = ID_DATE;
    }
}

function checkID_affswitch() {
    partID = document.getElementById("partID").value;
    if(partID === ""){
        alert("Please input your ID!");
        return false;
    } else {
        var w = window.open("exp_affswitch",'_blank');
        w.partID = partID;
        w.MYDATE = MYDATE;
        ID_DATE = partID + '_' + MYDATE
        w.ID_DATE = ID_DATE;
    }
}

function checkID_primeaff() {
    partID = document.getElementById("partID").value;
    if(partID === ""){
        alert("Please input your ID!");
        return false;
    } else {
        var w = window.open("exp_primeaff",'_blank');
        w.partID = partID;
        w.MYDATE = MYDATE;
        ID_DATE = partID + '_' + MYDATE
        w.ID_DATE = ID_DATE;
    }
}

function checkID_mab() {
    partID = document.getElementById("partID").value;
    if(partID === ""){
        alert("Please input your ID!");
        return false;
    } else {
        var w = window.open("exp_mab",'_blank');
        w.partID = partID;
        w.MYDATE = MYDATE;
        ID_DATE = partID + '_' + MYDATE
        w.ID_DATE = ID_DATE;
    }
}