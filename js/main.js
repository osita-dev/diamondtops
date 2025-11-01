/*
 * ═══════════════════════════════════════════════════════════════════════
 * CHRISTOPHER FABRICS & TAILORING - MAIN JAVASCRIPT
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * This file handles:
 * 1. Dynamic WhatsApp link generation
 * 2. Smooth scrolling for navigation
 * 3. Mobile menu functionality (if needed later)
 * 
 * IMPORTANT: To change your WhatsApp number, update the CONFIG object below
 */

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURATION - CHANGE THIS!
// ═══════════════════════════════════════════════════════════════════════
const CONFIG = {
  // CHANGE THIS: Your WhatsApp number in international format
  // Format: Country code + number (no spaces, no + sign)
  // Example: For Nigeria +234 801 234 5678, use: 2348012345678
  whatsappNumber: '+234 903 539 2287',
  
  // WhatsApp message templates - You can customize these
  messages: {
    general: 'Hello! I would like to inquire about your clothing and tailoring services.',
    
    booking: 'Hi, I want to book an appointment to come pick fabric / get measured for sewing.\n\n' +
             'Preferred date: [Please fill]\n' +
             'Preferred time: [Please fill]\n' +
             'My name: [Please fill]\n' +
             'Service needed: [Fabric shopping / Tailoring / Both]',
    
    quote: 'Hi, please send me a quote for tailoring.\n\n' +
           'Service: [Men\'s native wear / Women\'s dress / Suit / Children\'s outfit / Alterations]\n' +
           'Measurements: [Please provide or say "Will come for measurement"]\n' +
           'Preferred fabric: [Already have / Need to buy from you]\n' +
           'Deadline/Event date: [Please fill]'
  }
};

// ═══════════════════════════════════════════════════════════════════════
// WHATSAPP LINK BUILDER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Builds a WhatsApp link with a pre-filled message
 * @param {string} message - The message to pre-fill
 * @returns {string} - The complete WhatsApp URL
 */
function buildWhatsAppLink(message) {
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Build the WhatsApp URL
  // Format: https://wa.me/PHONENUMBER?text=MESSAGE
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

// ═══════════════════════════════════════════════════════════════════════
// INITIALIZE WHATSAPP BUTTONS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Sets up all WhatsApp buttons with the correct links
 */
function initializeWhatsAppButtons() {
  // Navigation WhatsApp button
  const navWhatsAppBtn = document.getElementById('nav-whatsapp-btn');
  if (navWhatsAppBtn) {
    navWhatsAppBtn.href = buildWhatsAppLink(CONFIG.messages.general);
  }
  
  // Hero WhatsApp button
  const heroWhatsAppBtn = document.getElementById('hero-whatsapp-btn');
  if (heroWhatsAppBtn) {
    heroWhatsAppBtn.href = buildWhatsAppLink(CONFIG.messages.general);
  }
  
  // Book Appointment button
  const bookAppointmentBtn = document.getElementById('book-appointment-btn');
  if (bookAppointmentBtn) {
    bookAppointmentBtn.href = buildWhatsAppLink(CONFIG.messages.booking);
  }
  
  // Get Quote button
  const getQuoteBtn = document.getElementById('get-quote-btn');
  if (getQuoteBtn) {
    getQuoteBtn.href = buildWhatsAppLink(CONFIG.messages.quote);
  }
  
  // Contact section WhatsApp button
  const contactWhatsAppBtn = document.getElementById('contact-whatsapp-btn');
  if (contactWhatsAppBtn) {
    contactWhatsAppBtn.href = buildWhatsAppLink(CONFIG.messages.general);
  }
  
  console.log('✅ WhatsApp buttons initialized successfully');
}

// ═══════════════════════════════════════════════════════════════════════
// SMOOTH SCROLLING
// ═══════════════════════════════════════════════════════════════════════

/**
 * Adds smooth scrolling to all anchor links that point to sections on the page
 */
function initializeSmoothScrolling() {
  // Get all links that start with #
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the target element ID
      const targetId = this.getAttribute('href');
      
      // Don't apply smooth scroll to links that are just "#" or WhatsApp links
      if (targetId === '#' || this.href.includes('wa.me')) {
        return;
      }
      
      // Find the target element
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Scroll to the target element
        // Offset by 80px to account for fixed navigation
        const offsetTop = targetElement.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  console.log('✅ Smooth scrolling initialized');
}

// ═══════════════════════════════════════════════════════════════════════
// STICKY NAVIGATION SCROLL EFFECT (Optional Enhancement)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Adds a shadow to the navigation bar when user scrolls down
 */
function initializeNavigationScrollEffect() {
  const nav = document.querySelector('nav');
  
  if (!nav) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      nav.classList.add('shadow-xl');
    } else {
      nav.classList.remove('shadow-xl');
    }
  });
  
  console.log('✅ Navigation scroll effect initialized');
}

// ═══════════════════════════════════════════════════════════════════════
// INITIALIZE EVERYTHING WHEN PAGE LOADS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Main initialization function
 * Runs when the DOM is fully loaded
 */
function initialize() {
  console.log('🚀 Initializing Christopher Fabrics & Tailoring website...');
  
  // Initialize all features
  initializeWhatsAppButtons();
  initializeSmoothScrolling();
  initializeNavigationScrollEffect();
  
  console.log('✨ Website initialized successfully!');
  console.log('📱 WhatsApp number configured:', CONFIG.whatsappNumber);
  console.log('💡 To change the phone number, edit the CONFIG object at the top of js/main.js');
}

// Wait for the DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // DOM is already loaded
  initialize();
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS FOR TESTING (Optional - can be removed in production)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Test function to check if WhatsApp links are working
 * Open browser console and type: testWhatsAppLinks()
 */
function testWhatsAppLinks() {
  console.log('Testing WhatsApp link generation:');
  console.log('General message link:', buildWhatsAppLink(CONFIG.messages.general));
  console.log('Booking message link:', buildWhatsAppLink(CONFIG.messages.booking));
  console.log('Quote message link:', buildWhatsAppLink(CONFIG.messages.quote));
}

// Make test function available in console
window.testWhatsAppLinks = testWhatsAppLinks;