var express = require('express'),
    morgan  = require('morgan'),
    path = require('path');

// Create a class that will be our main application
var SimpleStaticServer = function() {

  // set self to the scope of the class
  var self = this;  
  
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
app.use(morgan('tiny'));  // Log requests

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


  self.app = express();
  //	self.app.use(connect(connect.basicAuth('j', 'jmjm')))
  self.app.use(morgan('[:date] :method :url :status'));	// Log requests
  self.app.use(express.static(path.join(__dirname, 'public')));	// Process static files

  // Start the server (starts up the sample application).
  self.start = function() {
    /*
     * OpenShift will provide environment variables indicating the IP 
     * address and PORT to use.  If those variables are not available
     * (e.g. when you are testing the application on your laptop) then
     * use default values of localhost (127.0.0.1) and 33333 (arbitrary).
     */
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
    self.port      = process.env.OPENSHIFT_NODEJS_PORT || 50000;

    //  Start listening on the specific IP and PORT
    self.app.listen(self.port, self.ipaddress, function() {
      console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
    });
  };
}; 


/**
 *  main():  Main code.
 */
var sss = new SimpleStaticServer();
sss.start();

