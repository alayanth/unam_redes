
 function binToDec() {
 	var binary = document.getElementById('numBinario').value;
 	binary = binary.toString(); 
 	var digit = parseInt(binary, 2);

 	if(!digit){
 		document.getElementById('resultadoDec').innerHTML = '¡No se introdujo ningún valor!';
 	}
 	else{
 		document.getElementById('resultadoDec').innerHTML = digit;
 	}

 }

 function decToBin() {
 	var decimal = document.getElementById('numDecimal').value;
 	decimal = (decimal >>> 0).toString(2);

 		document.getElementById('resultadoBin').innerHTML = decimal;

 }

 function identifyIP(address) {
	//var address = document.getElementById('classIP').value;
	var segmento = address.split(".");
	var clase;
	var mascara;

	if (Number(segmento[0]) > 0 && Number(segmento[0]) < 127) {
		clase = "Clase A";
		mascara = "255.0.0.0";
		document.getElementById('resultadoClase').innerHTML = "<table class=\"centered\">"+
			        "<thead>"+
			          "<tr>"+
			              "<th >IP</th>"+
			              "<th >Clase</th>"+
			              "<th >Máscara Predeterminada</th>"+
			          "</tr>"+
			        "</thead>"+
			        "<tbody>"+
			          "<tr>"+
			            "<td>"+address+"</td>"+
			            "<td>"+clase+"</td>"+
			            "<td>"+mascara+"</td>"+
			          "</tr>"+
			        "</tbody>"+
			      "</table>";
	}
	if (Number(segmento[0]) >= 128  && Number(segmento[0]) <= 191) {
		clase = "Clase B";
		mascara = "255.255.0.0";
		document.getElementById('resultadoClase').innerHTML = "<table class=\"centered\">"+
			        "<thead>"+
			          "<tr>"+
			              "<th >IP</th>"+
			              "<th >Clase</th>"+
			              "<th >Máscara Predeterminada</th>"+
			          "</tr>"+
			        "</thead>"+
			        "<tbody>"+
			          "<tr>"+
			            "<td>"+address+"</td>"+
			            "<td>"+clase+"</td>"+
			            "<td>"+mascara+"</td>"+
			          "</tr>"+
			        "</tbody>"+
			      "</table>";		
	}
	if (Number(segmento[0]) >= 192  && Number(segmento[0]) <= 223) {
		clase = "Clase C";
		mascara = "255.255.255.0";
		document.getElementById('resultadoClase').innerHTML = "<table class=\"centered\">"+
			        "<thead>"+
			          "<tr>"+
			              "<th >IP</th>"+
			              "<th >Clase</th>"+
			              "<th >Máscara Predeterminada</th>"+
			          "</tr>"+
			        "</thead>"+
			        "<tbody>"+
			          "<tr>"+
			            "<td>"+address+"</td>"+
			            "<td>"+clase+"</td>"+
			            "<td>"+mascara+"</td>"+
			          "</tr>"+
			        "</tbody>"+
			      "</table>";
	}
	if (Number(segmento[0]) >= 224  && Number(segmento[0]) <= 239) {
		clase = "Clase D";
		mascara = "255.255.255.255";
		document.getElementById('resultadoClase').innerHTML = "<table class=\"centered\">"+
			        "<thead>"+
			          "<tr>"+
			              "<th >IP</th>"+
			              "<th >Clase</th>"+
			              "<th >Máscara Predeterminada</th>"+
			          "</tr>"+
			        "</thead>"+
			        "<tbody>"+
			          "<tr>"+
			            "<td>"+address+"</td>"+
			            "<td>"+clase+"</td>"+
			            "<td>"+mascara+"</td>"+
			          "</tr>"+
			        "</tbody>"+
			      "</table>";
	}
	if (Number(segmento[0]) >= 240  && Number(segmento[0]) <= 255) {
		clase = "Clase E";
		mascara = "No Disponible";
		document.getElementById('resultadoClase').innerHTML = "<table class=\"centered\">"+
			        "<thead>"+
			          "<tr>"+
			              "<th >IP</th>"+
			              "<th >Clase</th>"+
			              "<th >Máscara Predeterminada</th>"+
			          "</tr>"+
			        "</thead>"+
			        "<tbody>"+
			          "<tr>"+
			            "<td>"+address+"</td>"+
			            "<td>"+clase+"</td>"+
			            "<td>"+mascara+"</td>"+
			          "</tr>"+
			        "</tbody>"+
			      "</table>";
	}
	if (Number(segmento[0]) <= 0  || Number(segmento[0]) > 255) {
		document.getElementById('resultadoClase').innerHTML = "IP inválida, por favor revisa la IP introducida";
	}
	var data = [address,clase,mascara];
	return data;

}

function subnettingCIDR(address,cidr){

}

function subnettingNets(address,subnets) {	
	//datos: address, clase, mascara
	var data = identifyIP(address);
	var segment = address.split(".");
	var newSegment;
	var ipBin = new Array;
	var maskseg = data[2].split(".");

	var claseIP = data[1];
	var defaultSubMask = data[2];
	var customSubnetMask;
	var totalSubnets = new Number(0);
	var totalHosts = new Number(0);
	var usableHosts;
	var borrowBits = new Number(0);
	var bitsHosts = new Number(0);

	while ((totalSubnets) < subnets){
		borrowBits++;
		totalSubnets = Math.pow(2,borrowBits);
		//alert(totalSubnets);
	}	

	newSegment = creaSegmento(borrowBits,claseIP);

	if(data[2].toString() == "255.255.255.0"){
		customSubnetMask = data[2].substring(0,12) + newSegment;
		totalHosts = Math.pow(2,8 - borrowBits);
		usableHosts = totalHosts - 2;
	}
	if(data[2].toString() == "255.255.0.0"){
		customSubnetMask = data[2].substring(0,8) + newSegment;
		totalHosts = Math.pow(2,16 - borrowBits);
		usableHosts = totalHosts - 2;
	}
	if(data[2].toString() == "255.0.0.0"){
		customSubnetMask = data[2].substring(0,4) + newSegment;
		totalHosts = Math.pow(2,24 - borrowBits);
		usableHosts = totalHosts - 2;
	}

	document.getElementById('resultadoSubnetting').innerHTML = 
				"<table class=\"centered striped\">"+

			          "<tr>"+
			              	"<th >Clase IP</th>"+
			             	 "<td>"+claseIP+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Máscara de subred predeterminada</th>"+
			            	"<td>"+defaultSubMask+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              "<th >Nueva máscara</th>"+
			            	"<td>"+customSubnetMask+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número total de subredes</th>"+
			             	 "<td>"+totalSubnets+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número total de hosts</th>"+
			             	 "<td>"+totalHosts.toString()+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número direcciones usables</th>"+
			             	 "<td>"+usableHosts.toString()+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número de bits prestados</th>"+
			             	 "<td>"+borrowBits.toString()+"</td>"+
			          "</tr>"+
			      	"</table>";
}

function subnettingHosts(address,hosts) {
	//datos: address, clase, mascara
	var data = identifyIP(address);
	var segment = address.split(".");
	var newSegment;
	var ipBin = new Array;
	var maskseg = data[2].split(".");

	var claseIP = data[1];
	var defaultSubMask = data[2];
	var customSubnetMask;
	var totalSubnets = new Number(0);
	var totalHosts = new Number(0);
	var usableHosts;
	var borrowBits = new Number(0);
	var bitsHosts = new Number(0);

	while ((totalHosts - 2) < hosts){
		bitsHosts++;
		totalHosts = Math.pow(2,bitsHosts);
		alert(bitsHosts);
	}

	usableHosts = totalHosts - 2;

	if(defaultSubMask == "255.255.255.0"){
		customSubnetMask = data[2].substring(0,12) + newSegment;
		totalSubnets = Math.pow(2,8 - bitsHosts);
		borrowBits = 8 - bitsHosts;
	}
	if(defaultSubMask == "255.255.0.0"){
		customSubnetMask = data[2].substring(0,8) + newSegment;
		totalSubnets = Math.pow(2,16 - bitsHosts);
		borrowBits = 16 - bitsHosts;
	}
	if(defaultSubMask == "255.0.0.0"){
		customSubnetMask = data[2].substring(0,4) + newSegment;
		totalSubnets = Math.pow(2,24 - bitsHosts);
		borrowBits = 16 - bitsHosts;
	}

	newSegment = creaSegmento(borrowBits,claseIP);

	if(defaultSubMask == "255.255.255.0"){
		customSubnetMask = data[2].substring(0,12) + newSegment;
	}
	if(defaultSubMask == "255.255.0.0"){
		customSubnetMask = data[2].substring(0,8) + newSegment;
	}
	if(defaultSubMask == "255.0.0.0"){
		customSubnetMask = data[2].substring(0,4) + newSegment;
	}

	document.getElementById('resultadoSubnetting').innerHTML = 
				"<table class=\"centered striped\">"+

			          "<tr>"+
			              	"<th >Clase IP</th>"+
			             	 "<td>"+claseIP+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Máscara de subred predeterminada</th>"+
			            	"<td>"+defaultSubMask+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              "<th >Nueva máscara</th>"+
			            	"<td>"+customSubnetMask+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número total de subredes</th>"+
			             	 "<td>"+totalSubnets+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número total de hosts</th>"+
			             	 "<td>"+totalHosts.toString()+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número direcciones usables</th>"+
			             	 "<td>"+usableHosts.toString()+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número de bits prestados</th>"+
			             	 "<td>"+borrowBits.toString()+"</td>"+
			          "</tr>"+
			      	"</table>";
}

function subnetting(address,subnets,hosts) {
	//datos: address, clase, mascara
	var data = identifyIP(address);
	var segment = address.split(".");
	var newSegment;
	var ipBin = new Array;
	var maskseg = data[2].split(".");

	var claseIP = data[1];
	var defaultSubMask = data[2];
	var customSubnetMask;
	var totalSubnets = new Number(0);
	var totalHosts = new Number(0);
	var usableHosts;
	var borrowBits = new Number(0);
	var bitsHosts = new Number(0);

	//anding
	for (var i = 0; i <= segment.length - 1; i++) {
		//cada segment se transforma a binario
		ipBin[i] = (Number(segment[i]) >>> 0).toString(2);
	}

	while ((totalSubnets) < subnets){
		borrowBits++;
		totalSubnets = Math.pow(2,borrowBits);
		//alert(totalSubnets);
	}
	while ((totalHosts - 2) < hosts){
		bitsHosts++;
		totalHosts = Math.pow(2,bitsHosts);
		//alert(totalSubnets);
	}

	usableHosts = totalHosts - 2;
	
	newSegment = creaSegmento(borrowBits,claseIP);

	if(data[2].toString() == "255.255.255.0"){
		customSubnetMask = data[2].substring(0,12) + newSegment;
	}
	if(data[2].toString() == "255.255.0.0"){
		customSubnetMask = data[2].substring(0,8) + newSegment;
	}
	if(data[2].toString() == "255.0.0.0"){
		customSubnetMask = data[2].substring(0,4) + newSegment;
	}

	document.getElementById('resultadoSubnetting').innerHTML = 
				"<table class=\"centered striped\">"+

			          "<tr>"+
			              	"<th >Clase IP</th>"+
			             	 "<td>"+claseIP+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Máscara de subred predeterminada</th>"+
			            	"<td>"+defaultSubMask+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              "<th >Nueva máscara</th>"+
			            	"<td>"+customSubnetMask+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número total de subredes</th>"+
			             	 "<td>"+totalSubnets+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número total de hosts</th>"+
			             	 "<td>"+totalHosts.toString()+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número direcciones usables</th>"+
			             	 "<td>"+usableHosts.toString()+"</td>"+
			          "</tr>"+
			          "<tr>"+
			              	"<th >Número de bits prestados</th>"+
			             	 "<td>"+borrowBits.toString()+"</td>"+
			          "</tr>"+
			      	"</table>";

	creaTabla(address,claseIP,defaultSubMask,customSubnetMask,totalSubnets,totalHosts,usableHosts,borrowBits);
}

function creaSegmento(bits,classe){
	var newSegment;
	switch(bits){
		case 1:
			if(classe == 'Clase A'){
				newSegment = "128.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "128.0"
			}else{
				newSegment = "128";
			}
			break;
		case 2:
			if(classe == 'Clase A'){
				newSegment = "192.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "192.0"
			}else{
				newSegment = "192";
			}
			break;
		case 3:
			if(classe == 'Clase A'){
				newSegment = "224.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "224.0"
			}else{
				newSegment = "224";
			}
			break;
		case 4:
			if(classe == 'Clase A'){
				newSegment = "240.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "240.0"
			}else{
				newSegment = "240";
			}
			break;
		case 5:
			if(classe == 'Clase A'){
				newSegment = "248.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "248.0"
			}else{
				newSegment = "248";
			}
			break;
		case 6:
			if(classe == 'Clase A'){
				newSegment = "252.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "252.0"
			}else{
				newSegment = "252";
			}
			break;
		case 7:
			if(classe == 'Clase A'){
				newSegment = "254.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "254.0"
			}else{
				newSegment = "254";
			}
			break;
		case 8:
			if(classe == 'Clase A'){
				newSegment = "255.0.0";
			}else if(classe == 'Clase B'){
				newSegment = "255.0"
			}else{
				newSegment = "255";
			}
			break;
		case 9:
			if (classe == 'Clase A') {
				newSegment = "255.128.0";
			}else{
				newSegment = "255.128";
			}
			break;
		case 10:
			if (classe == 'Clase A') {
				newSegment = "255.192.0";
			}else{
				newSegment = "255.192";
			}
			break;
		case 11:
			if (classe == 'Clase A') {
				newSegment = "255.224.0";
			}else{
				newSegment = "255.224";
			}
			break;
		case 12:
			if (classe == 'Clase A') {
				newSegment = "255.240.0";
			}else{
				newSegment = "255.240";
			}
			break;
		case 13:
			if (classe == 'Clase A') {
				newSegment = "255.248.0";
			}else{
				newSegment = "255.248";
			}
			break;
		case 14:
			if (classe == 'Clase A') {
				newSegment = "255.252.0";
			}else{
				newSegment = "255.252";
			}
			break;
		case 15:
			if (classe == 'Clase A') {
				newSegment = "255.254.0";
			}else{
				newSegment = "255.254";
			}
			break;
		case 16:
			if (classe == 'Clase A') {
				newSegment = "255.255.0";
			}else{
				newSegment = "255.255";
			}
			break;
		case 17:
			newSegment = "255.255.128";
			break;
		case 18:
			newSegment = "255.255.192";
			break;
		case 19:
			newSegment = "255.255.224";
			break;
		case 20:
			newSegment = "255.255.240";
			break;
		case 21:
			newSegment = "255.255.248";
			break;
		case 22:
			newSegment = "255.255.252";
			break;
		case 23:
			newSegment = "255.255.254";
			break;
		case 24:
			newSegment = "255.255.255";
			break;
	}
	return newSegment;
}

function creaTabla(address,classe,submask,customSubmask,subnets,hosts,usableHosts,borrowBits) {

}