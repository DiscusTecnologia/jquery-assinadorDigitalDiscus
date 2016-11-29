# jquery-assinadorDigitalDiscus
[![logo Discus Tecnologia](https://www.discustecnologia.com.br/images/logo_pq.png)](http://www.discustecnologia.com.br)

Plugin jQuery para comunicação com o Assinador Digital - Discus Tecnologia

---



Plugin jQuery para comunicação com o Assinador Digital - Discus Tecnologia Este plugin para jQuery é distribuído livremente, mas o uso do Assinador Digital requer licença, entre em contato para adiquirir sua licença pelo email contato@discustecnologia.com.br, ou se preferir veja mais informações em [https://www.discustecnologia.com.br/pt/assinador](https://www.discustecnologia.com.br/pt/assinador).



## O que é o Assinador Digital - Discus Tecnologia?

O Assinador Digital é um aplicativo para que você possa utilizar suas aplicações web certificados digitais do tipo A3 via PKCS11 para realizar assinaturas digitais no padrão PKCS7 com a possibilidade de incluir carimbos de tempo nas assinaturas.

Você pode assinar tanto dados em texto ou arquivos PDF, tal como realizar validações nas assinaturas.



### Como funciona?

Depois de adquirir sua licença você receberá um token de identificação do cliente. A cada assinatura sua aplicação enviará uma requisição para nosso servidor verificar se você é um cliente autorizado. Sua aplicação então recebe um token de autorização de assinatura que deverá ser enviado ao assinador junto com os dados a serem assinados, após validar o token o assinador realiza a assinatura usando o certificado do cliente e devolve para sua aplicação.



## Funcionalidades

* Testar se o Assinador Digital - Discus Tecnologia está online
* Assinar dados em formato texto (o retorno é um arquivo de assinatura do tipo .p7s)
* Assinar arquivo(s) PDF (o retorno é o PDF assiando digitalmente)
* Validar arquivo(s) .p7s
* Validar arquivo(s) PDF


## Compatibilidade

Este plugin é compatível com todos os navegadores para desktop que suportam jQuery e Ajax.
Você pode usar o Assinador Digital - Discus Tecnologia e este plugin para jQuery em Windows, Linux e em breve testaremos em Mac OS.



## Requisitos

Você precisa adquirir o Assinador Digital - Discus Tecnologia. Entre em [contato] conosco e solicite uma licença.
Para executar o Assinador Digital os usuários precisam ter o [Java SE Runtime Environment 8](http://www.oracle.com/technetwork/pt/java/javase/downloads/) instalada.

  [contato]: https://www.discustecnologia.com.br/pt/contato



## Instalação

via npm
```sh
npm install jquery-assinadordigitaldiscus --save
```
via bower
```sh
bower install jquery-assinadordigitaldiscus --save
```



## Documentação

Acesse a documentação do plugin [aqui](https://github.com/DiscusTecnologia/jquery-assinadorDigitalDiscus/wiki/Documenta%C3%A7%C3%A3o).
Incluído no repositório você encontra a pasta example que contém os exemplos de código para que você possa aprender tudo o que precisa para intregrar o plugin e consequentemente o Assinador Digital em seu projeto.



## Licença

Copyright © 2016 [Discus Tecnologia][1]

Licenciado sob a licença MIT.

  [1]: https//www.discustecnologia.com.br

