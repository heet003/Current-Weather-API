const express = require('express');
const https = require('node:https');
const app = express();
const bodyParser = require('body-parser');
const { log } = require('node:console');
app.use(bodyParser.urlencoded(
    { extended: true }
));

app.listen(3000, function () { });

app.post("/", function (req, res) {
    var cityName = req.body.city;
    var url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=7b1762da305dfdfc7d9a6ec49e0d22fb" + "&q=" + cityName;
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on('data', (d) => {
            const weatherData = JSON.parse(d);

            const iconLink = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png";
            res.setHeader("Content-type", "text/html");
            res.write('<h1>The weather in ' + weatherData.name + ' is ' + weatherData.weather[0].description + '.</h1>');
            res.write('<img src=' + iconLink + '>');
            res.send();
        });

    }).on('error', (e) => {
        console.error(e);
    });
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "\\index.html");

});
