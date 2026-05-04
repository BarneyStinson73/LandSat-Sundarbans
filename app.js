const images = [
  "images/A_1.png",
  "images/B_1.png",
  "images/C_1.png",
  "images/D_1.png",
  "images/E_1.png",
  "images/F_1.png",
  "images/G_1.png",
  "images/H_1.png",
  "images/I_1.png",
  "images/J_1.png",
  "images/K_1.png",
  "images/L_1.png",
  "images/M_1.png",
  "images/N_1.png",
  "images/O_1.png",
  "images/P_1.png",
  "images/Q_1.png",
  "images/R_1.png",
  "images/S_1.png",
  "images/T_1.png",
  "images/U_1.png",
  "images/V_1.png",
  "images/W_1.png",
  "images/X_1.png",
  "images/Y_1.png",
  "images/Z_1.png"
];
 // letter map
 const letterMap = {};

function buildLetterMap() {
  images.forEach(path => {
    const name = path.split("/").pop(); // A_1.jpg
    const letter = name[0];

    if (!letterMap[letter]) {
      letterMap[letter] = [];
    }

    letterMap[letter].push(path);
  });
}

buildLetterMap();

// Random image picker( for now , it is not as there is only one image per letter)
function getImage(letter) {
  const arr = letterMap[letter];
  if (!arr) return null;

  return arr[Math.floor(Math.random() * arr.length)];
}

function generate() {
  const name = document.getElementById("nameInput").value.toUpperCase();
  const container = document.getElementById("preview");

  container.innerHTML = "Generating...";

  setTimeout(() => {
    container.innerHTML = "";

    name.split("").forEach(letter => {
      const src = getImage(letter);
      if (!src) return;

      const img = document.createElement("img");
      img.src = src;

      img.onclick = () => openModal(src);

      container.appendChild(img);
    });
  }, 200);
}

function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function downloadCollage() {
  const images = document.querySelectorAll("#preview img");
  if (images.length === 0) return;

  const cols = Math.ceil(Math.sqrt(images.length));
  const size = 150;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = cols * size;
  canvas.height = cols * size;

  let loaded = 0;

  images.forEach((imgEl, i) => {
    const img = new Image();
    img.src = imgEl.src;

    img.onload = () => {
      const x = (i % cols) * size;
      const y = Math.floor(i / cols) * size;

      ctx.drawImage(img, x, y, size, size);

      loaded++;
      if (loaded === images.length) {
        const link = document.createElement("a");
        link.download = "collage.png";
        link.href = canvas.toDataURL();
        link.click();
      }
    };
  });
}

function generateQR() {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;

  const data = canvas.toDataURL();

  document.getElementById("qrcode").innerHTML = "";

  new QRCode(document.getElementById("qrcode"), {
    text: data,
    width: 128,
    height: 128
  });
}