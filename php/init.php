<?php
header("Access-Control-Allow-Origin: *");
$conn=mysqli_connect(
	"qdm225205620.my3w.com","qdm225205620","63cd0163","qdm225205620_db",3306);
mysqli_query($conn,"SET NAMES UTF8");