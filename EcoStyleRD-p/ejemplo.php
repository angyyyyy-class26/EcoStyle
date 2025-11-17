<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "ecostyle";

$conexion = mysqli_connect($servername, $username, $password, $database);



if (isset($_POST['registro'])){


    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $password = $_POST['password'];

    $insertardatos = "INSERT INTO usuarios (ID_USUARIO, NOMBRE, CORREO, TELEFONO, CONTRASEÑA) VALUES ('', '$nombre', '$correo', '$telefono', '$password')";

    $mysqli_query = $conexion; 
    $mysqli_query = $insertardatos;

}