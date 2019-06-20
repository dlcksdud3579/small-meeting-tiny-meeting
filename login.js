
function login(res) {
	$("table#mtable").empty();
	$.ajax({
		url: "./run.php",
		type: "post", dataType: "text",
		data: { "mode": "login", "id": res.id, "nickname":res.properties['nickname'],"pImg":res.properties['profile_image'],"sImg":res.properties['thumbnail_image']},
		success: function (result) {
				if(result == "0000"){
					window.location.href = "./list.html?id="+res.id
					
					
				}
				else{
					alert(result);

				}
				
			}
	});
}
