
$(function () {
	listing();



});
$(document).on("click", "#mtable td", function () {
	console.log("click")
	window.open("popup.html?rowId=" + $(this).attr("rowId"), "popup", "width=400, height=700, left=100, top=50");

})

function listing() {


	$("table#mtable").empty();
	$.ajax({
		url: "./json_data.php?data=list_B",
		type: "POST", dataType: "json",
		data: { "rowId": rowId },
		success: function (data) {
			var month = 0;
			var row;
			var week;
			$.each(data, function (key, val) {
				if (month != val.month) {
					month = val.month;
					row = $("<tr>");
					row.attr({ "month": val.month });
					row.append("<th>" + val.month + "</th>");
					$("table#mtable").append(row);
				}
				var item = $("<td>");
				item.text(val.week);
				item.attr({
					"week": val.week,
					"rowId": val.rowId
				});
				row.append(item);
				week = val.week;
				console.log(key, val);
				// $("ul#list").append(item);
			});


			var item = $("<td>");
			item.text("+");
			item.attr({
				"class":"addbtn",
			});

			
			$("table#mtable tr:first-child").append(item);
			

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