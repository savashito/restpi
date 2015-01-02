/*
 * Author: Rodrigo Savage
 * Date:   20 Dec 2014
 * Decription: Interface with python script dimLigths 
 */
var child_process = require('child_process');
var fs = require('fs');

// Default Speed of one second
var animationTime = 1;
var cmdQueue = [];
// var isHurbPythonRunning = false;
var inputStream = undefined;
var initHubHadware = function(){
	if(inputStream===undefined){
		// isHurbPythonRunning = true;
		child = child_process.spawn(
			// 'pwd',
			'python', ['./python/dimLigths.py'],
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
		// console.log('cmd Excuted!');
		inputStream = child.stdin;
		inputStream.on('error',function(err){
			console.log('error',err);
			inputStream = undefined;
		});
		child.stdout.on('data', function(data) { 
			console.log(data.toString('ascii')); 
		});

		child.on('error',function(err){
			console.log(err);
			inputStream = undefined;
		})
		child.on('exit',function(){
			inputStream = undefined;
			console.log('Hurb emotions excecuted :)');
		})
	}
};
var color = {
	red: 25,
	blue: 24,
	green: 26
};
exports.color  = color;
var prev = {
	25:0,
	24:0,
	26:0
};

exports.dumpEmotions = function(){
	// Send the command to python
	initHubHadware();
	cmd = '\nled '+animationTime+' '; //+led.toString()+' '+prev[led]+' '+intensity.toString()+'\n'// +speed;
	// console.log(cmdQueue);
	for (var i = cmdQueue.length - 1; i >= 0; i--) {
		cmdLed = cmdQueue[i];
		cmd += cmdLed.led + ' '+ cmdLed.pIntensity  +' ' + cmdLed.nIntensity +' ';
	};
	// // update previus value with new value!
	// prev[led] = intensity;
	console.log(cmd);
	inputStream.write(cmd);
	// realease the current emotions
	cmdQueue = [];
	killEmotions();
};
var killEmotions = function(){
	if(inputStream!==undefined){
		inputStream.write("exit");
		console.log('exit emotions')
		// inputStream = undefined;
	}
};

exports.setAnimationTime = function(time){
	animationTime = time;
};

// fills a queue with commands to be excecuted
exports.animateLED = function(led,intensity){
	// console.log('animateLED');
	// push the command into the queue
	cmdQueue.push({led:led,pIntensity:prev[led],nIntensity:intensity});
	// cmd = '\nled '+led.toString()+' '+prev[led]+' '+intensity.toString()+'\n'// +speed;
	// // update previus value with new value!
	// prev[led] = intensity;
	// console.log(cmd);
	// inputStream.write(cmd);
	// inputStream.write('exit');
};

