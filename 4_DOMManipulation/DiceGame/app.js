/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Generiere Zufallszahl
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Ergebnis anzeigen
        var diceDOM = document.querySelector('.dice');
        var dice2DOM = document.querySelector('.dice-2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        // 3. Temporären Score erhöhen (wenn keine 1)
        if ((dice == 6 && dice2 == 6) || ((dice == 6 || dice2 == 6) && lastDice == 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice == 1 || dice2 == 1) {
            nextPlayer();
        } else {
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if (dice == 6 || dice2 == 6) lastDice = 6;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Gesamtscore erhöhen
        scores[activePlayer] += roundScore;

        // 2. UI updaten
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];



        // 3. Prüfe ob Sieg
        winningScore = document.querySelector('.input-winning').value;
        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + "-panel").classList.add('winner');
            document.querySelector('.player-' + activePlayer + "-panel").classList.remove('active');
            document.querySelector('.btn-hold').style.display = 'none';
            document.querySelector('.btn-roll').style.display = 'none';
        } else {
            // 4. Nächster Spieler
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function () {
    init();
});

function nextPlayer() {
    // 1. Setze temporären Score zurück
    document.querySelector('#current-' + activePlayer).textContent = '0';
    roundScore = 0;
    lastDice = -1;

    // 2. Wechsle Spieler
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = true;
    lastDice = -1;
    activePlayer = Math.round(Math.random());
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
}