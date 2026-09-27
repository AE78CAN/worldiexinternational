let articles=[];

async function init(){

const res=await fetch('news.json');
articles=await res.json();

renderNews(articles);
renderTrending();
startTicker();
updateClock();

setInterval(updateClock,1000);
}

function renderNews(data){

const container=document.getElementById('news');
container.innerHTML='';

data.forEach(article=>{

const card=document.createElement('a');
card.className='card';
card.href=`article.html?id=${article.id}`;

card.innerHTML=`
<img src="${article.image}" alt="${article.title}">
<div class="content">
<div class="category">${article.category}</div>
<h3>${article.title}</h3>
<p>${article.summary}</p>
</div>`;

container.appendChild(card);

});
}

function renderTrending(){

const box=document.getElementById('trending');
box.innerHTML='';

articles.slice(0,4).forEach(article=>{

const item=document.createElement('a');
item.className='trend';
item.href=`article.html?id=${article.id}`;

item.innerHTML=`
<h4>${article.title}</h4>
<small>${article.category}</small>`;

box.appendChild(item);

});
}

function startTicker(){
const ticker=document.getElementById('tickerText');
ticker.textContent=articles.map(a=>`🔴 ${a.title}`).join('   •   ');
}

function updateClock(){
const now=new Date();

document.getElementById('date').textContent=
now.toLocaleDateString('en-GB',{
weekday:'long',
day:'numeric',
month:'short',
year:'numeric',
timeZone:'Africa/Nairobi'
});

document.getElementById('time').textContent=
now.toLocaleTimeString('en-GB',{
hour:'2-digit',
minute:'2-digit',
second:'2-digit',
timeZone:'Africa/Nairobi'
});
}

document.addEventListener('input',e=>{

if(e.target.id!=='search') return;

const q=e.target.value.toLowerCase();

const filtered=articles.filter(a=>
a.title.toLowerCase().includes(q)||
a.category.toLowerCase().includes(q)||
a.summary.toLowerCase().includes(q)
);

renderNews(filtered);

});

init();
