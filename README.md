# Sudoku


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#about

This app can solve any sudoku problem entered into it. The app uses only three sudoku rules
1. there cannot be duplicates of the same number in a row
2. there cannot be duplicates of the same number in a column
3. there cannot be duplicates of the same number in a box

If the problem has more than one possibility in a cell, The app will use recusion to solve the problem.
The recusion is baised on the first number to have the fewest number of possible guesses. The app creates
for each of the possibilities and uses that array of boards to pass into the solve funciton once again. The
solve function will determine if a board is broken baised on the previously mentioned criteria. The process 
will repeat until the board runs out of valid board or all of the boxes are filled.

This app can also create sudoku apps by randomly placing numberes in a blank board and running the solve
function. The board will then have some numbers removed at random and the difficulty is determined by how
many numbers are removed.

#aside

This program is light on styling and is meant as a way to showcase where I'm at in problem solvinig and organization.
In the future I could probably implement more sudoku rules to speed up runtime, although runtime is quick even if recusion
is neccisary. The board creation was a side thought and could be more robust. I realized that the program was capable of 
solving problems that were ootherwise not possible by a human (such as blank boards and boards with only one slot filled.) 
I used this as an ooppertunity too add a feature. The issue with creating boards in this way is that sudoku is more 
complicated than simply "the more numbers the easier" and an "easy" problem could end up being a "hard" problem. I 
did not use anything but my limited knowledge of sudoku to solve this and I'm sure that there are other techniques 
I could use to make problems easier and solve problems faster. 
