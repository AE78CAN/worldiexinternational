const STORAGE_KEY = "worldiex_articles";

async function loadNews() {
  const container = document.getElementById("newsContainer");

  try {
    let news = [];

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      news = JSON.parse(saved);
    } else {
      const response = await fetch("news.json");
      news = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(news));
    }

    container.innerHTML = "";

    [...news].reverse().forEach(article => {
      const card = document.createElement("a");
      card.className = "card";
      card.href = `article.html?id=${article.id}`;

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

  } catch (err) {
    container.innerHTML = "<p>Failed to load news.</p>";
    console.error(err);
  }
}

loadNews();
