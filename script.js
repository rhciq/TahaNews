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

        if(!response.ok){
            throw new Error("فشل الاتصال بمصدر الأخبار");
        }

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

        if(breakingNews){
            breakingNews.textContent = first.title;
        }

        newsContainer.innerHTML = "";

        news.forEach((item, index) => {
            newsContainer.innerHTML += `
            <div class="news-card" onclick="showFullNews(${index}, '${category}')" style="cursor: pointer;">
                <img src="${item.image_url || "https://picsum.photos/500/300"}">
                <h3>${item.title}</h3>
                <p>${item.description || ""}</p>
            </div>
            `;
        });

    } catch(error){
        console.log("خطأ:", error);

        heroTitle.textContent = "جاري إعادة تحميل الأخبار...";
        heroDescription.textContent = "يرجى الانتظار";

        setTimeout(() => {
            loadNews(category);
        },5000);
    }
}

// دالة عرض الخبر بالاعتماد على الوصف المتاح في النسخة المجانية
window.showFullNews = function(index, category) {
    let news = allNews;
    if(category === "iraq") news = allNews.filter(item => item.country?.includes("iraq"));
    if(category === "sports") news = allNews.filter(item => item.category?.includes("sports"));
    if(category === "business") news = allNews.filter(item => item.category?.includes("business"));
    if(category === "technology") news = allNews.filter(item => item.category?.includes("technology"));
    if(category === "world") news = allNews.filter(item => !item.country?.includes("iraq"));

    const item = news[index];
    if (!item) return;

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".latest").querySelector("h2").style.display = "none";

    // استخدام الـ description أو محتوى الـ content إن وجد، وإذا لم يوجد نعرض الوصف المتاح بشكل كامل
    let fullText = item.content && !item.content.includes("PAID") ? item.content : (item.description || "تفاصيل الخبر غير متوفرة بشكل كامل من المصدر حالياً.");

    newsContainer.innerHTML = `
        <div class="full-news-page" style="grid-column: 1 / -1; background: #fff; padding: 25px; border-radius: 8px;">
            <button onclick="loadNews('${category}'); document.querySelector('.hero').style.display = 'grid'; document.querySelector('.latest').querySelector('h2').style.display = 'block';" style="background: #111114; color: white; border: none; padding: 10px 20px; font-size: 15px; border-radius: 5px; cursor: pointer; margin-bottom: 20px; font-family: 'Cairo', sans-serif;">
                ⬅️ العودة للقائمة الرئيسية
            </button>
            <h1 style="margin-bottom: 15px; color: #111114; font-size: 24px; line-height: 1.5;">${item.title}</h1>
            <img src="${item.image_url || "https://picsum.photos/800/400"}" style="width: 100%; max-height: 450px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
            <div style="font-size: 18px; line-height: 1.9; color: #333;">
                <p style="margin-bottom: 15px;">${fullText}</p>
            </div>
        </div>
    `;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.loadCategory = function(category){
    loadNews(category);
}

loadNews();

setInterval(() => {
    loadNews("all");
}, 300000);
