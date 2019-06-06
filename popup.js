$(function(){
    console.log("main 함수 호출");
    $.ajax({
        url:"./json_data.php?data=meetdata_view",
        type:"POST",
        data:{
            "rowId": rowId
        },
        dataType:"json",
        success:function(data){
            console.log(data);
            viewing(data);
        }
    })
    $("#money #inputBtn").click(function(){
        $("#money textarea").append($("#inputText").val()+';');
        $("#inputText").val('');
        

    })
});


$(document).on("click",".btn",function(){
    console.log("click btn")
    $(this).attr('class','clbtn')

    $("#pass form").append($(this));
})
$(document).on("click",".clbtn",function(){
    console.log("click btn")
    $(this).attr('class','btn')
    $("#unpass form").append($(this));
})

function viewing(data){
    $("#top h2").text(data.month+"월"+data.week+"주차");



}