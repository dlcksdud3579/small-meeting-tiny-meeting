<?php
/*
// MySQL Unsigned Limit
define('MyBIGINT', '18446744073709551615');
define('MyINT', 4294967295);
define('MyMEDIUMINT', 16777215);
define('MySMALLINT', 65535);
define('MyTINYINT', 255);*/

class MysqlDB {
    var $conn, $transaction, $result, $err_report, $query_count;

	function __construct($db_setting, $DB_Name=false, $transaction = false) {
		$this->err_report = false;
		$this->transaction = $transaction;
		$this->query_count = 0;
		static $db_set_file = array();

		if(false === array_key_exists($db_setting, $db_set_file)) $db_set_file[$db_setting] = parse_ini_file($db_setting);
		$myset = &$db_set_file[$db_setting];

		if($DB_Name) $myset['db'] = $DB_Name;

		$this->DBname=$myset['db'];

		$this->conn = @mysqli_connect($myset['ip'], $myset['user'], $myset['pass']) or exit('mysqli_connect error');
		mysqli_select_db($this->conn, $myset['db']) or exit('mysqli_select_db error');
		if($transaction) {
			mysqli_query($this->conn, 'SET AUTOCOMMIT=0') or exit('mysqli_transaction_autocommit error');
			mysqli_query($this->conn, 'BEGIN') or exit('mysqli_transaction_begin error');
			register_shutdown_function(array(&$this, 'close_error'));
		}
		return true;
	}

	function close() {
		if($this->conn === false) return false;
		if($this->transaction) mysqli_query($this->conn, 'COMMIT') or exit('mysqli_transaction_commit error');
		mysqli_close($this->conn) or exit('mysqli_close error');
		$this->conn = false;
		return true;
	}

	function close_error($message = 'mysqli_error exit') {
		if($this->conn === false) return false;
		if($this->transaction) mysqli_query($this->conn, 'ROLLBACK') or exit(json_encode('mysqli_transaction_rollback error'));
		mysqli_close($this->conn) or exit(json_encode('mysqli_close_error error'));
		exit(json_encode($message));
		return true;
	}

	function query($query, $queryLog=false){
		$this->query_count ++;
		$this->result = mysqli_query($this->conn, $query) or $this->close_error(mysqli_error($this->conn));

		if($queryLog && $this->result){
			global $oInfo, $login_info, $mode;
			$query=trim($query);
			mysqli_query($this->conn, "INSERT INTO query_log (act_mode,query_txt,User_ID,wdate) VALUES('$mode',\"$query\",'$login_info[User_ID]',NOW())");
		}

		return $this->result;
	}

	function fetch_array($table,$field,$where){
		if(!$field) $field = "*";
		if($where) $where = "WHERE ".$where;
		$this->query("SELECT $field FROM $table $where");
		return @mysqli_fetch_array($this->result);
	}
	function fetch_assoc($table,$field,$where){
		if(!$field) $field = "*";
		if($where) $where = "WHERE ".$where;
		$this->query("SELECT $field FROM $table $where");
		return @mysqli_fetch_assoc($this->result);
	}
	function fetch_field($table,$field,$where=""){
		if(!$field) return "";
		$rows = $this->fetch_array($table,$field,$where);
		return $rows[0];
	}
	function num_rows($result=""){
		if(!$result) $result = $this->result;
		return @mysqli_num_rows($result) ;
	}
	function count_key($table,$key,$where){
		if(!$key) $key = "*";
		if($where) $where = "WHERE ".$where;
		$this->query("SELECT count($key) FROM $table $where");
		return @mysqli_result($this->result,0,0);
	}
	function insert_id(){
		// $this->query("SELECT last_insert_id()");
		// return @mysqli_result($this->result,0,0);
		return $this->conn->insert_id;
	}
}
?>
