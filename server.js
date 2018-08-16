const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

// registering partials to handlebars
hbs.registerPartials(__dirname + '/views/partials');

// setting express for view-engine
app.set('view engine', 'hbs');

// Defining Express Middlewares: app.use(callback)
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} \n`;
    console.log(log);
    fs.appendFile('server.log', log, (error) => {
        if(error){
            console.log('unable to log to server.log');
        }        
    });
    next();
});

// Uncomment below for maintanence mode
// app.use((req, res, next) => {
//     res.render('maintanence');
// });

// express middleware setting for static resource folder
app.use(express.static(__dirname + '/public'));

// Defining Handlebars-templates helper methods
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'request could not be fulfilled.'
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port} `);
});