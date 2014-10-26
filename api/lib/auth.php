<?php
function getAuths() {
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
function getAuth() {
  $arr = array('');
  //echo "hello";
  foreach (getallheaders() as $name => $value) {
    array_push($arr, "$name: $value\n");
  }
  echo json_encode($arr);
}
