<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-34-255-21-191.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'vzwszcftnohxtk',
'password' => '1c45a17c2370415e9094254d120aea59b1695195956ae91c830dd8f805e4732f',
'dbname' => 'd9d0rc1f5b1a61',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);
