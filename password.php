<?php

// Combinar el salt con la contraseña y generar un hash bcrypt
$contrasena = '2580';
$saltedPassword = $contrasena;
$hash = password_hash($saltedPassword, PASSWORD_BCRYPT);
echo ($hash. "<br>");
echo ('$2y$10$UYyV.d5HR669J/V3kT5pDusRBXYA2GOQ5nhL8o1StI9sH3BBR2/fu'."<br>");
// Verificar una contraseña con el hash bcrypt y el salt almacenados
$contrasenaIngresada = '2580';
$saltedPasswordIngresada =$contrasenaIngresada;
echo " \n $saltedPasswordIngresada";

if (password_verify($saltedPasswordIngresada, $hash)) {
    echo '"<br>"La contraseña es correcta';
} else {
    echo '"<br>"La contraseña es incorrecta';
}

?>