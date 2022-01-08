module.exports = function(app){

    // --- ROUTING
    app.get('/', function(request, response) {
        response.render('index.html');
    });

    app.get('/finish', function(request, response) {
        response.render('finish.html');
    });

    // --- PRACTICE TASK LINKS
    app.get('/practice_cogswitch', function(request, response) {
        response.render('practice_cogswitch.html');
    });

    app.get('/practice_affswitch', function(request, response) {
        response.render('practice_affswitch.html');
    });

    app.get('/practice_primeaff', function(request, response) {
        response.render('practice_primeaff.html');
    });

    app.get('/practice_mab', function(request, response) {
        response.render('practice_mab.html');
    });


    // --- EXPERIMENT TASK LINKS
    app.get('/exp_cogswitch', function(request, response) {
        response.render('exp_cogswitch.html');
    });

    app.get('/exp_affswitch', function(request, response) {
        response.render('exp_affswitch.html');
    });

    app.get('/exp_primeaff', function(request, response) {
        response.render('exp_primeaff.html');
    });

    app.get('/exp_mab', function(request, response) {
        response.render('exp_mab.html');
    });
}