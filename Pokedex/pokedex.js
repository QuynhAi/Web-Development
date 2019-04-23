/* Ai Nguyen-Trieu
  5/8/18
  TA: Conner Ardman
  Homework #5

  This is the javascript file for pokedex.html.
  A Pokedex is an encyclopedia (or album) of different Pokemon
  species, representing each Pokemon as a small “sprite” image. In this 
  assignment, a Pokedex entry (referenced by the sprite image) will link directly
  to a Pokemon card, which is a card of information for a single Pokemon
  species, containing a larger image of the Pokemon, its type and weakness 
  information, its set of moves, health point data, and a short description.
*/

/*global fetch*/
"use strict";
(function() {
  const URL = "https://webster.cs.washington.edu/pokedex/";
  const POKI = ["bulbasaur.png", "charmander.png", "squirtle.png"];
  let guid;
  let pid;
  let pokiHP;
  let myPokemon;
  window.onload = function() {  
    pokedex();
    
    // let mybutton = $("my-card").querySelectorAll("div.moves button");
    // for(let i = 0; i < mybutton.length; i++) {
    //   mybutton[i].disabled = false;
    //   mybutton[i].onclick = fighting;
    // }
    //debugger;
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('found')) {
        showPokiCard();
      }
    });
    
    $("endgame").onclick = endGame;
    $("flee-btn").onclick = fleeing;
  };
  
  function fleeing() {
    debugger;
    let data = new FormData();
    let url = URL + "game.php";
    data.append('guid', guid);
    data.append('pid', pid);
    data.append('movename', "flee");
    fetch(url, {method: "POST", body: data, credentials: 'cors'})
    .then(checkStatus)
    .then(JSON.parse)
    .then(gamePlay)
    .catch(console.log);
  }

  
  function endGame(response) {
    $("endgame").classList.add("hidden");
    $("pokedex-view").classList.remove("hidden");
    $("start-btn").classList.remove("hidden");
    $("their-card").classList.add("hidden");
    $("flee-btn").classList.add("hidden");
    
    $("results-container").classList.add("hidden");
    $("p1-turn-results").classList.add("hidden");
    $("p2-turn-results").classList.add("hidden");
    
    $("p1-turn-results").innerText = "";
    $("p2-turn-results").innerText = "";
    
    document.querySelector(".hp-info").classList.add("hidden");
    let name = document.querySelectorAll(".health-bar");
    for(let i = 0; i < name.length; i++){
      name[i].style.width = 100 + "%";
      name[i].classList.remove("low-health");
    }
    $("my-card").querySelector(".hp").innerHTML = pokiHP;
    $("title").innerText = "Your Pokedex";
    
  }
  function theirCardFunction(response){
    let myid = $("their-card");
    callFunction(response, myid);
    $("pokedex-view").classList.add("hidden");
    $("start-btn").classList.add("hidden");
    $("their-card").classList.remove("hidden");
    $("flee-btn").classList.remove("hidden");
    
    document.querySelector(".hp-info").classList.remove("hidden");
    document.querySelector(".buffs").classList.remove("hidden");
    
    $("results-container").classList.remove("hidden");
    $("p1-turn-results").classList.remove("hidden");
    $("p2-turn-results").classList.remove("hidden");
    
    $("title").innerText = "Pokemon Battle Model";
    
    let mybutton = $("my-card").querySelectorAll("div.moves button");
    for(let i = 0; i < mybutton.length; i++) {
      mybutton[i].disabled = false;
      mybutton[i].onclick = fighting;
    }
  }
  
  function fighting(){
    let name = this.querySelector(".move").innerHTML;
    name = name.toLowerCase().replace(/ +/g, "");
    
    // document.ajaxStart(function(){
    //   $("loading").classList.remove("hidden");
    // });
    // document.ajaxComplete(function(){
    //   $("loading").classList.add("hidden");
    // });
    
    let data = new FormData();
    let url = URL + "game.php";
    data.append('guid', guid);
    data.append('pid', pid);
    data.append('movename', name);
    fetch(url, {method: "POST", body: data, credentials: 'cors'})
    .then(checkStatus)
    .then(JSON.parse)
    .then(gamePlay)
    .catch(console.log);
  }
  
  function gamePlay(response){
    pokiHP = response["p1"]["hp"] + "HP";
    $("p1-turn-results").innerText = "Player 1 played " +
                                      response["results"]["p1-move"] +
                                      " and " + response["results"]["p1-result"] + "!";
    
    $("p2-turn-results").innerText = "Player 2 played " +
                                      response["results"]["p2-move"] +
                                      " and " + response["results"]["p2-result"] + "!";
    // .accuracy.buff
    debugger;
    console.log(response["p1"]["buffs"]);
    console.log(response["p2"]["buffs"]);
    console.log(response["p1"]["debuffs"]);
    console.log(response["p2"]["debuffs"]);
    
    let buff = response["p1"]["buffs"];
    let theirBuff = response["p2"]["buffs"];
    let debuff = response["p1"]["debuffs"];
    let theirDebuff = response["p2"]["debuffs"];
    
    console.log($("my-card").querySelector(".buffs"));
    
    for(let i = 0; i < buff.length; i++) {
      if(buff[i] == "attack") {
        $("my-card").querySelector(".buffs").classList.add("buffs","attack");
      }else if(buff[i] == "defense") {
        $("my-card").querySelector(".buffs").classList.add("buffs","defense");
      }else if(buff[i] == "accuracy") {
        $("my-card").querySelector(".buffs").classList.add("buffs","accuracy");
      }
    }
    
    for(let i = 0; i < theirBuff.length; i++) {
      if(theirBuff[i] == "attack") {
        $("their-card").querySelector(".buffs").classList.add("buffs","attack");
      }else if(theirBuff[i] == "defense") {
        $("their-card").querySelector(".buffs").classList.add("buffs","defense");
      }else if(theirBuff[i] == "accuracy") {
        $("their-card").querySelector(".buffs").classList.add("buffs","accuracy");
      }
    }
    
    for(let i = 0; i < debuff.length; i++) {
      if(debuff[i] == "attack") {
        $("my-card").querySelector(".buffs").classList.add("debuffs","attack");
      }else if(debuff[i] == "defense") {
        $("my-card").querySelector(".buffs").classList.add("debuffs","defense");
      }else if(debuff[i] == "accuracy") {
        $("my-card").querySelector(".buffs").classList.add("debuffs","accuracy");
      }
    }
    
    for(let i = 0; i < theirDebuff.length; i++) {
      if(theirDebuff[i] == "attack") {
        $("their-card").querySelector(".buffs").classList.add("debuffs","attack");
      }else if(theirDebuff[i] == "defense") {
        $("their-card").querySelector(".buffs").classList.add("debuffs","defense");
      }else if(theirDebuff[i] == "accuracy") {
        $("their-card").querySelector(".buffs").classList.add("debuffs","accuracy");
      }
    }
    
    $("my-card").querySelector(".hp").innerHTML = response["p1"]["current-hp"] + "HP";
    $("their-card").querySelector(".hp").innerHTML = response["p2"]["current-hp"] + "HP";
    
    damage(response);
    loseWin(response);
  }
  
  function damage(response) {
    let myHealth = Math.round(response["p1"]["current-hp"] /
                  response["p1"]["hp"] * 100);
    $("my-card").querySelector(".health-bar").style.width = myHealth + "%";
    
    let theirHealth = Math.round(response["p2"]["current-hp"] /
                      response["p2"]["hp"] * 100);
    $("their-card").querySelector(".health-bar").style.width = theirHealth + "%";
    
    if(myHealth < 20) {
      $("my-card").querySelector(".health-bar").classList.add("low-health");
    } 
    if(theirHealth < 20) {
      $("their-card").querySelector(".health-bar").classList.add("low-health");
    }
  }

  function loseWin(response){
    if(response["p1"]["current-hp"] == 0 ){
      $("title").innerText = "You lost!";
    }else if(response["p2"]["current-hp"] == 0) {
      $("title").innerText = "You won!";
    }
    if(response["p1"]["current-hp"] == 0 || response["p2"]["current-hp"] == 0) {
    $("endgame").classList.remove("hidden");
    }
    
    if(response["results"]["p2-move"] == null) {
      debugger;
      $("p2-turn-results").classList.add("hidden");
      if(response["p2"]["current-hp"] == 0 ){
        console.log($("their-card").querySelector(".pokemon-pic img").className);
        $("their-card").querySelector(".pokemon-pic img").classList.add('found');
        //let spriteurl = URL + "sprites/"+ response["p2"]["name"].toLowerCase() + ".png";
        //console.log(spriteurl);
        //console.log($(response["p2"]["name"]));
        //$(response["p2"]["name"]).innerHTML += "<img src=\"" + spriteurl + "\" id=\"" + response["p2"]["name"] + "\" class=\"sprite found\">";
      }
    }
  }
    
  function startGame() {
    let data = new FormData();
    let url = URL + "game.php";
    data.append('startgame', 'true');
    data.append('mypokemon', myPokemon);
    fetch(url, {method: "POST", body: data, credentials: 'cors'})
    .then(checkStatus)
    .then(JSON.parse)
    .then(letStart)
    .catch(console.log);
  }

  function letStart(response){
    pid = response.pid;
    guid = response.guid;
    let randomName = response["p2"].name;
    
    let theURL = URL + "pokedex.php?pokemon=" + randomName;
    fetch(theURL, {credentials: 'cors'}) // include credentials for cloud9
    .then(checkStatus)
    .then(JSON.parse)
    .then(theirCardFunction)
    .catch(console.log);
  }
  
  // making ajax fetch request
  function showPokiCard(){
    let theURL = URL + "pokedex.php?pokemon=" + event.target.id;
    myPokemon = event.target.id;
    fetch(theURL, {credentials: 'cors'}) // include credentials for cloud9
    .then(checkStatus)
    .then(JSON.parse)
    .then(myCardFunction)
    .catch(console.log);
  }
  
  // @param {object}response
  // When the user clicked on one of the found pokemon card, then the name, 
  // the profile picture, the description, the health point, the type icon,
  // the weakness icon and all of the attack movements going to display
  // after all the details about the clicked pokemon appear, the "Choose this
  // pokemon" going to appear
  function myCardFunction(response){
    let myid = $("my-card");
    callFunction(response, myid);
    $("start-btn").classList.remove("hidden");
    $("start-btn").onclick = startGame;
  }
  
  // When the player clicked on the found pokemon, the icon type, card name, card description
  // card HP, card weakness, profile picture and all movements of 
  // the clicked pokemon going to display. Replacing the old/original
  function callFunction(response, myid){
    let pokiName = myid.getElementsByClassName("name")[0];
    pokiName.innerHTML = response.name; 
    
    let info = myid.getElementsByClassName("info")[0];
    info.innerHTML = response["info"]["description"];
    
    let hp = myid.getElementsByClassName("hp")[0];
    hp.innerHTML = response.hp + "HP";
    
    let weakness = myid.getElementsByClassName("weakness")[0];
    let data1 =  response["images"]["weaknessIcon"];
    weakness.src = URL + data1;
    
    let profilePic = myid.getElementsByClassName("pokepic")[0];
    let data2 =  response["images"]["photo"];
    profilePic.src = URL + data2;
    
    let icon = myid.getElementsByClassName("type")[0];
    let data3 =  response["images"]["typeIcon"];
    icon.src = URL + data3;
    
    myMove(response, myid);
  }
  
  // When the player clicked on the found pokemon, then it going to display all
  // the attack movement that the pokemon has.(between 1 and 4 moves, depending 
  // on the Pokemon)It going to display the type of icon and the name of each 
  // movement. If the attack moment has a dp then it is going to diplay that also.
  function myMove(response, myid) {
    let myLength = response["moves"];
    let move = myid.querySelectorAll("div.moves img");
    let moveName = myid.querySelectorAll("div.moves span.move");
    let myDP = myid.querySelectorAll("div.moves span.dp");
    let button = myid.querySelectorAll("div.moves button");
    
    for(let i = 0; i < myLength.length; i++){
      let moreData = response["moves"][i]["type"];
      move[i].src = URL + "icons/" + moreData + ".jpg";
      
      if(response["moves"][i].hasOwnProperty('dp')){
        let dpNum = response["moves"][i]["dp"];
        myDP[i].innerHTML = dpNum + "DP";
      } else {
        myDP[i].innerHTML = "";
      }
      
      let data = response["moves"][i]["name"];
      moveName[i].innerText = data;
    }
    
    for(let b = myLength.length; b < move.length; b++) {
      button[b].classList.add("hidden");
    }
  }
  
  // making ajax fetch request
  function pokedex(myid) {
    let nameurl = URL + "pokedex.php?pokedex=all";
    fetch(nameurl, {credentials: 'cors'}) // include credentials for cloud9
    .then(checkStatus)
    .then(myPokedexFunction)
    .catch(console.log);
  }
  
  // @param {object}response
  // Display all 151 pokemon sprite icon in black shadows. The player initially 
  // get 3 pokemons(including bulbasaur, charmander, squirtle). if the player
  // own the pokemon (found) then pokemon going to appear in color
  // if not found, then it going to remain black shadow
  function myPokedexFunction(responseText){
    let pokiIcon = responseText.split("\n");
    for(let i = 0; i < pokiIcon.length; i++){
      let eachPokiName = pokiIcon[i].split(":");
      let spriteurl = URL + "sprites/" + eachPokiName[1];
      
      let imageClass = 'sprite';
      for(let i = 0; i < POKI.length; i++) {
        if(eachPokiName[1] === POKI[i]) {
          imageClass += ' found'; 
        }
      }
      //console.log("\"" + spriteurl + "\"");
      //console.log($("pokedex-view").src = "\"" + spriteurl + "\"");

      $("pokedex-view").innerHTML += "<img src=\"" + spriteurl + "\" id=\"" +
      eachPokiName[0]+ "\" class=\"" + imageClass + "\">";
    }
  }
   /*
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid result text if response was successful, otherwise 
   *                    rejected Promise result
   */
  function checkStatus(response) { 
    if (response.status >= 200 && response.status < 300 || response.status == 0){  
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText)); 
    } 
  }

  /*
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }
})();
