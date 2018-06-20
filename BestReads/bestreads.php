<?php
# AI Quynh Nguyen
# 5/22/18
# TA: Conner Ardman
# Assignment 6: Best Reads
#
# This PHP file is connected with the best read webpage. It takes parameters
# like mode and title in URL from user. Use the parameter get the data in text 
# or JSON format. 

  # check if the mode and title is set or not. If not, then 400 error message 
  # going to display. If the user type one of the valid mode including 
  # description, info and reviews; Then content of chosen mode of the chosen title
  # going to display in text or json format. 
  
  error_reporting(E_ALL);
  if(isset($_GET["mode"])){
    $mode = $_GET["mode"];
    
    if(isset($_GET["title"])){
      $title = $_GET["title"];
      
      if($mode == "description"){
        theDescription($title);
      }elseif($mode == "info"){
        $information = file("books/$title/info.txt");
        theInformation($information);
      }elseif($mode == "reviews"){
        $reviewFiles = glob("books/$title/review*.txt");
        theReview($reviewFiles);
      }
    }elseif($mode == "books"){
      $booksFiles = glob("books/*");
      allBooks($booksFiles);
    }else{
      header("HTTP/1.1 400 Invalid Request");
      die("Error: Please remember to add the title parameter when using a mode of of description, info or reviews.");
    }
    
  }else{
    header("HTTP/1.1 400 Invalid Request");
    die("Error: Please provide a mode of description, info, reviews, or books.");
  }
  
  # @param of the $bookFiles, which is an array all of the book folders
  # get the tite and the folder of each book
  # display in a json format
  function allBooks($booksFiles){
    header("Content-Type: application/json");
    $bookList = array("books" => []);
    foreach($booksFiles as $bookFile){
      $explode = explode("/", $bookFile);
      $content = file("$bookFile/info.txt");
      $bookOuput = array(
        "title" => trim($content[0]),  
        "folder" => trim($explode[1])
      );
      array_push($bookList["books"], $bookOuput);
    }
    echo json_encode($bookList);
  }
  
  # @param $reviewsFiles, which is an array of review file names
  # Get the name of each reviewer, score of the book, and each reviewer' comment
  # display in the json format
  function theReview($reviewFiles){
    header("Content-Type: application/json");
    $reviewArray = [];
    foreach($reviewFiles as $reviewFile){
      $content = file($reviewFile);
      $reviewOutput = array(
        "name" => trim($content[0]), 
        "score" => trim($content[1]),
        "text" => trim($content[2])
      );
      array_push($reviewArray, $reviewOutput);
    }
    echo json_encode($reviewArray);
  }

  # @param $title, which is the title of the specific chosen book
  # get the description of the book and print it out as plain text
  function theDescription($title){
    $content = file("books/$title/description.txt");
    header("Content-Type: text/plain");
    echo $content[0];
  }
  
  # @param $information, which the information of the book
  # including the title, the author and number of stars
  # print the information in the JSON format
  function theInformation($information){
    header("Content-Type: application/json");
    $bookInfo = array(
      "title" => trim($information[0]),
      "author" => trim($information[1]),
      "stars" => trim($information[2])
    );
    echo json_encode($bookInfo);
  }
?>