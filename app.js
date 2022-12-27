function sendName() {
  const file = document.getElementById("files").files["0"].name
  console.log(file)
  console.log(document.getElementsByName("file_promotion")[0].value);
  document.getElementsByClassName("Name")[1].innerHTML = file;
  document.getElementsByName("file_promotion")[0].value = file;

}

function validateData() {
  console.log('validate data');
  const files = document.getElementById("files").files;
  if (files.length === 0) {
    alert("กรุณาเลือกไฟล์ !");
  } else {
    const filename = files[0].name;
    if (filename === "") {
      alert("กรุณาเลือกไฟล์ !");
    } else {
      saveData();
    }
  }
}

function saveData() {
  console.log("save data");
  let adsName = document.getElementById('pro').value;
  let enable = getEnableCheckboxValue();
  let adsId = document.getElementById('proId').value;

  const files = document.getElementById("files").files;
  const formData = new FormData();
  formData.append('adsId', adsId);
  formData.append('file', files[0]);
  formData.append('enable', enable);
  formData.append('adsName', adsName);



  fetch('/promotion/edit', {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.log(error.message);
      alert('เพิ่มข้อมูลไม่สำเร็จ !!!');
    })
}

function getEnableCheckboxValue() {
  var radios = document.getElementsByName('ko');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      return (radios[i].value);

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

clearName = () => {
  console.log(document.getElementsByClassName("Name")[1])
  // console.log(document.getElementsByClassName("file")[1])
  console.log(document.getElementById('pro').value);
  console.log(document.getElementById('files').value);
  console.log(document.getElementsByName("ko")[0])
  console.log(document.getElementsByName("ko")[1]);
  console.log(document.getElementsByClassName("Id")[0])
  console.log(document.getElementById('proId').value);
  document.getElementsByClassName("Name")[1].innerHTML = ''
  // document.getElementsByClassName("file")[0].innerHTML = ''
  document.getElementById('pro').value = ''
  document.getElementById('files').value = ''
  document.getElementsByName("ko")[0].checked = false
  document.getElementsByName("ko")[1].checked = false
  document.getElementsByClassName("Id")[0].innerHTML = ''
  document.getElementById('proId').value = ''


}