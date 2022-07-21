let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
spinnerEl.classList.add("d-none");

function createAndAppendSearch(search) {
    let {
        imageLink,
        author
    } = search;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("col-6", "col-md-4", "col-lg-3", "text-center");
    searchResultsEl.appendChild(resultContainer);

    let bookImg = document.createElement("img");
    bookImg.src = imageLink;
    bookImg.classList.add("book-image");
    resultContainer.appendChild(bookImg);

    let authorName = document.createElement("p");
    authorName.classList.add("author-name");
    authorName.textContent = author;
    resultContainer.appendChild(authorName);
}

function createSearchdata(search_results) {
    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";
    let msgContainer = document.createElement("div");
    msgContainer.classList.add("col-12");
    searchResultsEl.appendChild(msgContainer);
    if (search_results.length === 0) {
        console.log(true);
        spinnerEl.classList.add("d-none");
        let notfoundMsg = document.createElement("h1");
        notfoundMsg.textContent = "No results found.";
        notfoundMsg.classList.add("text-center", "result-msg");
        msgContainer.appendChild(notfoundMsg);
    } else {
        spinnerEl.classList.add("d-none");
        let foundMsg = document.createElement("h1");
        foundMsg.textContent = "Popular Books";
        foundMsg.classList.add("text-left", "text-md-center", "result-msg");
        msgContainer.appendChild(foundMsg);
        for (let search of search_results) {
            createAndAppendSearch(search);
        }
    }
}

function displayBooks(value) {
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/book-store?title=" + value;
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                search_results
            } = jsonData;
            createSearchdata(search_results);
        });
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let searchInputValue = event.target.value;
        displayBooks(searchInputValue);
    }
});