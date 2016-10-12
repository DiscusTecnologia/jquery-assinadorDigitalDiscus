function getSignToken(action){
	$.ajax({
		url : 'http://teste.local/get_auth_key.php',
		type : 'GET',
		success : function(data, status, xhr) {
			if(data.success){
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
				alert(statusCode == 0 ? msg: JSON.parse(msg));
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
				alert(statusCode == 0 ? msg: JSON.parse(msg));
			}
		});
	}
}

function verifyP7s(authKey) {
	if($('#p7sToVerify')[0].files.length == 0) {
		alert('Selecione pelo menos um arquivo .p7s para ser validado');
	} else {
		$('#p7sToVerify').verifyData(authKey, {
			success: function(blob){
				console.log(blob);
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
				alert(statusCode == 0 ? msg: JSON.parse(msg));
			}
		}, true);
	}
}

function verifyPDF(authKey) {
	if($('#pdfToVerify')[0].files.length == 0) {
		alert('Selecione pelo menos um arquivo PDF para ser validado');
	} else {
		$('#pdfToVerify').verifyPDF(authKey, {
			success: function(blob){
				console.log(blob);
			},
			error: function(statusCode, msg){
				console.log(statusCode == 0 ? msg: JSON.parse(msg));
			}
		}, true);
	}
}