<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "ecostyle";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
} else {
    // echo "✅ Conectado correctamente"; // (puedes activar esto para probar)
}
?>
