const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
    
}

//hide loading

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;

    }
}

//Get quote from API

async function getQuote(){
    showLoadingSpinner();

    const proxyUrl = 'https://tranquil-earth-93130.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    try{

        const response = await fetch(proxyUrl + apiUrl);
        const data  = await response.json();

        if(data.quoteAuthor === ''){
            authorText.innerText ="Annonymous";
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        //stop loader and show the quote
        removeLoadingSpinner();
        

    } catch (error) {
        getQuote();
        
    }
}


function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');

}
 
//event listnrs

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load 

getQuote();