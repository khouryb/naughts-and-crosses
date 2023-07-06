# naughts-and-crosses

## Description

The goal of this project was to create a noughts and crosses game. The playing board had to be displayed and allow players to place their icons and to switch turns between X and O, then visually display who won.

## Deployment link

link: https://khouryb.github.io/naughts-and-crosses

## Timeframe

We were given 5 days to complete our game, working independently.

## Technologies used

- HTML5
- CSS3
- JavaScript

## Brief

- Render a game board in the browser
- Switch turns between X and O (or whichever markers you select)
- Visually display which side won if a player gets three in a row, or show a draw if neither player wins
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use JavaScript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
  You can use GitHub Pages for deploying your project
- Use semantic markup for HTML and CSS (adhere to best practices)
- Have well-formatted, and well-commented code

## Planning

In the planning phase of my project, I decided to make a wireframe of what I wanted the page to look like:

!(assets/wireframe.png)

I knew I wanted a game board and an aside to display some information and maybe to let the user pick who's turn it is first.

As per the advice of my tutors, I opted to approach the project in a more modular way; breaking it down into more bitesize chunks. After the wireframe I would then make sure I got a basic game working with only a little styling to show the board and player icons. Then after this I would focus on making the end product more visually pleasing and adding various other features to improve the user experience.

## Build Process

### Game Board and Event Propagation

First I went about implementing my initial wireframe. Just a box with squares and an aside and info bar that displayed user score and draws. My first hurdle was to allow a user to place Xs and Os inside a board whilst changing the icon after every turn. I took advantage of Bubbling to achieve this so I didn't have to attach event listeners to every square on the board. The function `boardEvent()` creates an array of the elements of the parent the user clicks on and returns an index of the square that they click on which is used with other logic to place an X or O on the board. This was something I used from a previous lab and I think I got a bit lucky on this step because it worked immediately!

```
function boardEvent(e) {
 // Create an array of all the children of the .board
 if (gameActive === true) {
   squareArray = Array.from(e.target.parentNode.children);
   currentSelection = squareArray.indexOf(e.target);


   // Allows the user to populate the board with x and o
   populateBoard();
   // checks for the winner after each click
   checkWinner(arrayPlayerOne, arrayPlayerTwo);
   checkTie();
 }
}
```

### Game Logic

The next step was to implement win and draw conditions. For now I would just `console.log()` these and would add HTML later to display a win or loss. I went about this by constructing an array of all the winning conditions on the board, called `winningCombinations` then I made two functions called `checkWinner()` and `checkTie()` that upon each placement of an X or O would check against an array that each player had to see if a win condition had been met.

```
function checkWinner(playerOneArray, playerTwoArray) {
 for (let i = 0; i < winningCombinations.length; i++) {
   if (
     winningCombinations[i].every((array) => playerOneArray.includes(array))
   ) {
     gameHistory("X wins!");
     playerOneBool = true;
     playerOneScore++;
     document.querySelector(".playerOne").innerHTML = playerOneScore;
     endGame();
   } else if (
     winningCombinations[i].every((array) => playerTwoArray.includes(array))
   ) {
     gameHistory("O wins!");
     playerTwoBool = true;
     playerTwoScore++;
     document.querySelector(".playerTwo").innerHTML = playerTwoScore;
     endGame();
   }
 }
}
```

### Finishing up and Stretch Goals

The MVP was almost complete! Now I just had to display if a player had won. From the get go I knew I wanted to display a game history, so I decided to implement this at the same time. I made a function called `gameHistory(string)` which would prepend a `<ul>` to an `<li>` displaying who won or if it was a draw. It would then remove the last child of the list if the list items were over 6 so as not to clutter the display.

```
function gameHistory(string) {
 pElement = document.createElement("li");
 pElement.innerHTML = string;
 winHistory.prepend(pElement);
 console.log(winHistory.childElementCount);
 if (winHistory.childElementCount > 6) {
   winHistory.removeChild(winHistory.lastChild);
 }
}


// removes all child nodes for the game history
function removeAllChildNodes(parent) {
 while (parent.firstChild) {
   parent.removeChild(parent.firstChild);
 }
}
```

With the MVP done, and then some, I decided to improve the user experience by allowing them to select who goes first using the `goesFirst(event)` function and to reset the game to its original state. I'll highlight the `goesFirst(event)` first. First I targeted each of the buttons using an event listener (again, using bubbling), then I went about writing some logic that would choose the first player then disabled the buttons so that the player could not be switched mid game. Here is a code snippet:

```
function goesFirst(event) {
 if (goesFirstButton === true) {
   if (event.target.classList.contains("buttonX")) {
     currentPlayer = players.playerOne;
     gameActive = true;
     goesFirstButton = false;
     disableMenuButtons();
   } else if (event.target.classList.contains("buttonO")) {
     currentPlayer = players.playerTwo;
     gameActive = true;
     goesFirstButton = false;
     disableMenuButtons();
   }
 }
}
```

Then it was onto the game reset button, I made a function called `resetValues()` which, when called, would reset everything on the board and all player scores etc. This was a callback function inside an event listener on the reset button. Here's another code snippet, enjoy!

```
function resetValues() {
 playerOneScore = 0;
 playerTwoScore = 0;
 tieScore = 0;
 goesFirstButton = true;
 gameActive = false;
 removeAllChildNodes(document.querySelector(".win-history"));
 document.querySelector(".playerOne").innerHTML = "0";
 document.querySelector(".playerTwo").innerHTML = "0";
 document.querySelector(".tie").innerHTML = "0";
}
```

## Challenges

I'm not going to lie, this project was a challenge. After initially getting it off the ground in a more or less smooth manner I got stumped on the winning conditions function. I still hadn't gotten a grasp of the array methods and knew I wanted to use some so I could understand them better. Therefore I created an issue and got some help from one of our lovely tutors here at GA (bonus marks please). After maybe 15 minutes he set me in the right direction and I managed to overcome the challenge I had with implementing this feature.

This is my first project, therefore I am well aware that my code isn't that DRY. I think because a lot of this is new to me, it can get quite overwhelming and you forget to use certain features or comment your code as you go, something which I'll be changing in the next project. But apart from that, I found that whilst I did have some roadblocks, they were not that major and I would usually overcome them without much time lost.

## Wins

- Getting the game to work without any bugs (that I know of anyway).
- Having quite a few stretch goals completed (win history, ability to choose who goes first) is a big win.

## Key Takeaways

Butter chicken, pilau rice and a garlic naan. But also to write my ReadMe as I go so I can include any pseudocode and to make it easier to remember my thinking at every step.
My confidence with using HTML, JavaScript and CSS has grown. Building such a large project, instead of doing loads of small labs, has really taught me how to fend for myself and become more self-sufficient.

## Future Improvements

- Sounds, I really wanted to implement this as it seems easy to do.
- A local save so that you can come back to play with the scores intact.
- An option to switch colour themes for the board.
- A computer AI.
