
// load-news.js - Auto-loads your news
const defaultNews = [
  // PASTE YOUR COPIED DATA HERE from my-news-backup.txt
  // Format example:
  {
    id: 1,
    title: "Sports News",
    content: "Team wins!",
    category: "Sports",
    videoUrl: "", // Leave empty or use direct links
    likes: 0,
    comments: []
  }
];

if (!localStorage.getItem('newsArticles')) {
  localStorage.setItem('newsArticles', JSON.stringify(defaultNews));
}
