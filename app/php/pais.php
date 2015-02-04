<?php

$conn = mysqli_connect('localhost', 'armandojimenez_i', '080280', 'armandojimenez_i', '3306');
if (!$conn) {
    die('Could not connect to MySQL: ' . mysqli_connect_error());
}
mysqli_query($conn, 'SET NAMES \'utf8\'');

$result = mysqli_query($conn, 'SELECT id, nombre FROM paises');
$paises="<option value='es'>España</option>";
while (($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {
    $paises .="<option value='".$row['id']."'>".$row['nombre']."</option>";
    
    
}
mysqli_free_result($result);
echo $paises;
mysqli_close($conn);