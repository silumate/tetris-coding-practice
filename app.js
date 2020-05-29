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


    const zTetromino = [
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
        zTetromino,
        tTetromino,
        oTetromino,
        iTetromino
    ]

    let currentPosition = 4
    let currentRotation = 0

    let random = Math.floor(Math.random() * theTretrominos.length)

    let current = theTretrominos[random][currentRotation]

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    draw()

})