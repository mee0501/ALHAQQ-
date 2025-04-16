// sync.js - UPDATED WITH ERROR HANDLING
const BIN_ID = "https://api.jsonbin.io/v3/b/67ff16558960c979a5861098"; // 👈 Replace with your ID
const API_KEY = "$2a$10$YOUR_API_KEY"; // Default free key (keep this)

async function syncNews() {
  try {
    // 1. Load latest news from cloud
    const cloudResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`);
    const cloudData = await cloudResponse.json();
    const cloudNews = cloudData.record?.news || [];
    
    // 2. Merge with local news
    const localNews = JSON.parse(localStorage.getItem('newsArticles')) || [];
    const mergedNews = [...cloudNews, ...localNews];
    const uniqueNews = mergedNews.filter(
      (v, i, a) => a.findIndex(t => t.id === v.id) === i
    );

    // 3. Save merged data everywhere
    localStorage.setItem('newsArticles', JSON.stringify(uniqueNews));
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY 
      },
      body: JSON.stringify({ news: uniqueNews })
    });
    
    console.log("Sync successful!");
  } catch (error) {
    console.error("Sync failed:", error);
  }
}

// Sync every 20 seconds and on page load
setInterval(syncNews, 20000);
window.addEventListener('load', syncNews);
