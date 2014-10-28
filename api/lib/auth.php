<?php
function accessCreds($name, $sql){
  global $app;
  try {
    $dbCon = getCreds();
    $stmt = $dbCon->prepare($sql);
    $stmt->bindParam("name", $name);
    $stmt->execute();
    $user = $stmt->fetchObject();
    $dbCon = null;
    return $user;
  } catch(PDOException $e) {
    $app->response()->status(500);
    header("Content-Type: application/json");
    echo json_encode(array("error" => $e->getMessage()));
    exit;
  }
}

function retSomething(){
  $answer = checkAuthKey();
  header("Content-Type: application/json");
  echo json_encode($answer);
  exit;
}

function checkAuthKey(){
  global $app;
  try{
    $headers = $app->request->headers;
    $user    = $headers->get('name');
    $key     = $headers->get('auth-token');

    if($user == 'guest' || $user == ''){
      return array("data" => "Guest User");
    } else {
      $creds = accessCreds($user, "SELECT `key` FROM creds WHERE name=:name LIMIT 10");
      if( $creds && $creds->key == $key){
        return array("data" => "correct");
      } else {
        $app->response()->status(401);
        return array("data" => "Incorrect Pass");
      }
    }
  } catch(Exception $e){
    $app->response()->status(500);
    return array("error" => $e->getMessage());
  }
}

function getAuthKey() {
  global $app;
  try{
    $headers = $app->request->headers;
    $user    = $headers->get('name');
    $pass    = $headers->get('pass');

    if($user == 'guest' || $user == ''){
      header("Content-Type: application/json");
      echo json_encode(array("data" => "Guest User"));
      exit;
    } else {
      $creds = accessCreds($user, "SELECT `password` FROM creds WHERE name=:name LIMIT 10");
      if( $creds && $creds->password == $pass){
        $creds = accessCreds($user, "SELECT `key` FROM creds WHERE name=:name LIMIT 10");
        header("Content-Type: application/json");
        echo json_encode(array("data" => $creds->key));
        exit;
      }else{
        $app->response()->status(401);
        header("Content-Type: application/json");
        echo json_encode(array("data" => "Incorrect Pass"));
        exit;
      }
    }
  } catch(Exception $e){
    $app->response()->status(500);
    header("Content-Type: application/json");
    echo json_encode(array("error" => $e->getMessage()));
    exit;
  }
}
