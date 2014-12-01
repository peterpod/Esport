var express = require("express");
var morgan = require("morgan");
var sportRoutes = require('./routes/sportRoutes'); 
var dbRoutes = require('./routes/dbRoutes'); 
var app = express();
var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: '1234567890QWERTY',
  resave: false,
  saveUninitialized: true
}))

// -- This code is being used to test whether or not my
// -- sessions are being created properly. You can navigate to /test1 and 
// -- you should receive back your session.user_id. I took this code from professor Mertz
app.get('/test1', function(req, res) {
	req.session.user_id = 1;
	return res.redirect('/test2');
});

app.get('/test2', function(req, res) {
	return res.send(req.session.user_id);
});

app.set('views', __dirname + '/views');
// Define the view (templating) engine
app.set('view engine', 'ejs');
app.use(morgan('tiny'));	// Log requests

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/home', function(req, res) {
	//-- testing to see if session cookie is generated res.send(req.session);
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/public/signup.html');
});

// -- User Mongo Routes
app.put('/:collection/:username/:password/:firstname/:lastname', dbRoutes.putUser);
app.get('/user/edit/:username/:password/:firstname/:lastname', dbRoutes.loadUserEdit);
app.get('/users', dbRoutes.getUser);
app.post('/:collection/:username/:password/:firstname/:lastname', dbRoutes.postUser);
app.delete('/:collection/:firstname/:lastname', dbRoutes.deleteUser);

// -- NBA Routes
app.get('/nba', sportRoutes.loadNBAPage);
app.get('/nba/boxscore/:gameID', sportRoutes.getBoxScore);
app.get('/nba/statistics/:gameID', sportRoutes.getGameScoreAndStats);
app.get('/nba/standings', sportRoutes.getNBAStandings);

// -- NFL Routes
app.get('/nfl', sportRoutes.loadNFLPage);
app.get('/nfl/stats/:away/:home', sportRoutes.getGameStats);
app.get('/nfl/summary/:away/:home', sportRoutes.getGameSummary);

// -- NHL Routes
app.get('/nhl', sportRoutes.loadNHLPage);
app.get('/nhl/boxscore/:gameID', sportRoutes.getNHLBoxScore);
app.get('/nhl/standings', sportRoutes.getNHLStandings);


app.listen(50000);
console.log("Server listening at http://localhost:50000/");
