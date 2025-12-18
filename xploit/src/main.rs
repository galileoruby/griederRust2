use core::num;

use rand::{rng, seq::SliceRandom};

#[derive(Debug)]
struct Deck {
    cards: Vec<String>,
}

impl Deck {
    fn new() -> Self {
        let suits = vec!["Hearts", "Spades", "Diamonds"];
        let values = vec!["Ace", "Two", "Three"];

        let mut cards = Vec::new();

        for suit in &suits {
            for value in &values {
                let _card = format!("{} of {}", value, suit);

                cards.push(_card);
            }
        }

        // return Deck { cards };
        // return deck;

        //implicit return
        Deck { cards }
    }

    
    fn shuffle(&mut self) {
        let mut rng = rng();

        self.cards.shuffle(&mut rng);
    }

    fn deal(&mut self, num_cards: usize) -> Vec<String> {
        self.cards.split_off(self.cards.len() - num_cards)
    }
}

fn main() {
    let mut deck = Deck::new();
    println!("initial deck: {:#?}", deck);

    // deck.shuffle();
    // println!("here is your deck: {:#?}", deck);

    let cards = deck.deal(4);
    println!("deal deck: {:#?}", cards);
}
