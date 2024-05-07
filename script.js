// HTML要素を取得
const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvas.width = 250;
canvas.height = 250;
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');

// パーツの画像ファイルのパス
const parts = {
  hair: ['image/hair-1.jpg',],
  eyes: ['image/eye-1.png', 'image/eye-2.jpg'],
  nose: ['image/nose-1.png', 'image/nose-2.png'],
  mouth: ['image/mouth-1.jpg', 'image/mouth-2.jpg']
};

// 現在のパーツ
let currentParts = {
  hair: parts.hair[0], // 初期のヘアーパーツを設定
  eyes: parts.eyes[0],
  nose: parts.nose[0],
  mouth: parts.mouth[0]
};

// 最後に編集されたパーツを追跡する変数
let lastEditedPart = '';

// 顔を描画する関数
function drawFace() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPart(currentParts.hair, 51, 5, 140, 110);
  drawPart(currentParts.eyes, 100, 60, 40, 40);
  drawPart(currentParts.nose, 96, 90, 47, 50);
  drawPart(currentParts.mouth, 100, 135, 40, 50);
}

// パーツを描画する関数
function drawPart(partSrc, x, y, width, height) {
  const part = new Image();
  part.onload = function() {
    ctx.drawImage(part, x, y, width, height);
  };
  part.src = partSrc;
}

// パーツリストを切り替える関数
function togglePartList(partType) {
  const partList = document.getElementById(partType + '-list');
  if (partList.style.display === 'none') {
    closeAllPartLists();
    partList.style.display = 'block';
  } else {
    partList.style.display = 'none';
  }
}

// 全てのパーツリストを非表示にする関数
function closeAllPartLists() {
  const lists = document.querySelectorAll('.parts-list');
  lists.forEach(list => {
    list.style.display = 'none';
  });
}

// パーツを変更する関数
function changePart(partType, partSrc) {
  currentParts[partType] = partSrc;
  lastEditedPart = partType; // 最後に編集されたパーツを更新
  drawFace();
}

// ページロード時にパーツリストを非表示にする
window.onload = function() {
  const lists = document.querySelectorAll('.parts-list');
  lists.forEach(list => {
    list.style.display = 'none';
  });
  drawFace(); // 顔を描画
};

// ダウンロードボタンをクリックしたときの処理
// PNG形式で顔をダウンロードする関数
function downloadFacePNG() {
  const downloadLink = document.createElement('a');
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.download = 'face.png';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// JPEG形式で顔をダウンロードする関数
function downloadFaceJPEG() {
  const downloadLink = document.createElement('a');
  downloadLink.href = canvas.toDataURL('image/jpeg');
  downloadLink.download = 'face.jpg';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// GIF形式で顔をダウンロードする関数
function downloadFaceGIF() {
  const downloadLink = document.createElement('a');
  downloadLink.href = canvas.toDataURL('image/gif');
  downloadLink.download = 'face.gif';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// PNGダウンロードボタンを追加
const downloadButtonPNG = document.createElement('button');
downloadButtonPNG.textContent = 'Download as PNG';
downloadButtonPNG.addEventListener('click', downloadFacePNG);
document.body.appendChild(downloadButtonPNG);
downloadButtonPNG.classList.add('download-button');

// JPEGダウンロードボタンを追加
const downloadButtonJPEG = document.createElement('button');
downloadButtonJPEG.textContent = 'Download as JPEG';
downloadButtonJPEG.addEventListener('click', downloadFaceJPEG);
document.body.appendChild(downloadButtonJPEG);
downloadButtonJPEG.classList.add('download-button');

// GIFダウンロードボタンを追加
const downloadButtonGIF = document.createElement('button');
downloadButtonGIF.textContent = 'Download as GIF';
downloadButtonGIF.addEventListener('click', downloadFaceGIF);
document.body.appendChild(downloadButtonGIF);
downloadButtonGIF.classList.add('download-button');


// バックグラウンド色の関数
document.getElementById('button').addEventListener('click', function() {
  const selectedColor = document.getElementById('color').value;
  document.getElementById('canvas-container').style.backgroundColor = selectedColor;
});



