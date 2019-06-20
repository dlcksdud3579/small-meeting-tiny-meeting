<?php
	include "./lib/class.mysql.php";
	$DB = new MysqlDB("./lib/DB.auth.localhost.php","id9828531_dbsmtm");
	$DB->err_report = true;


	$mode = $_POST['mode'];

	switch($mode){

		case "login":
			$id=  $_POST['id'];
			$rtn_data = $DB->fetch_assoc("user","id","id='$id'");
			if(empty($rtn_data))
			{
			
				$name =$_POST['nickname'];
				$pImg =  $_POST['pImg'];
				$sImg =  $_POST['sImg'];
				
				$sql = "
				INSERT INTO user (
					id, name, pImg, sImg
				) VALUES(
					$id,'$name','$pImg','$sImg'
				)";
				$result = $DB->query($sql);
				if ($result) {
					echo "0000";
				} else {
					echo "login:fail";
				}
				break;
			}
			echo "0000";
			break;
		case "addMember":
			$rowId =$_POST["rowId"]; 
			$member = $_POST["member"];
			$sql = "UPDATE meeting SET member='$member' WHERE rowId='$rowId'";
			$result = $DB->query($sql);
			if ($result) {
				echo "0000";
			} else {
				//echo "QE001";
			}
			break;

		case "addMember2":
			$rowId =$_POST["rowId"]; 
			$member = $_POST["member"];
			$sql = "UPDATE meetdata SET member='$member' WHERE rowId='$rowId'";
			$result = $DB->query($sql);
			if ($result) {
				echo "0000";
			} else {
				//echo "QE001";
			}
			break;
		case "meetdata_UPDATA":
			$rowId =$_POST["rowId"]; 
			$member = $_POST["member"];
			$money = $_POST["money"];
			$memo = $_POST["memo"];
			$voting = $_POST["voting"];
			$choose = $_POST["choose"];


			$sql = "UPDATE meetdata SET member='$member',money='$money', memo='$memo',voting='$voting', choose='$choose' WHERE rowId='$rowId'";
			$result = $DB->query($sql);
			if ($result) {
				echo "0000";
			} else {
				//echo "QE001";
			}
				
			break;
		case "meetdata_INSERT":
			$meetingId = $_POST['meetingId'];
			$month = $_POST['month'];
			$week = $_POST['week'];
		
			$sql = "INSERT INTO `meetdata`(`meetingId`, `month`, `week`) VALUES ($meetingId	,$month,$week )";
			$result = $DB->query($sql);

			if ($result) {
				echo "0000";
			} else {
			}

			break;
		case "meeting_INSERT":
			$name = $_POST['name'];
			$id = $_POST['id'];
			
		
			$sql = "INSERT INTO `meeting`(`name`) VALUES ('$name')";
			$result = $DB->query($sql);
			$rowid = $DB->insert_id();

			if ($result) {
					$sql = "INSERT INTO `auth`(`id`, `rowid`, `ms`) VALUES ( $id,$rowid,1)";
					$result = $DB->query($sql);
					if ($result){
						echo "0000";
					}
					else{
						echo "0001";
					}
			} else {
				echo "0002";
			}

			break;

		case "invite":
			$id = $_POST["id"];
			$rowid = $_POST["rowId"];

			$sql = "INSERT INTO `auth`(`id`, `rowid`, `ms`) VALUES ( $id,$rowid,0)";
			$result = $DB->query($sql);
			if ($result) {
				echo "0000";
			} else {
				echo "0001";
			}
		break;

	}


	$DB->close();
	exit;

?>