<?php
$conn = mysqli_connect('localhost', 'armandojimenez_i','080280','armandojimenez_i', '3306');
if (!$conn) {
    die('Could not connect to MySQL: ' . mysqli_connect_error());
}
mysqli_query($conn, 'SET NAMES \'utf8\'');

$result = mysqli_query($conn, 'SELECT dni, email FROM contacto');

$email=trim(strtolower($_REQUEST['email']));


$salida='true' ;
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    if ( $row["email"]==$email){
        $salida='"Email ya registrado."';
    }
    
    
}
mysqli_free_result($result);

mysqli_close($conn);

echo $salida;
?>
