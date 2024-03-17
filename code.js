function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uploadImageSet(imageNum){
  list = new DataTransfer();
  f = document.querySelector("#imagefileHolder").files[imageNum];
  list.items.add(f);

  myFileList = list.files;
  document.querySelector("#imagefile").files = myFileList;
  is_image_valid(f);
  uploadImage();
}

async function uploadImages() {
  fl = document.querySelector("#imagefileHolder").files.length;
  disableButton();
  for (let i = 0; i < fl; i++) {
    uploadImageSet(i);
    await sleep(2000);
  }
}

const is_image_valid = (file) => {
  var s = file.size/1024/1024;
  let reader = new FileReader();    // create a file reader instance.

  reader.onload = function (e) {
    let img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      var w = this.width;
      var h = this.height;
      if (h > 4000 || w > 4000 || s>2) {
        invalidImageLister(file, h, w, s)
      }
    }
  };
  reader.readAsDataURL(file);
}

function invalidImageLister(file, height, width, size) {
   if (document.getElementById("invalidImageList")==undefined) {
    var title = document.createElement("p");
    title.innerText = "Invalid images";
    title.style.textDecorationLine = "underline";
    title.style.padding = "20px 20px 0 20px"
    title.id = "invalidImageList";
    document.querySelector("#uploadimagesbutton").after(title);

    var list = document.createElement("ul");
    list.id = "invalidList";
    document.querySelector("#invalidImageList").after(list);
   }
   size = String(size).slice(0, 5)
   if (height>4000) {
    height = `<span style="color: red;">` + height + `</span>`;
   }
   if (width>4000) {
    width = `<span style="color: red;">` + width + `</span>`;
   }
   if (size>2) {
    size = `<span style="color: red;">` + size + `mb</span>`;
   }
   invalidFileListing = `<li style="padding: 5px 20px;">` + file.name + `: ` + height + `x` + width + ` ` + size + `</li>`;
   document.querySelector("#invalidList").innerHTML += invalidFileListing;
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