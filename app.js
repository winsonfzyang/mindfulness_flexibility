// --- LOADING MODULES
var express = require('express'),
    body_parser = require('body-parser'),
    utils = require('./scripts/mymods.js');
var saveDropbox = utils.saveDropbox;
var JSON2CSV = utils.JSON2CSV;

// --- INSTANTIATE THE APP
let app = express();

// --- ROUTING
require('./scripts/routes')(app);

// --- STATIC MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + "/js"));
app.use('/shared', express.static(__dirname + '/shared'));
app.use(body_parser.json({limit: "50mb"}));
app.use(body_parser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.post('/test-save-data', function(request, response) {
    console.log("Posting data")
    // Convert to CSV
    DATA_CSV = JSON2CSV(request.body);

    // Get ID_DATE
    rows = DATA_CSV.split('\n');
    ID_DATE_index = rows[0].split(',').indexOf('"ID_DATE"');
    ID_DATE = rows[1].split(',')[ID_DATE_index];
    ID_DATE = ID_DATE.replace(/"/g, "");

    filename = "wmt/" + ID_DATE + "_testsave.csv";
    saveDropbox(DATA_CSV, filename);
    response.end();
});

app.post('/wmt-testing-data', function(request, response) {
    console.log("Posting data")
    // Convert to CSV
    DATA_CSV = JSON2CSV(request.body);

    // Get ID_DATE
    rows = DATA_CSV.split('\n');
    ID_DATE_index = rows[0].split(',').indexOf('"ID_DATE"');
    ID_DATE = rows[1].split(',')[ID_DATE_index];
    ID_DATE = ID_DATE.replace(/"/g, "");

    DAYNUMBER_index = rows[0].split(',').indexOf('"daynumber"');
    DAYNUMBER = rows[1].split(',')[DAYNUMBER_index];
    DAYNUMBER = DAYNUMBER.replace(/"/g, "");

    filename = "wmt/" + ID_DATE + "_day_" + DAYNUMBER + ".csv";
    saveDropbox(DATA_CSV, filename);
    response.end();
});

app.post('/exp1-data', function(request, response) {
    console.log("Posting data")
    // Convert to CSV
    DATA_CSV = JSON2CSV(request.body);

    // Get ID_DATE
    rows = DATA_CSV.split('\n');
    ID_DATE_index = rows[0].split(',').indexOf('"ID_DATE"');
    ID_DATE = rows[1].split(',')[ID_DATE_index];
    ID_DATE = ID_DATE.replace(/"/g, "");

    DAYNUMBER_index = rows[0].split(',').indexOf('"daynumber"');
    DAYNUMBER = rows[1].split(',')[DAYNUMBER_index];
    DAYNUMBER = DAYNUMBER.replace(/"/g, "");

    filename = "wmt/" + ID_DATE + "_day_" + DAYNUMBER + "_stroop.csv";
    saveDropbox(DATA_CSV, filename);
    response.end();


});

// --- START THE SERVER
var server = app.listen(process.env.PORT, function(){
    console.log("Listening on port %d", server.address().port);
});