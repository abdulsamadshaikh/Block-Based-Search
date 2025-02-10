import dompurify from "dompurify" // Importing DOMPurify to sanitize HTML and prevent XSS attacks

// Selecting all elements with the class "block-based-search"
const allSearches = document.querySelectorAll(".block-based-search")

// Looping through each search block and initializing the search functionality
allSearches.forEach(el => bringSearchToClient(el))

// Function to bring search functionality to a specific element
function bringSearchToClient(el) {
    // Adding an event listener to the input field to detect changes
    el.querySelector("input").addEventListener("input", handleChange)

    // Function to handle input changes and fetch search results
    async function handleChange(e) {
        const getClientValue = encodeURIComponent(e.target.value) // Sanitizing user input for safe use in the URL

        // Fetching search results from the WordPress REST API based on user input
        const clientSearchResponse = await fetch(`/wp-json/wp/v2/posts?search=${getClientValue}`)

        // Converting the response to JSON format
        const results = await clientSearchResponse.json()

        // Checking if there are any search results
        if (results.length) {
            // Updating the search results container with generated HTML
            el.querySelector(".search-results").innerHTML = generateHTML(results)
        } else {
            // Clearing the search results container if no results are found
            el.querySelector(".search-results").innerHTML = ""
        }
    }
}

// Function to generate HTML for displaying search results
function generateHTML(results) {
    let resHTML = "" // Initializing an empty string to store the generated HTML

    // Looping through each search result and constructing the HTML
    results.forEach(item => {
        resHTML += `<div>
            <h3><a href="${item.link}">${item.title.rendered}</a></h3>
        </div>`
    })

    // Sanitizing the generated HTML using DOMPurify before inserting into the DOM
    return dompurify.sanitize(resHTML)
}