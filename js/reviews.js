// Default Reviews Data
const defaultReviews = [
    {
        name: "Rajesh Kumar",
        quality: 5,
        quantity: 5,
        delivery: 4,
        review: "Excellent products! SR MINWIN has significantly improved shell formation in my shrimp farm. Very satisfied with the quality and results.",
        date: "2024-03-15"
    },
    {
        name: "Venkatesh Reddy",
        quality: 4,
        quantity: 4,
        delivery: 5,
        review: "AQUA PROBY+ is a game changer. Water quality improved drastically within 2 weeks. Fast delivery and good packaging.",
        date: "2024-03-10"
    },
    {
        name: "Srinivas Rao",
        quality: 5,
        quantity: 4,
        delivery: 4,
        review: "Using ZEOLITE Gold Plus for ammonia control. Results are visible. Good product at reasonable price. Recommended!",
        date: "2024-03-05"
    },
    {
        name: "Prakash Naidu",
        quality: 4,
        quantity: 5,
        delivery: 5,
        review: "Oxy Tab saved my harvest during oxygen crisis. Immediate results. Professional service from SR Bio Aqua team. Thank you!",
        date: "2024-02-28"
    }
];

// Get all reviews (default + user submitted)
function getAllReviews() {
    const userReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    return [...defaultReviews, ...userReviews];
}

// Save user review
function saveReview(review) {
    const userReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    userReviews.unshift(review); // Add to beginning
    localStorage.setItem('userReviews', JSON.stringify(userReviews));
}

// Calculate average ratings
function calculateRatings(reviews) {
    if (reviews.length === 0) {
        return { quality: 0, quantity: 0, delivery: 0, overall: 0 };
    }

    const totals = reviews.reduce((acc, review) => {
        acc.quality += review.quality;
        acc.quantity += review.quantity;
        acc.delivery += review.delivery;
        return acc;
    }, { quality: 0, quantity: 0, delivery: 0 });

    const count = reviews.length;
    const quality = (totals.quality / count).toFixed(1);
    const quantity = (totals.quantity / count).toFixed(1);
    const delivery = (totals.delivery / count).toFixed(1);
    const overall = ((parseFloat(quality) + parseFloat(quantity) + parseFloat(delivery)) / 3).toFixed(1);

    return { quality, quantity, delivery, overall };
}

// Generate star HTML
function getStarsHTML(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '⭐';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}





