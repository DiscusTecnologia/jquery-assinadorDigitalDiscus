var signToken = null;

function getSignToken(action){
	$.ajax({
		url : 'http://teste.local/get_auth_key.php',
		type : 'GET',
		success : function(data, status, xhr) {
			if(data.success){
				signToken = data.authkey;
				action(data.authkey);
			}
		},
		error: function(statusCode, msg){
			console.log(statusCode == 0 ? msg: JSON.parse(msg));
			alert(statusCode == 0 ? msg: JSON.parse(msg));
		}
	});
}

function isActive(){
	$.signerIsActive(function(active){
		console.log(active);
		alert(active ? 'Assinador online' : 'assinador offline');
	});
}

function signData(authKey) {
	if($('#toSignText').val() == "") {
		alert('Preencha o campo Texto a assinar');
	} else {
		$.signData($('#toSignText').val(), authKey, {
			success: function(blob){
				saveAs(blob, "textSignature.p7s");
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
				alert('status: ' + statusCode + ' - ' + msg);
			}
		});
	}
}

function signPDF(authKey) {
	if($('#pdfToSign')[0].files.length == 0) {
		alert('Selecione pelo menos um arquivo PDF para ser assinado');
	} else {
		$('#pdfToSign').signPDF(authKey, {
			success: function(blob){
				saveAs(blob, "signed.pdf");
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
				alert('status: ' + statusCode + ' - ' + msg);
			}
		});
	}
}

function verifyP7s() {
	if($('#p7sToVerify')[0].files.length == 0) {
		alert('Selecione pelo menos um arquivo .p7s para ser validado');
	} else {
		$('#p7sToVerify').verifyData({
			success: function(blob){
				console.log(blob);
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
				alert('status: ' + statusCode + ' - ' + msg);
			}
		}, true);
	}
}

function verifyPDF() {
	if($('#pdfToVerify')[0].files.length == 0) {
		alert('Selecione pelo menos um arquivo PDF para ser validado');
	} else {
		$('#pdfToVerify').verifyPDF({
			success: function(blob){
				console.log(blob);
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
				alert('status: ' + statusCode + ' - ' + msg);
			}
		}, true);
	}
}

function signSavePDF(authKey) {
	if($('#pdfToSignSave')[0].files.length == 0) {
		alert('Selecione pelo menos um arquivo PDF para ser assinado');
	} else {
		$('#pdfToSignSave').signPDF(authKey, {
			success: function(blob){
				var formData = new FormData();
				var file = new File([blob, 'signed.pdf'], 'signed.pdf', {type: "application/pdf"});
				formData.append('file', file);
				$.ajax({
						url : 'save_file.php',
						type : 'POST',
						data : formData,
						processData: false,  // tell jQuery not to process the data
						contentType: false,  // tell jQuery not to set contentType
						success : function(data) {
							console.log(data);
						},
						error: function(statusCode, msg){
							console.log(statusCode == 0 ? msg: JSON.parse(msg));
							alert('status: ' + statusCode + ' - ' + msg);
						}
				});
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
				alert('status: ' + statusCode + ' - ' + msg);
			}
		});
	}
}

function checkSignToken(){
	if(signToken == null){
		alert("Realize uma assinatura antes");
	}else{
		$.ajax({
			url : 'http://teste.local/check_auth_key.php',
			type : 'POST',
			data : {token : signToken},
			success : function(data, status, xhr) {
				if(data.success){
					console.log(data);
					alert("Saída no console");
				}
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
				alert(statusCode == 0 ? msg: JSON.parse(msg));
			}
		});
	}
}