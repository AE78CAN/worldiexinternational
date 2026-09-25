let allNews = [];

async function loadNews(){

    const response = await fetch("news.json");

    allNews = await response.json();

    displayNews(allNews);

}

function displayNews(news){

    const container = document.getElementById("newsContainer");

    container.innerHTML = "";

    news.forEach(article=>{

        const card = document.createElement("a");

        card.className="card";

        card.href=`article.html?id=${article.id}`;

        card.innerHTML=`
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

document.addEventListener("input", e=>{

    if(e.target.id==="searchInput"){

        const keyword=e.target.value.toLowerCase();

        const filtered=allNews.filter(article=>

            article.title.toLowerCase().includes(keyword) ||

            article.category.toLowerCase().includes(keyword) ||

            article.summary.toLowerCase().includes(keyword)

        );

        displayNews(filtered);
        function loadTrending(news){
           // =============================
// LIVE DATE & TIME
// =============================

function updateClock(){

    const now = new Date();

    const date = now.toLocaleDateString("en-GB",{

        weekday:"short",

        day:"numeric",

        month:"short",

        year:"numeric",

        timeZone:"Africa/Nairobi"

    });

    const time = now.toLocaleTimeString("en-GB",{

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit",

        timeZone:"Africa/Nairobi"

    });

    document.getElementById("currentDate").textContent=date;
    document.getElementById("currentTime").textContent=time;

}

setInterval(updateClock,1000);

updateClock();


// =============================
// BREAKING HEADLINE TICKER
// =============================

function startTicker(news){

    const headlines=news.map(article=>article.title);

    const ticker=document.getElementById("headlineTicker");

    if(!ticker) return;

    let index=0;

    ticker.textContent=headlines[0];

    setInterval(()=>{

        index=(index+1)%headlines.length;

        ticker.textContent=headlines[index];

    },4000);

} 

    const box = document.getElementById("trendingNews");

    if(!box) return;

    box.innerHTML = "";

    news.slice(0,4).forEach(article=>{

        const item = document.createElement("a");

        item.className = "trend-item";

        item.href = `article.html?id=${article.id}`;

        item.innerHTML = `
            <h4>${article.title}</h4>
            <span>${article.category}</span>
        `;

        box.appendChild(item);

    });

}

    }

});

loadNews();
