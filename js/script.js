const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const urlInput = document.getElementById("url");
const sizeInput = document.getElementById("size");

// Spinner
const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
};
const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
};

// Clear previous QR + button
const clearLastQR = () => {
  qr.innerHTML = '';
  const saveLink = document.getElementById('save-link');
  if (saveLink) saveLink.remove();
};

// Generate QR
const generateQRCode = (url, size) => {
  new QRCode(qr, {
    text: url,
    width: size,
    height: size,
  });
};

// Download button
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.className =
    'bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerText = 'Sla afbeelding op';
  document.getElementById('gegenereerd').appendChild(link);
};

// Main handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const url = urlInput.value.trim();
  const size = sizeInput.value;

  clearLastQR();

  // URL validation
  if (url === '') {
    alert('Voer een geldige url in alstublieft');
    urlInput.focus();
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert("URL moet beginnen met http:// of https://");
    urlInput.focus();
    return;
  }

  showSpinner();

  setTimeout(() => {
    hideSpinner();

    generateQRCode(url, size);

    setTimeout(() => {
      const saveUrl = qr.querySelector('img').src;
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
});

// Initialize
hideSpinner();
