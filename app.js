import express from 'express';
import ytdl from 'ytdl-core';
import path from 'path';
import { fileURLToPath } from 'url';
import contentDisposition from 'content-disposition';

const app = express();

app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/static'));


app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/static/index.html`));
})

app.post('/download', (req,res) => {
    const url = req.body.url;
    const format = req.body.format;

    ytdl.getBasicInfo(url)
    .then(info => {
        const title = info.videoDetails.title;

        res.writeHead(200, {
            'Content-Disposition': contentDisposition(`${title}.${format}`), 
            'Content-Transfer-Encoding': 'binary',
            'Content-Type': 'application/octet-stream'
        });

        ytdl(url, {
            quality: "highest",
            format: format,
        }).pipe(res);
    })
    .catch(err => console.log("ERROR!"));

   
})

app.listen(5000, () => {
    console.log(`Listening on 5000...`);
})