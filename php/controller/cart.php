<?php
require_once("../init.php");
function addcart(){
	global $conn;
	@$uid=$_REQUEST["uid"];
	@$pid=$_REQUEST["pid"];
	@$count=$_REQUEST["count"];
	if($uid&&$pid&&$count){
		$sql="INSERT INTO mx_cart(uid,pid,count) VALUES('$uid','$pid','$count')";
		mysqli_query($conn,$sql);
		echo json_encode(1);
	}else{
		echo json_encode(0);
	}
}
function showcart(){
	global $conn;
	@$uid=$_REQUEST["uid"];
	if($uid){
		$sql="	SELECT mx_cart.pid,mx_cart.count,mx_cart.cid,mx_cart.bless,mx_product.title,mx_product.pound,mx_product.taste,mx_product.nprice,mx_product_pic.limg 
					FROM mx_cart,mx_product,mx_product_pic 
					WHERE mx_cart.uid='$uid' AND mx_cart.pid=mx_product.pid AND mx_cart.pid=mx_product_pic.pid";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
		echo json_encode($products);
	}else{
		echo json_encode(0);
	}
}
function updatecart(){
	global $conn;
	@$uid=$_REQUEST["uid"];
	@$cid=$_REQUEST["cid"];
	@$count=$_REQUEST["count"];
	if($uid){
		$sql="UPDATE mx_cart set mx_cart.count='$count' where cid='$cid' AND uid='$uid'";
		mysqli_query($conn,$sql);
		echo json_encode(1);
	}else{
		echo json_encode(0);
	}
}

function deletecart(){
	global $conn;
	@$uid=$_REQUEST["uid"];
	@$cid=$_REQUEST["cid"];
	if($uid){
		$sql="DELETE  FROM mx_cart where cid='$cid' AND uid='$uid'";
		mysqli_query($conn,$sql);
		echo 1;
	}else{
		echo 0;
	}
}
function useraddress(){
	global $conn;
	@$uid=$_REQUEST["uid"];
	if($uid){
		$sql="SELECT *FROM `mx_address` WHERE uid='$uid'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
		echo json_encode($products);
	}else{
		echo json_encode(0);
	}
}


function addorder(){
	global $conn;
	@$uid=$_REQUEST["uid"];
	@$pid=$_REQUEST["pid"];
	@$aid=$_REQUEST["aid"];
	@$count=$_REQUEST["count"];
	if($uid){
		$sql="INSERT INTO mx_order (uid,aid,pid,count) VALUES('$uid','$aid','$pid','$count')";
		$result=mysqli_query($conn,$sql);
		if($result){
			echo 1;
		}else{
			echo 0;
		}
	}
}




?>