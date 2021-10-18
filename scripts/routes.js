module.exports = function(app){

    // --- ROUTING
    app.get('/', function(request, response) {
        response.render('index.html');
    });

    app.get('/TestSavingTest', function(request, response) {
        response.render('savetesting.html');
    });

    app.get('/Exp1', function(request, response) {
        response.render('experiment1.html');
    });

    app.get('/finish', function(request, response) {
        response.render('finish.html');
    });

}