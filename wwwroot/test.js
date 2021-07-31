// const getPendingApprovaluri = "https://localhost:5001/api/Approval";
const getPendingApprovaluri = "https://html2approvalsflow.herokuapp.com/api/Approval";
const triggerApprovalsuri =
  "https://prod-20.southeastasia.logic.azure.com:443/workflows/6627b04f257c4c7ca6e612f703244360/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pStRj1LvVV9bSVWqhRF9-nDle9lGGQlpj4hfwXkmuws";

function triggerApprovals() {
  // let reqid = document.getElementById("reqid").value;
  let reqid = 1001;
  $.ajax({
    url: getPendingApprovaluri + "/GetPendingApproval/" + reqid,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      //   approvals.push(data);
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
    url: triggerApprovalsuri,
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
