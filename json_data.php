<?php
	include "./lib/class.mysql.php";

	$DB = new MysqlDB("./lib/DB.auth.localhost.php","id9828531_dbsmtm");
	$DB->err_report = true;


	$data = $_GET['data'];
	switch($data){
		case "meetdata_view": //보기데이타
			$rowId = $_POST['rowId'];
			$rtn_data = $DB->fetch_assoc("meetdata, meeting","meetdata.*, meeting.member AS unpass"," meetdata.rowId='$rowId' AND meetdata.meetingId = meeting.rowId ");
			echo json_encode($rtn_data);
			break;

		case "list_A": //리스팅 데이타
			$id  = $_POST['id'];
			$sql = "SELECT * FROM meeting,auth WHERE auth.id = $id and auth.rowid = meeting.rowId ORDER BY meeting.rowId DESC";
			$result = $DB->query($sql);
			$i=0;
			while($rows = mysqli_fetch_assoc($result)){
				$rtn_data[$i] = $rows;
				$i++;
			}
			echo json_encode($rtn_data);

			break;
		case "list_B": //리스팅 데이타
			$rowId = $_POST['rowId'];
			$sql = "SELECT meetdata.rowId,month, week FROM meeting, meetdata where meeting.rowId = meetdata.meetingId AND meeting.rowId = $rowId ORDER BY month *12- week DESC";
			$result = $DB->query($sql);
			$i=0;
			while($rows = mysqli_fetch_assoc($result)){
				$rtn_data[$i] = $rows;
				$i++;
			}
			echo json_encode($rtn_data);

			break;

		case "Member":
			$rowId = $_POST['rowId'];
			$rtn_data = $DB->fetch_assoc("meeting","member","rowId='$rowId'");
			echo json_encode($rtn_data);

			break;

		
		case "userData":
			$id=  $_POST['id'];
			$rtn_data = $DB->fetch_assoc("user","id, email, name, pImg, sImg","id='$id'");
			if(empty($rtn_data))
			{
				
			}
			echo json_encode($rtn_data);
			break;
		
			
	}
	$DB->close();
?>
