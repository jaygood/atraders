<?php
function postOrPut($id, $sql){
  global $app;
  try {
    $data   = json_decode($app->request->getBody());
    $name   = $data->name;
    $phrase = $data->phrase;
    $dbCon = getConnection2();
    $stmt = $dbCon->prepare($sql);
    $stmt->bindParam("name", $name);
    $stmt->bindParam("phrase", $phrase);
    if($id != -1) {$stmt->bindParam("id", $id);}
    $stmt->execute();
    $dbCon = null;
  } catch(PDOException $e) {
    header("Content-Type: application/json");
    $app->response()->status(500);
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}

function getOrDelete($id, $sql, $get) {
  global $app;
  header("Content-Type: application/json");
  try {
    $dbCon = getConnection2();
    $stmt = $dbCon->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    if($get){
      $item = $stmt->fetchObject();
    }
    $dbCon = null;
    if ($get) {
      if($item){
        echo json_encode(array("status" => "success" ,"data" => $item));
      } else {
        throw new ResourceNotFoundException();
      }
    }
  } catch (ResourceNotFoundException $e) {
    $app->response()->status(404);
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Resource not found'));
  } catch(PDOException $e) {
    $app->response()->status(500);
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}

function postItem() {
  $sql = "INSERT INTO items (name, phrase) VALUES(:name, :phrase)";
  postOrPut(-1, $sql);
}
function putItem($id) {
  $sql = "UPDATE items set name=:name, phrase=:phrase WHERE id=:id";
  postOrPut($id, $sql);
}

function getItem($id){
  $sql = "SELECT * FROM items WHERE id=:id";
  getOrDelete($id, $sql, true);
}

function deleteItem($id) {
  $sql = "DELETE from items WHERE id=:id";
  getOrDelete($id, $sql, false);
}

function getItems() {
    global $app;
    $app->log->debug("QUERY");
    $sql = "SELECT * FROM items LIMIT 10";
    header("Content-Type: application/json");
    try {
      $dbCon = getConnection2();
      $stmt   = $dbCon->query($sql);
      $items  = $stmt->fetchAll(PDO::FETCH_OBJ);
      $dbCon = null;
      // echo json_encode(array("status" => "success" ,"data" => $items));
      echo json_encode($items);
    } catch(PDOException $e) {
      $app->response()->status(500);
      echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
    }
}
