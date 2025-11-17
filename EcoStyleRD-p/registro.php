<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $NOMBRE = $_POST['NOMBRE'] ?? '';
    $CORREO = $_POST['CORREO'] ?? '';
    $TELEFONO = $_POST['TELEFONO'] ?? '';
    $CONTRASENA = $_POST['CONTRASENA'] ?? '';
    $CONFIRMAR = $_POST['CONFIRMAR'] ?? '';

    if ($CONTRASENA !== $CONFIRMAR) {
        echo "<script>alert('❌ Las contraseñas no coinciden'); window.history.back();</script>";
        exit;
    }

    $HASH = password_hash($CONTRASENA, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (NOMBRE, CORREO, TELEFONO, CONTRASEÑA)
            VALUES ('$NOMBRE', '$CORREO', '$TELEFONO', '$HASH')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('✅ Registro exitoso'); window.location='login.html';</script>";
    } else {
        echo "<script>alert('❌ Error al registrar: " . $conn->error . "'); window.history.back();</script>";
    }

    $conn->close();
}
?>
