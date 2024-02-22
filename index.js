const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fetch = require("node-fetch");

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index')
})

app.get('/romance', async (req, res) => {
    
    async function get() {
        let response = await fetch("https://api.jikan.moe/v4/manga?genres=22&page=1&min_score=5&start_date=2018-01-01")
        response = await response.json()
        let lastPage = response.pagination.last_visible_page
        response = await fetch(`https://api.jikan.moe/v4/manga?genres=22&page=${Math.floor(Math.random() * lastPage+1)}&min_score=5&start_date=2018-01-01`)
        response = await response.json()
        let manga = response.data[Math.floor(Math.random() * response.data.length)]
       
        let info = {
           mal_url: manga.url,
           cover: manga.images.jpg.image_url,
           title_en: manga.title,
           title_jp: manga.title_japanese,
           chapter_count: manga.chapters,
           score: `${manga.score}/10`,
           desc: manga.synopsis,
           author: manga.authors[0].name
        }
        return info
       }
       res.render('romance', await get())
})

app.get('/public/:id', async (req, res) => {
    res.sendFile(`${__dirname}/public/${req.params.id}`)
})

app.listen(port, async () => {
    console.log(`Listening on ${port}`)
})





