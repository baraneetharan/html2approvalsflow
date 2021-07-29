const posturi = "https://localhost:5001/api/Approval/PostApprovals";

function getRequestid() {
  document.getElementById("req").innerHTML =
    "Request ID: " + localStorage.getItem("requestid");
}

function addApproval() {
  alert("addApproval called");
  // let fn = document.getElementById("reqid").value;
  // let ln = document.getElementById("level").value;
  // let email = document.getElementById("emailto").value;
  alert(document.getElementById("requestid").value);

  let tBody = document.getElementById("customers");
  let tr = tBody.insertRow();

  let td1 = tr.insertCell(0);
  td1.appendChild(document.createTextNode(document.getElementById("id").value));

  let td2 = tr.insertCell(1);
  td2.appendChild(
    document.createTextNode(document.getElementById("requestid").value)
  );

  let td3 = tr.insertCell(2);
  td3.appendChild(
    document.createTextNode(document.getElementById("level").value)
  );

  let td4 = tr.insertCell(3);
  td4.appendChild(
    document.createTextNode(document.getElementById("emailto").value)
  );

  let td5 = tr.insertCell(4);
  td5.appendChild(
    document.createTextNode(document.getElementById("status").value)
  );

  let td6 = tr.insertCell(5);
  td6.appendChild(
    document.createTextNode(document.getElementById("comments").value)
  );

  document.getElementById("requestid").value = "";
  document.getElementById("level").value = "";
  document.getElementById("emailto").value = "";
}

function postApprovals() {
    alert("postApprovals called");
    var table = $("#result").tableToJSON();    
    console.log(JSON.stringify(table));
  
    $.ajax({
      type: "POST",
      url: posturi,
      data: JSON.stringify(table),
      contentType: "text/json; charset=utf-8",
      dataType: "text",
      success: function (response) {
        //   console.log(response);
      },
      error: function (result) {
        //   alert("msg");
      },
    });
  }
