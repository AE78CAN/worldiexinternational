const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

let articles = [];

async function init(){

const res = await fetch("news.json");
articles = await res.json();

loadArticle();
loadRelated();
updateClock();

setInterval(updateClock,1000);

}

function loadArticle(){

const article = articles.find(a=>a.id===id);

const container = document.getElementById("article");

if(!article){

container.innerHTML="<h2>Article not found.</h2>";

return;

}

container.innerHTML=`

<div class="article-header">

<span class="article-category">${article.category}</span>

<h1 class="article-title">
${article.title}
</h1>

<div class="article-meta">

<span><strong>${article.author}</strong></span>

<span>•</span>

<span>${article.date}</span>

</div>

</div>

<img class="article-image" src="${article.image}" alt="${article.title}">

<div class="article-body">

${article.body.split("\n\n").map(p=>`<p>${p}</p>`).join("")}

</div>

`;

document.title=article.title;

}

function loadRelated(){

const related = articles.filter(a=>a.id!==id).slice(0,3);

const box = document.getElementById("related");

box.innerHTML="";

related.forEach(article=>{

const card=document.createElement("a");

card.className="card";

card.href=`article.html?id=${article.id}`;

card.innerHTML=`

<img src="${article.image}">

<div class="content">

<div class="category">${article.category}</div>

<h3>${article.title}</h3>

<p>${article.summary}</p>

</div>

`;

box.appendChild(card);

});

}

function updateClock(){

const now=new Date();

document.getElementById("date").textContent=
now.toLocaleDateString("en-GB",{
weekday:"long",
day:"numeric",
month:"short",
year:"numeric",
timeZone:"Africa/Nairobi"
});

document.getElementById("time").textContent=
now.toLocaleTimeString("en-GB",{
hour:"2-digit",
minute:"2-digit",
second:"2-digit",
timeZone:"Africa/Nairobi"
});

}

async function copyLink(){

await navigator.clipboard.writeText(window.location.href);

alert("Article link copied.");

}

function shareArticle(){

if(navigator.share){

navigator.share({
title:document.title,
url:window.location.href
});

}else{

copyLink();

}

}

init();
