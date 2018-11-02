<?php
  # AI Quynh Nguyen
  # 5/28/18
  # TA: Conner Ardman
  # Assignment 7: Pokedex 2
  #
  # This php file including all the shared code from all php files
  
  error_reporting(E_ALL);
  
  header("Content-Type: application/json");
  
  $ds = "mysql:host=localhost;dbname=hw7;charset=uft8";
  $db = new PDO($ds, "root", "");
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
  # when the requirement is one parameter but the user did not pass in the 
  # paramter. The display the error message and quit running the script
  function parameter_one($param1){
      header("HTTP/1.1 400 bad request");
      die(json_encode(["error" => "Missing {$param1} parameter"]));
  }
  
  # when the requirement is two parameters but the user did not pass in the 
  # paramter. The display the error message and quit running the script
  function parameter_both($param1, $param2){
    header("HTTP/1.1 400 bad request");
    die(json_encode(["error" => "Missing {$param1} and {$param2} parameter"]));
  }
  
  # when the requirement one or the other parameters but the user did not pass in
  # any parameter. Then display an error message and quit running the script
  function parameter_or($param1, $param2){
    header("HTTP/1.1 400 bad request");
    die(json_encode(["error"=> "Missing {$param1} or {$param2} parameters"]));
  }
  
  # @param of name of pokemon and db
  # checking if the name of the pokemon exists in the pokedex
  # return true or false of whether pokemon exists
  function notfound($name, $db){
    $query = "SELECT * FROM Pokedex WHERE name = '$name'";
    $result = $db->query($query);
    return $result->rowCount() == 0;
  }
  
?>