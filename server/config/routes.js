var request = require('request');
var lame = require('lame');
var Speaker = require('speaker');

module.exports = function(router)
{
	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		// Could display the help page for this shit
		res.json({ message: 'hooray! Muahha Te quiero!' });	
	});
	router.post('/music', function(req, res) {
		// Could display the help page for this shit
		res.json({ message: 'hooray! Playing song! '+req.body});
		console.log(req.body);
		song = req.body.url;// "https://dl.dropboxusercontent.com/u/1273929/MUSIC/FEATURING/dreaddymck%20-%20project%2043%20-%20mutabaruka%20-%20dis%20poem.mp3"
		// play song in my speakers :)
		try{
			stream = request(song);
	      	stream.pipe(new lame.Decoder).pipe(new Speaker);
		}catch(e){

			console.log(e)
		}
	});
	/*
	// handle partials with jade
	app.get('/partials/*',function(req,res){
		var partial = '../../public/app/' + req.params[0];
		console.log('renderenando part ',partial);
		res.render(partial);
	});

	// all request are handle by this
	app.get('*',function (req,res){
		console.log('renderiando index ',req.user);
		res.render('index');
	});
	app.post('/summitemail',function(req,res){
		// var email = req.body.email;
		var obj = req.body;
		console.log('req ',obj);
		// query mongo db
		app.mongoObj.addEmail(obj);
		res.send({success:true});
	});
	app.post('/retrieveemails',function(req,res){
		app.mongoObj.retrieveEmails(function(emails){
			console.log('emails',emails);
			res.send({success:true,emails:emails })
		});
	});
	app.post('/login',auth.authenticate);
	app.post('/logout',function (req,res){
		console.log('userLog Out');
		req.logout();
		res.end();
	});
	*/
}