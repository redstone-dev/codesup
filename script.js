// Code to download the file
const downloadFile = () => {
  const link = document.createElement("a");
  const content = document.querySelector("textarea").value;
  const file = new Blob([content], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = document.getElementById("filename").value + ".txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

// Code to upload a file
const streamToText = async (blob) => {
  const readableStream = await blob.getReader();
  const chunk = await readableStream.read();

  return new TextDecoder('utf-8').decode(chunk.value);
};

const bufferToText = (buffer) => {
  const bufferByteLength = buffer.byteLength;
  const bufferUint8Array = new Uint8Array(buffer, 0, bufferByteLength);

  return new TextDecoder().decode(bufferUint8Array);
};

document.getElementById('input').addEventListener('change', function (e) {
  let file = document.getElementById('input').files[0];

  (async () => {
    const fileContent = await file.text();
    document.getElementById("code").value = fileContent;

  })();
});

// When you click the run button in the editor
function runPage() {
  var code = document.getElementById("code").value;
  var url = "https://supergames-d.github.io/codesup/run.html?code=" + code + "&name=" + document.getElementById("filename").value;
  window.open(url, '_blank');
}


// I think this part is useless, I was going to use it at first but then I didn't
var modal = document.getElementById("myModal");

var btn = document.getElementById("share");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
  var code = document.getElementById("code").value;
  var url = "https://supergames-d.github.io/codesup/run.html?code=" + code + "&name=" + document.getElementById("filename").value;
  navigator.clipboard.writeText(url);

}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
