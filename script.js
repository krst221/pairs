let cardArray = [
    {
      id: 1,
      name: "earth",
      img: "assets/img/earth.svg",
    },
    {
      id: 2,
      name: "jupiter",
      img: "assets/img/jupiter.svg",
    },
    {
      id: 3,
      name: "mars",
      img: "assets/img/mars.svg",
    },
    {
      id: 4,
      name: "mercury",
      img: "assets/img/mercury.svg",
    },
    {
      id: 5,
      name: "saturn",
      img: "assets/img/saturn.svg",
    },
    {
      id: 6,
      name: "uranus",
      img: "assets/img/uranus.svg",
    },
    {
      id: 7,
      name: "earth",
      img: "assets/img/earth.svg",
    },
    {
      id: 8,
      name: "jupiter",
      img: "assets/img/jupiter.svg",
    },
    {
      id: 9,
      name: "mars",
      img: "assets/img/mars.svg",
    },
    {
      id: 10,
      name: "mercury",
      img: "assets/img/mercury.svg",
    },
    {
      id: 11,
      name: "saturn",
      img: "assets/img/saturn.svg",
    },
    {
      id: 12,
      name: "uranus",
      img: "assets/img/uranus.svg",
    },
  ];
const score$$ = document.querySelector('[data-function="score"]');
const att$$ = document.querySelector('[data-function="attempts"]'); 
const grid$$ = document.querySelector('[data-function="grid"]');
let cardsFlipped = 0;
let cardIndex = 0;
const shuffleImages = () => {
  let currentIndex = cardArray.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cardArray[currentIndex], cardArray[randomIndex]] = [
      cardArray[randomIndex], cardArray[currentIndex]];
  }
}
const random = () => Math.floor(Math.random()*12 + 1);
const checkMatch = () => {
  if(cardsFlipped == 2) {
    let card1 = 15;
    let card2 = 15;
    for (let i = 0 ; i < cardArray.length ; i++) {
      console.log(grid$$.childNodes[i], grid$$.childNodes[i].src);
      if(grid$$.childNodes[i].src != "http://127.0.0.1:5500/assets/img/universe.svg" && grid$$.childNodes[i].src != "./assets/img/tick.svg" && card1 == 15) card1 = i;
      if(grid$$.childNodes[i].src != "http://127.0.0.1:5500/assets/img/universe.svg" && grid$$.childNodes[i].src != "./assets/img/tick.svg" && card1 != 15 && card2 == 15) card2 = i;
      if(card2 == card1) card2 = 15;
      if(card1 != 15 && card2 != 15) break;
    }
    console.log(card1, card2);
    if(card1 != 15 && card2 != 15) {
      cardsFlipped = 0;
      att$$.textContent++;
      if(grid$$.childNodes[card1].src == grid$$.childNodes[card2].src) {
        grid$$.childNodes[card1].src = "./assets/img/tick.svg";
        let cardCl1 = grid$$.childNodes[card1].cloneNode(true);
        grid$$.replaceChild(cardCl1, grid$$.childNodes[card1]);
        grid$$.childNodes[card1].addEventListener('click', cardFound);
        grid$$.childNodes[card2].src = "./assets/img/tick.svg";
        let cardCl2 = grid$$.childNodes[card2].cloneNode(true);
        grid$$.replaceChild(cardCl2, grid$$.childNodes[card2]);
        grid$$.childNodes[card2].addEventListener('click', cardFound);
        score$$.textContent++;
      }
      else {
        grid$$.childNodes[card1].src = "http://127.0.0.1:5500/assets/img/universe.svg";
        grid$$.childNodes[card2].src = "http://127.0.0.1:5500/assets/img/universe.svg";
      }
      card1 = 15;
      card2 = 15;
      if(score$$.textContent == (cardArray.length / 2)) setTimeout(() => alert ('GAME FINISHED! IT TOOK YOU ' + att$$.textContent + ' ATTEMPTS'), 500);  
    }
  }
}
function sameCard() { 
  alert('YOU CLICKED ON THE SAME CARD');
  cardsFlipped--;
}
function cardFound() { 
  alert('YOU ALREADY FOUND THIS CARD');
}
function rotateCard(card, i) {
  card.src = cardArray[i].img;
  if(i == cardIndex) sameCard();
  cardIndex = i;
  cardsFlipped++;
  if(cardsFlipped == 2) {
    grid$$.classList.add("disable");
    setTimeout(() => grid$$.classList.remove("disable"), 800);
  }
  setTimeout(() => checkMatch(), 800);
}
const drawBoard = () => {
  shuffleImages();
  for (let i = 0 ; i < cardArray.length ; i++) {
    card$$ = document.createElement('img');
    card$$.addEventListener('click', ($event) => rotateCard($event.target, i));
    card$$.src = "http://127.0.0.1:5500/assets/img/universe.svg";
    grid$$.appendChild(card$$);
  }
}
drawBoard();