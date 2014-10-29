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
    if($answer['status'] == 'success'){
      $sql = "INSERT INTO items (name, phrase) VALUES(:name, :phrase)";
      $dbCon = getConnection2();
      $stmt = $dbCon->prepare($sql);
      $stmt->bindParam("name", $name);
      $stmt->bindParam("phrase", $phrase);
      $stmt->execute();
      $dbCon = null;
    } else{
      $app->response()->status(401);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Unauthorized'));
    }
  } catch(PDOException $e) {
      $app->response()->status(500);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}
function putItem($id) {
  global $app;
  $app->log->debug("PUT");
  header("Content-Type: application/json");
  try {
    $data   = json_decode($app->request->getBody());
    $name   = $data->name;
    $phrase = $data->phrase;
    $answer = checkAuthKey();
    if($answer['status'] == 'success'){
      $sql = "UPDATE items set name=:name, phrase=:phrase WHERE id=:id";
      $dbCon = getConnection2();
      $stmt = $dbCon->prepare($sql);
      $stmt->bindParam("id", $id);
      $stmt->bindParam("name", $name);
      $stmt->bindParam("phrase", $phrase);
      $stmt->execute();
      $dbCon = null;
    } else{
      $app->response()->status(401);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Unauthorized'));
    }
  } catch(PDOException $e) {
      $app->response()->status(500);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}
function deleteItem($id) {
  global $app;
  $app->log->debug("DELET");
  header("Content-Type: application/json");
  try {
    $answer = checkAuthKey();
    if($answer['status'] == 'success'){
      $sql = "DELETE from items WHERE id=:id";
      $dbCon = getConnection2();
      $stmt = $dbCon->prepare($sql);
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $dbCon = null;
    } else{
      $app->response()->status(401);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Unauthorized'));
    }
  } catch(PDOException $e) {
      $app->response()->status(500);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}

function getItems() {
    global $app;
    $app->log->debug("QUERY");
    $sql = "SELECT * FROM items LIMIT 10";
    header("Content-Type: application/json");
    try {
      $answer = checkAuthKey();
      if($answer['status'] == 'success'){
        $dbCon = getConnection2();
        $stmt   = $dbCon->query($sql);
        $items  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo json_encode(array("status" => "success" ,"data" => $items));
      } else{
        $app->response()->status(401);
        echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Unauthorized'));
      }
    } catch(PDOException $e) {
        $app->response()->status(500);
        echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
    }
}
function getItem($id){
    global $app;
    $app->log->debug("GET");
    $sql = "SELECT * FROM items WHERE id=:id";
    header("Content-Type: application/json");
    try {
      $answer = checkAuthKey();
      if($answer['status'] == 'success'){
        $dbCon = getConnection2();
        $stmt = $dbCon->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $item = $stmt->fetchObject();
        $dbCon = null;
        if ($owner) {
          echo json_encode(array("status" => "success" ,"data" => $item));
        } else {
          throw new ResourceNotFoundException();
        }
      } else{
        $app->response()->status(401);
        echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Unauthorized'));
      }
    } catch (ResourceNotFoundException $e) {
        $app->response()->status(404);
        echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Resource not found'));
    } catch(PDOException $e) {
        $app->response()->status(500);
        echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
    }
}
