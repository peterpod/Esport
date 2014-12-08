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
  	return res.render('nbaSchedule', { title: 'NBA Home', heading: 'Todays NBA Schedule', sport: schedule.league['$'].name, obj: schedule.league['daily-schedule'][0]['games'][0]['game']});
  });
}
exports.loadNBAYesterdayPage = function(req, res) {
  var date = new Date();
  date.setDate(date.getDate()-1);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  sportsdata_nba.getDailySchedule(year, month, day, function(schedule) {
    console.log(JSON.stringify(schedule.league['daily-schedule'][0]['games']));
    return res.render('nbaScheduleYesterday', { title: 'NBA Home', heading: date.toDateString()+' NBA Schedule', sport: schedule.league['$'].name, obj: schedule.league['daily-schedule'][0]['games'][0]['game']});
  });
}
exports.loadNBATomorrowPage = function(req, res) {
  var date = new Date();
  date.setDate(date.getDate()+1);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  sportsdata_nba.getDailySchedule(year, month, day, function(schedule) {
    console.log(JSON.stringify(schedule.league['daily-schedule'][0]['games']));
    return res.render('nbaScheduleTomorrow', { title: 'NBA Home', heading: date.toDateString()+' NBA Schedule', sport: schedule.league['$'].name, obj: schedule.league['daily-schedule'][0]['games'][0]['game']});
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


function getNFLWeek(date){
  var nflSchedule = [
    [1, '2014-09-04'],
    [2, '2014-09-11'],
    [3, '2014-09-18'],
    [4, '2014-09-25'],
    [5, '2014-10-02'],
    [6, '2014-10-09'],
    [7, '2014-10-16'],
    [8, '2014-10-23'],
    [9, '2014-10-30'],
    [10,'2014-11-06'],
    [11, '2014-11-13'],
    [12, '2014-11-20'],
    [13, '2014-11-27'],
    [14, '2014-12-04'],
    [15, '2014-12-11'],
    [16, '2014-12-18'],
    [17, '2014-12-25']
];
  var date = new Date();
  for (var i = 0; i<nflSchedule.length; i++){
      if(date < new Date(nflSchedule[i][1])){
        return nflSchedule[i][0];
      }
  }
}
// -----NFL-----
exports.loadNFLPage = function(req, res) {
  var date = new Date();
  var week = getNFLWeek(date);
  sportsdata_nfl.getWeeklySchedule(week, function(schedule) {
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

exports.loadNHLYesterday = function(req, res) {
  var date = new Date();
  date.setDate(date.getDate()-1);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  console.log(year+' '+month+' '+day);
  sportsdata_nhl.getDailySchedule(year, month, day, function(schedule) {
    console.log(JSON.stringify(schedule.league['daily-schedule'][0]['games']));
    return res.render('nhlScheduleYesterday', { title: 'NHL Home', heading: date.toDateString()+' NHL Schedule', sport: schedule.league['$'].name, obj: schedule.league['daily-schedule'][0]['games'][0]['game']});
  });
}

exports.loadNHLTomorrow = function(req, res) {
  var date = new Date();
  date.setDate(date.getDate()+1);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  console.log(year+' '+month+' '+day);
  sportsdata_nhl.getDailySchedule(year, month, day, function(schedule) {
    console.log(JSON.stringify(schedule.league['daily-schedule'][0]['games']));
    return res.render('nhlScheduleTomorrow', { title: 'NHL Home', heading: date.toDateString()+' NHL Schedule', sport: schedule.league['$'].name, obj: schedule.league['daily-schedule'][0]['games'][0]['game']});
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
