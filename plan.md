# game

The game presents a table with 10 columns, each containing a random integer between 0 and 9. Below each integer is an input cell for the user to enter a value.

Before starting, the user sets the difficulty level on a scale from 0 to 9, which defines the amount to be added or subtracted from each random integer. The user also selects either "add" or "minus" as the arithmetic operation for the game.

Additionally, the user can set a time limit (in seconds) for each input. If the user fails to input a value within the time limit, the cell turns red, and the game moves to the next cell.

The goal is to perform the chosen arithmetic operation (addition or subtraction) on the random integer in each cell, entering the result in the cell below. The result must be normalized to the 0-9 range. For example, if the random integer is 5 and the difficulty is 9, the correct input would be 4 for addition and 6 for subtraction.

The user starts from the leftmost cell and moves right. Correct inputs turn green, incorrect inputs turn red, and the user proceeds to the next cell. If time runs out for an input, the cell turns red, and the game moves on.

At the end of the row, the game restarts with a new row of random integers after a 0.5-second pause. The game keeps track of the number of correct answers out of 10 for each round and displays a tally of previous scores at the bottom of the page.

Changing the difficulty or direction resets the game and clears previous scores. The game starts the first time the user interacts with the first cell and continues indefinitely unless paused.

A pause button allows the user to stop and resume the game. Refreshing the page also resets the game, including the score tally.

The game's interface is visual, with no audio feedback, animation, or other special effects.

## Components

1. Game:

   - Manages overall game state, including current settings, game status, and score history.
   - Subcomponents: GameSettings, GameDisplay, ScoreHistory.

2. GameSettings:

   - Allows user to configure game options.
   - Subcomponents: DifficultySelector, OperationToggle, TimeLimitSelector, StartButton.

3. DifficultySelector:

   - Slider for selecting difficulty level (0-9).

4. OperationToggle:

   - Toggle switch for choosing between "add" and "subtract."

5. TimeLimitSelector:

   - Slider to set time allowed per cell (in seconds).

6. StartButton:

   - Button to start the game.

7. GameDisplay:

   - Displays the game board and pause button.
   - Subcomponents: IntegerRow, InputRow, PauseButton.

8. IntegerRow:

   - Displays a row of random integers (0-9).

9. InputRow:

   - Displays input cells for user answers.
   - Subcomponents: InputCell.

10. InputCell:

    - Input box for user's answer with color feedback (green for correct, red for incorrect).

11. PauseButton:

    - Button to pause and resume the game.

12. ScoreHistory:
    - Lists previous scores (number of correct answers out of 10).

## notes

We are using strict typescript, tailwind css, and nextjs.
