<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
if (mail("milchenko2k16@gmail.com", "Test mail", "Проверка отправки почты")) {
    echo "ok";
} else {
    echo "error";
}