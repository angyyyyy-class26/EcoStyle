<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $CORREO = $_POST['CORREO'];
    $CONTRASENA = $_POST['CONTRASENA'];

    // Buscar usuario por CORREO
    $sql = "SELECT * FROM usuarios WHERE CORREO = '$CORREO'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        // Verificar contraseña
        if (password_verify($CONTRASENA, $usuario['CONTRASEÑA'])) {
            session_start();
            $_SESSION['NOMBRE'] = $usuario['NOMBRE'];
            // Crear sesión en localStorage usando una página intermedia
            echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Iniciando sesión...</title>';
            echo '<script>';
            echo 'localStorage.setItem("sesion", JSON.stringify({nombre: "'.addslashes($usuario['NOMBRE']).'", email: "'.addslashes($usuario['CORREO']).'"}));';
            echo 'window.location.href = "Productos.html";';
            echo '</script></head><body>Iniciando sesión...</body></html>';
            exit();
        } else {
            echo "<script>alert('Contraseña incorrecta'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('Correo no registrado'); window.history.back();</script>";
    }

    $conn->close();
}
?>
