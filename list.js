
$(function () {


	listing();
	$(document).on("click", "ul#list li", function () {

		var rowid = $(this).attr("rowid");
		if (rowid == 0)
			addmeeting();
		else
			location.href = "meeting.html?rowId=" + rowid+"&name="+$(this).text();

	})
});



function listing() {
	$("ul#list").empty();

	$.ajax({
		url: "./json_data.php?data=list_A",
		type: "POST", dataType: "json",
		data: { "id": id },
		success: function (data) {
			$.each(data, function (key, val) {
				var item = $("<li>");
				item.text(val.name).attr({ "rowid": val.rowId });

				$("ul#list").append(item);

			});
			var item = $('<li>');
			item.text("새로운 미팅 만들기").attr({ "rowid": 0 });

			$("ul#list").append(item);


		}
	});
}

function test_delete(rowid) {
	if (!confirm("지울래?")) return;
	$.ajax({
		url: "./run.php",
		type: "POST",
		data: {
			"mode": "test1_DELETE",
			"rowid": rowid
		},
		dataType: "text",
		success: function (result) {
			if (result == "0000") listing(); //location.reload();
			else alert("Error: " + result);
		}
	})
}

function test_modify() {
	$.ajax({
		url: "./run.php",
		type: "POST",
		data: {
			"mode": "test1_DELETE",
			"rowid": rowid
		},
		dataType: "text",
		success: function (result) {
			if (result == "0000") listing(); //location.reload();
			else alert("Error: " + result);
		}
	})
}

function addmeeting() {
	var name = prompt("모임이름이 무엇인가요?");
	if (name == null)
		return
	$.ajax({
		url: "./run.php",
		type: "POST",
		data: {
			"mode": "meeting_INSERT",
			"name": name,
			"id":id
			
		},
		dataType: "text",
		success: function (result) {
			if (result == "0000") listing(); //location.reload();
			else alert("Error: " + result);
			window.location.reload()
		}
	})
	
}