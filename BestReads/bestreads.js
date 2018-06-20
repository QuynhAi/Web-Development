/**
  Ai Nguyen-Trieu
  CSE 154
  5/23/18
  TA: Conner Ardman
  Homework #6
  
  This javascript file  use Ajax fetch to request data from php service and 
  insert it into the best read website
*/

"use strict"; 
/*global fetch*/
(function() {
  window.onload = function() {  
    bookAjax();
    $("back").onclick = home;
  }; 
  
  /**
  * Ajax fetch call
  * When the page is loads, request all of the books from web service
  */ 
  function bookAjax(){
    let url = "bestreads.php?mode=books";
    fetch(url, {credentials: 'include'}) // include credentials for cloud9
      .then(checkStatus)
      .then(JSON.parse)
      .then(displayBook)
      .catch(errorMessage);
  }
  
  /**
  * @param {object}response 
  * Display all books with each individual book cover and the book title
  */ 
  function displayBook(response){
    let bookJSON = response["books"];
    for(let i = 0; i < bookJSON.length; i++){
      let div = document.createElement("div");
      let image = document.createElement("img");
      image.src = "books/" + bookJSON[i]["folder"] + "/cover.jpg";
      let title = document.createElement("p");
      title.innerHTML = bookJSON[i]["title"];
      div.onclick = chosenBook;
      div.id = bookJSON[i]["folder"];
      div.appendChild(image);
      div.appendChild(title);
      $("allbooks").appendChild(div);
    }  
  }
  
  /**
  * if one out of all the books is clicked then display the individual book
  * content including the book cover, the book description, the book info
  * like title, author, star of the book, and the book reviews
  */ 
  function chosenBook(){
    let myID = this.id;
    $("allbooks").classList.add("hidden");
    $("singlebook").classList.remove("hidden");
    $("cover").src = "books/" + myID + "/cover.jpg"; 
    singleDescription(myID);
    singleInfo(myID);
    singleReviews(myID);
  }
  
  /**
  * @param the id of the clicked on book  
  * When the individual book is clicked, make an ajax fetch call
  * to get all the information of the book
  */ 
  function singleInfo(myID){
    let url = "bestreads.php?title=" + myID + "&mode=info";
    fetch(url, {credentials: 'include'}) // include credentials for cloud9
      .then(checkStatus)
      .then(JSON.parse)
      .then(singleInfoFunction)
      .catch(errorMessage);
  }
  
  /**
  * @param {object}response
  * Display the information of the individual book including
  * the title, the author and the start rating of the book
  */ 
  function singleInfoFunction(response){
    $("title").innerHTML = response["title"];
    $("author").innerText = response["author"];
    $("stars").innerText = response["stars"];
  }
  
  /**
  * @param the id of the clicked on book 
  * When the individual book is clicked, make an ajax call
  * to get the description of the book and display it
  */ 
  function singleDescription(myID){
    let url = "bestreads.php?title=" + myID + "&mode=description";
    fetch(url, {credentials: 'include'}) // include credentials for cloud9
      .then(checkStatus)
      .then(function(response){
        $("description").innerHTML = response;
      })
      .catch(errorMessage);
  }
  
  /**
  * @param the id of the clicked on book 
  * Ajax fecth call to get all the reviews for the book
  */ 
  function singleReviews(myID){
    let url = "bestreads.php?title=" + myID + "&mode=reviews";
    fetch(url, {credentials: 'include'}) // include credentials for cloud9
      .then(checkStatus)
      .then(JSON.parse)
      .then(bookReviewsFunction)
      .catch(errorMessage);
  }
  
  /**
  * @param {object}response
  * When the individual book is clicked, display all of the reviews for that book
  * which include the name of the person and rating star that person gave the book
  * and a description of what the person said about the book
  */ 
  function bookReviewsFunction(reponse){
    let bookJSON = reponse;
    for(let i = 0; i < bookJSON.length; i++){
      let section = document.createElement("section");
      let title = document.createElement("h3");
      title.innerHTML = bookJSON[i]["name"] + " ";
      let score = document.createElement("span");
      score.innerHTML = bookJSON[i]["score"];
      title.appendChild(score);
      let text = document.createElement("p");
      text.innerHTML = bookJSON[i]["text"];
      section.appendChild(title);
      section.appendChild(text);
      $("reviews").appendChild(section);
    }
  }
  
  /**
  * if the web service returns an error. Display an error message 
  * to let the user know
  */  
  function errorMessage(error){
    $("error-message").classList.remove("hidden");
    $("error-text").innerText = error;
  }
  
  /**
  * When the home button is clicked, it going back to the main page display
  * which is the page including all books
  */
  function home(){
    $("allbooks").classList.remove("hidden");
    $("singlebook").classList.add("hidden");
  }
    
   /**
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

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }
})();
