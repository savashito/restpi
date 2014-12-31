var expect = require("chai").expect;
var audio = require("testAudio.js");
// var request = require("supertest");

// var mongoose = require('mongoose');
// var jobModel = require('../models/Job.js');
// var jobsData = require("../job-data.js");
// var findJobs = jobsData.findJobs;
// var connectDB = jobsData.connectDB;
// var resetJobs = jobsData.resetJobs;
// var Promise = require("bluebird");



// converts the connect function to a promise
// var connectDB = Promise.promisify(mongoose.connect,mongoose);



describe("play music :)",function(){
	var newSong='miau.mp3';
	var songPlayed;
	before (function(done){                                                                                     ('mongodb://localhost/jobfinder')
		// connectDB('mongodb://localhost/jobfinder')
		// .then(resetJobs()) // then receives a function or a promise
		// .then(jobsData.seedJobs)
		// .then(findJobs())
		// .then(function(jobs){
		// 	jobsList = jobs;
		// 	done();
		// });

		done();
	});
	/*
	it('Should be greater than 3',function(){
		expect(4).to.be.at.least(3);
	});
	*/
	it("Should play a song ",function(){
		/*request(app).post('/api/music').send(newSong).end(function(err,res){
			expect(songPlayed).to.deep.equal(newSong);

		})*/
	});
	it("Should increment volume of current song",function(){

	});
	/*
	it("Should never be empty since jobs are seeded",function(){
		expect(jobsList.length).to.be.at.least(1);
	});

	it("Should have a job with a title",function(){
		expect(jobsList[0].tittle).to.not.be.empty;
	});

	it("Should have a job with a description",function(){
		expect(jobsList[0].description).to.not.be.empty;
	});

*/

});