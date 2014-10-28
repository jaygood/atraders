<?php
class ResourceNotFoundException extends Exception {}

function getOwners() {
    global $app;
    $sql = "SELECT * FROM ownertable LIMIT 10";
    //echo json_encode($sql);
    header("Content-Type: application/json");
    try {
      $answer = checkAuthKey();
      if($answer['data'] == 'correct'){
        $dbCon = getConnection();
        $stmt   = $dbCon->query($sql);
        $owners  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo json_encode($owners);
        exit;
      } else{
        $app->response()->status(401);
        echo json_encode(array("No Access"));
        //echo json_encode('"error":{"text":' . $e->getMessage() . '}}');
        exit;
      }
    } catch(PDOException $e) {
        //http_response_code(500);
        $app->response()->status(500);
        echo json_encode(array("error" => $e->getMessage()));
        //echo json_encode('"error":{"text":' . $e->getMessage() . '}}');
        exit;
    }
}
function getOwner($id){
    global $app;
    //$sql = "SELECT `name`,`email`,`date`,`ip` FROM ownertable WHERE id=:id";
    $sql = "SELECT * FROM ownertable WHERE id=:id";
    try {
      $answer = checkAuthKey();
      if($answer['data'] == 'correct'){
        $dbCon = getConnection();
        $stmt = $dbCon->prepare($sql);
        //$stmt->bindParam(':calories', $calories, PDO::PARAM_INT);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $owner = $stmt->fetchObject();
        $dbCon = null;
        if ($owner) {
          echo json_encode($owner);
        } else {
          throw new ResourceNotFoundException();
        }
      } else{
        $app->response()->status(401);
        echo json_encode(array("No Access"));
      }
    } catch (ResourceNotFoundException $e) {
        $app->log->debug("THIS IS ERRROR");
        $app->response()->status(404);
    } catch(PDOException $e) {
        $app->response()->status(500);
        echo json_encode( $e->getMessage());
    }
}
