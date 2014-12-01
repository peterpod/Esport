var sportsdata_nba = require('sportsdata').NBA;

// Init the object with the access level, version, apikey, seasonID, and season you care about
sportsdata_nba.init('t', 3,  'fpmwbwg7ufnj644png84vaq3', '2014', 'REG');

// Get the season schedule
exports.getSeasonSchedule = function(callback) {
  sportsdata_nba.getSeasonSchedule(function(error, schedule) {
    if(!error) {
      callback(schedule);
    }
  });
}

exports.getDailySchedule = function(year, month, day, callback) {
	sportsdata_nba.getDailySchedule(year, month, day, function(error, schedule) {
	    if(!error) {
	      callback(schedule);
	    }
	  });
	}

exports.getBoxScore = function(gameID, callback) {
	sportsdata_nba.getBoxScore(gameID, function(error, boxscore) {
	    if(!error) {
	      callback(boxscore);
	    }
	  });
	}

exports.getGameScoreAndStats = function(gameID, callback) {
  sportsdata_nba.getGameScoreAndStats(gameID, function(error, stats) {
	    if(!error) {
	      callback(stats);
	    }
	  });
}
exports.getStandings = function(callback) {
     sportsdata_nba.getStandings(function(error, standings) {
	    if(!error) {
	      callback(standings);
	    }
	  });
}