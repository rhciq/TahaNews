const API_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/arabic/rss.xml";

const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const newsContainer = document.getElementById("news-container");
const breakingNews = document.getElementById("breaking-news");

let allNews = [];

async function loadNews(category = "all") {
    try {

        // منع الكاش
        const response = await fetch(API_URL + "&_=" + Date.now(), {
            method: "GET",
            cache: "no-store",
            headers: {
                "Cache-Control": "no-cache"
            }
        });

        if (!response.ok) {
            throw new Error("فشل الاتصال بمصدر الأخبار");
        }

        const data = await response.json();

        allNews = (data.items || []).map(item => {

            let imgMatch = item.content
                ? item.content.match(/<img[^>]+src="([^">]+)"/)
                : null;

            let imageUrl = imgMatch
                ? imgMatch[1]
                : (item.thumbnail || "https://picsum.photos/500/300");

            let cleanDesc = item.description
                ? item.description.replace(/<[^>]*>?/gm, "").replace(/\.\.\.$/, "")
                : "";

            let cleanContent = item.content
                ? item.content.replace(/<[^>]*>?/gm, "").replace(/\.\.\.$/, "")
                : "";

            let fullText = cleanContent.length >= cleanDesc.length
                ? cleanContent
                : cleanDesc;

            if (cleanDesc && cleanContent && cleanContent !== cleanDesc) {
                fullText = cleanDesc + " " + cleanContent;
            }

            return {
                title: item.title,
                description: cleanDesc,
                content: fullText.trim() || item.title,
                image_url: imageUrl,
                category: category,
                country: "iraq"
            };
        });

        if (allNews.length === 0) {
            heroTitle.textContent = "لا توجد أخبار حالياً";
            heroDescription.textContent = "";
            newsContainer.innerHTML = "";
            return;
        }

        const first = allNews[0];

        heroImage.src = first.image_url;
        heroTitle.textContent = first.title;
        heroDescription.textContent = first.description;

        if (breakingNews) {
            breakingNews.textContent = first.title;
        }

        newsContainer.innerHTML = "";

        allNews.forEach((item, index) => {

            newsContainer.innerHTML += `
            <div class="news-card" onclick="showFullNews(${index}, '${category}')" style="cursor:pointer;">
                <img src="${item.image_url}" alt="">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            `;

        });

    } catch (error) {

        console.log(error);

        heroTitle.textContent = "جاري إعادة تحميل الأخبار...";
        heroDescription.textContent = "يرجى الانتظار";

        setTimeout(() => {
            loadNews(category);
        }, 5000);

    }
}

window.showFullNews = function(index, category) {

    const item = allNews[index];
    if (!item) return;

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".latest h2").style.display = "none";

    newsContainer.innerHTML = `
    <div class="full-news-page" style="grid-column:1/-1;background:#fff;padding:25px;border-radius:8px;">
        <button onclick="backHome('${category}')" style="background:#111114;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;margin-bottom:20px;">
            ⬅️ العودة للقائمة الرئيسية
        </button>

        <h1 style="margin-bottom:15px;color:#111114;line-height:1.6;">
            ${item.title}
        </h1>

        <img src="${item.image_url}" style="width:100%;max-height:450px;object-fit:cover;border-radius:8px;margin-bottom:20px;">

        <div style="font-size:18px;line-height:2;color:#333;">
            ${item.content}
        </div>
    </div>
    `;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};

window.backHome = function(category) {
    document.querySelector(".hero").style.display = "grid";
    document.querySelector(".latest h2").style.display = "block";
    loadNews(category);
};

window.loadCategory = function(category) {
    loadNews(category);
};

// أول تحميل
loadNews();

// تحديث تلقائي كل دقيقة
setInterval(() => {
    loadNews("all");
}, 60000);