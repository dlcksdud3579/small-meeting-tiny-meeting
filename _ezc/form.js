
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
					alert("����: " + result);
					//������ ��� �ȳ��� ���ΰ�?
				}
			}
		})
	}

	function set_data(rowid){ //������� 
		$.post("./json_data.php?data=test1_detail_view", {"rowid":rowid }, function(data){
			console.log(data);
			if(!data) {
				alert("��ȸ�Ǵ� �ڷᰡ �����ϴ�.");
				history.back();
				return; 
			}else{
				var form = $(":not(:radio)", $("form#frm_test1")).serializeArray();
				for (var i=0; i<form.length; i++)
				$("[name="+form[i].name+"]", $("form#frm_test1")).val(data[form[i].name]);
			}
		}, "json");
	}