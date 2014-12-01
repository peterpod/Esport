var sportsdata_nhl = require('sportsdata').NHL;

// Init the object with the access level, version, apikey, seasonID, and season you care about
sportsdata_nhl.init('t', 3,  '5c2dukkdmh37u2tvkma2euvy', '2014', 'REG');

exports.getDailySchedule = function(year, month, day, callback) {
	sportsdata_nhl.getDailySchedule(year, month, day, function(error, schedule) {
	    if(!error) {
	      callback(schedule);
	    }
	  });
	}

exports.getBoxScore = function (gameID, callback) {
    sportsdata_nhl.getBoxScore(gameID, function(error, boxscore) {
	    if(!error) {
	      callback(boxscore);
	    }
	  });
}

exports.getStandings = function(callback) {
     sportsdata_nhl.getStandings(function(error, standings) {
	    if(!error) {
	      callback(standings);
	    }
	  });
}