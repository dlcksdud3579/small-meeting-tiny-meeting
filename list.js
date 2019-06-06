
	$(function(){
		listing();

		$(document).on("click", "ul#list li button.btn_view", function(){ //보기
			var rowId = $(this).parent().attr("rowid");
			location.href="meeting.html?rowId="+rowId;
		});

		$(document).on("click", "ul#list li button.btn_delete", function(){ //비동기
			var rowid = $(this).parent().attr("rowid");
			test_delete(rowid)
		});

		$(document).on("click", "ul#list li button.btn_modify", function(){ //비동기
			var rowid = $(this).parent().attr("rowid");
			location.href="form.html?rowid="+rowid;//test_modify(rowid)
		});

		$(document).on("click", "#btn_refresh", function(){ //비동기
			listing();
		});
	});

	function listing(){
		$("ul#list").empty();
		$.ajax({
			url:"./json_data.php?data=list_A",
			type:"POST", dataType:"json",
			data:{ },
			success:function(data){
				$.each(data, function(key, val){
					var item = $("<li>");
					item.text(val.rowId  + " : " + val.name).attr({"rowid": val.rowId});  
					item.append("<button class='btn_view'>보기</button> <button class='btn_delete'>삭제</button> <button class='btn_modify'>수정</button>");
					console.log(item, key, val.rowId);
					$("ul#list").append(item);
				});
			}
		});
	}

	function viewing(rowid){
		$.ajax({
			url:"./json_data.php?data=test1_detail_view",
			type:"POST",
			data:{
				"rowid":rowid
			},
			dataType:"json",
			success:function(data){
				$("#row_id").text(data.row_id);
				$("#kind").text(data.kind);
				$("#time_stamp").text(data.time_stamp);
				$("#student_id").text(data.student_id);
				$("#tester_id").text(data.tester_id);
				$("#test_place").text(data.test_place);
			}
		})
	}

	function test_delete(rowid){
		if(!confirm("지울래?")) return;
		$.ajax({
			url:"./run.php",
			type:"POST",
			data:{
				"mode":"test1_DELETE",
				"rowid":rowid
			},
			dataType:"text",
			success:function(result){
				if(result=="0000") listing(); //location.reload();
				else alert("Error: "+result );
			}
		})
	}

	function test_modify(){
		$.ajax({
			url:"./run.php",
			type:"POST",
			data:{
				"mode":"test1_DELETE",
				"rowid":rowid
			},
			dataType:"text",
			success:function(result){
				if(result=="0000") listing(); //location.reload();
				else alert("Error: "+result );
			}
		})
	}