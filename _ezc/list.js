
	$(function(){
		listing();
		$(document).on("click", "ul#list li button.btn_view_A", function(){ //동기
			var rowid = $(this).parent().attr("rowid");
			viewing(rowid);
		});

		$(document).on("click", "ul#list li button.btn_view_B", function(){ //비동기
			var rowid = $(this).parent().attr("rowid");
			location.href="view.html?rowid="+rowid;
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
					//var item = $("ul#list li:eq(0)").clone();
					//item.html("<a href='view.html?rowid="+val.row_id+"'>"+val.row_id  + " : " + val.time_stamp+"</a>");
					var item = $("<li>"); //itme = <li>
					item.text(val.row_id  + " : " + val.time_stamp).attr({
						"rowid": val.row_id,
						"time_stamp": val.time_stamp
					});  // item = <li rowid='row_id' time_stmp='time_stamp'>11 : 20180011220</li>
					item.append("<button class='btn_view_A'>보기(동기)</button> <button class='btn_view_B'>보기(비동기)</button> <button class='btn_delete'>삭제</button> <button class='btn_modify'>수정</button>");
					//item = <li rowid='row_id' time_stmp='time_stamp'>11 : 20180011220 <button class='btn_view_A'>보기(동기)</button> <button class='btn_view_B'>보기(비동기)</button> <button class='btn_delete'>삭제</button> <button class='btn_modify'>수정</button></li>

					console.log(item, key, val);
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