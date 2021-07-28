const uri = "https://html2approvalsflow.herokuapp.com/api/Approval";
// const uri = "https://localhost:5001/api/Approval";
const posturi="https://localhost:5001/api/Approval/PostApprovals";
const parentflow =
  "https://prod-15.southeastasia.logic.azure.com:443/workflows/8529997a7ef049758575212d36507697/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=C9GHsh4dl5GYPIZTQQKl1z0C4_7e4lJZB_SNZx9lQjY";
let approvals = [];

function getApprovals() {
  let reqid = document.getElementById("reqid").value;
  $.ajax({
    url: uri + "/GetByReqid/" + reqid,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      approvals.push(data);
      oapflow(data);
      //   _displayItems(data);
    },
    error: function (error) {
      //   console.log(`Error ${error}`);
    },
  });
}

function oapflow(data) {
  // alert(JSON.stringify(data));

  $.ajax({
    type: "POST",
    url: parentflow,
    data: JSON.stringify(data),
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

function addApproval() {
  alert("addApproval called");
  // let fn = document.getElementById("reqid").value;
  // let ln = document.getElementById("level").value;
  // let email = document.getElementById("emailto").value;
alert(document.getElementById("requestid").value);

  let tBody = document.getElementById("customers");
  let tr = tBody.insertRow();

  let td1 = tr.insertCell(0);
  td1.appendChild(
    document.createTextNode(document.getElementById("id").value)
  );

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

  document.getElementById("reqid").value = "";
  document.getElementById("level").value = "";
  document.getElementById("emailto").value = "";
}

function postApprovals() {
  alert("postApprovals called");
  var table = $('#result').tableToJSON();    
  // console.log(JSON.stringify(table));
  // var table =[{"FN":"baraneetharan","LN":"Last","email":"baraneetharan@live.com"},{"FN":"myname","LN":"Last","email":"baraneetharan.r@kgisl.com"}]
  var table2 =[{
    "Id":0,
    "reqid":"5001",
    "level":"1",
    "emailto":"baraneetharan.r@kgisl.com",
    "status":"",
    "comments":""},
    {
    "Id":0,
    "reqid":"5001",
    "level":"2",
    "emailto":"baraneetharan.r@kgisl.com",
    "status":"",
    "comments":""}];
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
