// =====================================
// WORLDIEX ARTICLE SYSTEM
// =====================================

const params =
    new URLSearchParams(window.location.search);

const id =
    Number(params.get("id"));

let articles = [];


// =====================================
// LOAD NEWS
// =====================================

async function init(){

    try{

        const response =
            await fetch("news.json");

        if(!response.ok){
            throw new Error(
                "Unable to load news.json"
            );
        }

        articles =
            await response.json();

        loadArticle();

        loadRelated();

        updateClock();

        setInterval(
            updateClock,
            1000
        );

    }catch(error){

        console.error(error);

        document.getElementById("article").innerHTML = `

            <div class="article-not-found">

                <h2>
                    Unable to load story
                </h2>

                <p>
                    Please refresh the page and try again.
                </p>

                <a
                    class="back-home"
                    href="index.html"
                >
                    ← Back to Home
                </a>

            </div>

        `;

    }

}


// =====================================
// LOAD ARTICLE
// =====================================

function loadArticle(){

    const article =
        articles.find(
            article => article.id === id
        );

    const container =
        document.getElementById("article");


    if(!article){

        container.innerHTML = `

            <div class="article-not-found">

                <h2>
                    Article Not Found
                </h2>

                <p>
                    The story you are looking for
                    could not be found.
                </p>

                <a
                    class="back-home"
                    href="index.html"
                >
                    ← Back to Home
                </a>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="article-header">

            <span class="article-category">
                ${article.category}
            </span>


            <h1 class="article-title">
                ${article.title}
            </h1>


            <div class="article-meta">

                <span>
                    ✍️ <strong>
                        ${article.author}
                    </strong>
                </span>

                <span>•</span>

                <span>
                    📅 ${article.date}
                </span>

            </div>

        </div>


        <img
            class="article-image"
            src="${article.image}"
            alt="${article.title}"
        >


        <div class="article-body">

            ${article.body
                .split("\n\n")
                .map(
                    paragraph =>
                    `<p>${paragraph}</p>`
                )
                .join("")
            }

        </div>

    `;


    document.title =
        `${article.title} | Worldiex Kenya International`;

}


// =====================================
// RELATED STORIES
// =====================================

function loadRelated(){

    const current =
        articles.find(
            article => article.id === id
        );

    const box =
        document.getElementById("related");


    if(!current){

        box.innerHTML = "";

        return;

    }


    let related =
        articles.filter(
            article =>
                article.id !== id &&
                article.category === current.category
        );


    // If there aren't enough stories
    // in the same category, use others.

    if(related.length < 3){

        const others =
            articles.filter(
                article =>
                    article.id !== id &&
                    article.category !== current.category
            );

        related =
            [...related, ...others];

    }


    related =
        related.slice(0,3);


    box.innerHTML = "";


    related.forEach(article => {

        const card =
            document.createElement("a");

        card.className =
            "card";

        card.href =
            `article.html?id=${article.id}`;


        card.innerHTML = `

            <img
                src="${article.image}"
                alt="${article.title}"
                loading="lazy"
            >

            <div class="content">

                <div class="category">
                    ${article.category}
                </div>

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.summary}
                </p>

                <div class="article-card-meta">
                    ${article.author} • ${article.date}
                </div>

            </div>

        `;


        box.appendChild(card);

    });

}


// =====================================
// CLOCK
// =====================================

function updateClock(){

    const now =
        new Date();


    const date =
        document.getElementById("date");

    const time =
        document.getElementById("time");


    if(date){

        date.textContent =
            now.toLocaleDateString(
                "en-GB",
                {
                    weekday:"long",
                    day:"numeric",
                    month:"short",
                    year:"numeric",
                    timeZone:"Africa/Nairobi"
                }
            );

    }


    if(time){

        time.textContent =
            now.toLocaleTimeString(
                "en-GB",
                {
                    hour:"2-digit",
                    minute:"2-digit",
                    second:"2-digit",
                    timeZone:"Africa/Nairobi"
                }
            );

    }

}


// =====================================
// COPY LINK
// =====================================

async function copyLink(){

    try{

        await navigator.clipboard.writeText(
            window.location.href
        );

        alert(
            "Article link copied."
        );

    }catch(error){

        alert(
            "Unable to copy link."
        );

    }

}


// =====================================
// SHARE ARTICLE
// =====================================

function shareArticle(){

    if(navigator.share){

        navigator.share({

            title:
                document.title,

            url:
                window.location.href

        }).catch(() => {});

    }else{

        copyLink();

    }

}


// =====================================
// MOBILE NAVIGATION
// =====================================

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

const closeMobileMenu =
    document.getElementById(
        "closeMobileMenu"
    );

const mobileMenuOverlay =
    document.getElementById(
        "mobileMenuOverlay"
    );


function openMobileMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.add(
        "active"
    );

    mobileMenuOverlay.classList.add(
        "active"
    );

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.style.overflow =
        "hidden";

}


function closeMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.remove(
        "active"
    );

    mobileMenuOverlay.classList.remove(
        "active"
    );

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.style.overflow =
        "";

}


if(mobileMenuButton){

    mobileMenuButton.addEventListener(
        "click",
        openMobileMenu
    );

}


if(closeMobileMenu){

    closeMobileMenu.addEventListener(
        "click",
        closeMenu
    );

}


if(mobileMenuOverlay){

    mobileMenuOverlay.addEventListener(
        "click",
        closeMenu
    );

}


document
    .querySelectorAll(
        ".mobile-menu-links a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if(event.key === "Escape"){

            closeMenu();

        }

    }
);


// =====================================
// START
// =====================================

init();
