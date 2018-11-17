export function getCardsFromReduxByDeck(deckCards, cards) {
  return deckCards.reduce((prev, curr) => {
    const card = cards.find(item => item.id === curr.id)
    prev.push({ ...card, answered: curr.answered })
    return prev
  }, [])
}
