var child_process = require('child_process');
var fs = require('fs');


var currentSong,inputStream = undefined;
var volume = 0;
// var songIsPlaying = false;
var playSong = function(song){
	currentSong = song;
	try{
		if(inputStream!==undefined){
			killSong();
		}
		child = child_process.spawn(
			// 'pwd',
			//'python', ['/Users/rodrigosavage/Documents/phd/hydroponic/restPi/python/audio.py',song],
			'omxplayer',[song],
			{
				detached:true,
					stdio: [
						'pipe', // use parents stdin for child
						'pipe', // pipe child's stdout to parent
						fs.openSync("err.out", "w") // direct child's stderr to a file
					]
			}
		);
	}
	catch(ex){
		console.log("Error while playing song");
		console.log(ex);
	}
	try{
		inputStream = child.stdin;
		inputStream.on('error',function(err){
			console.log('error',err);
			inputStream = undefined;
		});
		child.stdout.on('data', function(data) { 
			console.log("data");
			console.log(data.toString('ascii')); 
		});

		child.on('error',function(err){
			inputStream = undefined;
			console.log("Error while playing song");
			console.log(err);
		})
		child.on('close',function(){
			inputStream = undefined;
			console.log('Termino el proceso');
		})
		child.on('disconnect',function(){
			inputStream = undefined;
			console.log('Termino el proceso');
		})
		child.on('exit',function(){
			inputStream = undefined;
			console.log('Termino el proceso');
		})
	}catch(e){
		console.log(e);
	}
	return {song:song,volume:0};
}
exports.playSong = playSong;

var incVolume = function(amount){
	console.log('incVol',inputStream);
	volume += parseFloat(amount);
	count = Math.abs(amount)+1;
	var s;
	if(amount>0){
		s = Array(count).join("+")
	}
	else{
		s = Array(count).join("-")
	}
	if(inputStream!==undefined){
			console.log('Mando volumen',s);
			inputStream.write(s);
	}
	return volume;
}
exports.incVolume = incVolume;

var killSong = function(){
	console.log('killSong ',inputStream);
	if(inputStream!==undefined){
		inputStream.write("q");
		inputStream = undefined;
	}
}
exports.killSong = killSong;

playSong("te quiero matar!!.mp3");
incVolume(4);
incVolume(-3);
killSong();
console.log('esperando!!');
// while(true){}
