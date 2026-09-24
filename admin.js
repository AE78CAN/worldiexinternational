const STORAGE_KEY = "worldiex_articles";

const defaultNews = [
  {
    id:1,
    category:"Politics",
    title:"Parliament opens debate on key national reforms",
    summary:"Lawmakers began discussions on governance and finance reforms.",
    image:"images/parliament.jpg"
  }
];

function getArticles(){

  const saved = localStorage.getItem(STORAGE_KEY);

  if(saved){
    return JSON.parse(saved);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNews));
  return defaultNews;

}

function saveArticles(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function render(){

  const list = document.getElementById("articleList");
  const articles = getArticles();

  list.innerHTML = "";

  articles.reverse().forEach(article=>{

    const div = document.createElement("div");
    div.className="card";

    div.innerHTML=`
      <img src="${article.image}">
      <div class="content">
        <div class="category">${article.category}</div>
        <h4>${article.title}</h4>
        <p>${article.summary}</p>
        <button onclick="removeArticle(${article.id})">Delete</button>
      </div>
    `;

    list.appendChild(div);

  });

}

function removeArticle(id){

  let articles = getArticles();

  articles = articles.filter(a=>a.id!==id);

  saveArticles(articles);

  render();

}

document.getElementById("newsForm").addEventListener("submit",(e)=>{

  e.preventDefault();

  const articles = getArticles();

  const article = {

    id: Date.now(),

    title:title.value,

    category:category.value,

    image:image.value,

    summary:summary.value

  };

  articles.push(article);

  saveArticles(articles);

  e.target.reset();

  render();

});

render();
