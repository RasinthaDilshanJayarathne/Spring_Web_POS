$("#customer").click(function (){
    loadAllCustomers();
});

/*function genarateCustomerId(){
    $("#txtPopCustId").val("C00-001");
    //var customerId = customerDB[customerDB.length - 1].getCustomerId();
    var customerId="";
    var tempId = parseInt(customerId.split("-")[1]);
    tempId = tempId + 1;
    if (tempId <= 9) {
        $("#txtPopCustId").val("C00-00" + tempId);
    } else if (tempId <= 99) {
        $("#txtPopCustId").val("C00-0" + tempId);
    } else {
        $("#txtPopCustId").val("C00-0" + tempId);
    }
}

$("#popCustBtnAdd").click(function () {
    let data = $("#customerForm").serialize();
    console.log(data)
    $.ajax({
        url: baseUrl,
        method: "POST",
        data: data,
        success:function (res){
            if (res.status==200){
                alert("Successfully Customer Registered");
                clearPopData();
                loadAllCustomer();
                //genarateCustomerId();
            }else {
                alert(res.data);
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });
});

$("#btnCustUpdate").click(function (){
    var cusOb = {
        id: $("#txtCustId").val(),
        name: $("#txtCustName").val(),
        address: $("#txtCustAddress").val(),
        contact: $("#txtCustPhoneNo").val(),
    }

    $.ajax({
        url: baseUrl,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.status == 200) {
                alert("Successfully Updated");
                loadAllCustomer();
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

$("#btnCustomerDelete").click(function (){
    let custId = $("#txtCustId").val();
    $.ajax({
        url:baseUrl + "?CustId=" + custId,
        method:"DELETE",
        //data :data,
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert("Successfully Deleted");
                clearAll();
                loadAllCustomer();
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

$("#btnCustSearch").click(function (){
    var search = $("#searchBar3").val();
    $("#customerTable").empty();

    $.ajax({
        url:baseUrl + "/" + search,
        method:"GET",
        success: function (resp) {
                var row = `<tr><td>${resp.id}</td><td>${resp.name}</td><td>${resp.address}</td><td>${resp.contact}</td></tr>`;
                $("#customerTable").append(row);

            bindClickEvent();
        }
    })

});

function loadAllCustomer() {
    $("#customerTable").empty();
    $.ajax({
        url: baseUrl,
        method: "GET",
        /!* dataType :"json",*!/
        success: function (resp) {
            for (const customer of resp.data) {
                var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);
            }
            bindClickEvent();
        }
    });
}

function bindClickEvent(){
    $("#customerTable>tr").click(function (){
        let id=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let address=$(this).children().eq(2).text();
        let contact=$(this).children().eq(3).text();

        $("#txtCustId").val(id);
        $("#txtCustName").val(name);
        $("#txtCustAddress").val(address);
        $("#txtCustPhoneNo").val(contact);

    });
}*/


var baseUrl="http://localhost:8080/BackEnd_war/customer/"

//Events
//Search Customer Event
$("#btnCustSearch").click(function () {
    searchCustomer();
});

//Get All Customers Event
/*$("#btnGetAllCustomers").click(function () {
    loadAllCustomers();
});*/

//Save Customer Event
$("#popCustBtnAdd").click(function () {
    saveCustomer();
});

//Delete Customer Event
$("#btnCustomerDelete").click(function () {
    deleteCustomer();
});

//Update Customer Event
$("#btnCustUpdate").click(function () {
    updateCustomer();
});

//Bind click events to the table rows
function bindClickEvents() {
    $("#customerTable>tr").click(function () {
        //Get values from the selected row
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        //Set values to the text-fields
        $("#txtCustId").val(id);
        $("#txtCustName").val(name);
        $("#txtCustAddress").val(address);
        $("#txtCustPhoneNo").val(contact);
    });
}

//Save Customer
function saveCustomer() {
    var data = $("#customerForm").serialize(); // return query string of form with name:type-value
    $.ajax({
        url: baseUrl,
        method: "POST",
        data: data,// if we send data with the request
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Customer Registered");
                loadAllCustomers();
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
function loadAllCustomers() {
    $("#customerTable").empty();
    $.ajax({
        url: baseUrl,
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {

            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);
            }
            bindClickEvents();
            clearForm();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

//Update Customer
function updateCustomer() {
    //creating a js object with relevant data which you wanna send to the server
    var cusOb = {
        id: $("#txtCustId").val(),
        name: $("#txtCustName").val(),
        address: $("#txtCustAddress").val(),
        contact: $("#txtCustPhoneNo").val(),
    }

    $.ajax({
        url: baseUrl,
        method: "PUT",
        contentType: "application/json", //You should state request's content type using MIME types
        data: JSON.stringify(cusOb), // format js object to valid json string
        success: function (res) {
            if (res.code == 200) { // process is  ok
                alert("Successfully Updated");
                loadAllCustomers();
                clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

//Delete Customer
function deleteCustomer() {
    // Get the customer id
    let customerID = $("#txtCustId").val();

    // initiate the request
    $.ajax({
        url: baseUrl + "?id=" + customerID,// viya query string
        method: "DELETE",
        //data:data,// application/x-www-form-urlencoded
        success: function (res) {
            if (res.code == 200) {
                alert("Customer Successfully Deleted");
                loadAllCustomers();
                clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

//Search Customer
function searchCustomer() {
    var search = $("#searchBar3").val();
    $("#customerTable").empty();

    $.ajax({
        url:baseUrl + "/" + search,
        method:"GET",
        success: function (resp) {
            var data=resp.data;
            console.log(data.id);
            var row = `<tr><td>${data.id}</td><td>${data.name}</td><td>${data.address}</td><td>${data.contact}</td></tr>`;
            $("#customerTable").append(row);

            bindClickEvents();
        }
    })
}

//Clear Customer Input Fields
function clearForm() {
    $("#txtCustId").val("");
    $("#txtCustName").val("");
    $("#txtCustAddress").val("");
    $("#txtCustPhoneNo").val("");
    $("#txtCustId").focus();
}


var regExCusID = /^(C00-)[0-9]{3,4}$/;
var regExCusName = /^[A-z ]{3,20}$/;
var regExCusAddress = /^[A-z0-9/ ]{6,30}$/;
var regExCusPhoneNo = /[0-9]{3}[-]?[0-9]{7}$/;

$("#txtPopCustName").keyup(function (event) {
    let input = $("#txtPopCustName").val();

    if (regExCusName.test(input)) {
        $("#txtPopCustName").css('border', '2px solid green');
        $("#error1").text("");

        if (event.key == "Enter") {
            $("#txtPopCustAddress").focus();
        }
    } else {
        $("#txtPopCustName").css('border', '2px solid red');
        $("#error1").text("Wrong format:Nimal");
    }
});

$("#txtPopCustAddress").keyup(function (event) {
    let input = $("#txtPopCustAddress").val();

    if (regExCusAddress.test(input)) {
        $("#txtPopCustAddress").css('border', '2px solid green');
        $("#error2").text("");

        if (event.key == "Enter") {
            $("#txtPopCustPhone").focus();
        }
    } else {
        $("#txtPopCustAddress").css('border', '2px solid red');
        $("#error2").text("Wrong format:123/b Galle");
    }
});


$("#txtPopCustPhone").keyup(function (event) {
    let input = $("#txtPopCustPhone").val();

    if (regExCusPhoneNo.test(input)) {
        $("#txtPopCustPhone").css('border', '2px solid green');
        $("#error3").text("");
    } else {
        $("#txtPopCustPhone").css('border', '2px solid red');
        $("#error3").text("Wrong format:077-2314432");
    }
});

$("#txtCustId").keyup(function (event) {
    let input = $("#txtCustId").val();

    if (regExCusID.test(input)) {
        $("#txtCustId").css('border', '2px solid green');
        $("#lblError").text("");

        if (event.key == "Enter") {
            $("#txtCustName").focus();
        }
    } else {
        $("#txtCustId").css('border', '2px solid red');
        $("#lblError").text("Wrong format:C00-001");
    }
});

$("#txtCustName").keyup(function (event) {
    let input = $("#txtCustName").val();

    if (regExCusName.test(input)) {
        $("#txtCustName").css('border', '2px solid green');
        $("#lblError1").text("");

        if (event.key == "Enter") {
            $("#txtCustAddress").focus();
        }
    } else {
        $("#txtCustName").css('border', '2px solid red');
        $("#lblError1").text("Wrong format:Nimal");
    }
});

$("#txtCustAddress").keyup(function (event) {
    let input = $("#txtCustAddress").val();

    if (regExCusAddress.test(input)) {
        $("#txtCustAddress").css('border', '2px solid green');
        $("#lblError2").text("");

        if (event.key == "Enter") {
            $("#txtCustPhoneNo").focus();
        }
    } else {
        $("#txtCustAddress").css('border', '2px solid red');
        $("#lblError2").text("Wrong format:123/b Galle");
    }
});

$("#txtCustPhoneNo").keyup(function (event) {
    let input = $("#txtCustPhoneNo").val();

    if (regExCusPhoneNo.test(input)) {
        $("#txtCustPhoneNo").css('border', '2px solid green');
        $("#lblError3").text("");
    } else {
        $("#txtCustPhoneNo").css('border', '2px solid red');
        $("#lblError3").text("Wrong format:077-2314432");
    }
});

function clearPopData() {
    $('#txtPopCustName,#txtPopCustAddress,#txtPopCustPhone').val("");
    $('#txtPopCustId,#txtPopCustName,#txtPopCustAddress,#txtPopCustPhone').css('border', '2px solid #ced4da');
    $('#txtPopCustId').focus();
}

function clearAll() {
    $('#txtCustId,#txtCustName,#txtCustAddress,#txtCustPhoneNo').val("");
    $('#txtCustId,#txtCustName,#txtCustAddress,#txtCustPhoneNo').css('border', '2px solid #ced4da');
    $('#txtCustId').focus();
}