/**
 * Plugin jQuery para comunicação com o Assinador Digital - Discus Tecnologia
 * Este plugin para jQuery é distribuído livremente, mas o uso do Assinador Digital requer licença, entre em contato para adiquirir sua licença
 * pelo email <a href="mailto:contato@discustecnologia.com.br">contato@discustecnologia.com.br</a>, ou se preferir veja mais informações
 * em <a href="http://www.discustecnologia.com.br">www.discustecnologia.com.br</a>.
 * @author Rodrigo Ramos <rodrigoramos@discustecnologia.com.br>
 * @name Plugin jQuery Assinador Digital - Discus Tecnologia
 * @license
 * The MIT License (MIT)
 * Copyright (c) 2016 Discus Tecnologia.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function($){

	$.fn.extend({

		/**
		 * Envia arquivos no formato PDF para o assinador assinar. Os arquivos devem ser exclusivamente no formato PDF.
		 * @param {string} authkey - Chave de autorização para assinatura no formato JWT (JSON Web Token) gerada no servidor da Discus Tecnologia.
		 * @param {Object} obj - Objeto contendo as funções de callback success e error
		 * @returns {callback} retorna arquivo .pdf assiando em caso de sucesso ou
		 * em caso de erro ou retorna um objeto JSON no seguinte formato: { "success": {Boolean}, "msg":{string} } ou uma mensagem em texto simples
		 * @example
		 * $('#file').signPDF('f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
		 * 		success: function(blob){
		 * 			saveAs(blob, "teste.pdf");
		 * 		},
		 * 		error: function(statusCode, msg){
		 * 			console.log(statusCode == 0 ? msg: JSON.parse(msg));
		 * 		}
		 * });
		 */
		signPDF: function (authkey, obj) {
			var urlService = 'http://localhost:5820/';
			return this.each(function () {
				sendToSigner(this, authkey, obj, urlService, true);
			});
		},


		/**
		 * Envia arquivo PDF para validação da(s) assinatura(s) ao assinador
	     * @param {string} authkey - Chave de autorização para assinatura no formato JWT (JSON Web Token) gerada no servidor da Discus Tecnologia.
		 * @param {Object} obj - Objeto contendo as funções de callback success e error
		 * @param {Boolean} showValidator - Se true exibe a aplicação de validação de assinaturas do assinador, se false retorna os dados da validação em formato JSON.
		 * @returns {callback} retorna arquivo um objeto JSON informando que a validação está em andamento caso seja exibida a aplicação de validação do assinador,
		 * um objeto JSON contendo informações sobre a(s) assinatura(s).
		 * @example
		 * $('#file').verifyPDF('f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
		 * 		success: function(blob){
		 * 			console.log(blob);
		 * 		},
		 * 		error: function(statusCode, msg){
		 * 			console.log(statusCode == 0 ? msg: JSON.parse(msg));
		 * 		}
		 * }, false);
		 */
		verifyPDF: function (authkey, obj, showValidator) {
			var urlService = 'http://localhost:5820/validapkcs7/pdf/'+(showValidator ? 'show_validator' : '');
			return this.each(function () {
				sendToSigner(this, authkey, obj, urlService, true);
			});
		},


		/**
		 * Envia arquivo .p7s para validação da(s) assinatura(s) ao assinador
	     * @param {string} authkey - Chave de autorização para assinatura no formato JWT (JSON Web Token) gerada no servidor da Discus Tecnologia.
		 * @param {Object} obj - Objeto contendo as funções de callback success e error
		 * @param {Boolean} showValidator - Se true exibe a aplicação de validação de assinaturas do assinador, se false retorna os dados da validação em formato JSON.
		 * @returns {callback} retorna arquivo um objeto JSON informando que a validação está em andamento caso seja exibida a aplicação de validação do assinador,
		 * um objeto JSON contendo informações sobre a(s) assinatura(s).
		 * @example
		 * $('#file').verifyData('f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
		 * 		success: function(blob){
		 * 			console.log(blob);
		 * 		},
		 * 		error: function(statusCode, msg){
		 * 			console.log(statusCode == 0 ? msg: JSON.parse(msg));
		 * 		}
		 * }, false);
		 */
		verifyData: function (authkey, obj, showValidator) {
			var urlService = 'http://localhost:5820/validapkcs7/'+(showValidator ? 'show_validator' : '');
			return this.each(function () {
				sendToSigner(this, authkey, obj, urlService, true);
			});
		}

	});



	/**
     * Envia os dados para o assinador, devolvendo o retorno às funções predefinidas do obj de callback
     * @private
     * @param {Object} jqObj - Objeto jQuery a ser processado (somente input files)
     * @param {string} authkey - Chave de autorização para assinatura no formato JWT (JSON Web Token) gerada no servidor da Discus Tecnologia.
	 * @param {Object} obj - Objeto contendo as funções de callback success e error
	 * @param {string} urlService - Url do serviço a ser consumido do assinador
	 * @param {Boolean} isFile - true se for enviar arquivo ou false se for enviar string de dados
	 * @param {string} data - string de dados a serem assinados
	 * @returns {callback} retorna arquivo .pdf assiando, .p7s de assinatura ou JSON com dados da validação da assinatura em caso de sucesso.
	 * Em caso de erro ou retorna um objeto JSON no seguinte formato: { "success": {Boolean}, "msg":{string} } ou uma mensagem em texto simples.
     */
	function sendToSigner(jqObj, authkey, obj, urlService, isFile) {
		var lenFiles = $(jqObj)[0].files.length;
		for(var i = 0; i < lenFiles; i++){
			var formData = new FormData();
			if(!isFile) formData.append('tosign', $(jqObj)[0].files[i]);
			formData.append('authkey', authkey);
			if(isFile) formData.append('file', $(jqObj)[0].files[i]);

			$.ajax({
				url : urlService,
				type : 'POST',
				data : formData,
				processData: false,  // tell jQuery not to process the data
				contentType: false,  // tell jQuery not to set contentType
				xhrFields : {
					responseType : 'blob'
				},
				success: function(blob, status, xhr) {
					if(typeof obj.success == 'function') obj.success(blob);
					//blob = data;//xhr.response is now a blob object
					//saveAs(blob, "teste.p7s"); //este funciona até no IE para fazer download do arquivo recebido
				},
				error: function(xhr, textStatus) {
		        	if(typeof obj.error == 'function') obj.error(xhr.status, xhr.statusText);
		        }
			});
		}
	}



	/**
	 * Enviar dados em formato texto para o assinador.
	 * @param {string} data - Dados a serem assinados.
	 * @param {string} authkey - Chave de autorização para assinatura no formato JWT (JSON Web Token) gerada no servidor da Discus Tecnologia.
	 * @param {Object} obj - Objeto contendo as funções de callback success e error
	 * @returns {callback} retorna arquivo .p7s em caso de sucesso ou
	 * em caso de erro ou retorna um objeto JSON no seguinte formato: { "success": {Boolean}, "msg":{string} } ou uma mensagem em texto simples
	 * @example
	 * $.signData(JSON.stringify({"teste":123}), 'f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
	 * 		success: function(blob){
	 * 			saveAs(blob, "signed.p7s");
	 * 		},
	 * 		error: function(statusCode, msg){
	 * 			console.log(statusCode == 0 ? msg: JSON.parse(msg));
	 * 		}
	 * });
	 */
	$.signData = function(data, authkey, obj){
		var urlService = 'http://localhost:5820/dados/';
		sendToSigner($({'files':[data]}), authkey, obj, urlService, false);
	};



	/**
	 * Checar se o assinador está online.
	 * @param {function} callback - Função de callback que recebe true se o assinador está ativo ou false caso contrário.
	 * @example
	 * $.signerIsActive(function(active){console.log(active);});
	 */
	$.signerIsActive = function(callback){
    	$.ajax({
    		url: "http://localhost:5820",
	        type: "GET",
	        timeout:1000,
	        success: function(data, status, xhr) {
	        	if(typeof callback == 'function') callback(xhr.status == 200 ? true : false);
	        },
	        error: function() {
	        	if(typeof callback == 'function') callback(false);
	        }
 		});
	};



	/**
	 * Checar se o assinador está online de forma síncrona.
	 * @deprecated since version 1.0 check https://xhr.spec.whatwg.org/
	 * @returns {Boolean} true se o assinador está online, false senão.
	 * @example
	 * console.log($.signerIsActiveSync());
	 */
	$.signerIsActiveSync = function(){
    	return $.ajax({
	        type: "GET",
	        url: "http://localhost:5820",
	        async: false
    	}).statusCode().status == 200;
    };



})(jQuery);