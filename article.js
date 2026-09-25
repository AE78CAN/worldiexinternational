const STORAGE_KEY = "worldiex_articles";
const params = new URLSearchParams(window.location.search);
const articleId = Number(params.get("id"));

async function loadArticle() {
  const container = document.getElementById("article");

  try {
    let news = [];

    // First try localStorage
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      news = JSON.parse(saved);
    } else {
      const response = await fetch("news.json");
      news = await response.json();
    }

    const article = news.find(item => item.id === articleId);

    if (!article) {
      container.innerHTML = "<h2>Article not found.</h2>";
      return;
    }

    const body = article.body || article.summary;

    container.innerHTML = `
      <div class="category">${article.category}</div>

      <h1 style="font-size:2.4rem;margin:10px 0;">
        ${article.title}
      </h1>

      <p style="color:#666;margin-bottom:20px;">
        By ${article.author || "Worldiex News"} • ${article.date || ""}
      </p>

      <img src="${article.image}" style="width:100%;border-radius:12px;margin-bottom:25px;">

      ${body.split("\n\n").map(p =>
        `<p style="margin-bottom:18px;line-height:1.9;">${p}</p>`
      ).join("")}
    `;

  } catch (err) {
    container.innerHTML = "<h2>Failed to load article.</h2>";
    console.error(err);
  }
}

loadArticle();

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href);
  alert("Article link copied.");
}

function shareArticle() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    });
  } else {
    copyLink();
  }
}
