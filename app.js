document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const nextUpSquares =  document.querySelectorAll('.mini-grid div')  //squares reserved to show next tetromino that will fall.
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    let timerID
    const width = 10
    const nextUpWidth = 4
    let score = 0

    // tetrominos - AKA the Tetris pieces

    /*
                 0 1 2    0 1 2    0 1 2    0 1 2
                |--------------------------------    
            0   |  X X               X      X
        width   |  X      X X X      X      X X X
    2 * width   |  X          X    X X
    */
    const pTetromino = [
        [1, width + 1, 2 * width + 1, 2],
        [width, width + 1, width + 2, 2 * width + 2],
        [1, width + 1, 2 * width, 2 * width + 1],
        [0, width, width + 1, width + 2]
    ]

    /*
                 0 1 2    0 1 2    0 1 2    0 1 2
                |--------------------------------    
            0   |  X               X X          X
        width   |  X      X X X      X      X X X
    2 * width   |  X X    X          X          
    */
   const lTetromino = [
    [1, width + 1, 2 * width + 1, 2 * width + 2],
    [width, width + 1, width + 2, 2 * width],
    [0, 1, width + 1, 2 * width + 1],
    [2, width, width + 1, width + 2]
]


    const sTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    /*
                 0 1 2    0 1 2
                |--------------
            0   |  X      X X
        width   |X X        X X
    2 * width   |X  
    */
    const zTetromino = [
        [1, width, width + 1, 2*width],
        [0, 1, width + 1, width + 2]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]


    const theTretrominos = [
        pTetromino,
        lTetromino,
        sTetromino,
        zTetromino,
        tTetromino,
        oTetromino,
        iTetromino
    ]

    //array of tetorminos without rotations
    const nextTetrominos = [
        [1, nextUpWidth+1, nextUpWidth*2+1, 2], //pTetromino
        [1, nextUpWidth + 1, 2*nextUpWidth + 1, 2* nextUpWidth + 2], //lTetromino
        [0, nextUpWidth, nextUpWidth+1, nextUpWidth*2+1], //sTetromino
        [1, nextUpWidth, nextUpWidth + 1, 2*nextUpWidth], //zTetromino
        [1, nextUpWidth, nextUpWidth+1, nextUpWidth+2], //tTetromino
        [0, 1, nextUpWidth, nextUpWidth+1], //oTetromino
        [1, nextUpWidth+1, nextUpWidth*2+1, nextUpWidth*3+1] //iTetromino
    ]

    let currentPosition
    let currentRotation
    let currentTetrominoIdx
    let current
    let nextTetrominoIdx = Math.floor(Math.random() * theTretrominos.length)


    /* ******* Functions are defined below this line ************* */

    // draw the current tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // hide the current tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }


    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            updateScore()
            dropNewTetromino()
        }
    }

    function moveLeft() {
        // if tetromino has a square that is indexed 0, 10, 20, 30... then the tetromino cannot move left.
        const isAtEdge = current.some(index => ((currentPosition + index) % width) === 0)

        if (!isAtEdge) {
            // if tetromino would occupy a square that is taken, move is impossible
            const isBlocked = current.some(index => squares[currentPosition -1 + index].classList.contains('taken'))

            if (!isBlocked) {
                undraw()
                currentPosition--
                draw()
            }
        }
    }

    function moveRight() {
        // if tetromino has a square that is indexed 9, 19, 29, 39... then the tetromino cannot move left.
        const isAtEdge = current.some(index => ((currentPosition + index) % width) === width - 1)

        if (!isAtEdge) {
            // if tetromino would occupy a square that is taken, move is impossible
            const isBlocked = current.some(index => squares[currentPosition + 1 + index].classList.contains('taken'))

            if (!isBlocked) {
                undraw()
                currentPosition++
                draw()
            }
        }
    }

    // start a new tetromino falling
    function dropNewTetromino() {
        currentPosition = 4
        currentRotation = 0
        currentTetrominoIdx = nextTetrominoIdx
        nextTetrominoIdx = Math.floor(Math.random() * theTretrominos.length)
        current = theTretrominos[currentTetrominoIdx][currentRotation]   
        draw()
        drawMiniGrid()
    }

    // select the next rotation of a tetromino
    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation >= theTretrominos[currentTetrominoIdx].length) {
            currentRotation = 0
        }
        current = theTretrominos[currentTetrominoIdx][currentRotation]
        draw()
    }

    //display next shape in the mini-grid
    function drawMiniGrid() {
        undrawMiniGrid()

        // color the squares in the grid according to the tetromino
        nextTetrominos[nextTetrominoIdx].forEach(index => {
            nextUpSquares[index].classList.add('tetromino')
        })
    }

    //clear out the mini-grid
    function undrawMiniGrid() {
        nextUpSquares.forEach(square => square.classList.remove('tetromino'))
    }

    function control(event) {
        if (event.keyCode === 37) {
            moveLeft()
        } else if (event.keyCode === 38) {
            rotate()
        } else if (event.keyCode === 39) {
            moveRight()
        } else if (event.keyCode === 40) {
            moveDown()
        }
    }

    function startPause() {
        if (timerID) {
            clearInterval(timerID)
            timerID = null
            undraw()
            undrawMiniGrid()
        } else {
            timerID = setInterval(moveDown, 1000)
            draw()
            drawMiniGrid()
        }

    }

    // clear out any completed rows and update score
    function updateScore() {
        for (let i = 0; i < 199; i += width) {
            const row = Array.from(new Array(width), (x,j) => i + j)

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const removedSquares = squares.splice(i, width)
                squares.splice(0, 0, ...removedSquares)
                squares.forEach(cell => grid.appendChild(cell))
                }
        }
    }

    /* ******* script below this line ************* */

    dropNewTetromino()
    
    document.addEventListener('keydown', control)
    startButton.addEventListener('click', startPause)

})