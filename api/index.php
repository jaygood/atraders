<?php
  require 'vendor/autoload.php';
  require_once 'lib/mysql.php';
  class ResourceNotFoundException extends Exception {}
  require_once 'lib/auth.php';
  require_once 'lib/owners.php';
  require_once 'lib/items.php';

  $app = new \Slim\Slim(array(
    'debug' => true,
    'templates.path' => '../templates',
    'log.enabled' => true
  ));

  //$app->log->debug("THIS IS HOW YOU DEBUG");
  // Test routes
  $app->get('/hello/:name', function($name){ echo "hello, $name"; });
  $app->get('/', function() use ($app){ echo "<h1>Go Ahead</h1>"; });

  // Owner Information
  $app->get('/owners',     'verifyKey', 'getOwners'); // query
  $app->get('/owners/:id', 'verifyKey', 'getOwner');  // get

  // Item Information
  $app->get('/items',                     'getItems');   // query
  $app->get('/items/:id',                 'getItem');    // get
  $app->post('/items',       'verifyKey', 'postItem');   // save
  $app->put('/items/:id',    'verifyKey', 'putItem');    // update
  $app->delete('/items/:id', 'verifyKey', 'deleteItem'); // delete

  // Authorization
  $app->post('/login', 'getAuthKey');

  $app->run();
?>
