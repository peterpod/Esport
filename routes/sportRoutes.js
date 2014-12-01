var sportsdata_nfl = require('../models/nfl.js');
var sportsdata_nba = require('../models/nba.js');
var sportsdata_nhl = require('../models/nhl.js');

// -----NBA-----
//will return the daily nba games
exports.loadNBAPage = function(req, res) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  sportsdata_nba.getDailySchedule(year, month, day, function(schedule) {
  	console.log(JSON.stringify(schedule.league['daily-schedule'][0]['games']));
  	return res.render('nbaSchedule', { title: 'NBA Home', sport: schedule.league['$'].name, obj: schedule.league['daily-schedule'][0]['games'][0]['game']});
  });
}

exports.getBoxScore = function(req, res) {
  sportsdata_nba.getBoxScore(req.params.gameID, function(boxscore) {
  	console.log(JSON.stringify(boxscore));
  	return res.render('nbaBoxScore', { obj:boxscore});
  });
}

exports.getGameScoreAndStats = function(req, res) {
  sportsdata_nba.getGameScoreAndStats(req.params.gameID, function(stats) {
  	console.log(JSON.stringify(stats));
  	return res.render('nbaGameStats', { obj:stats});
  });
}

exports.getNBAStandings = function(req, res) {
  sportsdata_nba.getStandings(function(standings) {
    console.log(JSON.stringify(standings));
    return res.render('nbaStandings', { obj:standings});
  });
}

// -----NFL-----
exports.loadNFLPage = function(req, res) {
  sportsdata_nfl.getWeeklySchedule(12, function(schedule) {
  	console.log(JSON.stringify(schedule['games']['game']));
  	return res.render('nflWeeklySchedule', { title: 'NFL Home', sport: 'NFL', obj: schedule['games']['game']});
  });
}

exports.getGameStats = function(req, res) {
  sportsdata_nfl.getGameStats(12, req.params.away, req.params.home, function(stats) {
  	console.log('stats '+JSON.stringify(stats));
  	return res.render('nflGameStats', { title: 'NFL Home', sport: 'NFL', obj: stats});
  });
}

exports.getGameSummary = function(req, res) {
  sportsdata_nfl.getGameSummary(12, req.params.away, req.params.home, function(summary) {
  	console.log('summary '+JSON.stringify(summary));
  	return res.render('nflGameSummary', { title: 'NFL Home', sport: 'NFL', obj: summary});
  });
}

// -----NHL-----
exports.loadNHLPage = function(req, res) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  console.log(year+' '+month+' '+day);
  sportsdata_nhl.getDailySchedule(year, month, day, function(schedule) {
  	console.log(JSON.stringify(schedule.league['daily-schedule'][0]['games']));
  	return res.render('nhlSchedule', { title: 'NHL Home', sport: schedule.league['$'].name, obj: schedule.league['daily-schedule'][0]['games'][0]['game']});
  });
}

exports.getNHLBoxScore = function(req, res) {
  sportsdata_nhl.getBoxScore(req.params.gameID, function(boxscore) {
  	console.log(JSON.stringify(boxscore));
  	return res.render('nhlBoxScore', { obj:boxscore});
  });
}

exports.getNHLStandings = function(req, res) {
  sportsdata_nhl.getStandings(function(standings) {
  	console.log(JSON.stringify(standings));
  	return res.render('nhlStandings', { obj:standings});
  });
}
