<?php
  require 'vendor/autoload.php';
  require_once 'lib/mysql.php';
  require_once 'lib/func.php';
  require_once 'lib/auth.php';
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
  $app->get('/owners',     'getOwners'); // query
  $app->get('/owners/:id', 'getOwner');  // get

  // Item Information
  $app->get('/items',        'getItems');   // query
  $app->post('/items',       'postItem');   // save
  $app->get('/items/:id',    'getItem');    // get
  $app->put('/items/:id',    'putItem');    // update
  $app->delete('/items/:id', 'deleteItem'); // delete

  // Authorization
  $app->post('/login', 'getAuthKey');
  $app->post('/auth',  'retSomething');

  $app->run();
?>
