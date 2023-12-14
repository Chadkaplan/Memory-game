const cards = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
]

let shuffledCards = shuffle(cards)
let selectedCards = []
let matchedPairs = 0

const memoryGameElement = document.getElementById("memoryGame")

shuffledCards.forEach((card, index) => {
  const cardElement = document.createElement("div")
  cardElement.classList.add("card")
  cardElement.dataset.index = index
  cardElement.addEventListener("click", handleCardClick)
  memoryGameElement.appendChild(cardElement)
})

function handleCardClick(event) {
  const clickedCard = event.target
  const index = clickedCard.dataset.index

  if (selectedCards.length < 2 && !selectedCards.includes(index)) {
    // Flip the selected card
    clickedCard.textContent = shuffledCards[index]
    selectedCards.push(index)

    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards

      if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
        // Match found
        matchedPairs++
        if (matchedPairs === cards.length / 2) {
          alert("Congratulations! You matched all pairs.")
        }
      } else {
        // No match, flip the cards back
        setTimeout(() => {
          document.querySelector(`[data-index="${firstIndex}"]`).textContent =
            ""
          document.querySelector(`[data-index="${secondIndex}"]`).textContent =
            ""
        }, 1000)
      }

      // Clear selected cards for the next turn
      selectedCards = []
    }
  }
}

//  Shuffling cards with algorithm from internet
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
