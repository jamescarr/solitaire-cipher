
describe 'Deck of Cards'
    before_each
      deck = new DeckOfCards();
    end

    it 'should initilize the deck'
      deck.getCard(0).should.eql 1
      deck.getCard(1).should.eql 2
      deck.getCard(52).should.eql 'A'
      deck.getCard(53).should.eql 'B'
    end

    it 'should move cards around'
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);

      deck.getCard(53).should.equal 'A'      
      deck.getCard(1).should.equal 'B'

    end

    it 'should pivot the cards forward'
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);
      
      deck.getCard(2).should.equal 2
    end

    it 'should triple cut the deck based on the jokers'
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);

      deck.tripleCut();

      deck.getCard(0).should.eql 'B'
      deck.getCard(1).should.eql 2
      deck.getCard(52).should.eql 'A'
      deck.getCard(53).should.eql 1
    end

    it 'should perform a count cut based on the bottom card value'
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);
      deck.tripleCut();
      
      deck.countCut();
  
      deck.getCard(0).should.eql 2
      deck.getCard(1).should.eql 3
      deck.getCard(51).should.eql 'A'
      deck.getCard(52).should.eql 'B'
      deck.getCard(53).should.eql 1
    end

    it 'should give output letters based on top of the deck'
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);
      deck.tripleCut();
      
      deck.countCut();
  
      deck.getOutputLetter().should.eql 'D'
    end

    it 'should return empty string for joker' 
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);

      deck.getOutputLetter().should.eql ''
    end
    
    it 'should cycle the alphabet when card value is greater than 26'
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);
      deck.tripleCut();
      deck.countCut();
      
      deck.moveCardDown("A", 1);
      deck.moveCardDown("B", 2);
      deck.tripleCut();
      deck.countCut();

      deck.getOutputLetter().should.eql 'W'
    end
end

describe 'SolitaireCipher'
  it 'should produce keystream values'
    var cipher = new SolitaireCipher();

    cipher.nextKeystreamValue().should.eql 'D'
    cipher.nextKeystreamValue().should.eql 'W'
    cipher.nextKeystreamValue().should.eql 'J'
    cipher.nextKeystreamValue().should.eql ''
    cipher.nextKeystreamValue().should.eql 'X'
    cipher.nextKeystreamValue().should.eql 'H'
    cipher.nextKeystreamValue().should.eql 'Y'
    cipher.nextKeystreamValue().should.eql 'R'
    cipher.nextKeystreamValue().should.eql 'F'
    cipher.nextKeystreamValue().should.eql 'D'
    cipher.nextKeystreamValue().should.eql 'G'
  end
end  
