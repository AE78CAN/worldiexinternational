const params = new URLSearchParams(window.location.search);
const articleId = Number(params.get("id"));

async function loadArticle() {
  const container = document.getElementById("article");

  try {
    const response = await fetch("news.json");
    const news = await response.json();

    const article = news.find(a => a.id === articleId);

    if (!article) {
      container.innerHTML = "<h2>Article not found.</h2>";
      return;
    }

    container.innerHTML = `
      <div class="category">${article.category}</div>

      <h1 style="font-size:2.4rem;margin:10px 0;">
        ${article.title}
      </h1>

      <p style="color:#666;margin-bottom:20px;">
        By ${article.author || "Worldiex News"} • ${article.date || ""}
      </p>

      <img src="${article.image}" style="width:100%;border-radius:12px;margin-bottom:25px;">

      <p style="line-height:1.9;">
        ${article.body || article.summary}
      </p>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<h2>Failed to load article.</h2>";
  }
}

loadArticle();
