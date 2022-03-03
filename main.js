const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const suits =  ["s", "d", "c", "h"];
let playerDeck, computerDeck;
let playerCard, computerCard;
let gameOver;
const deckEl = document.querySelector(".deck");
const playerSlot = document.querySelector(".player-slot");
const computerSlot = document.querySelector(".computer-slot");
const msg = document.querySelector(".msg");
const computerEl = document.querySelector(".computer");
const playerEl = document.querySelector(".player");
const slot = document.querySelector(".slot");

function getDeck(){
  let deck = new Array();
    for(let i = 0; i < suits.length; i++)
    {
        for(let x = 0; x < values.length; x++)
        {
            if(typeof values[x] == "number"){
                 let card = {value: values[x], card: suits[i] + values[x]};
                 deck.push(card);
            }else {
                if(values[x]==="J"){
                 card = {value: 11, card: suits[i] + values[x] };
                 deck.push(card);
                }else if(values[x] === "Q"){ 
                 card = {value: 12, card: suits[i] + values[x] };
                 deck.push(card);
                }else if(values[x]=== "K"){
                 card = {value: 13, card: suits[i] + values[x] };
                 deck.push(card);
                }else if(values[x]=== "A"){
                 card = {value: 14, card: suits[i] + values[x] };
                 deck.push(card);
                }
            }
        }
    }
 return deck;
}

const newDeck = getDeck();

function shuffle() {
    for (var i = newDeck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newDeck[i];
        newDeck[i] = newDeck[j];
        newDeck[j] = temp;
    }                   
}
	
function init(){
	$("#cards-flip").flip({
	 trigger: 'manual'});
	msg.style.color = "black";
	msg.style.fontSize= "30px";
    shuffle();
    playerDeck = newDeck.slice(0, 26);
    computerDeck = newDeck.slice(26, newDeck.length);
    gameOver = false;
    msg.innerHTML = "";
    playerSlot.innerHTML = "";
    computerSlot.innerHTML = "";
    computerEl.innerText = computerDeck.length;
    playerEl.innerText = playerDeck.length;
    playerSlot.classList.remove("card") ;
    computerSlot.classList.remove("card");

}

function flip(){

    playerCard= playerDeck.shift();
    playerSlot.classList.remove(...playerSlot.classList);
    playerSlot.classList.add("player-slot", "slot", "card","back", playerCard.card);
    computerCard = computerDeck.shift();
    computerSlot.classList.remove(...computerSlot.classList)
    computerSlot.classList.add("computer-slot", "slot", "card","back", computerCard.card);
    computerEl.innerText = computerDeck.length;
    playerEl.innerText = playerDeck.length;
	setTimeout(() =>{
		$("#cards-flip").flip(true);
	}, 500);
	setTimeout(() =>{
		document.addEventListener("click", handleClick)
		isRoundWinner()
	}, 900)
}

function isRoundWinner(){
	
  if(playerCard.value > computerCard.value){
    msg.innerHTML = "Player Won this round";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);

  }else if(playerCard.value < computerCard.value){
    msg.innerHTML = "Computer Won this round";
    computerDeck.push(computerCard);
    computerDeck.push(playerCard);

  }else if (playerCard.value === computerCard.value){
    msg.innerHTML = "WAR, flip the cards again";
    playerCard = playerDeck.splice(playerCard, 3);
    computerCard = computerDeck.splice(computerCard, 3);
       if(playerCard.value > computerCard.value){
            msg.innerHTML = "Player Won this round";
            playerDeck.push(playerCard);
            playerDeck.push(computerCard);
			      computerEl.innerText = computerDeck.length;
            playerEl.innerText = playerDeck.length;
			
        }else if(playerCard.value < computerCard.value){
            msg.innerHTML = "Computer Won this round";
            computerDeck.push(computerCard);
            computerDeck.push(playerCard);
		      	computerEl.innerText = computerDeck.length ;
            playerEl.innerText = playerDeck.length;
          }
  	}
    
  if(playerDeck.length === 0){
	msg.style.color= "red";
	msg.style.fontSize= "50px";
    msg.innerHTML = "Computer Won!";
    gameOver = true;
  }else if(computerDeck.length === 0){
	msg.style.color= "blue";
    msg.innerHTML = "Player Won! 🏆";
	msg.style.fontSize= "50px";
    gameOver = true;
  }

}

function handleClick(){
	document.removeEventListener("click", handleClick);
	$("#cards-flip").flip(false);
	if(gameOver){
		document.addEventListener("click", handleClick)	
		setTimeout(() => {
		   init();
		   return;
		}, 3000);
	}else{
	  flip();
	 }
}

document.addEventListener("click", handleClick);
	
init();
