const STORAGE_KEY = "worldiex_articles";

async function loadNews(){

  const container = document.getElementById("newsContainer");

  let news;

  const saved = localStorage.getItem(STORAGE_KEY);

  if(saved){

      news = JSON.parse(saved);

  }else{

      const response = await fetch("news.json");
      news = await response.json();

      localStorage.setItem(STORAGE_KEY, JSON.stringify(news));

  }

  container.innerHTML = "";

  news.reverse().forEach(article=>{

      const card = document.createElement("a");

      card.className="card";

      card.href=`article.html?id=${article.id}`;

      card.innerHTML=`
      <img src="${article.image}">
      <div class="content">
          <div class="category">${article.category}</div>
          <h4>${article.title}</h4>
          <p>${article.summary}</p>
      </div>`;

      container.appendChild(card);

  });

}

loadNews();
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

            const card = document.createElement("a");
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
