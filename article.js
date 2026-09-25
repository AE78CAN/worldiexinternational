const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

fetch("news.json")
  .then(res => res.json())
  .then(news => {
    const article = news.find(item => item.id === id);
    const container = document.getElementById("article");

    if (!article) {
      container.innerHTML = "<h2>404 - Article Not Found</h2>";
      return;
    }

    container.innerHTML = `
      <div class="category">${article.category}</div>

      <h1>${article.title}</h1>

      <p><strong>${article.author || "Worldiex News"}</strong> • ${article.date || ""}</p>

      <img src="${article.image}" style="width:100%; border-radius:12px; margin:20px 0;">

      <p>${article.body || article.summary}</p>
    `;
  })
  .catch(err => {
    document.getElementById("article").innerHTML =
      "<h2>Failed to load article.</h2>";
    console.error(err);
  });
