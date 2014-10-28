<?php

function postItem() {
  global $app;
  $app->log->debug("POST");
  header("Content-Type: application/json");
  try {
    $data   = json_decode($app->request->getBody());
    $name   = $data->name;
    $phrase = $data->phrase;
    $answer = checkAuthKey();
    if($answer['data'] == 'correct'){
      $sql = "INSERT INTO items (name, phrase) VALUES(:name, :phrase)";
      $dbCon = getConnection2();
      $stmt = $dbCon->prepare($sql);
      $stmt->bindParam("name", $name);
      $stmt->bindParam("phrase", $phrase);
      $stmt->execute();
      $dbCon = null;
    } else{
      $app->response()->status(401);
      echo json_encode(array("No Access"));
    }
  } catch(PDOException $e) {
      //http_response_code(500);
      $app->response()->status(500);
      echo json_encode(array("error" => $e->getMessage()));
  }
}
function putItem($id) {
  global $app;
  $app->log->debug("PUT");
  header("Content-Type: application/json");
  try {
    $data   = json_decode($app->request->getBody());
    $app->log->debug("THIS IS HOW YOU DEBUG");
    $app->log->debug(json_encode($data));
    $name   = $data->name;
    $phrase = $data->phrase;
    $answer = checkAuthKey();
    if($answer['data'] == 'correct'){
      $sql = "UPDATE items set name=:name, phrase=:phrase WHERE id=:id";
      $dbCon = getConnection2();
      $stmt = $dbCon->prepare($sql);
      $stmt->bindParam("id", $id);
      $stmt->bindParam("name", $name);
      $stmt->bindParam("phrase", $phrase);
      $stmt->execute();
      $app->log->debug("EEENNDNDNDN");
      $dbCon = null;
    } else{
      $app->response()->status(401);
      echo json_encode(array("No Access"));
    }
  } catch(PDOException $e) {
      //http_response_code(500);
      $app->response()->status(500);
      echo json_encode(array("error" => $e->getMessage()));
  }
}
function deleteItem($id) {
  global $app;
  $app->log->debug("DELET");
  header("Content-Type: application/json");
  try {
    $answer = checkAuthKey();
    if($answer['data'] == 'correct'){
      $sql = "DELETE from items WHERE id=:id";
      $dbCon = getConnection2();
      $stmt = $dbCon->prepare($sql);
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $dbCon = null;
    } else{
      $app->response()->status(401);
      echo json_encode(array("No Access"));
    }
  } catch(PDOException $e) {
      //http_response_code(500);
      $app->response()->status(500);
      echo json_encode(array("error" => $e->getMessage()));
  }
}

function getItems() {
    global $app;
    $app->log->debug("QUERY");
    $sql = "SELECT * FROM items LIMIT 10";
    header("Content-Type: application/json");
    try {
      $answer = checkAuthKey();
      if($answer['data'] == 'correct'){
        $dbCon = getConnection2();
        $stmt   = $dbCon->query($sql);
        $owners  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo json_encode($owners);
        exit;
      } else{
        $app->response()->status(401);
        echo json_encode(array("No Access"));
        exit;
      }
    } catch(PDOException $e) {
        //http_response_code(500);
        $app->response()->status(500);
        echo json_encode(array("error" => $e->getMessage()));
        exit;
    }
}
function getItem($id){
    global $app;
    $app->log->debug("GET");
    $sql = "SELECT * FROM items WHERE id=:id";
    header("Content-Type: application/json");
    try {
        $dbCon = getConnection2();
        $stmt = $dbCon->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $owner = $stmt->fetchObject();
        $dbCon = null;
        if ($owner) {
          echo json_encode($owner);
        } else {
          throw new ResourceNotFoundException();
        }
    } catch (ResourceNotFoundException $e) {
        $app->response()->status(404);
    } catch(PDOException $e) {
        $app->response()->status(500);
        echo json_encode( $e->getMessage());
    }
}
