let allNews=[];

async function loadNews(){
const response=await fetch('news.json');
allNews=await response.json();
displayNews(allNews);
loadTrending(allNews);
startTicker(allNews);
}

function displayNews(news){
const container=document.getElementById('newsContainer');
container.innerHTML='';

news.forEach(article=>{
const card=document.createElement('a');
card.className='card';
card.href=`article.html?id=${article.id}`;

card.innerHTML=`
<img src="${article.image}" alt="${article.title}">
<div class="content">
<div class="category">${article.category}</div>
<h4>${article.title}</h4>
<p>${article.summary}</p>
</div>`;

container.appendChild(card);
});
}

function loadTrending(news){
const box=document.getElementById('trendingNews');
box.innerHTML='';

news.slice(0,4).forEach(article=>{
const item=document.createElement('a');
item.className='trend-item';
item.href=`article.html?id=${article.id}`;
item.innerHTML=`<h4>${article.title}</h4><span>${article.category}</span>`;
box.appendChild(item);
});
}

function startTicker(news){
const ticker=document.getElementById('breakingTicker');
const headlines=news.map(n=>`🔴 ${n.title}`).join('      •      ');
ticker.textContent=headlines;
}

function updateClock(){
const now=new Date();
document.getElementById('currentDate').textContent=now.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'Africa/Nairobi'});
document.getElementById('currentTime').textContent=now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Africa/Nairobi'});
}

setInterval(updateClock,1000);
updateClock();

const search=document.addEventListener('input',e=>{
if(e.target.id==='searchInput'){
const key=e.target.value.toLowerCase();
const filtered=allNews.filter(a=>
a.title.toLowerCase().includes(key)||
a.category.toLowerCase().includes(key)||
a.summary.toLowerCase().includes(key));
displayNews(filtered);
}
});

loadNews();
