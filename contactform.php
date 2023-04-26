<?php
$name= $_REQUEST['name'];
$mailFrom= $_REQUEST['email'];
$message= $_REQUEST['message'];

$headers ='From:'.$mailFrom."\n";
$headers .='Reply-To:'.$mailFrom."\n";

$mailTo = "sidonie@bouthors.com";
$subject="New message from sidonie.me!";
$txt = "You have received an e-mail from ". $name . "\r\n". $message;

ini_set("SMTP", "smtp.sidonie.me");
ini_set('sendmail_from', 'postmaster@sidonie.me');

mail($mailTo, $subject, $txt, $headers);
header("Location: contact?messagesent");

?>