const params = new URLSearchParams(window.location.search);
const articleId = Number(params.get("id"));

async function loadArticle(){

  const response = await fetch("news.json");
  const news = await response.json();

  const article = news.find(item => item.id === articleId);

  const container = document.getElementById("article");

  if(!article){
    container.innerHTML = "<h2>Article not found.</h2>";
    return;
  }

  container.innerHTML = `
    <div class="category">${article.category}</div>

    <h1 style="font-size:2.3rem;margin:10px 0 20px;">
      ${article.title}
    </h1>

    <p style="color:#777;margin-bottom:20px;">
      By Worldiex News • September 24, 2026
    </p>

    <img src="${article.image}" style="width:100%;border-radius:14px;margin-bottom:25px;">

    <p style="font-size:18px;line-height:1.8;">
      ${article.summary}
    </p>

    <p style="margin-top:20px;line-height:1.9;">
      This is the full article section. Later, we will store complete articles in
      news.json so every story has its own body, author, publication date,
      related stories, and SEO-friendly URL.
    </p>
  `;
}

loadArticle();

async function copyLink(){
  await navigator.clipboard.writeText(window.location.href);
  alert("Article link copied.");
}

function shareArticle(){
  if(navigator.share){
    navigator.share({
      title: document.title,
      url: window.location.href
    });
  }else{
    copyLink();
  }
}
