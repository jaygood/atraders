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
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}

function verifyKey() {
  global $app;
  try{
    $headers = $app->request->headers;
    $user    = $headers->get('name');
    $key     = $headers->get('auth-token');
    if($user == 'guest' || $user == ''){
      $app->status(400);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Unauthorized'));
      $app->stop();
    } else {
      $creds = accessCreds($user, "SELECT `key` FROM creds WHERE name=:name LIMIT 10");
      if( $creds && ($creds->key == $key)){
      } else {
        $app->status(400);
        echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Unauthorized'));
        $app->stop();
      }
    }
  } catch(Exception $e) {
    $app->stop();
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
    } else {
      $creds = accessCreds($user, "SELECT `password` FROM creds WHERE name=:name LIMIT 10");
      if( $creds && $creds->password == $pass){
        $creds = accessCreds($user, "SELECT `key` FROM creds WHERE name=:name LIMIT 10");
        header("Content-Type: application/json");
        echo json_encode(array("status" => "success" ,"data" => $creds->key));
      }else{
        $app->response()->status(401);
        header("Content-Type: application/json");
        echo json_encode(array("status" => "error" ,"data" => "Incorrect Password"));
      }
    }
  } catch(Exception $e){
    $app->response()->status(500);
    header("Content-Type: application/json");
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}
