/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he/she wishes. Each result gets added to the player's ROUND score
- BUT, if the player rolls a 1 for either dice, all his/her ROUND score gets lost. After that, it's the next player's turn
- If the player consecutively rolls two 6's, not on a single roll but across two rolls, then that player loses their entire
  GLOBAL score and it's the next players turn.
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. 
  After that, it's the next player's turn
- The first player to reach the appropriate amount of points on their GLOBAL score wins the game

*/

/*
 * scores is an array that holds the scores for each player
 * roundScore holds the players total during each turn before
 *     they choose to hold it to their global score
 * activePlayer represents the player currently taking their turn
 *     It determines which index in the scores array a roundScore
 *     should be added to should the player choose to hold the points
 * isPlaying is a state variable to make sure things only happen when
 *     the game is actually being played
*/
var scores, roundScore, activePlayer, lastRoll1, lastRoll2;
var isPlaying;
var winningScore;

// Call resetGame() to initialize game variables
resetGame();

// Handles what needs to happen when a turn change occurs
function changeTurn() {
    // Update the round score to 0 for the new players turn
    roundScore = 0;
    lastRoll1 = 0;
    lastRoll2 = 0;
    
    // Update the current (round) score of the active player to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // Remove the active class from the currently active player and add it
    // to the new active player via the toggle method
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Determine the new active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    // Hide the dice
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}


// Acts as a way to both initialize the game and reset the game 
function resetGame() {
    // Reset all values and toggle the active player back to player one
    scores= [0, 0]
    roundScore = 0;
    activePlayer = 0;
    lastRoll1 = 0;
    lastRoll2 = 0;
    isPlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}

// Add an event listener to the roll button that activates what should happen
// when a dice roll occurs
document.querySelector('.btn-roll').addEventListener('click', function() {
    // State variable if game is being played
    winningScore = document.querySelector('.winning-score').value;
    if (isPlaying && winningScore) {
        // Get a random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) +1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result of the dice roll
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        var diceDOM2 = document.querySelector('.dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        // Check to see if the last roll was a 6
        if (lastRoll1 === 6 && dice === 6 || lastRoll2 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            changeTurn();
        } else if (dice !== 1 && dice2 !== 1) {
            lastRoll1 = dice;
            lastRoll2 = dice2;
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            changeTurn();
        }       
    }
});

// Add an event listener to the hold button that activates what should happen
// when a hold is chosen
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isPlaying) {
        winningScore = document.querySelector('.winning-score').value;
    
        if (winningScore) {
            // Add the round score to the player global score
            scores[activePlayer] += roundScore;
            
            // Set the dice display back to none
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            
            // Update the score in the players global score section
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
            // Check to see if the game has been won
            if (scores[activePlayer] >= winningScore) {
                // No longer playing
                isPlaying = false;
        
                // Display a winner message in the winning players name
                document.getElementById('name-' +activePlayer).textContent = 'Winner!!!';
        
                // Temporarily remove the active player class for effect
                document.querySelector('.player-0-panel').classList.remove('active');       
                document.querySelector('.player-1-panel').classList.remove('active');
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        
                // Set a timeout for 2 seconds to display the winner then reset the game
                window.setTimeout(resetGame, 2000);
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
            } else {
                // Change turn
                changeTurn();
            } 
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', resetGame);







