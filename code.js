function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uploadImageSet(imageNum){
  list = new DataTransfer();
  f = document.querySelector("#imagefileHolder").files[imageNum];
  list.items.add(f);

  myFileList = list.files;
  document.querySelector("#imagefile").files = myFileList;
  uploadImage();
}

async function uploadImages() {
  fl = document.querySelector("#imagefileHolder").files.length;
  disableButton();
  for (let i = 0; i < fl; i++) {
    console.log("Image " + i);
    uploadImageSet(i);
    await sleep(2000);
  }
}

async function disableButton(){
  document.getElementById("uploadimagesbutton").disabled = true;
  await sleep(10000);
  document.getElementById("uploadimagesbutton").disabled = false;
}

document.querySelector("#CharacterAddImageSection").innerHTML = `
<label for="imagefile" style="padding: 0 15px;">Select multiple files</label>
<input id="imagefileHolder" type="file" multiple="multiple" accept="image/jpeg, image/png, image/jpg">
<input type="file" id="imagefile" disabled hidden>
<input id=\"addimagebutton\" type=\"button\" onclick=\"uploadImage(); return false;\" value=\"Add Image\" disabled hidden>
<input id=\"uploadimagesbutton\" type=\"button\" return false;\" value=\"Upload Images\">
`;
document.querySelector("#uploadimagesbutton").addEventListener('click', function(e){
  return uploadImages();
})