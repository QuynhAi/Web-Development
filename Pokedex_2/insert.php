<?php
  # AI Quynh Nguyen
  # 5/28/18
  # TA: Conner Ardman
  # Assignment 7: Pokedex 2
  #
  # This php file adds a pokemon to pokedex table. Required name parameter
  
  include ('common.php');
  
  # if the name parameter is not passed in, then an json error message
  # will display and quit running the script.
  if(!isset($_POST["name"])){
    parameter_one("name");
  }else{
    $name = $_POST["name"]; 
  }
  
  # if passed in nickname parameter, the nickname will be added with the pokemon
  # if the paramter is not passed in, then pokemon in pokedex table should
  # set to pokemon's name in uppercase
  if(isset($_POST["nickname"])){
    $nickname = $_POST["nickname"];
  }else{
    $nickname = strtoupper($name);
  }
  
  date_default_timezone_set('America/Los_Angeles');
  $time = date('y-m-d H:i:s');
  
  # if you do not have the pokemon in your pokedex, then add the name
  # of the pokemon, add the nickname of pokemon and the time found the pokemon
  # if the pokemon exists in the pokedex, then display an error message in json
  if(notFound($name, $db)){
    $sql = "INSERT INTO Pokedex(name, nickname, datafound)
            VALUES (:name, :nickname, :datefound);";
    $stmt = $db->prepare($sql);
    $params = array("name" => $name, "nickname" => $nickname, "datefound" => $time);
    $stmt->execute($params);
    echo(json_encode(["sucess" => "Sucess! {$name} added to your Pokedex!"]));
  }else{
    header("HTTP/1.1 400 Invalid Request");
    echo(json_encode(["error" => "Error: Pokemon {$name} already found"]));
  }
?>