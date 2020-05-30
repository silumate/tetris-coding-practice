document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartButton = document.querySelector('#start-button')
    const width = 10

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


    const sTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]


    const theTretrominos = [
        pTetromino,
        sTetromino,
        tTetromino,
        oTetromino,
        iTetromino
    ]

    let currentPosition
    let currentRotation
    let current


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
            dropNewTetromino()
        }
    }

    function moveLeft() {
        // if tetromino has a square that is indexed 0, 10, 20, 30... then the tetromino cannot move left.
        const isAtEdge = current.some(index => ((currentPosition + index) % 10) === 0)

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
        const isAtEdge = current.some(index => ((currentPosition + index) % 10) === 9)

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
        random = Math.floor(Math.random() * theTretrominos.length)
        current = theTretrominos[random][0]   
        currentPosition = 4
        currentRotation = 0
        draw()
    }

    function control(event) {
        if (event.keyCode === 37) {
            moveLeft()
        } else if (event.keyCode === 39) {
            moveRight()
        }
    }



    /* ******* script below this line ************* */

    dropNewTetromino()
    
    // move the current tetromino down every second
    let timerID = setInterval(moveDown, 1000)

    document.addEventListener('keydown', control)

})