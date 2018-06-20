/* 
	Ai Nguyen-Trieu
   	CSE 154
   	4/18/18
   	TA: Conner Ardman
   	Assignment #3

   	This javascript is for the ascii html file.
   	Allow the User Interface to run with the appropriate behavior
*/ 
(function() {
	"use strict";

	let timer = null;
	let timeDelay = 250; // inital delay time is 250ms 
	let frameSeparation = null;
	let theAnimation = null;
	let frameIndex;

	/*	Helper function to get the element by
		@param the string ID of the DOM element to retrieve
		@return the DOM element denoted by the ID given
	 */
	function $(id) {
  		return document.getElementById(id);
	}

	window.onload = function () { 

		let animation = $("animation");
		animation.onchange = animationList;

		let start = $("start");
		start.onclick = startButton;

		let stop = $("stop");
		stop.onclick = stopButton;
		stop.disabled = true; // button for stop is initialized disable

		let size = $("size");
		size.onchange = sizeList;

		let getRadioButton = document.querySelectorAll("input[name='speed']");
		for(let i = 0; i <getRadioButton.length; i++){
			getRadioButton[i].onchange = speedChange;
		}
	}; 

	// When the button is clicked, the asciimation going to start
	// The start button and animation drop down list going to be disabled(can't click on it)
	// while the stop button is still clickable
	// the animation is going to be play with the chosen speed(initaly 250ms)
	function startButton() {
		theAnimation = $("textarea").value; // get animation
		frameSeparation = theAnimation.split("=====\n"); // slipt the animation into parts
		timer = setInterval(myFunction, timeDelay); // play the animation with the chosen delay time
		$("start").disabled = true; 
		$("animation").disabled = true; 
		$("stop").disabled = false; 

	}

	// When the animation reaches the last frame
	// It goes back around and repeats indefinitely
	function myFunction() {
		$("textarea").value = frameSeparation[frameIndex]; // get the part of animation
		frameIndex++;
		if(frameIndex >= frameSeparation.length){// if it is last part of the separate animation  
			frameIndex = 0; 
		}
	}

	// When the stop button is clicked, stop animation
	// the start button and animation drop down list is clickable
	// the stop button is disabled(can't click)
	// Also stop the given timer
	function stopButton() {
		clearInterval(timer);
		frameIndex = 0; // reset the frame index
		$("textarea").value = theAnimation; // full animation redisplayed
		$("start").disabled = false;
		$("stop").disabled = true;
		$("animation").disabled = false;
	}

	// The animation is played with the speed that the user chose
	// The user can change the speed anytime during the animation playing
	function speedChange() {
		let radioButton = document.querySelectorAll("input[name='speed']");
		console.log("here");
		for(let i = 0; i < radioButton.length; i++) { // goes through to see which button is checked
			if(radioButton[i].checked){ // 
				timeDelay = radioButton[i].value; // set delaying time to be the value checked
			}
		}
		clearInterval(timer); 
		timer = setInterval(myFunction, timeDelay); // play the animation with the new speed
	}

	// Getting the asciimation art that the user chose and display on the textarea 
	function animationList() {
		let whichAnimation = $("animation").value;
		$("textarea").value = ANIMATIONS[whichAnimation];
	}

	// Change the size of the asciimation art based on what the user wants
	function sizeList() {
		let whichSize = $("size").value;
		$("textarea").style.fontSize = whichSize;
	}

})();
