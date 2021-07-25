const uri = "https://html2approvalsflow.herokuapp.com/api/Approval";
// const uri = "https://localhost:5001/api/Approval";

const parentflow ="https://prod-15.southeastasia.logic.azure.com:443/workflows/8529997a7ef049758575212d36507697/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=C9GHsh4dl5GYPIZTQQKl1z0C4_7e4lJZB_SNZx9lQjY"
let approvals = [];

function getApprovals() {
    let reqid=document.getElementById("reqid").value;
  $.ajax({
    url: uri+"/GetByReqid/"+reqid,
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