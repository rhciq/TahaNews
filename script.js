const API_URL = "https://tahanews2.yajahtaha.workers.dev/";

const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const newsContainer = document.getElementById("news-container");
const breakingNews = document.getElementById("breaking-news");

let allNews = [];

async function loadNews(category = "all") {
    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        allNews = data.results || [];

        let news = allNews;

        if(category === "iraq"){
            news = allNews.filter(item => item.country?.includes("iraq"));
        }

        if(category === "sports"){
            news = allNews.filter(item => item.category?.includes("sports"));
        }

        if(category === "business"){
            news = allNews.filter(item => item.category?.includes("business"));
        }

        if(category === "technology"){
            news = allNews.filter(item => item.category?.includes("technology"));
        }

        if(category === "world"){
            news = allNews.filter(item => !item.country?.includes("iraq"));
        }


        if(news.length === 0){
            heroTitle.textContent = "لا توجد أخبار حالياً";
            heroDescription.textContent = "";
            newsContainer.innerHTML = "";
            return;
        }


        const first = news[0];

        heroImage.src = first.image_url || "https://picsum.photos/1200/600";
        heroTitle.textContent = first.title;
        heroDescription.textContent = first.description || "";


        if (breakingNews) {
            breakingNews.textContent = first.title;
        }


        newsContainer.innerHTML = "";

        news.forEach(item => {

            newsContainer.innerHTML += `
            <div class="news-card">
                <img src="${item.image_url || "https://picsum.photos/500/300"}">
                <h3>${item.title}</h3>
                <p>${item.description || ""}</p>
            </div>
            `;

        });


    } catch(error){

        heroTitle.textContent = "حدث خطأ أثناء جلب الأخبار";
        heroDescription.textContent = error.message;

    }
}


window.loadCategory = function(category){
    loadNews(category);
}


loadNews();


setInterval(() => {
    loadNews();
},300000);
