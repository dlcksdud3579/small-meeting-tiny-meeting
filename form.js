
	function test_save(){
		var postData = {}, i, item, formInfo = $("form#frm_test1").serializeArray();
		for (i = 0; i < formInfo.length; i++) {
			item = formInfo[i]; postData[item.name] = item.value;
		}
		if(rowid) postData["mode"] = "test1_UPDATE";
		else postData["mode"] = "test1_INSERT";

		console.log(postData);
		$.ajax({
			url:"./run.php",
			type:"POST",
			data:postData, dataType:"text",
			success:function(result){
				console.log(result);
				if(result=="0000"){
					location.href="list.html";
				}else{
					alert("실패: " + result);
					//실패후 어떻게 안내할 것인가?
				}
			}
		})
	}

	function set_data(rowid){ //수정모드 
		$.post("./json_data.php?data=test1_detail_view", {"rowid":rowid }, function(data){
			console.log(data);
			if(!data) {
				alert("조회되는 자료가 없습니다.");
				history.back();
				return; 
			}else{
				var form = $(":not(:radio)", $("form#frm_test1")).serializeArray();
				for (var i=0; i<form.length; i++)
				$("[name="+form[i].name+"]", $("form#frm_test1")).val(data[form[i].name]);
			}
		}, "json");
	}