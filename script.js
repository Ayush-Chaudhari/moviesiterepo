const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=314c2fb06946666320a1203b52891bb1&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=314c2fb06946666320a1203b52891bb1&query=";
const BACKEND_API = "http://localhost:5000/api/v1";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url).then
        (res => res.json()).then(function (data) {
            console.log(data.results);
            
            // Create a single row for all cards
            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');
            
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');
                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');
                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');
                const title = document.createElement('h3');
                title.setAttribute('id', 'title');
                const centre = document.createElement('centre');

                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;
                
                // Add click event to show movie details
                div_card.addEventListener('click', () => {
                    showMovieDetails(element.id);
                });

                centre.appendChild(image);
                div_card.appendChild(centre);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
            });
            
            // Append the row to the main section
            main.appendChild(div_row);
        });
}

function showMovieDetails(movieId) {
    // Fetch movie details from TMDB API
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=314c2fb06946666320a1203b52891bb1`)
        .then(res => res.json())
        .then(movie => {
            // Fetch reviews from our backend
            fetch(`${BACKEND_API}/reviews/movie/${movieId}`)
                .then(res => res.json())
                .then(reviews => {
                    displayMovieDetails(movie, reviews);
                })
                .catch(err => {
                    console.error("Error fetching reviews:", err);
                    displayMovieDetails(movie, []);
                });
        })
        .catch(err => {
            console.error("Error fetching movie details:", err);
        });
}

function displayMovieDetails(movie, reviews) {
    // Clear the main section
    main.innerHTML = '';
    
    // Create movie details container
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'movie-details';
    
    // Create movie header
    const header = document.createElement('div');
    header.className = 'movie-header';
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.innerHTML = '← Back to Movies';
    backButton.className = 'back-button';
    backButton.addEventListener('click', () => {
        main.innerHTML = '';
        returnMovies(APILINK);
    });
    
    // Add movie poster
    const poster = document.createElement('img');
    poster.src = IMG_PATH + movie.poster_path;
    poster.className = 'movie-poster';
    
    // Add movie info
    const info = document.createElement('div');
    info.className = 'movie-info';
    
    const title = document.createElement('h1');
    title.innerHTML = movie.title;
    
    const releaseDate = document.createElement('p');
    releaseDate.innerHTML = `Release Date: ${movie.release_date}`;
    
    const rating = document.createElement('p');
    rating.innerHTML = `Rating: ${movie.vote_average}/10`;
    
    const overview = document.createElement('p');
    overview.innerHTML = movie.overview;
    
    // Assemble movie header
    info.appendChild(title);
    info.appendChild(releaseDate);
    info.appendChild(rating);
    info.appendChild(overview);
    
    header.appendChild(backButton);
    header.appendChild(poster);
    header.appendChild(info);
    
    // Create reviews section
    const reviewsSection = document.createElement('div');
    reviewsSection.className = 'reviews-section';
    
    const reviewsTitle = document.createElement('h2');
    reviewsTitle.innerHTML = 'Reviews';
    
    // Add review form
    const reviewForm = document.createElement('form');
    reviewForm.className = 'review-form';
    reviewForm.innerHTML = `
        <h3>Add Your Review</h3>
        <input type="text" id="user" placeholder="Your Name" required>
        <textarea id="review" placeholder="Your Review" required></textarea>
        <div class="rating">
            <span>Rating: </span>
            <select id="rating">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
            </select>
        </div>
        <button type="submit">Submit Review</button>
    `;
    
    // Handle review submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = document.getElementById('user').value;
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
        
        // Submit review to backend
        fetch(`${BACKEND_API}/reviews/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId: movie.id,
                user: user,
                review: review,
                rating: parseInt(rating)
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                // Refresh reviews
                showMovieDetails(movie.id);
            } else {
                alert('Error submitting review: ' + data.error);
            }
        })
        .catch(err => {
            console.error('Error submitting review:', err);
            alert('Error submitting review. Please try again.');
        });
    });
    
    // Display existing reviews
    const reviewsList = document.createElement('div');
    reviewsList.className = 'reviews-list';
    
    if (reviews.length === 0) {
        const noReviews = document.createElement('p');
        noReviews.innerHTML = 'No reviews yet. Be the first to review this movie!';
        reviewsList.appendChild(noReviews);
    } else {
        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            const reviewHeader = document.createElement('div');
            reviewHeader.className = 'review-header';
            
            const reviewUser = document.createElement('span');
            reviewUser.className = 'review-user';
            reviewUser.innerHTML = review.user;
            
            const reviewDate = document.createElement('span');
            reviewDate.className = 'review-date';
            reviewDate.innerHTML = new Date(review.date).toLocaleDateString();
            
            const reviewRating = document.createElement('div');
            reviewRating.className = 'review-rating';
            reviewRating.innerHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            
            const reviewText = document.createElement('p');
            reviewText.className = 'review-text';
            reviewText.innerHTML = review.review;
            
            reviewHeader.appendChild(reviewUser);
            reviewHeader.appendChild(reviewDate);
            reviewHeader.appendChild(reviewRating);
            
            reviewItem.appendChild(reviewHeader);
            reviewItem.appendChild(reviewText);
            
            reviewsList.appendChild(reviewItem);
        });
    }
    
    // Assemble reviews section
    reviewsSection.appendChild(reviewsTitle);
    reviewsSection.appendChild(reviewForm);
    reviewsSection.appendChild(reviewsList);
    
    // Assemble movie details
    detailsContainer.appendChild(header);
    detailsContainer.appendChild(reviewsSection);
    
    // Add to main section
    main.appendChild(detailsContainer);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = ''

    const searchItem = search.value;
      
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});