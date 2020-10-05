//parte Sceglu tu javascript
function PresentazioneScegliTu(){
//SETTO UNA VARIABILE CHE MI PERMETTE DI GESTIRE DEI CASI IN BASE A CHE TIPO GIOCO SCELGO
PARTITA = "PERSONALIZZATO";
numeroMaxBombe=0;

var divePresentazione = document.createElement("div");
divePresentazione.setAttribute('id',"divPresentazione");
var t = document.createTextNode("BENVENUTO a giocare con IL CAMPO MINATO: Scegli una nuova partita nel menu' a tendina.");
divePresentazione.appendChild(t);
document.body.appendChild(divePresentazione);

for(var i = 0; i<25; i++){
	var AggiungiOptRighe = new Option(i,i);
	document.getElementById("Righe").add(AggiungiOptRighe);
}

for(var i = 0; i<31; i++){
	var AggiungiOptColonne = new Option(i,i);
	document.getElementById("Colonne").add(AggiungiOptColonne);
}
	
var AggiungiOptBomba = new Option('1','1');
document.getElementById("Bombe").add(AggiungiOptBomba);
}

function PrendiRighe(a){ righe = a; CalcolaBombeCampoPersonalizzato();}
function PrendiColonne(a){ colonne = a; CalcolaBombeCampoPersonalizzato();}

function CalcolaBombeCampoPersonalizzato(a){
	var r = document.getElementById("Righe").value;
	var c = document.getElementById("Colonne").value;
	if(r!=0 && c!=0){
		if(numeroMaxBombe>0){
			for(var i = numeroMaxBombe; i>=2; i--) 
			var removed = document.getElementById("Bombe").lastChild.parentNode.removeChild(document.getElementById("Bombe").lastChild);
	}
		numeroMaxBombe = ((r*c)*80)/100;
		for(var i = 2; i<=numeroMaxBombe; i++){
			var AggiungiOptBombe = new Option(i,i);
			document.getElementById("Bombe").add(AggiungiOptBombe);
		}
	document.getElementById("Bombe").removeAttribute('disabled',"disabled");
	document.getElementById("StartScegliTu").removeAttribute('disabled',"disabled");
	}
	else {
		document.getElementById("Bombe").setAttribute('disabled',"disabled");
		document.getElementById("StartScegliTu").setAttribute('disabled',"disabled");
	}
}

function AvviaPersonalizzato(){ 
	righe = document.getElementById("Righe").value;
	colonne = document.getElementById("Colonne").value;
	NUMERO_BOMBE_PARTITA = document.getElementById("Bombe").value;
	if(document.getElementById("divPresentazione"))
		var removed = document.getElementById("divPresentazione").parentNode.removeChild(document.getElementById("divPresentazione"));

	if(document.getElementById("Display"))
		var removed = document.getElementById("Display").parentNode.removeChild(document.getElementById("Display")); 
	
	if(document.getElementById("Timer"))
		var removed2 = document.getElementById("Timer").parentNode.removeChild(document.getElementById("Timer"));
//disabilito le tre scelte e il pulsante start del gioco
document.getElementById("Righe").setAttribute('disabled',"disabled");
document.getElementById("Colonne").setAttribute('disabled',"disabled");
document.getElementById("Bombe").setAttribute('disabled',"disabled");
document.getElementById("StartScegliTu").setAttribute('disabled',"disabled");

ripetizionesecondi=0;
tempoFinale=0;
inizio=0;
CreaCampo();
CreoMatriceAssociataAlCampo();
}










