<?php
  # AI Quynh Nguyen
  # 5/28/18
  # TA: Conner Ardman
  # Assignment 7: Pokedex 2
  #
  # This php file trade your pokemon for someone else pokemon. Required two
  # parameters of mypokemon and theirpokemon
  
  include 'common.php';
  
  # if both of the required parameters of mypokemon and their pokemon
  # is not passed in.Then display a 400 error message and quit running the script
  if(!isset($_POST["mypokemon"]) && !isset($_POST["theirpokemon"])){
    parameter_both("mypokemon", "theirpokemon");
  }
  
  $my_pokemon = $_POST["mypokemon"];
  $their_pokemon = $_POST["theirpokemon"];
  
  # @param: mypokemon name and $db
  # if the name of my pokemon is not found in the pokedex, then display a 
  # 400 error message. If name of their pokemon is a pokemon that you already 
  # have, then display a 400 error message
  # Else, trade your pokemon for someone else pokemon 
  if(notfound($my_pokemon,$db)){
    header("HTTP/1.1 400 bad request");
    echo(json_encode(["error" => "Error: Pokemon {$my_pokemon} not found in your Pokedex"]));
    
  }elseif(!notfound($their_pokemon,$db)){
    header("HTTP/1.1 400 bad request");
    echo(json_encode(["error" => "Error: You have already found {$their_pokemon}"]));
    
  }else{
    date_default_timezone_set('America/Los_Angeles');
    $time = date('y-m-d H:i:s');
    $nickname = strtoupper($their_pokemon);
    
    $sql = "DELETE FROM Pokedex WHERE name = :name;";
    $stmt = $db->prepare($sql);
    $params = array("name" => $my_pokemon);
    $stmt->execute($params);
    
    $the_sql = "INSERT INTO Pokedex(name, nickname, datafound)
            VALUES (:name, :nickname, :datefound);";
    $the_stmt = $db->prepare($sql);
    $the_params = array("name" => $their_pokemon, "nickname" => $nickname, "datefound" => $time);
    $the_stmt->execute($the_params);
    
    echo(json_encode(["Success! You have traded your {$my_pokemon} for {$their_pokemon}"]));
  }
  
?>