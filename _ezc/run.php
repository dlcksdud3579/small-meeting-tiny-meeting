<?php
	include "./lib/class.mysql.php";
	$DB = new MysqlDB("./lib/DB.auth.dbedu21.php","dbedu21");
	$DB->err_report = true;




	$mode = $_POST['mode'];
	switch($mode){
		case "test1_INSERT": //�Է�
			$rowid		= $_POST['rowid'];
			$row_id		= $_POST['row_id'];
			$test_place = $_POST['test_place'];
			$tester_id	= $_POST['tester_id'];
			$student_id = $_POST['student_id'];
			$kind = $_POST['kind'];


			/*
			$dap = "1111111";

			if(strlenth()){
				echo "EQ001";
				exit;
			}
			*/

			$sql = "
				INSERT INTO test (
					kind, test_place, tester_id, student_id
				) VALUES(
					'$kind', '$test_place','$tester_id','$student_id'
				)";
			$result = $DB->query($sql);

			if ($result) {
				echo "0000";
			} else {
				//echo "QE001";
			}
			//$result = array("1"=>1,"a"=>2,"b"=>3,"c"=>4);
			//echo json_encode($result);
			break;

	
		case "test1_UPDATE": //����
			$rowid		= $_POST['rowid'];
			$row_id		= $_POST['row_id'];
			$test_place = $_POST['test_place'];
			$tester_id	= $_POST['tester_id'];
			$student_id = $_POST['student_id'];
			$kind = $_POST['kind'];

			$sql = "UPDATE test SET kind='$kind', test_place='$test_place', tester_id='$tester_id', student_id='$student_id' WHERE row_id='$row_id'";
			$result = $DB->query($sql);

			if ($result) {
				echo "0000";
			} else {
				//echo "QE001";
			}
			break;

		case "test1_DELETE": //����
			$rowid = $_POST['rowid'];
			$sql = "DELETE FROM test WHERE row_id='$rowid'";
			$result = $DB->query($sql);
			if ($result) {
				echo "0000";
			} else {
				//echo "QE001";
			}
			break;

		case "test3":
			break;
	}


	$DB->close();
	exit;
?>
