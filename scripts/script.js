const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame() {
    initializeCards(game.createCardsFromTechs())
}

function initializeCards(cards) {
    let gameBoard = document.getElementsByClassName("gameBoard")[0]

    game.cards.forEach((card) => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)

    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = `./assets/images/${card.icon}.png`
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt;/&gt;"
    }

    element.appendChild(cardElementFace)
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip")

    if (game.secondCard) {
        let firstCardView = document.getElementById(game.firstCard.id)
        let secondCardView = document.getElementById(game.secondCard.id)

        if (game.checkMatch()) {
            firstCardView.classList.add("pair")
            secondCardView.classList.add("pair")
            game.clearCards()
            
            if (game.checkGameOver()) {
                let gameOverLayer = document.getElementsByClassName("gameOver")[0]
                gameOverLayer.style.display = "flex"
                }
        } else {
            setTimeout(() => {
                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")

                game.unflipCards()
            }, 1000)
        }
    }
    }
}
