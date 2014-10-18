<?php
  require 'vendor/autoload.php';
  require_once 'lib/mysql.php';
  require_once 'lib/func.php';

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
  //$app->get('/api/owners', function(){
    //echo "ho ho ho";
  //});
  $app->get('/owners/:id', 'getOwner');
  $app->run();
?>
