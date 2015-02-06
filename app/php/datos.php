<?php
$conn = new mysqli('localhost', 'armandojimenez_i', '080280, 'armandojimenez_i', '3306');
if (!$conn) {
    die('Could not connect to MySQL: ' . mysqli_connect_error());
}
// Buscamos el codigo Postal enviado.

$zip=$_REQUEST["zip"];

$sql="select m.municipio, p.provincia from t_municipios m, t_provincias p where m.codprov=p.codprov and codpostal=\"$zip\" ";
$resultado=$conn->query($sql);
$fila=$resultado->fetch_assoc();
// Transformamos la primmera letra en mayusculas y el resto en minusculas.
$fila["municipio"]= ucwords(strtolower($fila["municipio"]));
$conn->close();

echo json_encode($fila);
?>



  


