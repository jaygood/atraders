<?php
class ResourceNotFoundException extends Exception {}

function getOwners() {
    global $app;
    $sql = "SELECT * FROM ownertable LIMIT 10";
    //echo json_encode($sql);
    try {
        $dbCon = getConnection();
        $stmt   = $dbCon->query($sql);
        $owners  = $stmt->fetchAll(PDO::FETCH_OBJ);
        $dbCon = null;
        echo json_encode($owners);
    } catch(PDOException $e) {
        //http_response_code(500);
        $app->response()->status(500);
        echo json_encode($e->getMessage());
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
          echo json_encode($owner);
        } else {
          throw new ResourceNotFoundException();
        }
    } catch (ResourceNotFoundException $e) {
        $app->log->debug("THIS IS ERRROR");
        $app->response()->status(404);
    } catch(PDOException $e) {
        $app->response()->status(500);
        echo json_encode( $e->getMessage());
    }
}
