
var child_process = require('child_process');
var fs = require('fs');

var pythonController = undefined;

var isHurbPythonRunning = false;
var inputStream = undefined;
var initHubHadware = function(){
	if(inputStream===undefined){
		isHurbPythonRunning = true;
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
	// terminate the python script and excecute the thing
	killEmorions();
};
var killEmorions = function(){
	if(inputStream!==undefined){
		inputStream.write("exit");
		console.log('exit emorions')
		// inputStream = undefined;
	}
}

exports.animateLED = function(led,intensity,speed){
	// console.log('animateLED');
	initHubHadware();
	// send the command to python :)
	cmd = '\nled '+led.toString()+' '+prev[led]+' '+intensity.toString()+'\n'// +speed;
	// update previus value with new value!
	prev[led] = intensity;
	console.log(cmd);

	inputStream.write(cmd);
	// inputStream.write('exit');
	// isHurbPythonRunning = false;
};

