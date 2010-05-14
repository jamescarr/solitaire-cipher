function DeckOfCards() {
  var LAST_CARD_INDEX = 53;
  var STARTING_CHARACTER_CODE = 64;


  var deck = [];
  for(var i = 1; i <= 52; i++) { deck.push(i); }
  deck.push('A');
  deck.push('B');

  var getCardIndex = function(card){
   for(var i =0; i < deck.length; i++){
      if(deck[i] == card){
        return i;
      }
    }
    return -1;
  }

  var getPositionToMoveTo = function(cardIndex, shift_value){
    var positionToMoveTo = -1

    positionToMoveTo = cardIndex+shift_value;
    if(positionToMoveTo >= LAST_CARD_INDEX+1){
      positionToMoveTo = positionToMoveTo - (LAST_CARD_INDEX+1) + 1;
    }
    return positionToMoveTo;
  }

  var getCardValue = function(value) {
    return isNaN(value) ? 53 : value;
  }

  this.moveCardDown = function(card, shift_value) {
    var cardIndex = getCardIndex(card);
    var positionToMoveTo = getPositionToMoveTo(cardIndex, shift_value);

    deck = deck.slice(0, cardIndex).concat(deck.slice(cardIndex + 1))
    temp_deck = deck.slice(0, positionToMoveTo)
    temp_deck.push(card)
    deck = temp_deck.concat(deck.slice(positionToMoveTo))
  }

  this.getCard = function(index) {
    return deck[index];
  }

  this.tripleCut = function(){
    var jokerA = getCardIndex('A');
    var jokerB = getCardIndex('B');
            
    var firstJoker = Math.min(jokerA, jokerB);
    var secondJoker = Math.max(jokerA, jokerB);
    
    deck = deck.slice(secondJoker + 1).concat(deck.slice(firstJoker, secondJoker + 1), deck.slice(0, firstJoker))
  }

  this.countCut = function() {
    var cutCount = deck[LAST_CARD_INDEX];
    var topSection = deck.slice(0, cutCount);
    deck = deck.slice(cutCount, LAST_CARD_INDEX).concat(topSection);
    deck.push(cutCount);
  }

  this.getOutputLetter = function() {
    var chosenCardValue = deck[getCardValue(deck[0])];
    return !isNaN(chosenCardValue) ? String.fromCharCode(STARTING_CHARACTER_CODE + ((chosenCardValue - 1) % 26) + 1) : '';
  }
}


function SolitaireCipher(){
  var deck = new DeckOfCards();
  this.nextKeystreamValue = function(){
    deck.moveCardDown("A", 1);
    deck.moveCardDown("B", 2);
    deck.tripleCut();
    deck.countCut();
    return deck.getOutputLetter();
  }
}
