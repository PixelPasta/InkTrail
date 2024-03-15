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

        try {
        let response = await fetch("https://api.jikan.moe/v4/manga?genres=22&page=1&min_score=5&start_date=2018-01-01")
        response = await response.json()
        let lastPage = response.pagination.last_visible_page
        response = await fetch(`https://api.jikan.moe/v4/manga?genres=22&page=${Math.floor(Math.random() * lastPage+1)}&min_score=5&start_date=2018-01-01`)
        response = await response.json()      
        
        let chosen = Math.floor(Math.random() * response.data.length)
        let manga = response.data[chosen]


        function generateRandomArray(min, max, exception) {
            if (min >= max) {
                throw new Error("Minimum value must be less than maximum value");
            }
            
            if (exception < min || exception > max) {
                throw new Error("Exception value must be within the range of min and max");
            }
        
            if (max - min + 1 < 5) {
                throw new Error("Range between min and max must be at least 5");
            }
        
            const result = [];
            const range = max - min + 1;
            const numbers = [];
        
            for (let i = min; i <= max; i++) {
                numbers.push(i);
            }
        
            for (let i = 0; i < 5; i++) {
                let randomNumber;
                do {
                    randomNumber = numbers[Math.floor(Math.random() * range)];
                } while (result.includes(randomNumber) || randomNumber === exception);
                result.push(randomNumber);
            }
        
            return result;
        }
      
        let moreMangas = generateRandomArray(1, response.data.length, chosen);

        let manga1 = {poster: response.data[moreMangas[0]].images.jpg.image_url, mal_id: response.data[moreMangas[0]].mal_id}
        let manga2 = {poster: response.data[moreMangas[1]].images.jpg.image_url, mal_id: response.data[moreMangas[1]].mal_id}
        let manga3 = {poster: response.data[moreMangas[2]].images.jpg.image_url, mal_id: response.data[moreMangas[2]].mal_id}
        let manga4 = {poster: response.data[moreMangas[3]].images.jpg.image_url, mal_id: response.data[moreMangas[3]].mal_id}
        let manga5 = {poster: response.data[moreMangas[4]].images.jpg.image_url, mal_id: response.data[moreMangas[4]].mal_id}



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
           air_stat: manga.status,
           manga1,
           manga2,
           manga3,
           manga4,
           manga5
    
        }
        return info
      
        
    }
    catch(err) {
        console.log(err)
        res.send("Unable to load assets. This happens sometimes. Just reload to fix.")
       return 
         
    }
       }
       res.render('romance', await get())

})


app.get('/public/:id', async (req, res) => {
    res.sendFile(`${__dirname}/public/${req.params.id}`)
})

app.listen(port, async () => {
    console.log(`Listening on ${port}`)
})


process.on('uncaughtException', function (exception) {
    console.log(exception)
   });


