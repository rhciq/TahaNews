// روابط RSS لكل قسم (مع توفير مصادر بديلة تضمن التبديل المستمر للأخبار)
const rssFeeds = {
    all: "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/arabic/rss.xml",
    iraq: "https://api.rss2json.com/v1/api.json?rss_url=https://www.ina.iq/rss.xml",
    world: "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/arabic/world/rss.xml",
    business: "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/arabic/business/rss.xml",
    sports: "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/arabic/sports/rss.xml",
    technology: "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/arabic/science-and-tech/rss.xml"
};

const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const newsContainer = document.getElementById("news-container");
const breakingNews = document.getElementById("breaking-news");

let allNews = [];
let currentCategory = "all";

async function loadNews(category = "all") {
    currentCategory = category;
    try {
        const selectedUrl = rssFeeds[category] || rssFeeds["all"];

        // طلب البيانات مع منع التخزين المؤقت (Cache) لضمان جلب الأخبار الجديدة فوراً
        const response = await fetch(selectedUrl + "&t=" + Date.now(), {
            method: "GET",
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("فشل الاتصال بالمصدر");
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error("لا توجد عناصر أخبار");
        }

        allNews = data.items.map(item => {
            let imgMatch = item.content ? item.content.match(/<img[^>]+src="([^">]+)"/) : null;
            let imageUrl = imgMatch ? imgMatch[1] : (item.thumbnail || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600");

            let cleanDesc = item.description ? item.description.replace(/<[^>]*>?/gm, "").trim() : "";
            let cleanContent = item.content ? item.content.replace(/<[^>]*>?/gm, "").trim() : "";

            let fullText = cleanContent.length >= cleanDesc.length ? cleanContent : cleanDesc;
            if (cleanDesc && cleanContent && cleanContent !== cleanDesc) {
                fullText = cleanDesc + "\n\n" + cleanContent;
            }

            return {
                title: item.title,
                description: cleanDesc || item.title,
                content: fullText || item.title,
                image_url: imageUrl,
                link: item.link
            };
        });

        // عرض الخبر الرئيسي الأول
        const first = allNews[0];
        if (heroImage) heroImage.src = first.image_url;
        if (heroTitle) heroTitle.textContent = first.title;
        if (heroDescription) heroDescription.textContent = first.description;
        if (breakingNews) breakingNews.textContent = first.title;

        // عرض بقية الأخبار في الشبكة
        if (newsContainer) {
            newsContainer.innerHTML = "";
            allNews.forEach((item, index) => {
                newsContainer.innerHTML += `
                <div class="news-card" onclick="showFullNews(${index})" style="cursor:pointer;">
                    <img src="${item.image_url}" alt="">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
                `;
            });
        }

    } catch (error) {
        console.error(error);
        if (heroTitle) heroTitle.textContent = "جاري تحديث الأخبار...";
        if (heroDescription) heroDescription.textContent = "يرجى الانتظار لحظات...";
        
        // إعادة المحاولة تلقائياً بعد 4 ثوانٍ في حال حدوث ضغط بالاتصال
        setTimeout(() => {
            loadNews(currentCategory);
        }, 4000);
    }
}

// عرض تفاصيل الخبر كاملاً داخل الموقع عند النقر عليه
window.showFullNews = function(index) {
    const item = allNews[index];
    if (!item) return;

    const heroSection = document.querySelector(".hero");
    const latestHeading = document.querySelector(".latest h2");

    if (heroSection) heroSection.style.display = "none";
    if (latestHeading) latestHeading.style.display = "none";

    newsContainer.innerHTML = `
    <div class="full-news-page" style="grid-column:1/-1; background:#fff; padding:25px; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
        <button onclick="backHome()" style="background:#111114; color:#fff; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; margin-bottom:20px; font-weight:bold;">
            ⬅️ العودة للقائمة الرئيسية
        </button>

        <h1 style="margin-bottom:15px; color:#111114; line-height:1.6; font-size:1.8rem;">
            ${item.title}
        </h1>

        <img src="${item.image_url}" style="width:100%; max-height:450px; object-fit:cover; border-radius:8px; margin-bottom:20px;">

        <div style="font-size:1.1rem; line-height:2.2; color:#333; white-space: pre-line;">
            ${item.content}
        </div>
        
        <div style="margin-top: 30px;">
            <a href="${item.link}" target="_blank" style="display:inline-block; background:#0066cc; color:#fff; padding:10px 20px; border-radius:6px; text-decoration:none;">
                🔗 قراءة الخبر من المصدر الأصلي
            </a>
        </div>
    </div>
    `;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// العودة للرئيسية
window.backHome = function() {
    const heroSection = document.querySelector(".hero");
    const latestHeading = document.querySelector(".latest h2");

    if (heroSection) heroSection.style.display = "grid";
    if (latestHeading) latestHeading.style.display = "block";
    
    loadNews(currentCategory);
};

// تغيير الأقسام
window.loadCategory = function(category) {
    loadNews(category);
};

// التشغيل الأولي عند فتح الصفحة
loadNews("all");

// التحديث التلقائي للأخبار بالخلفية كل دقيقة واحدة (60000 ميلي ثانية)
setInterval(() => {
    loadNews(currentCategory);
}, 60000);
