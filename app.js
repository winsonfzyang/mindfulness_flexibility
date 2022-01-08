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


app.post('/exp1-data', function(request, response) {
    console.log("Posting data")
    // Convert to CSV
    DATA_CSV = JSON2CSV(request.body);
    // Get ID_DATE
    rows = DATA_CSV.split('\n');
    ID_DATE_index = rows[0].split(',').indexOf('"ID_DATE"');
    ID_DATE = rows[1].split(',')[ID_DATE_index];
    ID_DATE = ID_DATE.replace(/"/g, "");

    EXP_ID_index = rows[0].split(',').indexOf('"exp_id"');
    EXP_ID = rows[2].split(',')[EXP_ID_index];
    EXP_ID = EXP_ID.replace(/"/g, "");

    filename = "dissertation/" + ID_DATE + "_" + EXP_ID + ".csv";
    saveDropbox(DATA_CSV, filename);
    response.end();
});

// --- START THE SERVER
var server = app.listen(process.env.PORT, function(){
    console.log("Listening on port %d", server.address().port);
});