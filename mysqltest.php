<?php
include "./lib/class.mysql.php";
echo "Connect....\n";

$DB = mysqli_connect('127.0.0.1','id9828531_ay3579','chan3579','id9828531_dbsmtm');
//$DB = mysqli_connect('127.0.0.1','root','chan3579','id9828531_dbsmtm');


 if (mysqli_connect_errno()) {  
     printf("Connect failed: %s\n", mysqli_connect_error()); 
     exit();
 }
echo "sss";
 $DB->set_charset("utf8"); 
?>