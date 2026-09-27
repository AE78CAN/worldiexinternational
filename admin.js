// =====================================
// WORLDIEX NEWSROOM
// Publishing Dashboard
// =====================================

let currentArticles = [];
let newArticle = null;


// =====================================
// LOAD EXISTING NEWS
// =====================================

async function loadExistingNews(){

  try{

    const response = await fetch("news.json");

    currentArticles = await response.json();

  }

  catch(error){

    console.error(
      "Could not load news.json:",
      error
    );

    currentArticles = [];

  }

}


// =====================================
// SET TODAY'S DATE
// =====================================

function setToday(){

  const today = new Date();

  const year =
    today.getFullYear();

  const month =
    String(today.getMonth() + 1)
    .padStart(2,"0");

  const day =
    String(today.getDate())
    .padStart(2,"0");

  document.getElementById(
    "datePublished"
  ).value =
    `${year}-${month}-${day}`;

}


// =====================================
// LIVE CLOCK
// =====================================

function updateClock(){

  const now = new Date();


  const date =
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


  const time =
    now.toLocaleTimeString(
      "en-GB",
      {
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
        timeZone:"Africa/Nairobi"
      }
    );


  document.getElementById(
    "date"
  ).textContent = date;


  document.getElementById(
    "time"
  ).textContent = time;

}


// =====================================
// GENERATE ARTICLE
// =====================================

document
  .getElementById("articleForm")
  .addEventListener("submit", function(event){

    event.preventDefault();


    const title =
      document
      .getElementById("title")
      .value
      .trim();


    const category =
      document
      .getElementById("category")
      .value;


    const author =
      document
      .getElementById("author")
      .value
      .trim();


    const dateValue =
      document
      .getElementById("datePublished")
      .value;


    const image =
      document
      .getElementById("image")
      .value
      .trim();


    const summary =
      document
      .getElementById("summary")
      .value
      .trim();


    const body =
      document
      .getElementById("body")
      .value
      .trim();


    if(
      !title ||
      !category ||
      !author ||
      !dateValue ||
      !image ||
      !summary ||
      !body
    ){

      alert(
        "Please complete all fields."
      );

      return;

    }


    // Create new ID

    const ids =
      currentArticles.map(
        article => Number(article.id)
      );


    const highestId =
      ids.length
      ? Math.max(...ids)
      : 0;


    const id =
      highestId + 1;


    // Format date

    const dateObject =
      new Date(
        `${dateValue}T00:00:00`
      );


    const formattedDate =
      dateObject.toLocaleDateString(
        "en-GB",
        {
          day:"numeric",
          month:"long",
          year:"numeric"
        }
      );


    // Create article

    newArticle = {

      id:id,

      category:category,

      title:title,

      author:author,

      date:formattedDate,

      image:image,

      summary:summary,

      body:body

    };


    // Add newest story to beginning

    currentArticles =
      [
        newArticle,
        ...currentArticles
      ];


    showPreview();


    const message =
      document.getElementById(
        "successMessage"
      );


    message.style.display = "block";


    message.textContent =
      "Article generated successfully. Click 'Download news.json' to create your updated news file.";


  });


// =====================================
// PREVIEW
// =====================================

function showPreview(){

  if(!newArticle) return;


  const preview =
    document.getElementById(
      "preview"
    );


  const content =
    document.getElementById(
      "previewContent"
    );


  content.innerHTML = `

    <p>
      <strong>Category:</strong>
      ${escapeHTML(newArticle.category)}
    </p>

    <p>
      <strong>Headline:</strong>
      ${escapeHTML(newArticle.title)}
    </p>

    <p>
      <strong>Author:</strong>
      ${escapeHTML(newArticle.author)}
    </p>

    <p>
      <strong>Date:</strong>
      ${escapeHTML(newArticle.date)}
    </p>

    <p>
      <strong>Image:</strong>
      ${escapeHTML(newArticle.image)}
    </p>

    <br>

    <p>
      ${escapeHTML(newArticle.summary)}
    </p>

  `;


  preview.style.display =
    "block";

}


// =====================================
// DOWNLOAD NEWS.JSON
// =====================================

document
  .getElementById("downloadBtn")
  .addEventListener("click", function(){

    if(!currentArticles.length){

      alert(
        "No articles are available."
      );

      return;

    }


    const json =
      JSON.stringify(
        currentArticles,
        null,
        2
      );


    const blob =
      new Blob(
        [json],
        {
          type:"application/json"
        }
      );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "news.json";


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );

  });


// =====================================
// CLEAR FORM
// =====================================

document
  .getElementById("clearBtn")
  .addEventListener("click", function(){

    if(
      !confirm(
        "Clear the article form?"
      )
    ){

      return;

    }


    document
      .getElementById("articleForm")
      .reset();


    document
      .getElementById("preview")
      .style.display =
      "none";


    document
      .getElementById("successMessage")
      .style.display =
      "none";


    setToday();

  });


// =====================================
// SECURITY HELPER
// =====================================

function escapeHTML(text){

  return text
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}
// =====================================
// NEWSROOM 2.0
// LIVE WRITING TOOLS
// =====================================

const titleInput =
  document.getElementById("title");

const bodyInput =
  document.getElementById("body");

const imageInput =
  document.getElementById("image");

const titleCount =
  document.getElementById("titleCount");

const wordCount =
  document.getElementById("wordCount");

const bodyCount =
  document.getElementById("bodyCount");

const imagePreview =
  document.getElementById("imagePreview");


// =====================================
// HEADLINE COUNTER
// =====================================

if(titleInput){

  titleInput.addEventListener(
    "input",
    function(){

      if(titleCount){

        titleCount.textContent =
          titleInput.value.length;

      }

    }
  );

}


// =====================================
// ARTICLE WORD COUNTER
// =====================================

if(bodyInput){

  bodyInput.addEventListener(
    "input",
    function(){

      const text =
        bodyInput.value.trim();

      const words =
        text
          ? text.split(/\s+/).length
          : 0;

      if(wordCount){

        wordCount.textContent =
          words;

      }

      if(bodyCount){

        bodyCount.textContent =
          bodyInput.value.length;

      }

    }
  );

}


// =====================================
// IMAGE PREVIEW
// =====================================

if(imageInput){

  imageInput.addEventListener(
    "input",
    function(){

      const path =
        imageInput.value.trim();

      if(!imagePreview){

        return;

      }


      imagePreview.innerHTML = "";

      imagePreview.classList.remove(
        "error"
      );


      if(!path){

        imagePreview.style.display =
          "none";

        return;

      }


      const img =
        document.createElement("img");

      img.src = path;

      img.alt =
        "Article image preview";


      img.onload = function(){

        imagePreview.style.display =
          "block";

      };


      img.onerror = function(){

        imagePreview.style.display =
          "block";

        imagePreview.classList.add(
          "error"
        );

        imagePreview.textContent =
          "Image could not be loaded. Check that the filename and path are correct.";

      };


      imagePreview.appendChild(
        img
      );

    }
  );

}

// =====================================
// START
// =====================================

loadExistingNews();

setToday();

updateClock();

setInterval(
  updateClock,
  1000
);
