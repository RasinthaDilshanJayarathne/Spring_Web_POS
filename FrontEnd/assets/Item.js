$("#item").click(function (){
    loadAllItems();
})

var baseUrlItem="http://localhost:8080/BackEnd_war/item/"


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

//Events
//Search Customer Event
$("#btnItemSearch").click(function () {
    searchItem();
});

//Save Customer Event
$("#popItemBtnAdd").click(function () {
    saveItem();
});

//Delete Customer Event
$("#btnItemDelete").click(function () {
    deleteItem();
});

//Update Customer Event
$("#btnItemUpdate").click(function () {
    updateItem();
});

//Bind click events to the table rows
function bindClickEvent() {
    $("#itemTable>tr").click(function () {
        //Get values from the selected row
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let itemPrice = $(this).children().eq(2).text();
        let qTYOnHand = $(this).children().eq(3).text();

        //Set values to the text-fields
        $("#txtItemCode").val(code);
        $("#txtItemName").val(name);
        $("#txtItemQTYOnHand").val(qTYOnHand);
        $("#txtItemPrice").val(itemPrice);
    });
}

//Save Item
function saveItem() {
    var data = $("#itemForm").serialize(); // return query string of form with name:type-value
    $.ajax({
        url: baseUrlItem,
        method: "POST",
        data: data,// if we send data with the request
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Item Registered");
                loadAllItems();
                clearPopData();
            }
            /*else {
                alert(res.message);
            }*/
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

//Load All Customers
function loadAllItems() {
    $("#itemTable").empty();
    $.ajax({
        url: baseUrlItem,
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {
            for (const item of resp.data) {
                var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qtyOnHand}</td></tr>`;
                $("#itemTable").append(row);
            }
            bindClickEvent();
            clearForm();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

//Update Item
function updateItem() {
    //creating a js object with relevant data which you wanna send to the server
    var itmOb = {
        code: $("#txtItemCode").val(),
        name: $("#txtItemName").val(),
        qtyOnHand: $("#txtItemQTYOnHand").val(),
        price: $("#txtItemPrice").val(),
    }

    $.ajax({
        url: baseUrlItem,
        method: "PUT",
        contentType: "application/json", //You should state request's content type using MIME types
        data: JSON.stringify(itmOb), // format js object to valid json string
        success: function (res) {
            if (res.code == 200) { // process is  ok
                alert("Successfully Updated");
                loadAllItems();
                clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

//Delete Item
function deleteItem() {
    // Get the item id
    let itemCode = $("#txtItemCode").val();

    // initiate the request
    $.ajax({
        url: baseUrlItem + "?code=" + itemCode,// viya query string
        method: "DELETE",
        success: function (res) {
            if (res.code == 200) {
                alert("Item Successfully Deleted");
                loadAllItems();
                clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

//Search Item
function searchItem() {
    var search = $("#itemSearchBar").val();
    $("#itemTable").empty();

    $.ajax({
        url:baseUrlItem + "/" + search,
        method:"GET",
        success: function (resp) {
            var data=resp.data;
            var row = `<tr><td>${data.code}</td><td>${data.name}</td><td>${data.price}</td><td>${data.qtyOnHand}</td></tr>`;
            $("#customerTable").append(row);

            bindClickEvent();
        }
    })
}

//Clear Item Input Fields
function clearForm() {
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtItemQTYOnHand").val("");
    $("#txtItemPrice").val("");
    $("#txtItemCode").focus();
}

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