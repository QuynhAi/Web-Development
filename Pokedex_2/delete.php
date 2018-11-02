<?php
  # AI Quynh Nguyen
  # 5/28/18
  # TA: Conner Ardman
  # Assignment 7: Pokedex 2
  #
  # This php file delete a pokemon or delete all pokemon in pokedex
  # Required name of the pokemon or mode paramter
  
  include 'common.php';
  
  # if both name and mode parameters are not passed in. Then display an 400
  # error message and and quit running the script
  if(!isset($_POST["name"]) && !isset($_POST["mode"])){
    parameter_or("name", "mode");
  }  
  
  # if the mode paramter is passed in. If the mode parameter is removeall then
  # remove all the pokemons in your pokedex. If the mode paramter is something else,
  # then display 400 error display and and quit running the script
  if(isset($_POST["mode"])){
    $mode = $_POST["mode"];
    if($mode == "removeall"){
      $delete_all = $db->exec("DELETE FROM Pokdex");
      echo(json_encode(["success" => "Sucess! All Pokemon removed from your Pokedex!"]));
    }else{
      header("HTTP/1.1 400 bad request");
      die(json_encode(["error" => "Error: Unknown mode {$mode}"]));
    }
  }
  
  # if the name parameter is passes in. if the name of the pokemon is not found
  # then display a 400 error message and and quit running the script
  # if the name is found then delete that pokemon from the pokedex board
  if(isset($_POST["name"])){
    $name = $_POST["name"];
    if(notfound($name,$db)){
      header("HTTP/1.1 400 bad request");
      die(json_encode(["error" => "Error: Pokemon {$name} not found in your Pokedex"]));
    }else{
      $sql = "DELETE FROM Pokedex WHERE name = :name;";
      $stmt = $db->prepare($sql);
      $params = array("name" => $name);
      $stmt->execute($params);
      echo(json_encode(["success" => "Success! {$name} removed from your Pokedex! "]));
    }
  }
?>