// const fileuri = "https://localhost:5001/Uploader";
// const fileuri = "https://html2approvalsflow.herokuapp.com/Uploader";
const fileuri = "/Uploader";

function uploadFile2RestAPI() {
    alert("uploadFile2RestAPI");
    // var totalfiles = document.getElementById('files').files.length;
  
    var input = document.getElementById("files");
    var files = input.files;
    var formData = new FormData();
  
    for (var i = 0; i != files.length; i++) {
      formData.append("files", files[i]);
    }
  
    $.ajax({
      url: fileuri,
      data: formData,
      processData: false,
      contentType: false,
      type: "POST",
      success: function (data) {
        alert("Files Uploaded!");
      },
    });
  }