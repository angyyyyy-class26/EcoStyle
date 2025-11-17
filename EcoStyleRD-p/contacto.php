<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $NOMBRE = $_POST['NOMBRE'] ?? '';
    $CORREO = $_POST['CORREO'] ?? '';
    $MENSAJE = $_POST['MENSAJE'] ?? '';

    // Validación básica
    if (empty($NOMBRE) || empty($CORREO) || empty($MENSAJE)) {
        echo "<script>alert('❌ Todos los campos son obligatorios'); window.history.back();</script>";
        exit;
    }

    $sql = "INSERT INTO contactos (NOMBRE, CORREO, MENSAJE) 
            VALUES ('$NOMBRE', '$CORREO', '$MENSAJE')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('✅ ¡Gracias por contactarnos! Tu mensaje fue enviado.'); window.location='contacto.html';</script>";
    } else {
        echo "<script>alert('❌ Error al guardar el mensaje: " . $conn->error . "'); window.history.back();</script>";
    }

    $conn->close();
}
?>
