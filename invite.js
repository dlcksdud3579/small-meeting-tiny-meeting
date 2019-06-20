
function login(res) {
	$("table#mtable").empty();
	$.ajax({
		url: "./run.php",
		type: "post", dataType: "text",
		data: { "mode": "login", "id": res.id, "nickname":res.properties['nickname'],"pImg":res.properties['profile_image'],"sImg":res.properties['thumbnail_image']},
		success: function (result) {
				if(result == "0000"){
					invite(res.id);
					window.location.href = "./list.html?id="+res.id
					
					
				}
				else{
					alert(result);

				}
				
			}
	});
}

function invite(id)
{
	
	$.ajax({
		url: "./run.php",
		type: "post", dataType: "text",
		data: { "mode": "invite", "id": id, "rowId":rowId},
		success: function (result) {
				if(result == "0000"){
					alert("초대 되었습니다.");
				}
				else{
					alert(result);

				}
				
			}
	});
}
