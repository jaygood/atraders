<?php
function getItems() {
    global $app;
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
