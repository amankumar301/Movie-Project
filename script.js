const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieContainer = document.getElementById("movieContainer");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");


// Search button
searchBtn.addEventListener("click", searchMovies);


// Enter key
searchInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        searchMovies();
    }

});


// Search Movies
async function searchMovies() {

    const movieName = searchInput.value.trim();

    if (movieName === "") {

        errorMessage.textContent =
            "Please enter a movie name.";

        return;
    }


    errorMessage.textContent = "";

    movieContainer.innerHTML = "";

    loading.style.display = "block";


    // Your OMDb API key
    const apiKey = "fa79715e";


    try {

        const url =
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}`;


        const response = await fetch(url);

        const data = await response.json();


        loading.style.display = "none";


        // Movie not found
        if (data.Response === "False") {

            errorMessage.textContent =
                data.Error || "Movie not found.";

            return;
        }


        // Display movies
        data.Search.forEach(movie => {

            const poster =
                movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster";


            const movieCard = document.createElement("div");

            movieCard.className = "movie-card";


            movieCard.innerHTML = `

                <img
                    src="${poster}"
                    alt="${movie.Title}"
                >

                <div class="movie-info">

                    <h2>${movie.Title}</h2>

                    <p>
                        <strong>Year:</strong>
                        ${movie.Year}
                    </p>

                    <p>
                        <strong>Type:</strong>
                        ${movie.Type}
                    </p>

                    <button
                        class="details-btn"
                        onclick="getMovieDetails('${movie.imdbID}')"
                    >
                        View Details
                    </button>

                </div>

            `;


            movieContainer.appendChild(movieCard);

        });


    } catch (error) {

        loading.style.display = "none";

        errorMessage.textContent =
            "Something went wrong. Please try again.";

        console.error(error);

    }

}



// Get movie details
/*async function getMovieDetails(imdbID) {

    const apiKey = "fa79715e";


    try {

        const url =
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;


        const response = await fetch(url);

        const movie = await response.json();


        if (movie.Response === "False") {

            alert("Movie details not found.");

            return;
        }


        alert(

            "🎬 " + movie.Title +
            "\n\n" +

            "📅 Year: " + movie.Year +
            "\n" +

            "⭐ IMDb Rating: " + movie.imdbRating +
            "\n" +

            "🎭 Genre: " + movie.Genre +
            "\n" +

            "🎥 Director: " + movie.Director +
            "\n\n" +

            "📝 " + movie.Plot

        );

    } catch (error) {

        console.error(error);

    }

}*/


async function getMovieDetails(imdbID) {

    const apiKey = "fa79715e";

    const modal = document.getElementById("movieModal");
    const modalMovie = document.getElementById("modalMovie");

    try {

        const url =
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;

        const response = await fetch(url);

        const movie = await response.json();

        if (movie.Response === "False") {

            alert("Movie details not found.");

            return;
        }

        const poster =
            movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/260x380?text=No+Poster";


        modalMovie.innerHTML = `

            <div class="modal-movie">

                <img
                    src="${poster}"
                    alt="${movie.Title}"
                >

                <div class="modal-info">

                    <h2>${movie.Title}</h2>

                    <p>
                        <strong>Year:</strong>
                        ${movie.Year}
                    </p>

                    <p>
                        <strong>Genre:</strong>
                        ${movie.Genre}
                    </p>

                    <p>
                        <strong>Director:</strong>
                        ${movie.Director}
                    </p>

                    <p>
                        <strong>Actors:</strong>
                        ${movie.Actors}
                    </p>

                    <p class="modal-rating">
                        ⭐ IMDb Rating:
                        ${movie.imdbRating}
                    </p>

                    <p>
                        <strong>Runtime:</strong>
                        ${movie.Runtime}
                    </p>

                    <p>
                        <strong>Language:</strong>
                        ${movie.Language}
                    </p>

                    <p>
                        <strong>Plot:</strong>
                        ${movie.Plot}
                    </p>

                </div>

            </div>

        `;

        modal.style.display = "block";

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }
}

const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");


// Close button
closeModal.addEventListener("click", function () {

    movieModal.style.display = "none";

});


// Modal ke bahar click karne par close
movieModal.addEventListener("click", function (event) {

    if (event.target === movieModal) {

        movieModal.style.display = "none";

    }

});


// ESC key se close
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        movieModal.style.display = "none";

    }

});


// =========================
// QUICK SEARCH
// =========================

function quickSearch(movieName) {

    searchInput.value = movieName;

    searchMovies();

}