<?php
  # AI Quynh Nguyen
  # 5/28/18
  # TA: Conner Ardman
  # Assignment 7: Pokedex 2
  #
  # This php file update the name of the pokemon into its nickname 
  # Required name of the pokemon, and nickname parameter is optional
  
  include 'common.php';
  
  # If the name of the pokemon of the required parameter did not get passed in. 
  # Then display an error message and quit running the script
  if(!isset($_POST["name"])){
    parameter_one("name");
  }
  
  $name = $_POST["name"];
  
  # if the parameters of name and nickname got passed in. Then the given name of 
  # pokemon become the given nickname. Display successful message when updated
  # if the name parameter passed in without a nickname parameter. Then the
  # nickname is the orginal name in uppercase. Then change the name into
  # the nickname. Display successful message when updated
  # if the name is not found in pokedex, display 400 error case
  if(isset($_POST["name"]) && isset($_POST["nickname"])){
    $nickname = $_POST["nickname"];
    helper($name, $nickname);
  }elseif(isset($_POST["name"])){
    $nickname = strtoupper($name);
    helper($name, $nickname);
  }else{
    if(notfound($name, $db)){
      header("HTTP/1.1 400 bad request");
      echo(json_encode([ "error" => "Error: Pokemon {$name} not found in your Pokedex." ]));
    }
  }
  
  # @param: name and nickname of the pokemon
  # update the original name of the pokemon to its nickname
  function helper($name, $nickname){
    $sql = "UPDATE Pokdex 
            SET name = :nickname
            WHERE name = :name;";
    $stmt = $db->prepare($sql);
    $params = array(":name" => $name, ":nickname" => $nickname);
    $stmt->execute($params);
    echo(json_encode(["sucess" => "Success! Your {$name} is now named {$nickname}"]));
  }
  
?>