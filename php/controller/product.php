<?php
require_once("../init.php");
function index_lunbo(){
    global $conn;
    $sql="select pid,superimg from mx_index_lunbo where display=1";
    $result=mysqli_query($conn,$sql);
    while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	echo json_encode($products);
}
function index_cake(){
    global $conn;
    $sql="SELECT mx_index_cake.pid,mx_product_pic.limg,mx_product.title,mx_product.mprice,mx_product.nprice FROM (mx_index_cake,mx_product) JOIN mx_product_pic ON (mx_index_cake.pid=mx_product_pic.pid) WHERE mx_index_cake.pid=mx_product.pid AND mx_index_cake.display=1";
    $result=mysqli_query($conn,$sql);
    while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	echo json_encode($products);
}
function index_desert(){
    global $conn;
    $sql="SELECT mx_index_desert.pid,mx_product_pic.limg,mx_product.title,mx_product.mprice,mx_product.nprice FROM (mx_index_desert,mx_product) JOIN mx_product_pic ON (mx_index_desert.pid=mx_product_pic.pid) WHERE mx_index_desert.pid=mx_product.pid AND mx_index_desert.display=1";
    $result=mysqli_query($conn,$sql);
    while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	echo json_encode($products);
}
function index_random(){
    global $conn;
    $sql="SELECT mx_footer_random.pid,mx_product_pic.limg FROM (mx_footer_random,mx_product) JOIN mx_product_pic ON (mx_footer_random.pid=mx_product_pic.pid) WHERE mx_footer_random.pid=mx_product.pid AND mx_footer_random.display=1";
    $result=mysqli_query($conn,$sql);
    while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	echo json_encode($products);
}
function top_ten(){
    global $conn;
    $sql="SELECT mx_top_ten.top_num,mx_top_ten.pid,mx_product_pic.mimg,mx_product.title,mx_product.nprice FROM (mx_top_ten,mx_product) JOIN mx_product_pic ON (mx_top_ten.pid=mx_product_pic.pid) WHERE mx_top_ten.pid=mx_product.pid AND mx_top_ten.display=1 ORDER BY mx_top_ten.top_num LIMIT 0,10";
    $result=mysqli_query($conn,$sql);
    while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	echo json_encode($products);
}
function cake_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.is_cake=1 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.is_cake=1 AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function desert_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.is_desert=1 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.is_desert=1 AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function quick_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.is_quick=1 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.is_quick=1 AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function chess_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=4 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=4  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function child_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=9 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=9  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function happyshare_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=10 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=10  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function loveshare_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=7 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=7  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function lovestyle_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=8 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=8  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function mango_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=2 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=2  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function milk_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=1 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=1  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function qiaokeli_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=5 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=5  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function cuicui_list(){
	global $conn;
	@$pnum=$_REQUEST["pnum"];
	if(!$pnum){
		$pnum=1;
	}else{
		$pnum=$_REQUEST["pnum"];
	}
	$pagesize=12;
	$page=($pnum-1)*$pagesize;
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.tid=3 AND mx_product.is_shop=1 LIMIT $page,$pagesize";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
	$sql="SELECT COUNT(*) FROM mx_product WHERE mx_product.tid=3  AND mx_product.is_shop=1";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	$pagecount=ceil($row[0]/$pagesize);
	$output=array(
		"pnum"=>$pnum,//当前页
		"productscount"=>$row[0],//商品数量
		"pagecount"=>$pagecount,//商品总页数
		"data"=>$products
	);
	echo json_encode($output);
}
function getproductbyid(){
	global $conn;
	@$pid=$_REQUEST["pid"];
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.is_cake,mx_product.subtitle,mx_product.mprice,mx_product.nprice,mx_product.pound,mx_product.taste,mx_product.details,mx_product_pic.sbimg,mx_product_pic.simg FROM mx_product,mx_product_pic WHERE mx_product.pid='$pid' AND mx_product.pid=mx_product_pic.pid AND mx_product.is_shop=1 ";
	$result = mysqli_query($conn,$sql);
	$output=mysqli_fetch_assoc($result);
	echo json_encode($output);
}
function maybelike(){
	global $conn;
	@$pid=$_REQUEST["pid"];
	$sql="SELECT mx_product.pid,mx_product.title,mx_product.nprice,mx_product_pic.limg FROM mx_product,mx_product_pic where mx_product.tid=(SELECT tid FROM mx_product WHERE mx_product.pid='$pid') AND mx_product.pid=mx_product_pic.pid";
	$result = mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$output[]= $row;}
	echo json_encode($output);
}


function searchproduct(){
	global $conn;
	@$key=$_REQUEST["key"];
	if($key){
		$sql="select mx_product.pid,mx_product.nprice,mx_product.mprice,mx_product.title,mx_product_pic.limg from mx_product,mx_product_pic where mx_product.pid=mx_product_pic.pid";
		$keys=explode(" ",$key);
		for($i=0;$i<count($keys);$i++){
			$sql.=" AND mx_product.subtitle like '%".$keys[$i]."%'";
		}
		$sql.=" GROUP BY mx_product.pid";
		$result = mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$output[]= $row;}
		echo json_encode($output);
	}

}
?>