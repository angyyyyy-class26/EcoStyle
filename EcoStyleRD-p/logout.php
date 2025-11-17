<?php
session_start();
session_unset();
session_destroy();

echo "<script>
        alert('👋 Has cerrado sesión correctamente');
        window.location = 'index.php';
      </script>";
?>
