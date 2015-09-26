var root = require('root');
var req = require('request');
var hipchatter = require('hipchatter');

var app = root();

if (!process.env.SECRET) {
	console.error("Specify env var SECRET to be passed as query string param 'secret'");
	process.exit(1);
}

function notify(msg,room) {
	var envName = "HIPCHAT_TOKEN_"+room.toUpperCase();
	envName = envName.replace(/\s+/g, '');
	if (!process.env[envName]) {
		console.error("Missing env var "+envName);
		return;
	};

	var hipchat = new hipchatter(process.env[envName]);

	var color = msg.description == 'up' ? 'green' : 'red';

	var chatmsg = 'Pingdom check "'+msg.checkname+'" is '+msg.description;

	hipchat.notify(room, {
		message: chatmsg,
		notify: true,
		color: color
	}, function(err) {if (err) console.error(err);});

}
app.get('/alert', function(request, response) {
	if (request.query.secret !== process.env.SECRET) {
		return response.error(403, "Invalid secret");
	}
	if (!request.query.room) {
		return response.error(400, "No room specified");
	}

	var room = request.query.room;

	var msg = JSON.parse(request.query.message || '');
	console.log(msg);

	notify(msg, room);
	var checkname = msg.checkname ;
	return response.end('OK');
});

app.listen(process.env.PORT);
