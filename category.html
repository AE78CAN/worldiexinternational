// =====================================
// WORLDIEX CATEGORY SYSTEM
// =====================================

let articles = [];


// =====================================
// GET CATEGORY FROM URL
// =====================================

const params = new URLSearchParams(window.location.search);

const categoryName = params.get("cat");


// =====================================
// LOAD NEWS
// =====================================

async function loadCategory(){

    const container =
        document.getElementById("categoryNews");

    const title =
        document.getElementById("pageTitle");


    try{

        const response =
            await fetch("news.json");


        if(!response.ok){

            throw new Error(
                "Unable to load news.json"
            );

        }


        articles =
            await response.json();


        // No category supplied

        if(!categoryName){

            title.textContent =
                "Latest News";

            renderArticles(articles);

            return;

        }


        // Display category title

        title.textContent =
            categoryName + " News";


        // Filter articles

        const filtered =
            articles.filter(article =>
                article.category.toLowerCase() ===
                categoryName.toLowerCase()
            );


        renderArticles(filtered);


    }catch(error){

        console.error(error);


        container.innerHTML = `
            <div class="category-error">

                <h2>
                    Unable to load news
                </h2>

                <p>
                    Please refresh the page and try again.
                </p>

            </div>
        `;

    }

}


// =====================================
// DISPLAY ARTICLES
// =====================================

function renderArticles(newsList){

    const container =
        document.getElementById("categoryNews");


    container.innerHTML = "";


    // No stories

    if(newsList.length === 0){

        container.innerHTML = `

            <div class="category-empty">

                <h2>
                    No stories available
                </h2>

                <p>
                    There are currently no stories
                    in this category.
                </p>

            </div>

        `;

        return;

    }


    // Create cards

    newsList.forEach(article => {

        const card =
            document.createElement("a");


        card.className =
            "card";


        card.href =
            `article.html?id=${article.id}`;


        card.innerHTML = `

            <img
                src="${article.image}"
                alt="${article.title}"
                loading="lazy"
            >


            <div class="content">

                <div class="category">
                    ${article.category}
                </div>


                <h3>
                    ${article.title}
                </h3>


                <p>
                    ${article.summary}
                </p>


                <div class="article-card-meta">
                    ${article.author}
                    •
                    ${article.date}
                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


// =====================================
// START
// =====================================

loadCategory();
