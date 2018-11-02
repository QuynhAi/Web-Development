<?php
  # AI Quynh Nguyen
  # 5/28/18
  # TA: Conner Ardman
  # Assignment 7: Pokedex 2
  #
  # This php file outputs a JSON reponse of all the pokemon found
  # including name, nickname and datefound 
  
  include ('common.php');
  
  $all_pokemon = $db->query("SELECT * FROM Pokedex");
  $pokemon_arr = array("pokemon"=> []);
  
  foreach($all_pokemon as $each_pokemon){
    $pokemon_info = [
      "name" => $each_pokemon["name"],
      "nickname" => $each_pokemon["nickname"],
      "datafound" => $each_pokemon["datafound"]
    ];
    array_push($pokemon_arr["pokemon"], $pokemon_info);
  }  
  echo(json_encode($pokemon_arr));
?>