<?php
//Connessione al Database
$database = "campominato";
$user = "root";
$host = "localhost";

$db = mysql_connect($host,$user,"") or die("Impossibile connettersi al Database");
mysql_select_db($database,$db) or die ("Impossibile trovare il Database");

//Parte riguardante la pagina Punteggi
if (isset($_GET["stampa"]) && $_GET["stampa"]==1){
	$query = "SELECT* FROM partita ORDER BY dat DESC";
	$ris = mysql_query($query) or die("Prima query fallita");
	
	//Preparo per la stampa con i valori seguenti.
	while($row = mysql_fetch_array($ris)){
		echo "$row[nome]/$row[livello]/$row[tempo]/$row[dat]/";
	}
	
	//Libero la memoria occupata dalla variabile $ris
	mysql_free_result($ris);
}

//Parte riguardante la pagina campo minato
else{

$data = $_POST["data"];
$name = $_POST['nome'];
$livello = $_POST['livello'];
$tempo = $_POST['tempo'];


$query = "INSERT INTO partita VALUES ('$name','$livello',$tempo,'$data')";
mysql_query($query) or die("Impossibile inserire nella tabella partita");
if($query){
echo "Registrazione andata a buon fine.";}
else { echo "Registrazione fallita."; }
}
mysql_close($db);
?>