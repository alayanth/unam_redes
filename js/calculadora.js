
 var needBits;
 function analizar(){
	 
	 var ip1 = $("#ip1").val();
	 var ip2 = $("#ip2").val();
	 var ip3 = $("#ip3").val();
	 var ip4 = $("#ip4").val();
	 
	 if( ip1 < 0 || ip1 >255 || ip2 < 0 || ip2 >255 || ip3 < 0 || ip3 >255 || ip4 < 0 || ip4 >255 ){
		 error("Los valores de la IP deben de estar entre 0 y 255");
		 return;
	 }
	 
	 needBits = Math.ceil(log2(parseInt( $("#subsIn").val() )+2));
	 
	 if( ip1 < 128 ){
		 $("#classOut").html("A");
		 $("#MDout").html("255.0.0.0");
		 if(needBits > 23 ){
			 error("Demasiadas Subredes");
			 return;
		 }
		 
		 $("#NMout").html( creaMascara('A',needBits));
		 $("#BPout").html(needBits);
		 $("#TSout").html( Math.pow(2,needBits) );
		 $("#THout").html( Math.pow(2,24-needBits) );
		 $("#TSUout").html( Math.pow(2,needBits)-2 );
		 $("#THUout").html( Math.pow(2,24-needBits)-2 );
		 $("#ipesList").html( allIpesHtml('A', Math.pow(2,24-needBits) , Math.pow(2,needBits) , ip1) )
		 
	 }
	 else if( ip1 < 192 ){
		 $("#classOut").html("B");
		 $("#MDout").html("255.255.0.0");
		 if(needBits > 15 ){
			 error("Demasiadas Subredes");
			 return;
		 }
		 
		 $("#NMout").html( creaMascara('B',needBits));
		 $("#BPout").html(needBits);
		 $("#TSout").html( Math.pow(2,needBits) );
		 $("#THout").html( Math.pow(2,16-needBits) );
		 $("#TSUout").html( Math.pow(2,needBits)-2 );
		 $("#THUout").html( Math.pow(2,16-needBits)-2 );
		 $("#ipesList").html( allIpesHtml('B', Math.pow(2,16-needBits) , Math.pow(2,needBits) , ip1+"."+ip2 ) )
	 }
	 else if( ip1 < 224 ){
		 $("#classOut").html("C");
		 $("#MDout").html("255.255.255.0");
		 if(needBits > 7 ){
			 error("Demasiadas Subredes");
			 return;
		 }
		 
		 $("#NMout").html( creaMascara('C',needBits));
		 $("#BPout").html(needBits);
		 $("#TSUout").html( Math.pow(2,needBits)-2 );
		 $("#THUout").html( Math.pow(2,8-needBits)-2 );
		 $("#ipesList").html( allIpesHtml('C', Math.pow(2,8-needBits) , Math.pow(2,needBits) , ip1+"."+ip2+"."+ip3 ) )
		 
	 }
	 else if( ip1 < 240 ){
		 $("#classOut").html("D");
		 return;
	 }
	else{
		 $("#classOut").html("E");
		 return;
	 }
	 
	 
 }
 
 function creaMascara(clase, bits){
	 var a=0,b=0,c=0;//255.a.b.c || 255.255.a.b || 255.255.255.a
	 
	 for(i = 0; i< bits; i++){
		 if(i<8)
		 	a+=Math.pow(2,7-i);
		else if(i<15)
			b+=Math.pow(2,15-i);
		else if(i<23)
			c+=Math.pow(2,23-i);
	 }
	 
	 if(clase=='A')
	 	return "255."+a+"."+b+"."+c;
	else if(clase=='B')
	 	return "255.255."+a+"."+b;
	else if(clase=='C')
	 	return "255.255.255."+a;
	 
 }
 
 function allIpesHtml(clase, hosts, subs,initialIp){

	  var html = "";
	  if(clase=='A')
	  	digs = 3;
		else if(clase=='B')
		digs=2;
		else if(clase=='C')
		digs=1;
		
	 for( i=0; i<subs; i++){
		 html+= "<li>"+initialIp+"."+notacionPunto(hosts*i,digs)+"</li>";//+" a "+initialIp+"."+notacionPunto(hosts*(i+1)-1)+"</li>";
	 }
	 return html;
 }
 
 function notacionPunto(num,digs){
	 console.log(digs);
	if(num<256){
		
		if(digs == 2)
			return "0."+num;
		else if(digs == 3)
			return "0.0."+num;
		else
			return num;
	}
	
	else if(num<65536)
		if(digs == 3)
			return "0."+Math.floor((num/256))+"."+num%256;
		else
			return Math.floor((num/256))+"."+num%256;
	else if(num<16777216)

		return Math.floor((num/256)/256)+"."+Math.floor((num/256)%256)+"."+num%256;
 }
 
 function error(e){
	 alert(e);
 }
 function log2(val){
	 return Math.log(val)/Math.log(2);
 }

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


function subnetting(address,subnets) {
	//datos: address, clase, mascara
	var data = identifyIP(address);

	alert(data[2]);
}

