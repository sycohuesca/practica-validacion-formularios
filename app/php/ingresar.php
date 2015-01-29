<?php

$conn = mysqli_connect('localhost', 'armandojimenez_i', 'armandojimenez_i', '080280', '3306');
if (!$conn) {
    die('Could not connect to MySQL: ' . mysqli_connect_error());
}
mysqli_query($conn, 'SET NAMES \'utf8\'');
$dni="3333333";
$email="aokakos";
 mysqli_query($conn, "insert into contacto values (\"$dni\",\"$email\")");


mysqli_close($conn);
