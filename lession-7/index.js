/*
* Title: Main Application
* description: read a file and print random line
* Author: Mamunur Rashid.
*/

// devdependence
const mathLibrary = require(`${__dirname}/lib/math`);
const quotesLibrary = require(`${__dirname}/lib/quotes/quote`);

// App object - module scafolding
const app = {};

app.config = {
    timeBetweenQuotes: 1000
}

app.printQuotes = function printQuotes(){

    const allQuotes = quotesLibrary.allQuotes();
    
    const numberOfQuotes = allQuotes.length;
    
    const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes);

    const selectedQuotes = allQuotes[randomNumber - 1];

    console.log(selectedQuotes);
}

app.indefiniteLoop = function indefiniteLoop(){
    setInterval(app.printQuotes, app.config.timeBetweenQuotes);
}

app.indefiniteLoop();