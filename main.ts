// Prüfen, ob die Schlange sich selbst berührt
function schlangenKollision (x: number, y: number) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].get(LedSpriteProperty.X) == x && snake[i].get(LedSpriteProperty.Y) == y) {
            return true
        }
    }
return false
}
/**
 * 0 = oben, 1 = rechts, 2 = unten, 3 = links
 */
// Snake initialisieren
function snakeInitialisieren () {
    snake = []
    // Startposition der Schlange
    snake.push(game.createSprite(2, 2))
    gameOver = false
    // Schlange startet nach rechts
    richtung = 1
    // Essen erscheint
    spawnEssen()
}
// Steuerung der Schlange
input.onButtonPressed(Button.A, function () {
    if (richtung != 1) {
        // links
        richtung = 3
    }
})
input.onButtonPressed(Button.AB, function () {
    if (richtung != 0) {
        // unten
        richtung = 2
    }
})
input.onButtonPressed(Button.B, function () {
    if (richtung != 3) {
        // rechts
        richtung = 1
    }
})
// Schlange bewegen
function bewegeSchlange () {
    if (gameOver) {
        return
    }
    kopf = snake[0]
    neueX = kopf.get(LedSpriteProperty.X)
    neueY = kopf.get(LedSpriteProperty.Y)
    // Neue Position der Schlange basierend auf der Richtung
    if (richtung == 0) {
        // nach oben
        neueY += 0 - 1
    } else if (richtung == 1) {
        // nach rechts
        neueX += 1
    } else if (richtung == 2) {
        // nach unten
        neueY += 1
    } else if (richtung == 3) {
        // nach links
        neueX += 0 - 1
    }
    // Prüfen, ob die Schlange den Rand berührt oder sich selbst
    if (neueX < 0 || neueX > 4 || neueY < 0 || neueY > 4 || schlangenKollision(neueX, neueY)) {
        gameOver = true
        basic.showString("Game Over")
        return
    }
    // Neue Position für den Kopf der Schlange
    neuesKopf = game.createSprite(neueX, neueY)
    // Kopf an den Anfang der Liste hinzufügen
    snake.unshift(neuesKopf)
    // Wenn die Schlange das Essen frisst
    if (neueX == essen.get(LedSpriteProperty.X) && neueY == essen.get(LedSpriteProperty.Y)) {
        essen.delete()
        // Neues Essen spawnen
        spawnEssen()
    } else {
        // Wenn die Schlange nicht wächst, das letzte Segment entfernen
        schwanz = snake.pop()
        schwanz.delete()
    }
}
// Essen zufällig spawnen
function spawnEssen () {
    x = Math.randomRange(0, 4)
    y = Math.randomRange(0, 4)
    essen = game.createSprite(x, y)
}
let schwanz: game.LedSprite = null
let essen: game.LedSprite = null
let neuesKopf: game.LedSprite = null
let neueY = 0
let neueX = 0
let kopf: game.LedSprite = null
let richtung = 0
let gameOver = false
let snake: game.LedSprite[] = []
let x = 0
let y = 0
// Spiel starten
snakeInitialisieren()
basic.forever(function () {
    if (!(gameOver)) {
        bewegeSchlange()
        // Geschwindigkeit der Schlange
        basic.pause(500)
    }
})
