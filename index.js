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
        let tags = ""
        if (manga.genres.length > 1) {
            let first = 1 
            manga.genres.forEach(function (item) {
            if (first === 1) {
                tags = item.name
                first = 0
            }
                tags = `${tags}, ${item.name}`
            })
        } else {
            tags = manga.genres[0].name
        }
       // Very Shitty Code IK
      
console.log(manga)
       
        let info = {
           mal_url: manga.url,
           cover: manga.images.jpg.image_url,
           title_en: manga.title,
           title_jp: manga.title_japanese,
           chapter_count: manga.chapters,
           score: `${manga.score}/10`,
           desc: manga.synopsis,
           author: manga.authors[0].name,
           status: manga.published.string,
           tags,
           air_stat: manga.status

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





