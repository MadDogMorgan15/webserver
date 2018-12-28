const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
//app.use happens in the order listed here
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //middleware


app.use((req, res, next) => { //Next is to tell the code what to do after this is done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server log.')
        }
    });
    next(); //require for the calls to run
});

hbs.registerHelper('getCurrentYear',()=>{
 return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the new app page',
        name: 'Bradley',
        likes: ['cooking', 'programming','gardening']

 
    });
});

app.get('/about', (req,res) =>{
 res.render('about.hbs',{
     pageTitle: 'About Page',
 });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage:'<h2>Error 404, page not found<h2>'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ${port}');
}); //Common port for local development