const API_URL = "https://tahanews2.yajahtaha.workers.dev/";

const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const newsContainer = document.getElementById("news-container");

async function loadNews() {
    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        const news = data.results || [];

        if(news.length === 0){
            heroTitle.textContent = "لا توجد أخبار حالياً";
            heroDescription.textContent = "";
            return;
        }

        const first = news[0];

        heroImage.src = first.image_url || "https://picsum.photos/1200/600";
        heroTitle.textContent = first.title;
        heroDescription.textContent = first.description || "";

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

loadNews();

setInterval(loadNews,300000);
