<?php

// Combinar el salt con la contraseña y generar un hash bcrypt
$contrasena = 'richar1234';
$saltedPassword = $contrasena;
$hash = password_hash($saltedPassword, PASSWORD_BCRYPT);
echo ($hash. "<br>");

// Verificar una contraseña con el hash bcrypt y el salt almacenados
$contrasenaIngresada = 'richar1234';
$saltedPasswordIngresada =$contrasenaIngresada;
echo " \n $saltedPasswordIngresada";

if (password_verify($saltedPasswordIngresada, $hash)) {
    echo '"<br>"La contraseña es correcta';
} else {
    echo '"<br>"La contraseña es incorrecta';
}

?>