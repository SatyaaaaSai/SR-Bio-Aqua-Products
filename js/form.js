// Toggle mobile menu
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// Toggle product details
document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        const benefits = document.querySelector(`.product-benefits[data-id="${productId}"]`);
        const details = document.querySelector(`.product-details[data-id="${productId}"]`);
        
        benefits.classList.toggle('active');
        details.classList.toggle('active');
        
        this.textContent = details.classList.contains('active') ? 'Hide Details' : 'View Details';
    });
});

// Filter products by category
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const cards = document.querySelectorAll('.product-card');
        const tabs = document.querySelectorAll('.category-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Filter cards
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategory = card.getAttribute('data-category');
                card.style.display = cardCategory === category ? 'block' : 'none';
            }
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Banner Carousel
// let currentBannerSlide = 0;
// const bannerSlides = document.querySelectorAll('.banner-slide');
// const bannerDotsContainer = document.getElementById('bannerDots');
// const totalBannerSlides = bannerSlides.length;

// // Create dots
// for (let i = 0; i < totalBannerSlides; i++) {
//     const dot = document.createElement('div');
//     dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
//     dot.addEventListener('click', () => goToBannerSlide(i));
//     bannerDotsContainer.appendChild(dot);
// }

// function showBannerSlide(n) {
//     bannerSlides.forEach(slide => slide.classList.remove('active'));
//     document.querySelectorAll('.banner-dot').forEach(dot => dot.classList.remove('active'));
    
//     bannerSlides[n].classList.add('active');
//     document.querySelectorAll('.banner-dot')[n].classList.add('active');
// }

// function goToBannerSlide(n) {
//     currentBannerSlide = n;
//     showBannerSlide(currentBannerSlide);
// }

// function nextBannerSlide() {
//     currentBannerSlide = (currentBannerSlide + 1) % totalBannerSlides;
//     showBannerSlide(currentBannerSlide);
// }

// Auto-rotate banners every 2.5 seconds
// setInterval(nextBannerSlide, 2500);

document.addEventListener('DOMContentLoaded', () => {

    let currentBannerSlide = 0;
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDotsContainer = document.getElementById('bannerDots');
    const totalBannerSlides = bannerSlides.length;
  
    if (!totalBannerSlides) return;
  
    // Create dots
    for (let i = 0; i < totalBannerSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToBannerSlide(i));
      bannerDotsContainer.appendChild(dot);
    }
  
    function showBannerSlide(n) {
      bannerSlides.forEach(slide => slide.classList.remove('active'));
      document.querySelectorAll('.banner-dot').forEach(dot => dot.classList.remove('active'));
  
      bannerSlides[n].classList.add('active');
      document.querySelectorAll('.banner-dot')[n].classList.add('active');
    }
  
    function goToBannerSlide(n) {
      currentBannerSlide = n;
      showBannerSlide(currentBannerSlide);
    }
  
    function nextBannerSlide() {
      currentBannerSlide = (currentBannerSlide + 1) % totalBannerSlides;
      showBannerSlide(currentBannerSlide);
    }
  

    setInterval(nextBannerSlide, 2000);
  
  });
  

// WhatsApp Form Handler
function sendToWhatsApp(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('formStatus');
  
    const whatsappNumber = '919959713456';
  
    const whatsappMessage = `
    Hello SR Bio Aqua Products,I just want to Enquire about the Products.Below are my details:
    Name: ${name}
    Phone: ${phone}
    Message: ${message}
    Thank You.
    `;
    
    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
  
    // Show confirmation to user
    status.style.display = 'block';
    status.textContent = '✅ WhatsApp opened. Please tap SEND to complete your message.';
  
    // Reset form
    document.getElementById('contactForm').reset();
  }
  

  
// Product Enquiry via WhatsApp
function enquireProduct(productName) {
    const whatsappNumber = '919959713456';
    
    const message = `Hello SR Bio Aqua Products,

I want to know more about this product:

Product Name: ${productName}

Please provide me with more details.

Thank you.`;
    
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}
