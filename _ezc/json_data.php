<?
	include "./lib/class.mysql.php";
	$DB = new MysqlDB("./lib/DB.auth.dbedu21.php","dbedu21");
	$DB->err_report = true;


	$data = $_GET['data'];
	switch($data){
		case "test1_detail_view": //보기데이타
			$rowid = $_POST['rowid'];
			$rtn_data = $DB->fetch_assoc("test","*","row_id='$rowid'");
			echo json_encode($rtn_data);
			break;

		case "list_A": //리스팅 데이타
			$sql = "SELECT * FROM test WHERE 1 ORDER BY row_id DESC";
			$result = $DB->query($sql);
			$i=0;
			while($rows = mysqli_fetch_assoc($result)){
				$rtn_data[$i] = $rows;
				$i++;
			}
			echo json_encode($rtn_data);

			break;
	}
	
		/*
		DB에서 rowid값을 fetch_array 해서 json data로 echo 해준다.
			$rowid = $_GET['rowid'];
			$a = array(0,1,2,3,4,5);
			echo json_encode($a);
	//$rtn_data = new stdClass();*/
//$DB->close();
?>