const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const qrPlaceholder = document.getElementById('qrcode-placeholder');
const saveButtonContainer = document.getElementById('save-button-container');
const urlInput = document.getElementById("url");
const sizeInput = document.getElementById("size");

// Spinner
const showSpinner = () => {
  document.getElementById('spinner').classList.remove('hidden');
  qrPlaceholder.classList.add('hidden');
};
const hideSpinner = () => {
  document.getElementById('spinner').classList.add('hidden');
};

// Clear previous QR + button
const clearLastQR = () => {
  qr.innerHTML = '';
  qrPlaceholder.classList.remove('hidden');
  const saveLink = document.getElementById('save-link');
  if (saveLink) saveLink.remove();
};

// Generate QR code at the requested size
const generateQRCode = (url, size) => {
  // Generate QR code at the exact requested size
  const requestedSize = parseInt(size);
  
  new QRCode(qr, {
    text: url,
    width: requestedSize,
    height: requestedSize,
  });
};

// Download button
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.className =
    'bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition inline-block';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerText = translate('button.save');
  saveButtonContainer.appendChild(link);
};

// Function to update save button text (called when language changes)
function updateSaveButtonText() {
  const saveLink = document.getElementById('save-link');
  if (saveLink) {
    saveLink.innerText = translate('button.save');
  }
};

// Main handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const url = urlInput.value.trim();
  const size = sizeInput.value;

  clearLastQR();

  // URL validation
  if (url === '') {
    alert(translate('alert.url.empty'));
    urlInput.focus();
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert(translate('alert.url.invalid'));
    urlInput.focus();
    return;
  }

  showSpinner();

  setTimeout(() => {
    hideSpinner();
    qrPlaceholder.classList.add('hidden');

    generateQRCode(url, size);

    setTimeout(() => {
      const saveUrl = qr.querySelector('img').src;
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
});

// Initialize
hideSpinner();
