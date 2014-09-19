
var sys = require("sys"),  
fs = require("fs");

var Matches = [];


module.exports.init = function ()
{
	if ( fs.existsSync('./matches.json') )
	{
		console.log('file exists');

		Matches = require('./matches.json');
		console.log('Matches: ', Matches);
	}
}

module.exports.addMatch = function(team_red_defense, team_red_offense, team_red_goals, team_blue_defense, team_blue_offense, team_blue_goals) {

	console.log('addMatch( TeamRed=[ '+ team_red_defense + ', ' + team_red_offense + '], TeamBlue=[ ' + team_blue_defense + ', ' + team_blue_offense + '], Result: ' + team_red_goals + ':' + team_blue_goals + ')');

	Matches.push( {
			id: Matches.length,
	 	    team_red: {
	 	    	defense: team_red_defense,
	 	    	offense: team_red_offense,
	 	    	goals:   team_red_goals
	 	    },
	 	    team_blue: {
	 	    	defense: team_blue_defense,
	 	    	offense: team_blue_offense,
	 	    	goals:   team_blue_goals
	 	    }
		} );

	  var data = JSON.stringify(Matches, null, 4);

	  fs.writeFile('./matches.json', data, function (err) {
	    if (err) {
	      console.log('There has been an error saving your configuration data.');
	      console.log(err.message);
	      return;
	    }
	    console.log('Configuration saved successfully.')
	  });
}

module.exports.removePlayer = function(id) {

	console.log('removeMatch(' + id + ')');

}
