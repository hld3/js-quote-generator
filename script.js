const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

let quotes = [];

// Populate quotes to the page
function newQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  authorText.textContent = quote.author ?? 'Unknown';
  quoteText.textContent = quote.text;

  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');
}

// Get quotes from the API
async function retrieveQuotes() {
  try {
    const response = await fetch('https://type.fit/api/quotes');
    quotes = await response.json();
    newQuote();
  } catch (error) {
    throw new Error(`There was an error retrieving quotes: ${error}`);
  }
}

// Tweet quotes
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event listners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

retrieveQuotes();
