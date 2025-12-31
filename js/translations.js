// Translation system
const translations = {
  nl: {
    'header.title': 'QR Code Generator',
    'main.title': 'Maak een QR code!',
    'main.description': 'Snel en makkelijk: vul een URL in, kies je formaat en download je QR code als afbeelding.',
    'input.url': 'https://voorbeeld.nl',
    'button.generate': 'Genereer QR Code',
    'button.save': 'Sla afbeelding op',
    'placeholder.text': 'QR code verschijnt hier',
    'spinner.loading': 'Laden...',
    'alert.url.empty': 'Voer een geldige url in alstublieft',
    'alert.url.invalid': 'URL moet beginnen met http:// of https://'
  },
  en: {
    'header.title': 'QR Code Generator',
    'main.title': 'Create a QR code!',
    'main.description': 'Quick and easy: enter a URL, choose your format and download your QR code as an image.',
    'input.url': 'https://example.com',
    'button.generate': 'Generate QR Code',
    'button.save': 'Save image',
    'placeholder.text': 'QR code will appear here',
    'spinner.loading': 'Loading...',
    'alert.url.empty': 'Please enter a valid URL',
    'alert.url.invalid': 'URL must start with http:// or https://'
  }
};

// Get current language from localStorage or default to Dutch
let currentLang = localStorage.getItem('language') || 'nl';

// Function to translate text
function translate(key) {
  return translations[currentLang][key] || translations.nl[key] || key;
}

// Make translate function and currentLang available globally
window.translate = translate;
window.currentLang = currentLang;

// Function to update all translations on the page
function updateTranslations() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translate(key);
  });

  // Update all elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = translate(key);
  });

  // Update language switcher display
  const langDisplay = document.getElementById('lang-display');
  const langAlt = document.getElementById('lang-alt');
  if (langDisplay && langAlt) {
    if (currentLang === 'nl') {
      langDisplay.textContent = 'NL';
      langAlt.textContent = 'EN';
    } else {
      langDisplay.textContent = 'EN';
      langAlt.textContent = 'NL';
    }
  }

  // Update HTML lang attribute
  document.documentElement.lang = currentLang;
}

// Language switcher functionality
document.addEventListener('DOMContentLoaded', () => {
  const languageSwitch = document.getElementById('language-switch');
  
  if (languageSwitch) {
    languageSwitch.addEventListener('click', () => {
      // Toggle between Dutch and English
      currentLang = currentLang === 'nl' ? 'en' : 'nl';
      window.currentLang = currentLang;
      localStorage.setItem('language', currentLang);
      updateTranslations();
      
      // Update script.js references if needed
      if (typeof updateSaveButtonText === 'function') {
        updateSaveButtonText();
      }
    });
  }

  // Initial translation update
  updateTranslations();
});

