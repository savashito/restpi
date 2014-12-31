var ledHurb = require('./hurbHardware');
var color = ledHurb.color;
var currentState = undefined;

var makeSad = function(){
	ledHurb.animateLED(color.red, 100); // animate with default speed
	ledHurb.animateLED(color.blue, 30); // animate with default speed
	ledHurb.animateLED(color.green, 3); // animate with default speed
	ledHurb.animateLED(color.green, 40); // animate with default speed
	ledHurb.dumpEmotions(); // dumps the queue of emotions :)
};

var makeHappy = function(){
	ledHurb.animateLED(color.green, 100); // animate with default speed
	ledHurb.animateLED(color.blue, 30); // animate with default speed
	ledHurb.animateLED(color.red, 0); // animate with default speed
	ledHurb.dumpEmotions();
};
makeSad();
exports.makeSad = makeSad;
exports.makeHappy = makeHappy;

