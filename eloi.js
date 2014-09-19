


var sys = require("sys"),  
my_http = require("http"),  
path = require("path"),  
url = require("url"),
playerctrl = require("./playerctrl.js"),
/*io = require('socket.io'),*/
fs = require("fs");
var port = 1111;


playerctrl.init();

my_http.createServer(function(request,response) {
	var query = url.parse(request.url, true).query;
    var my_path = url.parse(request.url).pathname;
    console.log('URL: ' +  my_path);
    if ( my_path === '/' )
    {
            fs.readFile('index.html', "binary", function(err, file) {    
                 if(err) {    
                     response.writeHeader(500, {"Content-Type": "text/plain"});    
                     response.write(err + "\n");    
                     response.end();    
                 }    
                 else{
                    response.writeHeader(200);    
                    response.write(file, "binary");    
                    response.end();  
                }                         
            });  

    }
    else if ( my_path.indexOf('/addPlayer') === 0 ) {
	    console.log('name: ', query.name);
	    console.log('nick: ', query.nick);
	    playerctrl.addPlayer(query.name, query.nick);

	    response.writeHeader(200);    
	    response.write("", "binary");    
	    response.end();  
    }
    else if ( my_path.indexOf('/getPlayers') === 0 )
    {
	    response.writeHeader(200);
	    response.write(JSON.stringify(Users, null, 4), "binary");
	    response.end();  
    }
    var full_path = path.join(process.cwd(),my_path);  
    path.exists(full_path,function(exists){  
        if(!exists){  
            response.writeHeader(404, {"Content-Type": "text/plain"});    
            response.write("404 Not Found\n");    
            response.end();  
        }
        else{  
            fs.readFile(full_path, "binary", function(err, file) {    
                 if(err) {    
                     response.writeHeader(500, {"Content-Type": "text/plain"});    
                     response.write(err + "\n");    
                     response.end();    
                 }    
                 else{  
                    response.writeHeader(200);    
                    response.write(file, "binary");    
                    response.end();  
                }  
                       
            });  
        }  
    });  
}).listen(port);
sys.puts("Server Running on port " + port);