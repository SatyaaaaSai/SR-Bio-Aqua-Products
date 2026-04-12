// Reviews UI Management
let currentSlide = 0;
let autoSlideInterval;

// Initialize reviews on page load
document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayReviews();
    startAutoSlide();
});

// Load and display all reviews
async function loadAndDisplayReviews() {
    const reviews = await getAllReviews();
    displayReviews(reviews);
    updateRatingsSummary(reviews);
}
// Display reviews in carousel
function displayReviews(reviews) {
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) return;

    carousel.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div>
                    <div class="review-author">${escapeHtml(review.name)}</div>
                    <div class="review-date">${formatDate(review.date)}</div>
                </div>
            </div>
            <div class="review-ratings">
                <div class="review-rating-item">
                    <span class="review-rating-label">Quality</span>
                    <span class="review-rating-stars">${getStarsHTML(review.quality)}</span>
                </div>
                <div class="review-rating-item">
                    <span class="review-rating-label">Quantity</span>
                    <span class="review-rating-stars">${getStarsHTML(review.quantity)}</span>
                </div>
                <div class="review-rating-item">
                    <span class="review-rating-label">Delivery</span>
                    <span class="review-rating-stars">${getStarsHTML(review.delivery)}</span>
                </div>
            </div>
            <p class="review-text">"${escapeHtml(review.review)}"</p>
        </div>
    `).join('');
}

// Update ratings summary
function updateRatingsSummary(reviews) {
    const ratings = calculateRatings(reviews);

    document.getElementById('overallRating').textContent = ratings.overall;
    document.getElementById('overallStars').textContent = getStarsHTML(parseFloat(ratings.overall));

    document.getElementById('qualityRating').textContent = ratings.quality;
    document.getElementById('qualityStars').textContent = getStarsHTML(parseFloat(ratings.quality));

    document.getElementById('quantityRating').textContent = ratings.quantity;
    document.getElementById('quantityStars').textContent = getStarsHTML(parseFloat(ratings.quantity));

    document.getElementById('deliveryRating').textContent = ratings.delivery;
    document.getElementById('deliveryStars').textContent = getStarsHTML(parseFloat(ratings.delivery));
}

// Auto slide carousel
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        const carousel = document.getElementById('reviewsCarousel');
        if (!carousel) return;

        const totalReviews = carousel.children.length;
        if (totalReviews === 0) return;

        currentSlide = (currentSlide + 1) % totalReviews;
        
        const cardWidth = carousel.children[0].offsetWidth;
        const gap = 20;
        const offset = -(currentSlide * (cardWidth + gap));
        
        carousel.style.transform = `translateX(${offset}px)`;
    }, 3500); // Auto slide every 3.5 seconds
}

// Submit review form
async function submitReview(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const loader = document.getElementById('btnLoader');

    // 👉 START LOADING
    submitBtn.disabled = true;
    btnText.textContent = "Submitting...";
    loader.classList.remove("hidden");

    const name = document.getElementById('reviewName').value.trim();
    const quality = parseInt(document.getElementById('reviewQuality').value);
    const quantity = parseInt(document.getElementById('reviewQuantity').value);
    const delivery = parseInt(document.getElementById('reviewDelivery').value);
    const reviewText = document.getElementById('reviewText').value.trim();

    if (!name || !quality || !quantity || !delivery || !reviewText) {
        showFormStatus('Please fill all fields', 'error');

        // 👉 RESET BUTTON
        submitBtn.disabled = false;
        btnText.textContent = "Submit Review";
        loader.classList.add("hidden");
        return;
    }

    const newReview = {
        name,
        quality,
        quantity,
        delivery,
        review: reviewText,
        date: new Date().toISOString().split('T')[0]
    };

    try {
        await saveReview(newReview);
        await loadAndDisplayReviews();

        document.getElementById('reviewForm').reset();
        showFormStatus('Review submitted successfully!', 'success');
        

    } catch (err) {
        showFormStatus('Something went wrong!', 'error');
    }

    // 👉 STOP LOADING
    submitBtn.disabled = false;
    btnText.textContent = "Submit Review";
    loader.classList.add("hidden");
}

// Show form status message
function showFormStatus(message, type) {
    const status = document.getElementById('reviewFormStatus');
    status.textContent = message;
    status.className = 'review-form-status show';
    status.style.color = type === 'success' ? '#4a7c2c' : '#c62828';

    setTimeout(() => {
        status.classList.remove('show');
    }, 5000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
