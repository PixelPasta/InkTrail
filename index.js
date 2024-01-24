const fetch = require("node-fetch");
async function get() {
 let response = await fetch("https://api.jikan.moe/v4/manga?genres=22&page=1&min_score=8")
 response = await response.json()
 let lastPage = response.pagination.last_visible_page
 response = await fetch(`https://api.jikan.moe/v4/manga?genres=22&page=${Math.floor(Math.random() * lastPage+1)}&min_score=8`)
 response = await response.json()
 let manga = response.data[Math.floor(Math.random() * response.data.length)]
 let info = {
 malURL: manga.url,
 
 }
}
get()