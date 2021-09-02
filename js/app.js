// Main search function || called when user clicked on search button
const search = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data));

}

// Display the search result on the page
const displayResult = data => {
    const books = data.docs;
    // Display total matched and number of showing results
    showResultsCount(data.numFound, books.length);
    // Display book info on cards
    displayBookDetails(books);
}

// Display each book detail on cards
const displayBookDetails = books => {
    const resultField = document.getElementById('search-results');

    // Clear previous search results
    resultField.innerHTML = '';

    // Loop through each book object and enter their detail on the page
    books?.forEach(book => {
        const coverURL = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`;
        const title = book?.title;
        const author = book?.author_name;
        const publisher = book?.publisher;
        const firstPublished = book?.first_publish_year;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card">
                   <div id="cover-container">
                        <img src="${coverURL}" class="card-img-top img-fluid" alt="">
                   </div>
                    <div class="card-body text-center">
                        <h5 id="book-title" class="card-title"><a class="text-decoration-none" href="">${validator(title)}</a></h5>
                        <p class="card-text mt-3"><strong>Author: </strong><a class="text-decoration-none" href="">${validator(author)}</a></p>
                        <p class="card-text"><strong>Publisher:</strong> <a class="text-decoration-none" href="">${validator(publisher)}</a></p>
                        <p class="card-text"><strong>First Publised:</strong> ${validator(firstPublished)}</p>
                    </div>
                 </div>
        `;
        resultField.appendChild(div);
    });
}

// check if an element is undefined or not
const validator = info => {
    if (info === undefined) {
        return `Not found`;
    }
    else {
        return info;
    }
}

// Display the matched and showring results number
const showResultsCount = (resultFound, resultShowing) => {
    const matchedResult = document.getElementById('result-found');
    if (resultFound === 0) {
        matchedResult.innerText = 'No Book Found';
    }
    else {
        matchedResult.innerText = `Showing results ${resultShowing} of ${resultFound}`;
    }
}
