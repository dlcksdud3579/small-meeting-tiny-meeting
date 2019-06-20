$(function () {
    listing();
    
    



});

$(document).on("click",".btn",function(){
    console.log($(this).attr("value"))
    $("input#name").val($(this).attr("value"));
})

var member = new Array();

function listing(){
    $("div#member div#member_in").empty();
    $.ajax({
        url:"./json_data.php?data=Member",
        type:"POST", dataType:"json",
        data:{ "rowId":rowId},
        success:function(data){
            if(data.member!=null)
                member = data.member.split(";");
            for(var i=0; i<member.length;i++)
            {
                
                var item = $("<input class='btn' type='button' value="+member[i]+">");
                $("div#member div#member_in").append(item);
            }
        }
    });
}
function addMember(){
    var name = $("input#name").val();
    if(member.indexOf(name) != -1)
    {   
        alert("이미 존재하는 이름");
        return 0;
    }

    member.push(name);
    console.log(member.toString().replace(/,/g,';'))

    $.ajax({
        url:"./run.php",
        type:"POST", dataType:"text",
        data:{ mode:"addMember","rowId":rowId , "member":member.toString().replace(/,/g,';')},
        success:function(data){
            if(data == "0000")
                listing();
            else
                alert("add: fail");

        }
    });
}

function deleteMember(){
    var name = $("input#name").val();
    member.splice(member.indexOf(name),1);
    console.log(member);
    $.ajax({
        url:"./run.php",
        type:"POST", dataType:"text",
        data:{ mode:"addMember","rowId":rowId , "member":member.toString().replace(/,/g,';')},
        success:function(data){
            if(data == "0000")
                listing();
            else
                alert("add: fail");

        }
    });
    
}
