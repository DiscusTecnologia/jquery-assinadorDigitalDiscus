function isActive(){
	$.signerIsActive(function(active){
		console.log(active);
		alert(active ? 'Assinador online' : 'assinador offline');
	});
}

function signData() {
	if($('#toSignText').val() == "") {
		alert('Preencha o campo Texto a assinar');
	} else {
		$.signData($('#toSignText').val(), 'f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
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

function signPDF() {
	if($('#pdfToSign')[0].files.length == 0) {
		alert('Selecione pelo menos um arquivo PDF para ser assinado');
	} else {
		$('#pdfToSign').signPDF('f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
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
		$('#p7sToVerify').verifyData('f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
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
		$('#pdfToVerify').verifyPDF('f348gf73gf3gfy73gg43g.f43f34gf34g43g34g45g34.g45g542g524g35342gt24g42', {
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