//gestione invio dati
function GetXmlHttpObject(){
	if (window.XMLHttpRequest){
// Codice valdo per IE7+, Firefox, Chrome, Opera, Safari
		return new XMLHttpRequest();
	}
	if (window.ActiveXObject){
// valido per  IE6, IE5
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
return null;
}

function submitpunteggio(scelta){
	xmlhttp=GetXmlHttpObject();
	if (xmlhttp==null){
		alert ("HTTP Request non supportato dal Browser");
		return;
	}
	if (scelta == "stampa"){
		xmlhttp.open("GET","./scrivi.php?stampa=1",true);
		xmlhttp.onreadystatechange=stateChangedStampa;
		xmlhttp.send();
	}
	else{
		var nome = document.getElementById('nome').value;
		var livello = document.getElementById('livello').value;
		var tempo = document.getElementById('tempo').value;
		var data = document.getElementById('data').value;
		if (nome == ""){alert("inserisci nome"); return;}
		var params = "nome="+nome+"&livello="+livello+"&tempo="+tempo+"&data="+data;
		xmlhttp.open("POST","./scrivi.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange=stateChanged;
		xmlhttp.send(params);
	}
}

function stateChangedStampa(){
	if (xmlhttp.readyState==4){
		var ValoriDB = xmlhttp.responseText;
		ScompattaValoriDataBase(ValoriDB);
	}
}

function stateChanged(){
	if (xmlhttp.readyState==4){
		alert(xmlhttp.responseText);
	}
}

function ScompattaValoriDataBase(a){
	var SplitRisultato = a.split("/");
	var ValoriIntestazione = ["Nome","Livello","Tempo","Data"];
	
	var tab = document.createElement("table");
	tab.setAttribute('id',"Punteggi");
	tab.setAttribute('border',"2");
	tab.setAttribute('cellspacing',"0");
	tab.setAttribute('cellpadding',"10");
	var riga = document.createElement("tr");
	for(var i = 0; i<4; i++){
		var intestazione = document.createElement("th");
		intestazione.setAttribute('class',"intestazioneTab");
		var tt = document.createTextNode(ValoriIntestazione[i]);
		intestazione.appendChild(tt);
		riga.appendChild(intestazione);
	}
	tab.appendChild(riga);
var altezza = 0;	
	for (var i = 0; i<SplitRisultato.length-3; i++){
		var rigaa = document.createElement("tr");
				for(var j = i; j<i+4; j++){
					var colonna = document.createElement("td");
					var t = document.createTextNode(SplitRisultato[j]);
					colonna.setAttribute('class',"griglieTabella");
					colonna.appendChild(t);
					rigaa.appendChild(colonna);
				}
		tab.appendChild(rigaa);
		i+=3;
		altezza+=1;
	}
document.getElementById("Tabella").appendChild(tab);
document.getElementById("Tabella").setAttribute('style',"height:"+(altezza*60)+"px; width:"+(5*100)+"px;");
}
				
function TogliDivRegistrazione(nom){
	if (isNaN(nom)) {
		submitpunteggio('inserisci');
		var tolgodiv = document.getElementById("PopUp");
		if(tolgodiv){
			var remove = tolgodiv.parentNode.removeChild(tolgodiv);
		}
	}
	else alert("Hai inserito un numero o niente. Inserisci come prima lettera almeno un carattere.");
}

function Popup(){
//creo il popup
var popup = document.createElement("div");
popup.setAttribute('id',"PopUp");
//creao la form per l'invio dei dati
var miaform = document.createElement("form");
miaform.setAttribute('name',"formm");
miaform.setAttribute('action',"./scrivi.php");
miaform.setAttribute('method',"post");
miaform.setAttribute('id',"form");
miaform.setAttribute('onsubmit',"return false; ");
//creo il pulsante che sottomette i dati
var invia = document.createElement("input");
invia.setAttribute('type',"submit");
invia.setAttribute('value',"Registra");
invia.setAttribute('id',"invia");
invia.setAttribute('style',"font-family: Comic Sans MS;");
invia.setAttribute('onclick',"TogliDivRegistrazione(document.getElementById('nome').value);");
//creo i dati da registrare
var nom = document.createElement("input");
var livello = document.createElement("input");
var tempo = document.createElement("input");
var data_corr = document.createElement("input");

var adesso = new Date();
var data_corrente = adesso.getFullYear()+"-"+( adesso.getMonth()+1)+"-"+adesso.getDate();

data_corr.setAttribute('type',"text");
data_corr.setAttribute('id',"data");
data_corr.setAttribute('name',"data");
data_corr.setAttribute('value',data_corrente);
data_corr.setAttribute('readonly',"readonly");
data_corr.setAttribute('style',"text-align:center;");

nom.setAttribute('type',"text");
nom.setAttribute('name',"nome");
nom.setAttribute('id',"nome");

livello.setAttribute('name',"livello");
livello.setAttribute('id',"livello");
livello.setAttribute('style',"text-align:center; width:30px;");
livello.setAttribute('value',document.getElementById("Liv").value);
livello.setAttribute('class',"dati");
livello.setAttribute('readonly',"readonly");

tempo.setAttribute('name',"tempo");
tempo.setAttribute('id',"tempo");
tempo.setAttribute('style',"text-align:center; width:30px;");
tempo.setAttribute('value',tempoFinale);
tempo.setAttribute('class',"dati");
tempo.setAttribute('readonly',"readonly");

var t = document.createTextNode("Bravo. Hai vinto con un tempo di "+(tempoFinale)+" secondi. Inserisci il tuo nome nella casella di testo vuota per salvare il punteggio.");
var parag = document.createElement("p");
parag.setAttribute('style',"text-align:justify; margin-left:10px; margin-right:10px; ");
parag.appendChild(t);

var Field = document.createElement("fieldset");
Field.setAttribute('style',"margin-left:40px; margin-right:40px;");
var leg = document.createElement("legend");
leg.appendChild(document.createTextNode("La tua partita"));
leg.setAttribute('style',"color:blue;");


document.body.appendChild(popup);

popup.appendChild(parag);

miaform.appendChild(Field);
Field.appendChild(leg);

Field.appendChild(nom);
Field.appendChild(livello);
Field.appendChild(tempo);
Field.appendChild(data_corr);
Field.appendChild(invia);
popup.appendChild(miaform);
}