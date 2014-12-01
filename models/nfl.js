var sportsdata_nfl = require('sportsdata').NFL;

// Init the object with the access level, version, apikey, year, and season you care about
sportsdata_nfl.init('t', 1, 'swvzkn6a54ej3gv6ja7aqren', '2014', 'REG');


// Get the weekly schedule
exports.getWeeklySchedule = function(week, callback) {
  //var week = getNFLWeek();
  sportsdata_nfl.getWeeklySchedule(week,function(error, schedule) {
    if(!error) {
      callback(schedule);
    }
  });
}

exports.getGameStats = function(week, awayteam, hometeam, callback) {
    sportsdata_nfl.getGameStats(week,awayteam, hometeam, function(error, stats) {
	    if(!error) {
	      callback(stats);
	    }
  });
}

exports.getGameSummary = function(week, awayteam, hometeam, callback) {
    sportsdata_nfl.getGameSummary(week,awayteam, hometeam, function(error, summary) {
	    if(!error) {
	      callback(summary);
	    }
  });
}