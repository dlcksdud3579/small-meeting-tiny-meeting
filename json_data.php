<?php
	include "./lib/class.mysql.php";

	$DB = new MysqlDB("./lib/DB.auth.localhost.php","id9828531_dbsmtm");
	$DB->err_report = true;


	$data = $_GET['data'];
	switch($data){
		case "meetdata_view": //보기데이타
			$rowId = $_POST['rowId'];
			$rtn_data = $DB->fetch_assoc("meetdata","*","rowId='$rowId'");
			echo json_encode($rtn_data);
			break;

		case "list_A": //리스팅 데이타
			$sql = "SELECT * FROM meeting WHERE 1 ORDER BY rowId DESC";
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
			$sql = "SELECT meetdata.rowId,month, week FROM meeting, meetdata where meeting.rowId = meetdata.meetingId AND meeting.rowId = $rowId ORDER BY week,month DESC";
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
			
	}
	$DB->close();
?>
