<?php
/*
 * Assinador Digital - Discus Tecnologia
 * Exemplo de cógigo para validar o token de autorização de assinatura no servidor Discus Tecnologia.
 * Retorna informações sobre o token de autorização.
 *
 * Atenção!
 * Este é apenas um exemplo utilizando PHP, sinta-se a vontade para usar em outras linguagens, porém lembre-se
 * que seu token de identificação do cliente não pode ficar exposto, matenha-o protegido.
 */


//coloque aqui seu token de identificação do cliente
$clientToken = "hbf643bn37ugwg6442gff29fdwsfbqpe";

header('Content-Type: application/json');
//cria um objeto padrão para facilitar a formatação do retorno
$retorno = new \StdClass;


//envia clientToken para o servidor
$curl = curl_init();

$headr = array();
$headr[] = 'Authorization: Bearer '. $clientToken;

$fields = array(
	"token" => $_POST['token']
);

curl_setopt_array($curl, array(
	CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => 'https://www.discustecnologia.com.br/assinadorservice/getinfoauthtoken',
    CURLOPT_SSL_VERIFYPEER => false, //tirar para produção
	CURLOPT_SSL_VERIFYHOST => false, //tirar para produção
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTPHEADER => $headr,
    CURLOPT_POSTFIELDS => $fields
));

$resp = curl_exec($curl);

if(!$resp){
	//se ocorreu algum erro, retorna a informação formatada em JSON para a aplicação 
    http_response_code(curl_getinfo($curl, CURLINFO_HTTP_CODE));
	$retorno->success = false;
	$retorno->codeError = curl_errno($curl);
	$retorno->errorMessage = curl_getinfo($curl, CURLINFO_HTTP_CODE) == 401 ? "Token não autorizado" : curl_error($curl);
	echo json_encode($retorno);
	exit();
}

curl_close($curl);



//recebe informações sobre o authkey do servidor no formato JSON
$json = $resp;

$retorno->success = true;
$retorno->validacao = json_decode($json);
$retorno->codeError = 0;
$retorno->errorMessage = "";
//envia resposta formatada em JSON para a aplicação
echo json_encode($retorno);
