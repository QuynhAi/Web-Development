/* 
	Ai Nguyen-Trieu
   	CSE 154
   	4/25/18
   	TA: Conner Ardman
   	Assignment #4

   	This is the javascript for the fifteen html, fifteen css file
   	A simple game consist a 4x4 grid of numbered squares with one square missing
   	The object of this game is to arrange the tiles into numerical oder 
   	by repeatedly sliding a square that neighbors the missing square 
   	into its empty space
*/

"use strict"; 
(function() {
	let emptyRow = 300; // the empty square's row
	let emptyCol = 300; //  the empty square's column
	const TILE_PIXEL = 100; // width and height of each tile
	const PUZZLE_LENGTH = 4; // number of rows and cols per puzzle piece

		// 
    window.onload = function () { 
    	// source: https://pngtree.com/freepng/cartoon-sleep--runny-nose--bubble-panda_3311353.html
    	$("copyright-info").innerHTML = "© 2017 by Diego Korzin";
			createPicture();
			let shuffle = $("shuffle-button");
			shuffle.onclick = shuffleFunction;
	};

	// Create the tiles for the game board with 15 tiles with each has a part of the whole picture
	// And one empty tile at the bottom corner. Each of the tile will have a number displayed
	// by numberial order.
	function createPicture() {
		for(let i = 0; i < PUZZLE_LENGTH; i++){ 
			for(let j = 0; j < PUZZLE_LENGTH; j++){
				if(i != (emptyRow / TILE_PIXEL) || j != (emptyCol / TILE_PIXEL)){

					let tile = document.createElement("div");
					tile.style.backgroundImage = "url('background.jpg')"; // set background
					tile.classList.add("puzzleTile"); // set style

					tile.style.top = i * TILE_PIXEL + "px"; // postion for column tile
					tile.style.left = j * TILE_PIXEL + "px"; // position for row tile

					// getting different position of the full image
					tile.style.backgroundPosition = (j * -TILE_PIXEL) + "px " + (i * -TILE_PIXEL) + "px";
					tile.innerHTML = (i * PUZZLE_LENGTH) + j + 1; // set number on each puzzle
					tile.id = "square_" + i + "_" + j;
					$("puzzle-area").appendChild(tile);

					// handlers for each puzzle tile; allow the user to click on the tile
					// and switch it;Also enable hover on movable tile
					tile.onclick = moveTile;
					tile.onmouseover = mouseOver; 
					tile.onmouseout = mouseOut;
				}
			}
		}
	}

	// When the user click on teh tile
	// check if the tile is movable(one spot of the surrounding neighbor is empty)
	// if it is movable, then move the clicked tile to that empty spot
	function moveTile() {
		if(emptyNeighbor(this)){
			let row = parseInt(this.style.left); 
			let col = parseInt(this.style.top);
			this.style.left = emptyRow + "px";
			this.style.top = emptyCol + "px";
			emptyCol = col; 
			emptyRow = row;
		}
	}

	// Take in the parameter of the current item/tile  
	// check if the neighbors around(the left and the right, the top and the bottom)
	// the puzzle tile are empty or not
	// return true if there is an empty spot and return false if no empty spot
	function emptyNeighbor(item) {
		let row = parseInt(item.style.left); 
		let col = parseInt(item.style.top);
		if(((row == emptyRow + TILE_PIXEL) || (row == emptyRow - TILE_PIXEL)) && (col == emptyCol)){
			return true;
		}else if(((col == emptyCol + TILE_PIXEL) || (col == emptyCol - TILE_PIXEL)) && row == emptyRow){
			return true;
		}
		return false;
	}
	
	// When the user hover over the tile
	// check if the tile is moveable(there is an empty spot in its surrounding)
	// if it is moveable then the tile going to change to red with a hand pointer
	function mouseOver() {
		if(emptyNeighbor(this)){
			this.classList.add("moveable");
		}
	}

	// when the user mouse out of the tile then change the tile apperance 
	// back to normal(black)
	function mouseOut() {
		this.classList.remove("moveable");
	}

	// when the shuffer button is clicked
	// randomly pick one of the possilities
	// and rearrange the tiles of the puzzle that user can solve
	function shuffleFunction() {
		for(let i = 0; i < 1000; i++){
			let possible = findPossibilities();
			let random = possible[parseInt(Math.random() * possible.length)];
			random.click();
		}
	}

	// find the possible tiles that can be moved into the empty spot
	function findPossibilities() {
		let allPieces = document.querySelectorAll(".puzzleTile");
		let valid = [];
		for(let i = 0; i < allPieces.length; i++){
			if(emptyNeighbor(allPieces[i])) {
				valid.push(allPieces[i]);
			}
		} 
		return valid;
	}

	/**
     *  Shortcut to get the document element by id
     *  @param the string value of the ID of the DOM element you are getting
     *  @return the DOM element with that particular ID
  */
	function $(id) {
		return document.getElementById(id);
	}

})();
