//Appena carico la pagina index
function Presentazione(){
var divePresentazione = document.createElement("div");
divePresentazione.setAttribute('id',"divPresentazione");
var t = document.createTextNode("BENVENUTO a giocare con IL CAMPO MINATO: Scegli una nuova partita nel menu' a tendina.");
divePresentazione.appendChild(t);
document.body.appendChild(divePresentazione);
//SETTO UNA VARIABILE CHE MI PERMETTE DI GESTIRE DEI CASI IN BASE A CHE TIPO GIOCO SCELGO
PARTITA = "GENERALE";
}

//Funzioni che si occupano del Timer
function Tempo(attuale){
var testo = document.getElementById("Timer").firstChild;
var padre = testo.parentNode;
var removed = testo.parentNode.removeChild(testo);
padre.appendChild(document.createTextNode(attuale));
}
function stoppa(){
clearInterval(ripetizionesecondi);
}

function CalcolaDatiPredefinitoECreaCampo(a){
if(document.getElementById("divPresentazione"))
	var removed = document.getElementById("divPresentazione").parentNode.removeChild(document.getElementById("divPresentazione"));

if(document.getElementById("Display"))
	var removed = document.getElementById("Display").parentNode.removeChild(document.getElementById("Display")); 
	
if(document.getElementById("Timer"))
	var removed2 = document.getElementById("Timer").parentNode.removeChild(document.getElementById("Timer"));

ripetizionesecondi=0;
tempoFinale=0;
inizio=0;
righe=0;
colonne=0;
switch (a){
case "S" : righe=9; colonne=9; NUMERO_BOMBE_PARTITA=10; break;
case "M" : righe=16; colonne=16; NUMERO_BOMBE_PARTITA=40; break;
case "D" : righe=16; colonne=30; NUMERO_BOMBE_PARTITA=99; break;
}
CreaCampo();
CreoMatriceAssociataAlCampo();
}

//Creazione del campo minato
function CreaCampo(){
//creo il campo completo
var display = document.createElement("div");
display.setAttribute('id',"Display");
display.setAttribute('style', "width: "+((colonne*22)+2)+"px; height: "+((righe*22)+43)+"px; ");
//creo intestazione del campo completo
var intestazione = document.createElement("div");
intestazione.setAttribute('id', "Intestazione");
intestazione.setAttribute('style', "width: "+(colonne*22)+"px;");
//Personalizzo il bottone Campo
var bottoneStart = document.createElement("button");
bottoneStart.setAttribute('id',"Start");
bottoneStart.setAttribute('style'," margin-left:"+(((colonne*22)/2)-16)+"px;");
bottoneStart.setAttribute('onclick',"Rigioca()");
bottoneStart.setAttribute('disabled',"disabled");
var immagineBottone = document.createElement("img");
immagineBottone.setAttribute('id',"FacciaBottone");
immagineBottone.setAttribute('alt',"");
immagineBottone.setAttribute('src',"./Immagini/smileyInizio.JPG");
bottoneStart.appendChild(immagineBottone);
//creo il campo
var campo = document.createElement("div");
campo.setAttribute('id',"Campo");
campo.setAttribute('style', "width: "+(colonne*22)+"px; height: "+(righe*22)+"px;");
intestazione.appendChild(bottoneStart);
display.appendChild(intestazione);
display.appendChild(campo);

//creo caselle all'interno del campo
for(var i=0;i<righe;i++){
   for(var j=0;j<colonne;j++){
      var BottoneCasella = document.createElement("button");
	  BottoneCasella.setAttribute('id',"Bott"+(i+1)+"-"+(j+1));
	  BottoneCasella.setAttribute('class',"BotCasella");
	  BottoneCasella.setAttribute('onclick',"Premo("+i+","+j+")");
	  BottoneCasella.setAttribute('OnContextMenu',"MettiBandierina("+i+","+j+"); return false;");
	  BottoneCasella.setAttribute('style',"top:"+(22*i)+"px; left:"+(22*j)+"px;");
	  campo.appendChild(BottoneCasella);
	}
}
var time = document.createElement("div");
time.setAttribute('id',"Timer");
time.setAttribute('style',"width:"+((colonne*22)+2)+"px; border:3px solid black;");
time.appendChild(document.createTextNode("0"));
document.body.appendChild(time);
document.body.appendChild(display);
}

function CreoMatriceAssociataAlCampo(){
//creo matrice associata
x = new Array(righe);
for(var i=0;i<righe;i++) 
	x[i]= new Array(colonne); 
for(var i=0;i<righe;i++) 
	for(var j=0;j<colonne;j++) 
		x[i][j]=1;
}
//Metto le bombe nella matrice associata al campo
function CreaBombe(g,h){
numeroTotaleCaselle=(righe*colonne)-NUMERO_BOMBE_PARTITA;
var numeroBombe=1;
var limiteBombe=NUMERO_BOMBE_PARTITA;
while(numeroBombe<=limiteBombe){
	    var a = Math.round(righe*Math.random());
		var b = Math.round(colonne*Math.random());
		if((a>=0 && a<righe && a!=g) && (b>=0 && b<colonne && b!=h) && (x[a][b]== 1)) {x[a][b]= 9; numeroBombe++; }
}
//Metto i numeretti nelle caselle adiacenti alle bombe
var numeroBombaCasella;
for(var i=0;i<righe;i++){
     for(var j=0;j<colonne;j++){
	 if(x[i][j]!=9){
	          numeroBombaCasella = 0; 
						if(i==0 && j==0){
										if(x[i][j+1]==9) numeroBombaCasella++;
										if(x[i+1][j+1]==9) numeroBombaCasella++;
										if(x[i+1][j]==9) numeroBombaCasella++;}
						if(i==0 && j!=0 && j!=colonne-1){
										if(x[i][j-1]==9) numeroBombaCasella++;
										if(x[i+1][j-1]==9) numeroBombaCasella++;
			 							if(x[i+1][j]==9) numeroBombaCasella++;
									 	if(x[i+1][j+1]==9) numeroBombaCasella++;			 
										if(x[i][j+1]==9) numeroBombaCasella++;}
						if(i==0 && j==colonne-1){
										if(x[i][j-1]==9) numeroBombaCasella++;	 
										if(x[i+1][j-1]==9) numeroBombaCasella++;			 
										if(x[i+1][j]==9) numeroBombaCasella++;}
						if(i!=0 && i!=righe-1 && j==0){
										if(x[i-1][j]==9) numeroBombaCasella++;
										if(x[i+1][j+1]==9) numeroBombaCasella++;
										if(x[i][j+1]==9) numeroBombaCasella++;
										if(x[i+1][j]==9) numeroBombaCasella++;
										if(x[i-1][j+1]==9) numeroBombaCasella++;}
						if(i!=0 && i!=righe-1 && j!=0 && j!=colonne-1){
										if(x[i+1][j]==9) numeroBombaCasella++;     //sud
         						        if(x[i-1][j]==9) numeroBombaCasella++;     //nord
        						        if(x[i][j+1]==9) numeroBombaCasella++;     //est
        						        if(x[i][j-1]==9) numeroBombaCasella++;	 //ovest	
        						        if(x[i+1][j+1]==9) numeroBombaCasella++; //sud-est	
        						        if(x[i+1][j-1]==9) numeroBombaCasella++; //sud-ovest
        						        if(x[i-1][j+1]==9) numeroBombaCasella++; //nord-est	
        						        if(x[i-1][j-1]==9) numeroBombaCasella++;} //nord-ovest
						if(i!=0 && i!=righe-1 && j==colonne-1){
										if(x[i+1][j]==9) numeroBombaCasella++;
										if(x[i-1][j]==9) numeroBombaCasella++;			 
										if(x[i][j-1]==9) numeroBombaCasella++;			 
										if(x[i-1][j-1]==9) numeroBombaCasella++;			 
										if(x[i+1][j-1]==9) numeroBombaCasella++;} 
						if(i==righe-1 && j==0){
										if(x[i-1][j]==9) numeroBombaCasella++;
										if(x[i][j+1]==9) numeroBombaCasella++;
										if(x[i-1][j+1]==9) numeroBombaCasella++;}
						if(i==righe-1 && j!=0 && j!=colonne-1){
										if(x[i-1][j+1]==9) numeroBombaCasella++; 
        						        if(x[i-1][j-1]==9) numeroBombaCasella++; 
										if(x[i-1][j]==9) numeroBombaCasella++;     
        						        if(x[i][j+1]==9) numeroBombaCasella++;     
        						        if(x[i][j-1]==9) numeroBombaCasella++;}
						if(i==righe-1 && j==colonne-1){ 
										if(x[i][j-1]==9) numeroBombaCasella++;
										if(x[i-1][j-1]==9) numeroBombaCasella++;
										if(x[i-1][j]==9) numeroBombaCasella++;}
				x[i][j]=numeroBombaCasella;
			}
     }
}
}

function ScopriBombe(a,b){ 
	 var bomba="";
     numeroTotaleCaselle=numeroTotaleCaselle+1000;
	 for(var i=0;i<righe;i++){
        for(var j=0;j<colonne;j++){ 
		     if(x[i][j]==9){
				if(i==a && j==b) bomba="bomba2";
				else bomba="bomba3";
				var DivSostitutivo = document.createElement("div");
				DivSostitutivo.setAttribute('id',"sost"+(a+1)+"-"+(b+1));
			    DivSostitutivo.setAttribute('class',"DivBombe");
			    var BottoneBomba = document.getElementById("Bott"+(i+1)+"-"+(j+1));
				var padre = BottoneBomba.parentNode;
				var removed = BottoneBomba.parentNode.removeChild(BottoneBomba);
				padre.appendChild(DivSostitutivo);
				DivSostitutivo.setAttribute('style',"top:"+(i*22)+"px; left:"+(j*22)+"px; background-image: url(./Immagini/"+bomba+".jpg);");
				x[i][j]=11;
				
				}
			}
		}
}

function ScopriVuoti(i,j){
             if(x[i][j]>0){
                    CreaCasella(i,j);					
						}
                        
			else {	    CreaCasella(i,j);
						if(i==0 && j==0){
										if(x[i][j+1]>=0 && x[i][j+1]<=8) {ScopriVuoti(i,j+1);}
										if(x[i+1][j+1]>=0 && x[i+1][j+1]<=8){ScopriVuoti(i+1,j+1);}
										if(x[i+1][j]>=0 && x[i+1][j]<=8) {ScopriVuoti(i+1,j);}
										}
						if(i==0 && j!=0 && j!=colonne-1){
										if(x[i+1][j+1]>=0 && x[i+1][j+1]<=8){ScopriVuoti(i+1,j+1);}
										if(x[i+1][j-1]>=0 && x[i+1][j-1]<=8){ScopriVuoti(i+1,j-1);}
										if(x[i][j-1]>=0 && x[i][j-1]<=8) {ScopriVuoti(i,j-1);}
										if(x[i+1][j]>=0 && x[i+1][j]<=8) {ScopriVuoti(i+1,j);}										
										if(x[i][j+1]>=0 && x[i][j+1]<=8) {ScopriVuoti(i,j+1);}
										}
						if(i==0 && j==colonne-1){
										if(x[i+1][j-1]>=0 && x[i+1][j-1]<=8){ScopriVuoti(i+1,j-1);}
										if(x[i][j-1]>=0 && x[i][j-1]<=8) {ScopriVuoti(i,j-1);}
										if(x[i+1][j]>=0 && x[i+1][j]<=8) {ScopriVuoti(i+1,j);}
										}
						if(i!=0 && i!=righe-1 && j==0){
										if(x[i-1][j]>=0 && x[i-1][j]<=8) {ScopriVuoti(i-1,j);}
										if(x[i][j+1]>=0 && x[i][j+1]<=8) {ScopriVuoti(i,j+1);}
										if(x[i+1][j]>=0 && x[i+1][j]<=8) {ScopriVuoti(i+1,j);}
										if(x[i+1][j+1]>=0 && x[i+1][j+1]<=8){ScopriVuoti(i+1,j+1);}
										if(x[i-1][j+1]>=0 && x[i-1][j+1]<=8){ScopriVuoti(i-1,j+1);}
										}
						if(i!=0 && i!=righe-1 && j!=0 && j!=colonne-1){
										if(x[i+1][j]>=0 && x[i+1][j]<=8) {ScopriVuoti(i+1,j);}
										if(x[i-1][j]>=0 && x[i-1][j]<=8) {ScopriVuoti(i-1,j);}
										if(x[i][j+1]>=0 && x[i][j+1]<=8) {ScopriVuoti(i,j+1);}
										if(x[i][j-1]>=0 && x[i][j-1]<=8) {ScopriVuoti(i,j-1);}
										if(x[i+1][j-1]>=0 && x[i+1][j-1]<=8){ScopriVuoti(i+1,j-1);}
										if(x[i+1][j+1]>=0 && x[i+1][j+1]<=8){ScopriVuoti(i+1,j+1);}
										if(x[i-1][j-1]>=0 && x[i-1][j-1]<=8){ScopriVuoti(i-1,j-1);}
										if(x[i-1][j+1]>=0 && x[i-1][j+1]<=8){ScopriVuoti(i-1,j+1);}
										}	 	
						if(i!=0 && i!=righe-1 && j==colonne-1){
										if(x[i+1][j]>=0 && x[i+1][j]<=8) {ScopriVuoti(i+1,j);}
										if(x[i-1][j]>=0 && x[i-1][j]<=8) {ScopriVuoti(i-1,j);}
										if(x[i][j-1]>=0 && x[i][j-1]<=8) {ScopriVuoti(i,j-1);}
										if(x[i+1][j-1]>=0 && x[i+1][j-1]<=8){ScopriVuoti(i+1,j-1);}
										if(x[i-1][j-1]>=0 && x[i-1][j-1]<=8){ScopriVuoti(i-1,j-1);}
										} 
						if(i==righe-1 && j==0){
						                if(x[i-1][j+1]>=0 && x[i-1][j+1]<=8){ScopriVuoti(i-1,j+1);}
										if(x[i-1][j]>=0 && x[i-1][j]<=8) {ScopriVuoti(i-1,j);}
										if(x[i][j+1]>=0 && x[i][j+1]<=8) {ScopriVuoti(i,j+1);}
										}
						if(i==righe-1 && j!=0 && j!=colonne-1){ 
										if(x[i-1][j]>=0 && x[i-1][j]<=8) {ScopriVuoti(i-1,j);}
										if(x[i][j+1]>=0 && x[i][j+1]<=8) {ScopriVuoti(i,j+1);}
										if(x[i][j-1]>=0 && x[i][j-1]<=8) {ScopriVuoti(i,j-1);}
										if(x[i-1][j+1]>=0 && x[i-1][j+1]<=8){ScopriVuoti(i-1,j+1);}
										if(x[i-1][j-1]>=0 && x[i-1][j-1]<=8){ScopriVuoti(i-1,j-1);}
										}
						if(i==righe-1 && j==colonne-1){ 
										if(x[i][j-1]>=0 && x[i][j-1]<=8) {ScopriVuoti(i,j-1);}
										if(x[i-1][j]>=0 && x[i-1][j]<=8) {ScopriVuoti(i-1,j);}
										if(x[i-1][j-1]>=0 && x[i-1][j-1]<=8){ScopriVuoti(i-1,j-1);}
										}					
}
}

function ColoreNumero(a,b){
            var colore;
            switch(x[a][b]){
			      case 1: colore="BLUE"; return colore;
				  case 2: colore="GREEN"; return colore;
				  case 3: colore="RED"; return colore;
				  case 4: colore="INDIGO"; return colore;
				  case 5: colore="FIREBRICK"; return colore;
				  case 6: colore="TEAL"; return colore;
				  case 7: colore="SADDLEBROWN"; return colore;
				  case 8: colore="MEDIUMSEAGREEN"; return colore;
			}
}

function MettiBandierina(i,j){
	if(inizio == 0) {
			ripetizionesecondi = setInterval(function(){Tempo(tempoFinale++)},1000); 
			CreaBombe(i,j);
			inizio=1; 
			document.getElementById("Liv").setAttribute('disabled',"disabled");
			}
      var BandierinaBottone = document.getElementById("Bott"+(i+1)+"-"+(j+1));
	  if((x[i][j])<=9){
            BandierinaBottone.setAttribute('onclick',"");
	        var Bandierina = document.createElement("img");
			Bandierina.setAttribute("src","./Immagini/bandierina2.jpg");
			Bandierina.setAttribute("alt","");
	        BandierinaBottone.appendChild(Bandierina);
			x[i][j]=x[i][j]+20;
		}
	  else{  BandierinaBottone.setAttribute('onclick',"Premo("+i+","+j+")");
	         var removed = BandierinaBottone.removeChild(BandierinaBottone.firstChild);
	         x[i][j]=x[i][j]-20;
		}
}

function CreaCasella(a,b){
                        var DivSostitutivo = document.createElement("div");
						DivSostitutivo.setAttribute('id',"sost"+(a+1)+"-"+(b+1));
			            DivSostitutivo.setAttribute('class',"DivSostituto");
						if(x[a][b]!=0){
						         var testo = document.createTextNode(x[a][b]);
						         DivSostitutivo.appendChild(testo);
								 var ColNum = ColoreNumero(a,b);}
						x[a][b]=11;	
						var BottonePremuto = document.getElementById("Bott"+(a+1)+"-"+(b+1));
						var padre = BottonePremuto.parentNode;
						var removed = BottonePremuto.parentNode.removeChild(BottonePremuto);
						padre.appendChild(DivSostitutivo);
						DivSostitutivo.setAttribute('style',"top:"+(a*22)+"px; left:"+(b*22)+"px; color:"+ColNum+";");
						numeroTotaleCaselle--;
						if(numeroTotaleCaselle==0) TheEnd();
						}

function ScopriTutteLeCaselle(){
			for(var i=0;i<righe;i++) {
               for(var j=0;j<colonne;j++){ if(x[i][j]>=0 && x[i][j]<=8) CreaCasella(i,j);
			   }
            }
}

//Creo la funzione che gestisce il click del bottone del campo
function Premo(a,b){
	if(inizio == 0) {
		CreaBombe(a,b);
		ripetizionesecondi = setInterval(function(){Tempo(tempoFinale+=1)},1000); 
		inizio=1; 
		if(PARTITA != "PERSONALIZZATO")
				document.getElementById("Liv").setAttribute('disabled',"disabled");
			}
		if(x[a][b] == 9) TheEnd(a,b); 
		else{ if(x[a][b]==0) { ScopriVuoti(a,b); }
		      else{ CreaCasella(a,b); }
			}
}

//Funzione che gestisce la funzione rigioca per il Gioco standard. Facile-Medio-Difficile
function Rigioca(){
	if(document.getElementById("Campo")) var removed = document.getElementById("Campo").parentNode.removeChild(document.getElementById("Campo"));
	var campo = document.createElement("div");
	campo.setAttribute('id',"Campo");
	campo.setAttribute('style', "width: "+(colonne*22)+"px; height: "+(righe*22)+"px;");
	document.getElementById("Display").appendChild(campo);
	//creo bottoni nel campo per rigiocare
	for(var i=0;i<righe;i++){
		for(var j=0;j<colonne;j++){
			var BottoneCasella = document.createElement("button");
			BottoneCasella.setAttribute('id',"Bott"+(i+1)+"-"+(j+1));
			BottoneCasella.setAttribute('class',"BotCasella");
			BottoneCasella.setAttribute('onclick',"Premo("+i+","+j+")");
			BottoneCasella.setAttribute('onContextMenu',"MettiBandierina("+i+","+j+");return false;");
			BottoneCasella.setAttribute('style',"top:"+(22*i)+"px; left:"+(22*j)+"px;");
			campo.appendChild(BottoneCasella);
		}
	}
	CreoMatriceAssociataAlCampo();
	ripetizionesecondi=0;
	tempoFinale=0;
	inizio=0;
	var testoTempo = document.getElementById("Timer").firstChild;
	var removed2 = testoTempo.parentNode.removeChild(testoTempo);
	document.getElementById("Timer").appendChild(document.createTextNode("0"));
	document.getElementById("Start").setAttribute('disabled',"disabled");
	document.getElementById("FacciaBottone").setAttribute('src',"./Immagini/smileyInizio.JPG");
}

//Funzione che disabilita le caselle attive alla fine della partita
function disabilitaCaselleFinePartita(){
	for(var i=0; i<righe; i++)
		for(var j=0; j<colonne; j++){
			if(x[i][j]>=0 && x[i][j]<=9 || (x[i][j]-20)>=0 && (x[i][j]-20)<=9) 
				document.getElementById("Bott"+(i+1)+"-"+(j+1)).setAttribute('disabled',"disabled");
		}
}
		
			
//Funzione che si occupa del termine della partita
function TheEnd(a,b){
disabilitaCaselleFinePartita();
var u = a;
var g = b;
	if(numeroTotaleCaselle==0){
         stoppa();
         document.getElementById("FacciaBottone").setAttribute('src',"./Immagini/sorriso.jpeg");
         if(PARTITA != "PERSONALIZZATO"){
			window.alert("Vinto: Registra il punteggio e scegli una nuova partita nel menu a tendina.");
			document.getElementById("Start").removeAttribute('disabled',"disabled");
			Popup();
			}
		else{ window.alert("Vinto: Clicca su Go!!! per giocare con lo stesso campo oppure costruiscine uno nuovo.");
			}
		 }
	else {  stoppa();
			ScopriBombe(u,g);
			document.getElementById("FacciaBottone").setAttribute('src',"./Immagini/smile-triste.jpg");
		if(PARTITA != "PERSONALIZZATO"){
			document.getElementById("Start").removeAttribute('disabled',"disabled");
		    window.alert("Perso: Scegli una nuova partita nel menu a tendina oppure clicca sullo smiley per ricominciare una nuova partita dello stesso livello.");
		}
		else window.alert("Perso: Clicca su Go!!! per giocare con lo stesso campo oppure ricostruisci il tuo campo per giocare dinuovo.");
	}
	if(PARTITA != "PERSONALIZZATO"){	   
		document.getElementById("Liv").removeAttribute('disabled',"disabled");
	}
	else {
		document.getElementById("Righe").removeAttribute('disabled',"disabled");
		document.getElementById("Colonne").removeAttribute('disabled',"disabled");
		document.getElementById("Bombe").removeAttribute('disabled',"disabled");
		document.getElementById("StartScegliTu").removeAttribute('disabled',"disabled");
	}
}