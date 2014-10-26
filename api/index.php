<?php
  require 'vendor/autoload.php';
  require_once 'lib/mysql.php';
  require_once 'lib/func.php';
  require_once 'lib/auth.php';

  $app = new \Slim\Slim(array(
    'debug' => false,
    'templates.path' => '../templates',
    'log.enabled' => false
  ));

  $app->get('/hello/:name', function($name){
    echo "hello, $name";
  });

  $app->get('/', function() use ($app){
    $app->log->debug("THIS IS HOW YOU DEBUG");
    echo "<h1>Go Ahead</h1>";
  });

  $app->get('/owners',     'getOwners');
  $app->get('/owners/:id', 'getOwner');

  $app->get('/auth',       'getAuth');
  $app->run();
?>
