<?php
function getOwners() {
  global $app;
  $sql = "SELECT * FROM ownertable LIMIT 10";
  //echo json_encode($sql);
  header("Content-Type: application/json");
  try {
    $dbCon = getConnection();
    $stmt   = $dbCon->query($sql);
    $owners  = $stmt->fetchAll(PDO::FETCH_OBJ);
    $dbCon = null;
    //echo json_encode($owners);
    echo json_encode(array("status" => "success" ,"data" => $owners));
  } catch(PDOException $e) {
    $app->response()->status(500);
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}
function getOwner($id){
  global $app;
  //$sql = "SELECT `name`,`email`,`date`,`ip` FROM ownertable WHERE id=:id";
  $sql = "SELECT * FROM ownertable WHERE id=:id";
  try {
    $dbCon = getConnection();
    $stmt = $dbCon->prepare($sql);
    //$stmt->bindParam(':calories', $calories, PDO::PARAM_INT);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $owner = $stmt->fetchObject();
    $dbCon = null;
    if ($owner) {
      echo json_encode(array("status" => "success" ,"data" => $owner));
    } else {
      throw new ResourceNotFoundException();
    }
  } catch (ResourceNotFoundException $e) {
    $app->response()->status(404);
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . 'Resource not found'));
  } catch(PDOException $e) {
    $app->response()->status(500);
    echo json_encode(array("status" => "error", "message" => 'Exception: ' . $e->getMessage()));
  }
}
