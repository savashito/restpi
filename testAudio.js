var child_process = require('child_process');
var fs = require('fs');


var currentSong,inputStream = undefined;
var volume = 0;
// var songIsPlaying = false;
var playSong = function(song){
	currentSong = song;
	child = child_process.spawn(
		// 'pwd',
		'python', ['/Users/rodrigosavage/Documents/phd/hydroponic/restPi/python/audio.py',song],
	 	// 'omxplayer',[song],
	 	{
		 	detached:true,
		    stdio: [
		      'pipe', // use parents stdin for child
		      'pipe', // pipe child's stdout to parent
		      fs.openSync("err.out", "w") // direct child's stderr to a file
		    ]
		}
	);
	inputStream = child.stdin;
	child.stdout.on('data', function(data) { console.log(data.toString('ascii')); });

	child.on('error',function(err){
		inputStream = undefined;
		console.log(err);
	})
	child.on('exit',function(){
		inputStream = undefined;
		console.log('Termino el proceso');
	})
	return {song:song,volume:0};
}
exports.playSong = playSong;

var incVolume = function(amount){
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
		inputStream.write("o");
	}
	return volume;
}
exports.incVolume = incVolume;

var killSong = function(){
	if(inputStream!==undefined){
		inputStream.write("o");
		inputStream = undefined;
	}
}

playSong("te quiero matar!!.mp3");
incVolume(4);
incVolume(-3);
killSong();
console.log('esperando!!');
// while(true){}
