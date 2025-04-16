// sync.js - Cross-device syncing
const BIN_ID = "PASTE_YOUR_BIN_ID_HERE"; // 👈 Use your Bin ID
const API_KEY = "$2a$10$YOUR_API_KEY"; // Default key (free)

async function syncNews() {
  // Load from cloud
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`);
  const { record } = await response.json();
  localStorage.setItem('newsArticles', JSON.stringify(record.news));

  // Save to cloud
  const localNews = JSON.parse(localStorage.getItem('newsArticles')) || [];
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY 
    },
    body: JSON.stringify({ news: localNews })
  });
}

// Sync every 30 seconds
setInterval(syncNews, 30000);
syncNews(); // Run immediately
