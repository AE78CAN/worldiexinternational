// ===============================
// WORLDIEX KENYA INTERNATIONAL
// Main JavaScript
// ===============================

let articles = [];

// Start website
async function init() {
  try {
    const response = await fetch("news.json");
    articles = await response.json();

    renderHero();
    renderTrending();
    renderNews(articles);
    startTicker();

    updateClock();
    setInterval(updateClock, 1000);

  } catch (error) {
    console.error("Failed to load news:", error);
  }
}

// ===============================
// HERO SECTION
// ===============================

function renderHero() {

  if (articles.length === 0) return;

  const hero = articles[0];

  document.getElementById("heroImage").src = hero.image;
  document.getElementById("heroImage").alt = hero.title;

  document.getElementById("heroTitle").textContent = hero.title;
  document.getElementById("heroSummary").textContent = hero.summary;
  document.getElementById("heroCategory").textContent = hero.category;

  document.getElementById("heroMeta").innerHTML =
    `<strong>${hero.author}</strong> • ${hero.date}`;

  document.getElementById("heroButton").href =
    `article.html?id=${hero.id}`;
}

// ===============================
// LATEST NEWS
// ===============================

function renderNews(newsList) {

  const container = document.getElementById("news");

  container.innerHTML = "";
  if (newsList.length === 0) {

  container.innerHTML = `
    <div class="search-empty">

      <div class="search-empty-icon">
        🔎
      </div>

      <h2>No stories found</h2>

      <p>
        Try a different keyword, category or headline.
      </p>

      <button
        type="button"
        onclick="clearSearch()"
      >
        Show All News
      </button>

    </div>
  `;

  return;

}

  newsList.forEach(article => {

    const card = document.createElement("a");

    card.className = "card";

    card.href = `article.html?id=${article.id}`;

    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">

      <div class="content">

        <div class="category">${article.category}</div>

        <h3>${article.title}</h3>

        <p>${article.summary}</p>

      </div>
    `;

    container.appendChild(card);

  });

}

// ===============================
// TRENDING
// ===============================

function renderTrending() {

  const box = document.getElementById("trending");

  box.innerHTML = "";

  articles.slice(0,5).forEach(article => {

    const item = document.createElement("a");

    item.className = "trend";

    item.href = `article.html?id=${article.id}`;

    item.innerHTML = `
      <h4>${article.title}</h4>
      <small>${article.category}</small>
    `;

    box.appendChild(item);

  });

}

// ===============================
// BREAKING TICKER
// ===============================

function startTicker() {

  const ticker = document.getElementById("tickerText");

  const headlines = articles
    .map(article => `🔴 ${article.title}`)
    .join("      •      ");

  ticker.textContent = headlines;

}

// ===============================
// LIVE CLOCK
// ===============================

function updateClock() {

  const now = new Date();

  const date = now.toLocaleDateString("en-GB", {

    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi"

  });

  const time = now.toLocaleTimeString("en-GB", {

    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Africa/Nairobi"

  });

  document.getElementById("date").textContent = date;
  document.getElementById("time").textContent = time;

}

// ===============================
// SEARCH
// ===============================

const searchInput =
  document.getElementById("search");

const clearSearchButton =
  document.getElementById("clearSearch");


if (searchInput) {

  searchInput.addEventListener("input", () => {

    const keyword =
      searchInput.value.trim().toLowerCase();


    if (!keyword) {

      renderNews(articles);

      updateSearchStatus(
        articles.length,
        ""
      );

      return;

    }


    const filtered =
      articles.filter(article => {

        const searchableText = [

          article.title,
          article.category,
          article.summary,
          article.body,
          article.author

        ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


        return searchableText.includes(
          keyword
        );

      });


    renderNews(filtered);

    updateSearchStatus(
      filtered.length,
      keyword
    );

  });

}


if (clearSearchButton) {

  clearSearchButton.addEventListener(
    "click",
    clearSearch
  );

}


function clearSearch() {

  if (searchInput) {

    searchInput.value = "";

    searchInput.focus();

  }


  renderNews(articles);

  updateSearchStatus(
    articles.length,
    ""
  );

}


function updateSearchStatus(
  count,
  keyword
) {

  const status =
    document.getElementById(
      "searchStatus"
    );

  const title =
    document.getElementById(
      "latestTitle"
    );


  if (!status) return;


  if (!keyword) {

    status.textContent =
      `Showing ${count} latest ${
        count === 1
          ? "story"
          : "stories"
      }`;


    if (title) {

      title.textContent =
        "Latest News";

    }

    return;

  }


  status.textContent =
    `${count} ${
      count === 1
        ? "story"
        : "stories"
    } found for "${keyword}"`;


  if (title) {

    title.textContent =
      "Search Results";

  }

}
// ===============================

init();
// =====================================
// MOBILE NAVIGATION
// =====================================

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const closeMobileMenu =
    document.getElementById("closeMobileMenu");

const mobileMenuOverlay =
    document.getElementById("mobileMenuOverlay");


function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("active");

    mobileMenuOverlay.classList.add("active");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.style.overflow = "hidden";

}


function closeMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");

    mobileMenuOverlay.classList.remove("active");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.style.overflow = "";

}


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        openMobileMenu
    );

}


if (closeMobileMenu) {

    closeMobileMenu.addEventListener(
        "click",
        closeMenu
    );

}


if (mobileMenuOverlay) {

    mobileMenuOverlay.addEventListener(
        "click",
        closeMenu
    );

}


document
    .querySelectorAll(".mobile-menu-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);
