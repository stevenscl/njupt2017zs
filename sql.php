<?php
//设置页面内容是html编码格式是utf-8
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Credentials:true'); 
// header("Content-Type: text/plain;charset=utf-8"); 
header("Content-Type: application/json;charset=utf-8"); 
//header("Content-Type: text/xml;charset=utf-8"); 
//header("Content-Type: text/html;charset=utf-8"); 
//header("Content-Type: application/javascript;charset=utf-8"); 

$mysqli=new mysqli();//实例化mysqli
$mysqli->connect('localhost','root','root','zs');
if(mysqli_connect_error()){
    exit('数据库连接错误,错误信息是.'.mysqli_connect_error());
}
$mysqli->set_charset("UTF8");//设置数据库编码

if (!isset($_POST['key'])) {
	echo "请求失败";
	return;
}else{
	$key = $_POST['key'];
	if ($key == 1) {
		if (!isset($_POST["year"])||!isset($_POST["province"])||!isset($_POST["subject"])) {
			echo "参数错误";
			return;
		}else{
			$year = $_POST["year"];
			$province = $_POST["province"];
			$subject = $_POST["subject"];
		}
		$sqlzsjh="select `major`,`plan`,`nature`,`tuition` from `jhfs` where `year` like '{$year}' and `province` like '{$province}' and `subject` like '{$subject}'";//创建一句SQL语句
		$zsjh=$mysqli->query($sqlzsjh);
		$data1 = array();
		if ($zsjh->num_rows > 0) {
			while ($row = $zsjh->fetch_assoc()) {
				array_push($data1, $row);
			}
		}else {
			echo "没有数据";
		}
		$json1 = json_encode($data1);
		$zsjh->free();
		echo $json1;
	}elseif ($key == 2) {
		if (!isset($_POST["year"])||!isset($_POST["province"])||!isset($_POST["subject"])) {
			echo "参数错误";
			return;
		}else{
			$year = $_POST["year"];
			$province = $_POST["province"];
			$subject = $_POST["subject"];
		}
		if ($year == '0000') {
			$sqllnfs="select `year`,`batch`,`minscore`,`controlline` from `gxfs` where `province` like '{$province}' and `subject` like '{$subject}'";
		}else {
			$sqllnfs="select `year`,`batch`,`minscore`,`controlline` from `gxfs` where `year` like '{$year}' and `province` like '{$province}' and `subject` like '{$subject}'";
		}
		$lnfs=$mysqli->query($sqllnfs);
		$data2 = array();
		if ($lnfs->num_rows > 0) {
			while ($row = $lnfs->fetch_assoc()) {
				array_push($data2, $row);
			}
		}else {
			echo "没有数据";
		}
		$json2 = json_encode($data2);
		$lnfs->free();
		echo $json2;
	}elseif ($key == 3) {
		if (!isset($_POST["year"])||!isset($_POST["province"])||!isset($_POST["subject"])) {
			echo "参数错误";
			return;
		}else{
			$year = $_POST["year"];
			$province = $_POST["province"];
			$subject = $_POST["subject"];
		}
		$sqllnfs2="select `major`,`minscore`,`avgscore`,`enroll`,`remarks` from `jhfs` where `year` like '{$year}' and `province` like '{$province}' and `subject` like '{$subject}'";
		$lnfs2=$mysqli->query($sqllnfs2);
		$data3 = array();
		if ($lnfs2->num_rows > 0) {
			while ($row = $lnfs2->fetch_assoc()) {
				if ($row['remarks'] == null) {
					$row['remarks'] = "无";
				}
				array_push($data3, $row);
			}
		}else {
			echo "没有数据";
		}
		$json3 = json_encode($data3);
		$lnfs2->free();
		echo $json3;
	}elseif ($key == 4) {
		if (!isset($_POST["year"])||!isset($_POST["province"])||!isset($_POST["subject"])) {
			echo "参数错误";
			return;
		}else{
			$year = $_POST["year"];
			$province = $_POST["province"];
			$subject = $_POST["subject"];
		}
		$sqllnfs3="select `major`,`minscore`,`avgscore`,`enroll` from `jhfs` where `year` like '{$year}' and `province` like '{$province}' and `subject` like '{$subject}'";
		$lnfs3=$mysqli->query($sqllnfs3);
		$data4 = array();
		if ($lnfs3->num_rows > 0) {
			while ($row = $lnfs3->fetch_assoc()) {
				array_push($data4, $row);
			}
		}else {
			echo "没有数据";
		}
		$json4 = json_encode($data4);
		$lnfs3->free();
		echo $json4;
	}
}
$mysqli->close();//别忘了关闭你的"小资源";
?>