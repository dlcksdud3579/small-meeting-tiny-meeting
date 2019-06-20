
$(function () {
	listing();
	$("#name").text(name);



});
$(document).on("click", "#mtable td ol li", function () {

	if ($(this).attr("rowId") == 0)
		addData();
	else
		window.open("popup.html?rowId=" + $(this).attr("rowId") + "&meetingId=" + rowId, "popup", "width=400, height=700, left=100, top=50");

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
			var list;
			var week;
			$.each(data, function (key, val) {
				if (month != val.month) {
					month = val.month;
					row = $("<tr>");
					row.attr({ "month": val.month });
					row.append("<th>" + val.month + "월</th>");
					$("table#mtable").append(row);

					list = $("<ol class ='mylist'>");
					row.append($("<td>").append(list));

				}
				var item = $("<li>");
				item.text(val.week);
				item.attr({
					"week": val.week,
					"rowId": val.rowId
				});
				list.append(item);
				week = val.week;
				console.log(key, val);
				// $("ul#list").append(item);
			});
			var currentMonth = new Date().getMonth() + 1;
			var item = $("<li>");
			item.text("+");
			item.attr({
				"rowId": 0,
			});

			if ($("table#mtable tr:first-child").attr("month") == currentMonth) {
				$("table#mtable tr:first-child td ol").append(item);
			}
			else {
				row = $("<tr>");
				row.attr({ "month": currentMonth });
				row.append("<th>" + currentMonth + "월</th>");
				$("table#mtable").prepend(row);


				list = $("<ol class ='mylist'>");
				row.append($("<td>").append(list));
				$("table#mtable tr:first-child td ol").append(item);
			}
		},
		error:function(){
			startMeeting();
		}
	});
}

function startMeeting()
{
	var currentMonth = new Date().getMonth() + 1;
	var item = $("<li>");
	item.text("+");
	item.attr({
		"rowId": 0,
	});

	row = $("<tr>");
	row.attr({ "month": currentMonth });
	row.append("<th>" + currentMonth + "월</th>");
	$("table#mtable").prepend(row);

	list = $("<ol class ='mylist'>");
	row.append($("<td>").append(list));
	$("table#mtable tr:first-child td ol").append(item);

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

function addData() {
	var week = prompt("몇주차인가요?");
	if ( week == null || isNaN(week))
		return
	$.ajax({
		url: "./run.php",
		type: "POST",
		data: {
			"mode": "meetdata_INSERT",
			"meetingId": rowId,
			"month": new Date().getMonth()+1,
			"week":week
		},
		dataType: "text",
		success: function (result) {
			if (result == "0000") listing(); //location.reload();
			else alert("Error: " + result);
		}
	})


}

Kakao.init('f3a47205cbd23324832defb5e6a58360');
function sendLink() {

	var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.substr(0,window.location.pathname.lastIndexOf("/"))+"/invite.html?rowId="+rowId;
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '초대하기',
          description: '초대하는 버튼',
          imageUrl: 'https://kr.seaicons.com/wp-content/uploads/2017/02/Button-Add-icon.png',
          link: {
            mobileWebUrl: newURL,
            webUrl:newURL
          }
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: newURL,
              webUrl: newURL
            }
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: newURL,
              webUrl: newURL
            }
          }
        ]
    });
}