<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

const JWT_SECRET = "makey1234567";

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login", "/api/signin", "/api/old/login", "/api/createUser"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

function addHeaders(Response $response): Response {
    /**
     * @var string
     */
    $origin = 'herokuapp';

    $response = $response->withHeader("Content-Type", "application/json")
    ->withHeader("Access-Control-Allow-Origin", "https://final-welsch-theo.herokuapp.com")
    ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    ->withHeader("Access-Control-Expose-Headers", "Authorization");

  return $response;

}

$app = AppFactory::create();

function createJWT ($login){

    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'login' => $login,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");

    return $token_jwt;
}


function login($request, $response, $args)
{
    $body = $request->getParsedBody();
    $login = $body["login"] ?? "";
    $password = $body["password"] ?? "";

    $err = $login == "" || $password == "";

    if($err){
        $data["erreur"] = "Erreur de saisie";
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode($data));
        return $response;        
    }

    global $entityManager;
    $clientRepository = $entityManager->getRepository('Client');
    $client = $clientRepository->findOneBy(array('login' => $login));

 
    if($client == null || (!$password == $client->getPassword())){
        $data["erreur"] = "Aucun client avec ce login et/ou password";
        $response = $response->withStatus(403);
        $response->getBody()->write(json_encode($data));
        return $response;        
    }

    $data = array(
        'prenom' => $client->getPrenom(),
        'nom' => $client->getNom(),
        'login' => $client->getLogin(),
        'password' => $client->getPassword(),
    );

    $token_jwt = createJWT($login);
    $response = addHeaders($response);
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}"); 
    $response->getBody()->write(json_encode($data));

    return $response;
}

function signin($request, $response, $args)
{
    $body = $request->getParsedBody();
    $login = $body["login"] ?? "";
    $password = $body["password"] ?? "";
    $prenom = $body["prenom"] ?? "";
    $nom = $body["nom"] ?? "";


 
    $err = $login == "" || $password == "" || $prenom == "" || $nom == "";
    if($err)
    {
        $data["erreur"] = "Erreur de saisie.";
        $response = $response->withStatus(400);
        $response->getBody()->write(json_encode($data));

        return $response;
    }
    global $entityManager;
    $clientRepository = $entityManager->getRepository('Client');
    $exist = $clientRepository->findOneBy(array('login' => $login));

    if($exist)
    {
        $data["erreur"] = "Ce login existe déjà.";
        $response = $response->withStatus(409);
        $response->getBody()->write(json_encode($data));

        return $response;
    }

    $client = new Client();
    $client->setPrenom($prenom);
    $client->setNom($nom);
    $client->setLogin($login);
    $client->setPassword($password);

    $entityManager->persist($client);
    $entityManager->flush();

    $data["login"] = $login;
    $response = addHeaders($response);
    $response->getBody()->write(json_encode($data));
    return $response;
}

function postClient($request, $response, $args)
{
    $body = $request->getParsedBody();
    $login = $body["login"] ?? "";
    $password = $body["password"] ?? "";

    $err = $login == "" || $password == "";
    if (!$err)
    {
        $data["login"] = $login;
        $response = addHeaders($response);
        $token_jwt = createJWT($login);
        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}"); 
        $response->getBody()->write(json_encode($data));
    }
    else
    {
        $response = $response->withStatus(401);
    }
    
      return $response;
}

$app->post('/api/old/login', 'postClient');
$app->post('/api/login', 'login');
$app->post('/api/signin', 'signin');
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
    
$app->run();
?>