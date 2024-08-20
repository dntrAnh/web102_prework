/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(game => {
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-image" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
     });
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// Set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// Grab the amount raised card
const raisedCard = document.getElementById("total-raised");

// Use reduce() to find the total amount raised
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Grab number of games card
const gamesCard = document.getElementById("num-games");

// Count the number of games (length of the array)
const totalGames = GAMES_JSON.length;

// Set inner HTML using template literal
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that are fully funded
function filterUnfundedOnly() {
    // Remove all current child elements from the games container
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// Add this line inside filterUnfundedOnly function for testing
// const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
// console.log(unfundedGames.length);

// Show only games that are fully funded
function filterFundedOnly() {
    // Clear the existing games from the DOM
    deleteChildElements(gamesContainer);

    // Filter games where pledged amount is greater than or equal to the goal amount
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the number of funded games
    // console.log(fundedGames.length); // This will show the number of funded games in the console

    // Add the funded games to the page
    addGamesToPage(fundedGames);
}

// Call the function to test it
// filterFundedOnly();

// Show all games
function showAllGames() {
    // Clear the existing games from the DOM
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// showAllGames();

// Select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// Grab the description container
const descriptionContainer = document.getElementById("description-container");

// Use filter to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create a string that explains the number of unfunded games using the ternary operator
const unfundedMessage = numUnfundedGames === 1 
    ? "There is 1 game that is not fully funded." 
    : `There are ${numUnfundedGames} games that are not fully funded.`;

// Create a new DOM element containing the template string
const unfundedInfo = document.createElement("p");
unfundedInfo.innerText = unfundedMessage;

// Append the new element to the description container
descriptionContainer.appendChild(unfundedInfo);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort games by pledged amount in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Destructure the top 2 games from the sorted list
const [topGame, runnerUp] = sortedGames;

// Create a new element to hold the name of the top pledge game and append it to the firstGameContainer
const topGameElement = document.createElement('p');
topGameElement.textContent = `Top Funded Game: ${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

// Create a new element to hold the name of the runner-up game and append it to the secondGameContainer
const runnerUpElement = document.createElement('p');
runnerUpElement.textContent = `Runner Up: ${runnerUp.name}`;
secondGameContainer.appendChild(runnerUpElement);