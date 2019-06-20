var unpassMember;
var passMember = new Array();
var chooseMember = new Array();


$(function () {
    console.log("main 함수 호출2");
    $("#hidden_id").val(rowId);
    $.ajax({
        url: "./json_data.php?data=meetdata_view",
        type: "POST",
        data: {
            "rowId": rowId
        },
        dataType: "json",
        success: function (data) {
            console.log(data);


            viewing(data);

        }
    })

    $("#money #inputBtn").click(function () {

        var item = $("<li>");
        var name = $("#inputname").val();
        var num = $("#inputnum").val();
        var price = $("#inputprice").val();
        console.log(name + "(" + num + "):" + price);
        if (name == "" || num == "" || price == "" || isNaN(num) || isNaN(price)) {
            return;
        }

        item.attr({
            "name": name,
            "num": num,
            "price": price
        })

        item.text(name + "(" + num + "):" + price);
        $("ul#m_list").append(item);
        $("#inputname").val("");
        $("#inputnum").val("");
        $("#inputprice").val("");
    })

    $("#money #deleteBtn").click(function () {


        var name = $("#inputname").val();
        var num = $("#inputnum").val();
        var price = $("#inputprice").val();
        console.log(name + "(" + num + "):" + price);
        if (name == "" || num == "" || price == "" || isNaN(num) || isNaN(price)) {
            return;
        }
        var item = $("ul#m_list li[name=" + name + "][num=" + num + "][price=" + price + "]");
        item.remove()

    })


});

$(document).on("click", "ul#m_list li", function () {
    $("#inputname").val($(this).attr("name"));
    $("#inputnum").val($(this).attr("num"));
    $("#inputprice").val($(this).attr("price"));
})

$(document).on("click", "#c_list li", function () {
    chooseMember.splice(chooseMember.indexOf($(this).text()),1);
    $(this).remove();
})

$(document).on("click", "#v_list li", function () {
    if($(this).attr("name") == 0)
        return 0;
    voting($(this))
    
})

$(document).on("dbclick", "#v_list li", function () {
    removevote($(this))
})



$(document).on("click", ".btn", function () {
    console.log("click btn")
    $(this).attr('class', 'clbtn')
    addMember($(this).attr('value'))

    $("#pass form").append($(this));
})
$(document).on("click", ".clbtn", function () {
    console.log("click btn")
    $(this).attr('class', 'btn')

    deleteMember($(this).attr('value'))

    $("#unpass form").append($(this));
})

function viewing(data) {
    $("#top h2").text(data.month + "월" + data.week + "주차");
    if (data.unpass != null)
        unpassMember = data.unpass.split(";");
    if (data.member != null)
        passMember = data.member.split(";");
    for (var i = 0; i < unpassMember.length; i++) {
        if (passMember.indexOf(unpassMember[i]) == -1) {
            var item = $("<input class='btn' type='button' value=" + unpassMember[i] + ">");
            $("div#unpass form").append(item);
        }
        else {
            var item = $("<input class='clbtn' type='button' value=" + unpassMember[i] + ">");
            $("div#pass form").append(item);
        }

    }
    var money = "";
    if (data.money != null && data.money != "")
        money = data.money.split(";");

    for (var i = 0; i < money.length; i++) {
        var item = $("<li>");
        var name = money[i].split("(")[0]
        var num = money[i].split("(")[1].split(")")[0];
        var price = money[i].split(":")[1];

        item.attr({
            "name": name,
            "num": num,
            "price": price
        })

        item.text(name + "(" + num + "):" + price);
        $("ul#m_list").append(item);



    }
    $("#memotext").val(data.memo);

    var voting = "";
    if (data.voting != null && data.voting != "")
    {
        voting = data.voting.split(";");

        for (var i = 0; i < voting.length; i++) {
            var vote = voting[i];
            var item = $("<li>");
            item.text(vote);
            item.attr("name", vote);
            $("#v_list").prepend(item);
        }
    }   



    var choose = "";
    if (data.choose != null && data.choose != "") {
        choose = data.choose.split(";");

        for (var i = 0; i < choose.length; i++) {
            var one = choose[i];
            var item = $("<li>");
            item.text(one);
            chooseMember.push(one);
            item.attr("name", one);
            $("#c_list").append(item);
        }
    }
    
}



function addMember(name) {
    unpassMember.splice(unpassMember.indexOf(name), 1);
    passMember.push(name);

    // console.log(passMember.toString().replace(/,/g,';'))
    // $.ajax({
    //     url:"./run.php",
    //     type:"POST", dataType:"text",
    //     data:{ mode:"addMember2","rowId":rowId , "member":passMember.toString().replace(/,/g,';')},
    //     success:function(data){
    //         if(data == "0000")
    //            ;
    //         else
    //             alert("add: fail");

    //     }
    // });
}

function deleteMember(name) {

    passMember.splice(passMember.indexOf(name), 1);
    unpassMember.push(name);

    // console.log(passMember.toString().replace(/,/g,';'));
    // $.ajax({
    //     url:"./run.php",
    //     type:"POST", dataType:"text",
    //     data:{ mode:"addMember2","rowId":rowId , "member":passMember.toString().replace(/,/g,';')},
    //     success:function(data){
    //         if(data == "0000")
    //             ;
    //         else
    //             alert("add: fail");

    //     }
    // });

}

function save(name) {

    var memo = $("#memotext").val();
    var money = "";
    var voting = "";
    var choose = "";


    $("ul#m_list li").each(function () {
        money += $(this).text() + ";"
    })
    money = money.substr(0, money.length - 1);

    $("ul#v_list li").each(function () {
        if($(this).attr("name") != 0)
            voting += $(this).text() + ";"
    })
    voting = voting.substr(0, voting.length - 1);

    $.ajax({
        url: "./run.php",
        type: "POST", dataType: "text",
        data: { mode: "meetdata_UPDATA", "rowId": rowId, "member": passMember.toString().replace(/,/g, ';'), "money": money, "memo": memo, "voting": voting ,"choose":chooseMember.toString().replace(/,/g, ';')},
        success: function (data) {
            if (data == "0000")
                ;
            else
                alert("add: fail:"+data);
            window.close();
        }
    });
}

function chooseOne(){
    var one;

    if(passMember.length == chooseMember.length || passMember.length == 0)
    {
        alert("더이상 뽑을수없습니다.")
        return 0;
    }
    do{
    one = passMember[Math.floor(Math.random() * passMember.length)];
    }
    while(chooseMember.indexOf(one) != -1);
    chooseMember.push(one);

    var item = $("<li>");
    item.text(one);
    item.attr("name",one);

    $("#c_list").append(item);

}

function addvote(){
    var vote = prompt(" 추가할 내용을 넣어주세요");
    if(vote == null)
        return 0;
    vote+=":0"

    var item = $("<li>");
    item.text(vote);
    item.attr("name",vote);

    $("#v_list").prepend(item);

}
function voting(vote){
    
    var name = vote.text().substr(0,vote.text().indexOf(":"));
    var num = vote.text().substr(vote.text().indexOf(":")+1,vote.text().length);
    num = parseInt(num)+1;
    vote.text(name +":"+num);
}


function removevote(){
     
    if(confirm("지우시겠습니까?") == false)
        return 0;
    var vote = $("#v_list li:nth-last-child(3)");
    vote.remove();

}