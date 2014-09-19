
var sys = require("sys"),  
fs = require("fs");

var Players = [];

function PlayerCtrl() {

}

module.exports.init = function ()
{
	var data = fs.readFileSync('./players.json');

	Players = JSON.parse(data);
	console.log('Players: ' , Players);
}

module.exports.addPlayer = function(name, nick) {

	console.log('addPlayer(' + name + ', ' + nick + ')');

	Players.push( {
	 	    name: name,
    		nick: nick
		} );

	  var data = JSON.stringify(Players, null, 4);

	  fs.writeFile('./players.json', data, function (err) {
	    if (err) {
	      console.log('There has been an error saving your configuration data.');
	      console.log(err.message);
	      return;
	    }
	    console.log('Configuration saved successfully.')
	  });
}

module.exports.removePlayer = function(name) {

	console.log('removePlayer(' + name + ')');

}
