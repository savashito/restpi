var request = require('request');
var audio = require("../../testAudio.js");
var hurb = require("../../hurbEmotion.js")
// var lame = require('lame');
// var Speaker = require('speaker');
// var volume = require('pcm-volume');
// var Mpg = require('mpg123');

module.exports = function(router)
{
	
	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		// Could display the help page for this shit
		res.json({ message: 'hooray! Muahha Te quiero!' });	
	});
	
	router.post('/api/soul/:emotion', function(req, res) {
		var emotion = req.params.emotion;
		switch(emotion){
			case 'sad':
				hurb.makeSad();
			break;
			case 'happy':
				hurb.makeHappy();
			break;
		}
	}
	
	router.post('/api/volume', function(req, res) {
		var amount = req.body.amount;
		audio.incVolume(amount);
	}

	router.post('/api/music', function(req, res) {
		var song = req.body.url;
		audio.playSong(song);
		// var music = new Mpg();
		// stream = request(song);
		// stream.pipe(new lame.Decoder).pipe(music)
		// res.json({ message: 'hooray! Playing song! '+song});
		
		// try{
		// 	music.play();
		// }catch(e){
		// 	console.log(p);
		// }
		/*
		try{
			var player = new Mpg()
			  .play(stream)
			  .on('end', function () {
			  //play the next song.
			  player.play(nextTrack)
			  //etc.
		  })


		}catch(e){
			console.log(e)
		}
*/
		/*
		// Could display the help page for this shit
		res.json({ message: 'hooray! Playing song! '+req.body});
		console.log(req.body);
		var v = volume();
		song = req.body.url;// "https://dl.dropboxusercontent.com/u/1273929/MUSIC/FEATURING/dreaddymck%20-%20project%2043%20-%20mutabaruka%20-%20dis%20poem.mp3"
		// play song in my speakers :)
		try{
			stream = request(song);
			v.pipe(new Speaker());
	      	stream.pipe(new lame.Decoder).pipe(v);
		}try{
		setTimeout(function() {
    		v.setVolume(0.5);
		}, 5000);
		*/

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