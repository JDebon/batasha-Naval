var gameState;
var errorSound = new Audio('error.mp3');
var okSound = new Audio('ok.mp3');
var jugando = true;

$(document).ready(startGame);

function startGame() {
    gameState = getInitialState();
    generarBarcos();
    agregarEventos();
}

function agregarEventos() {
    $('#game-grid div').on('click', obtenerPosicion);
}

function obtenerPosicion() {
    var filaFicha = $(this).data('row');
    var columnaFicha = $(this).data('column');
    var event = this;
    var contenidoFicha = obtenerValor(filaFicha, columnaFicha);
    verificarFicha(contenidoFicha, event);
}

function verificarFicha(contenidoFicha, event) {
    if (contenidoFicha === 1) {
        $(event).addClass('ok');
        $(event).off('click');
        playOkSound();
        if (jugando) {
            gameState.successfulMovements++;
            verificarVictoria();
        }
    } else {
        $(event).addClass('error');
        gameState.movementLimit--;
        $(event).off('click');
        playErrorSound();
        if (jugando) {
            $('h3').text('Movimientos Restantes: ' + gameState.movementLimit);
        }
        verificarVictoria();
    }
}

function verificarVictoria() {
    if (gameState.successfulMovements === gameState.successfulMovementsNeeded) {
        alert('Ganaste');
        jugando = false;
        $('.grid div').click();
    } else if (gameState.movementLimit === 0) {
        alert('Perdiste');
        jugando = false;
        $('.grid div').click();
    }
}

function obtenerValor(filaFicha, columnaFicha) {
    var contFicha = gameState.masterGrid[filaFicha][columnaFicha];

    return contFicha;
}

function generarBarcos() {
    for (var i = 0; i <= gameState.successfulMovementsNeeded; i++) {
        var columnaBarco = Math.floor(Math.random() * 10);
        var filaBarco = Math.floor(Math.random() * 10);
        gameState.masterGrid[filaBarco][columnaBarco] = 1;
    }
}

function getInitialState() {
    return {
        masterGrid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        successfulMovements: 0,
        successfulMovementsNeeded: 4,
        movementLimit: 35
    };
}

function playErrorSound() {
    errorSound.play();
}

function playOkSound() {
    okSound.play();
}
