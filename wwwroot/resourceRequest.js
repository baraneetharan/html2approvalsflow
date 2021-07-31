let resourceRequests = [];

function getResourceRequests() {
  alert("getResourceRequests calling");

  $.ajax({
    url: "https://localhost:5001/api/ResourceRequests",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      _displayItems(data);
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
}

function _displayItems(data) {
  const tBody = document.getElementById("resourceRequestBody");
  tBody.innerHTML = "";

  // _displayCount(data.length);

  const button = document.createElement("button");

  data.forEach((item) => {
    let addApproveBtn = button.cloneNode(false);
    // addApproveBtn.innerText = "Add Approvals";
    addApproveBtn.setAttribute("class","far fa-check-square");
    addApproveBtn.setAttribute("onclick", `clickItem(${item.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    let tid = document.createTextNode(item.id);
    td1.appendChild(tid);

    let td2 = tr.insertCell(1);
    let tcandidate = document.createTextNode(item.candidate);
    td2.appendChild(tcandidate);

    let td3 = tr.insertCell(2);
    let tposition = document.createTextNode(item.position);
    td3.appendChild(tposition);

    let td4 = tr.insertCell(3);
    let tteam = document.createTextNode(item.team);
    td4.appendChild(tteam);

    let td5 = tr.insertCell(4);
    td5.appendChild(addApproveBtn);
  });

  // customers = data;
}
function clickItem(id) {
  console.log("Click item ID= "+id);
  localStorage.setItem("requestid", id);
  window.location = 'approvals.html';
}
