$("#item").click(function (){
    loadAllItem();
})

function genarateItemCode(){
    $("#txtPopItemCode").val("I00-001");
    var customerId =""; /*itemDB[itemDB.length - 1].getItemCode();*/
    var tempId = parseInt(customerId.split("-")[1]);
    tempId = tempId + 1;
    if (tempId <= 9) {
        $("#txtPopItemCode").val("I00-00" + tempId);
    } else if (tempId <= 99) {
        $("#txtPopItemCode").val("I00-0" + tempId);
    } else{
        $("#txtPopItemCode").val("I00-" + tempId);
    }
}

$("#popItemBtnAdd").click(function () {

    var cusOb={
        "code":$("#txtPopItemCode").val(),
        "name":$("#txtPopItemName").val(),
        "price":$("#txtPopItemPrice").val(),
        "qtyOnHand":$("#txtPopItemQuntity").val(),
    }

    $.ajax({
        url: "item",
        method: "POST",
        contentType:"application/json",
        data: JSON.stringify(cusOb),
        success:function (res){
            if (res.status==200){
                alert(res.message);
                clearItemPopData();
                genarateItemCode();
                loadAllItem();
            }else {
                alert(res.data);
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });
});

function loadAllItem() {
    $("#itemTable").empty();
    $.ajax({
        url: "item?option=GETAll",
        method: "GET",
        /* dataType :"json",*/
        success: function (resp) {
            for (const item of resp.data) {
                var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qtyOnHand}</td></tr>`;
                $("#itemTable").append(row);
            }
            bindClickEvents();
        }
    });
}

$("#btnItemDelete").click(function (){
    let itemCode = $("#txtItemCode").val();
    $.ajax({
        url:"item?code="+itemCode,
        method:"DELETE",
        //data :data,
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                clearAllItem();
                loadAllItem();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, status, t) {
            console.log(ob);
            console.log(status);
            console.log(t);
        }
    })
});

$("#btnItemSearch").click(function (){
    var search = $("#ItemPpoSearchBar").val();
    $("#itemTable").empty();

    $.ajax({
        url:"item?option=SEARCH&code=" + search,
        method:"GET",
        success: function (resp) {
                var row = `<tr><td>${resp.code}</td><td>${resp.name}</td><td>${resp.price}</td><td>${resp.qtyOnHand}</td></tr>`;
                $("#itemTable").append(row);
            bindClickEvents();
        }
    })
});

function bindClickEvents(){
    $("#itemTable>tr").click(function (){
        let code=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let price=$(this).children().eq(2).text();
        let qtyOnHand=$(this).children().eq(3).text();

        $("#txtItemCode").val(code);
        $("#txtItemName").val(name);
        $("#txtItemPrice").val(price);
        $("#txtItemQTYOnHand").val(qtyOnHand);
    });
}

$("#btnItemUpdate").click(function (){
    var itmOb = {
        code: $("#txtItemCode").val(),
        name: $("#txtItemName").val(),
        price: $("#txtItemPrice").val(),
        qtyOnHand: $("#txtItemQTYOnHand").val(),
    }

    $.ajax({
        url: "item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itmOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllItem();
            } else if (res.status == 400) {
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, errorStus) {
            console.log(ob);
        }
    });
});

var regExItemCode = /^(I00-)[0-9]{3,4}$/;
var regExItemName = /^[A-z ]{3,20}$/;
var regExItemPrice = /^[0-9]{2,6}$/;
var regExItemQtyOnHand = /^[0-9]{1,3}$/;

$("#txtPopItemName").keyup(function (event) {
    let input = $("#txtPopItemName").val();

    if (regExItemName.test(input)) {
        $("#txtPopItemName").css('border', '2px solid green');
        $("#popItemError1").text("");

        if (event.key == "Enter") {
            $("#txtPopItemQuntity").focus();
        }
    } else {
        $("#txtPopItemName").css('border', '2px solid red');
        $("#popItemError1").text("Wrong format:Soap");
    }
});

$("#txtPopItemQuntity").keyup(function (event) {
    let input = $("#txtPopItemQuntity").val();

    if (regExItemQtyOnHand.test(input)) {
        $("#txtPopItemQuntity").css('border', '2px solid green');
        $("#popItemError2").text("");

        if (event.key == "Enter") {
            $("#txtPopItemPrice").focus();
        }
    } else {
        $("#txtPopItemQuntity").css('border', '2px solid red');
        $("#popItemError2").text("Wrong format:10");
    }
});

$("#txtPopItemPrice").keyup(function (event) {
    let input = $("#txtPopItemPrice").val();

    if (regExItemPrice.test(input)) {
        $("#txtPopItemPrice").css('border', '2px solid green');
        $("#popItemError3").text("");
    } else {
        $("#txtPopItemPrice").css('border', '2px solid red');
        $("#popItemError3").text("Wrong format:150");
    }
});

$("#txtItemCode").keyup(function (event) {
    let input = $("#txtItemCode").val();

    if (regExItemCode.test(input)) {
        $("#txtItemCode").css('border', '2px solid green');
        $("#ItemError").text("");

        if (event.key == "Enter") {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#ItemError").text("Wrong format:I00-001");
    }
});

$("#txtItemName").keyup(function (event) {
    let input = $("#txtItemName").val();

    if (regExItemName.test(input)) {
        $("#txtItemName").css('border', '2px solid green');
        $("#ItemError1").text("");

        if (event.key == "Enter") {
            $("#txtItemPrice").focus();
        }
    } else {
        $("#txtItemName").css('border', '2px solid red');
        $("#ItemError1").text("Wrong format:Soap");
    }
});

$("#txtItemPrice").keyup(function (event) {
    let input = $("#txtItemPrice").val();

    if (regExItemPrice.test(input)) {
        $("#txtItemPrice").css('border', '2px solid green');
        $("#ItemError2").text("");

        if (event.key == "Enter") {
            $("#txtItemQTYOnHand").focus();
        }
    } else {
        $("#txtItemPrice").css('border', '2px solid red');
        $("#ItemError2").text("Wrong format:10");
    }
});

$("#txtItemQTYOnHand").keyup(function (event) {
    let input = $("#txtItemQTYOnHand").val();

    if (regExItemQtyOnHand.test(input)) {
        $("#txtItemQTYOnHand").css('border', '2px solid green');
        $("#ItemError3").text("");
    } else {
        $("#txtItemQTYOnHand").css('border', '2px solid red');
        $("#ItemError3").text("Wrong format:150");
    }
});

function clearItemPopData() {
    $('#txtPopItemName,#txtPopItemQuntity,#txtPopItemPrice').val("");
    $('#txtPopItemCode,#txtPopItemName,#txtPopItemQuntity,#txtPopItemPrice').css('border', '2px solid #ced4da');
    $('#txtPopItemCode').focus();
}

function clearAllItem() {
    $('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQTYOnHand').val("");
    $('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQTYOnHand').css('border', '2px solid #ced4da');
    $('#txtItemCode').focus();

}