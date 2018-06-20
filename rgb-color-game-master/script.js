var mode, colors, pickedColor, squares, colorDisplay, messageDisplay, h1, resetButton, modeButton;

mode = 6;
colors = [];

squares = document.querySelectorAll('.square');
colorDisplay = document.getElementById('colorDisplay');
messageDisplay = document.getElementById('message');
h1 = document.querySelector('h1');
resetButton = document.getElementById('reset');
modeButton = document.querySelectorAll('.gameMode');

// MODULE DESIGN PATTERN
//var game = {};
//
//game.init = function(){
//    setUpModeButtons();
//    setUpSquares();
//    reset();
//};
//
//game.init();


function setUpSquares() {
    // SET SQUARE LISTENERS / COLORS / TEXT CONTENT
    for (var i = 0; i < squares.length; i++) {
        // add initial colors to squares - not needed anymore b/c happens in reset called during init function!
        // squares[i].style.background = colors[i];
    
        // when square is clicked, get color of the square
        squares[i].addEventListener('click', function(){
            var colorClicked = this.style.background;
            //console.log(colorClicked, pickedColor);

            // compare the color to the pickedColor
            if(colorClicked === pickedColor) {
                // if equal, display the 'You Win'/game over
                // let user know that they picked the correct color    
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(colorClicked);
                h1.style.background = colorClicked;

            } else {
                 // if not equal, change color of that square to the color of the background
                this.style.background = '#333';

            // let user know that they picked the wrong one    
            messageDisplay.textContent = "Try Again!";
            }
            
        });

    }
}


function setUpModeButtons() {
    // MODE BUTTON EVENTS
    for (var i = 0; i < modeButton.length; i++) {
        modeButton[i].addEventListener('click', function () {
            modeButton[0].classList.remove('active');
            modeButton[1].classList.remove('active');
            this.classList.add('active');

            //        code before refactoring using if statement instead of ternary operator
            //         if (this.textContent === "Easy") {
            //             mode = 3;
            //         } else {
            //             mode = 6;
            //         }
            this.textContent === "Easy" ? mode = 3 : mode = 6;

            reset();

        });

    }
}

function reset(){
    
    // generate all new colors
    colors = generateRandomColor(mode);
    // pick a new random color from the colors array
    pickedColor = pickColor();
    // change color display to match picked color
    colorDisplay.textContent = pickedColor; 
    // change colors of the squares
    for (var i = 0; i < squares.length; i++) {
        // if there's a color to paint from the array
        if(colors[i]) {
            // reshow all the squares before looping
            squares[i].style.display = 'block';
            // paint the square
            squares[i].style.background = colors[i];
        } else {
            // if any squares on easy mode don't have a colore, then don't display
            // colors will be undefined for the array index 3, 4, 5
            squares[i].style.display = 'none';
        }
        
        
        
    }
    // reset the button text
    resetButton.textContent = 'New Colors';
    // reset the background of the h1
    h1.style.background = 'steelblue';
    // clear the message display
    messageDisplay.textContent = ""; 
    
}


// set the content in the HTML to the pickedColor
// removed because this now occurs during the init function
// colorDisplay.textContent = pickedColor;


// code before refactored
//easyBtn.addEventListener('click', function(){
//    easyBtn.classList.add('active');
//    hardBtn.classList.remove('active');
//    mode = 3;
//    colors = generateRandomColor(mode);
//    pickedColor = pickColor();
//    colorDisplay.textContent = pickedColor; 
//
//    
//    for (var i = 0; i < squares.length; i++) {
//        if(colors[i]){
//            squares[i].style.background = colors[i];
//        } else {
//            squares[i].style.display = 'none';
//        }
//    }
//    
//});
//
//
//hardBtn.addEventListener('click', function(){
//    hardBtn.classList.add('active');
//    easyBtn.classList.remove('active');
//    mode = 6;
//    colors = generateRandomColor(mode);
//    pickedColor = pickColor();
//    colorDisplay.textContent = pickedColor; 
//
//    
//    for (var i = 0; i < squares.length; i++) {
//        
//        squares[i].style.background = colors[i];
//
//        squares[i].style.display = 'block';
//    }
//    
//});


resetButton.addEventListener('click', reset);


function changeColors(color) {
    // loop through all squares
    for (var i = 0; i < squares.length; i++){
        // change each color to match the given color
        squares[i].style.background = color; 
    }
}

function pickColor() {
    // pick a random number
    var randomNum = Math.floor(Math.random() * colors.length);

    // use that number to access
    return colors[randomNum];
}


function generateRandomColor(num) {
    
    // make an array 
    var arr = [];
    // add num random colors to array
    // repeated num times
    for(var i = 0; i < num; i++){
        // get random color and push to the array    
        arr.push(randomColor());
        
    }
    
    
    // return that array
    return arr;
}

function randomColor(){
    // pick a red from 0 - 255
    var red = Math.floor(Math.random() * 256);
    
    // pick a green from 0 - 255
    var green = Math.floor(Math.random() * 256);
    
    // pick a blue from 0 - 255
    var blue = Math.floor(Math.random() * 256);
    
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

function init() {

    setUpModeButtons();
    setUpSquares();
    reset();

}


init();
