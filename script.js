// ==========================================
// WORLDIEX KENYA INTERNATIONAL
// Dynamic News Loader
// ==========================================

async function loadNews() {

    const container = document.getElementById("newsContainer");

    try {

        const response = await fetch("news.json");
        const news = await response.json();

        container.innerHTML = "";

        news.forEach(article => {

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${article.image}" alt="${article.title}">

                <div class="content">

                    <div class="category">${article.category}</div>

                    <h4>${article.title}</h4>

                    <p>${article.summary}</p>

                </div>
            `;

            container.appendChild(card);

        });

    }

    catch(error){

        container.innerHTML = `
            <p style="color:red;font-weight:bold;">
                Unable to load news articles.
            </p>
        `;

        console.error(error);

    }

}

loadNews();


// ==========================================
// Current Year in Footer
// ==========================================

const year = new Date().getFullYear();

const footerSmall = document.querySelector("footer small");

if (footerSmall) {

    footerSmall.innerHTML =
    `© ${year} Worldiex Kenya International`;

}
