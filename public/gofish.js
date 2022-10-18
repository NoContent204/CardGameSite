/*
* Create new create server page for go fish, means I can customise what the server hold on the game
* don't have to store fields to do with poker and can have extra fields for go fish that poker won't use
* When a player gets a set just remove those cards from their hand and increment their number of sets and 
* display this on the page so other users can see
* ammend joinserver.js to account for go fish
*
*/



//create database reference
var db = firebase.firestore();
var action="";
var roundtype="";
var newroundtype="";
var playerListener;
var gameListener;
var indexInArray;
var YourTurn;
var ranktoCheck="";

var auth = firebase.auth();
auth.signInAnonymously();


const username = sessionStorage.username;
const ServerName =sessionStorage.ServerName;
var Players =  JSON.parse(sessionStorage.getItem("Players"));
//var Players = ["Player1","Player2"];
var jsonVariable ={};
var Postions=[];

//Tell the library which element to use for the table
cards.init({table:'#card-table'});

//Create a new deck of cards
deck = new cards.Deck();
deck.addCards(cards.all);
//By default it's in the middle of the container, put it slightly to the side
deck.x += 50;
deck.y +=120;

//cards.all contains all cards, put them all in the deck
//deck.addCards(cards.all);
//No animation here, just get the deck onto the table.
deck.render({immediate:true});
//Now lets create a couple of hands
topmiddle = new cards.Hand({faceUp:false, y:90, x:350}); //top middle hand
yourHand = new cards.Hand({faceUp:true, y:620,x:350}); //bottom middle hand
bottomleft = new cards.Hand({faceUp:false, y:620, x:70}); //bottom left hand
bottomright = new cards.Hand({faceUp:false, y:620, x:630}); // bottom right hand
topleft = new cards.Hand({faceUp:false, y:90, x:70}); //top left hand
topright = new cards.Hand({faceUp:false, y:90, x:630}); //top right hand
centerleft = new cards.Hand({faceUp:false, y:350, x:70}); //center left hand
centerright = new cards.Hand({faceUp:false, y:350, x:630}); //center right hand


var InstructionLabel=document.getElementById("Instructions")
InstructionLabel.style.visibility="hidden";


var ChipsLabel = document.getElementById("PlayerChipsBottomLeft");
var PlayerLabel = document.getElementById("PlayerNameBottomLeft");
var ActionLabel = document.getElementById("PlayerActionBottomLeft");
jsonVariable = {NameElement:PlayerLabel,ChipElement:ChipsLabel,ActionElement:ActionLabel,Hand:bottomleft};
Postions.push(jsonVariable);

var ChipsLabel = document.getElementById("PlayerChipsMiddleLeft");
var PlayerLabel = document.getElementById("PlayerNameMiddleLeft");
var ActionLabel = document.getElementById("PlayerActionMiddleLeft");
jsonVariable = {NameElement:PlayerLabel,ChipElement:ChipsLabel,ActionElement:ActionLabel,Hand:centerleft};
Postions.push(jsonVariable);

var ChipsLabel = document.getElementById("PlayerChipsTopLeft");
var PlayerLabel = document.getElementById("PlayerNameTopLeft");
var ActionLabel = document.getElementById("PlayerActionTopLeft");
jsonVariable = {NameElement:PlayerLabel,ChipElement:ChipsLabel,ActionElement:ActionLabel,Hand:topleft};
Postions.push(jsonVariable);

var ChipsLabel = document.getElementById("PlayerChipsTopMiddle");
var PlayerLabel = document.getElementById("PlayerNameTopMiddle");
var ActionLabel = document.getElementById("PlayerActionTopMiddle");
jsonVariable = {NameElement:PlayerLabel,ChipElement:ChipsLabel,ActionElement:ActionLabel,Hand:topmiddle};
Postions.push(jsonVariable);

var ChipsLabel = document.getElementById("PlayerChipsTopRight");
var PlayerLabel = document.getElementById("PlayerNameTopRight");
var ActionLabel = document.getElementById("PlayerActionTopRight");
jsonVariable = {NameElement:PlayerLabel,ChipElement:ChipsLabel,ActionElement:ActionLabel,Hand:topright};
Postions.push(jsonVariable);

var ChipsLabel = document.getElementById("PlayerChipsMiddleRight");
var PlayerLabel = document.getElementById("PlayerNameMiddleRight");
var ActionLabel = document.getElementById("PlayerActionMiddleRight");
jsonVariable = {NameElement:PlayerLabel,ChipElement:ChipsLabel,ActionElement:ActionLabel,Hand:centerright};
Postions.push(jsonVariable);

var ChipsLabel = document.getElementById("PlayerChipsBottomRight");
var PlayerLabel = document.getElementById("PlayerNameBottomRight");
var ActionLabel = document.getElementById("PlayerActionBottomRight");
jsonVariable = {NameElement:PlayerLabel,ChipElement:ChipsLabel,ActionElement:ActionLabel,Hand:bottomright};
Postions.push(jsonVariable);

var x=0;
for (var i=Players.length-1;i<Postions.length;i++){
Postions[i].ChipElement.style.visibility="hidden";
Postions[i].NameElement.style.visibility="hidden";
Postions[i].ActionElement.style.visibility="hidden";
}
Postions.splice(Players.length-1,Postions.length-Players.length);


//for (var i=0;i<Players.length;i++){
//if (Players[i] == username) {

    Players.find(function(item,i){
        if (item == username){
            indexInArray = i;
        }
    });
    var yourindex = indexInArray;

    var ChipsLabel = document.getElementById("PlayerChipsBottomMiddle");
    jsonVariable = {Name:username, NameElement:"N/A",ChipElement:ChipsLabel,ActionElement:"N/A",Hand:yourHand};
    Players[indexInArray] = jsonVariable;
    var YourName = document.getElementById("PlayerNameBottomMiddle");
    YourName.innerHTML=username;
    //continue;
//}


for (var i=indexInArray+1;i<Players.length;i++){
    jsonVariable=Postions[x];
    jsonVariable["Name"]=Players[i];
    Players[i]=jsonVariable;
    Players[i].NameElement.innerHTML=Players[i].Name;
    x++;
}
if(indexInArray!=0){
    for (var i=0;i<indexInArray;i++){
        jsonVariable=Postions[x];
        jsonVariable["Name"]=Players[i];
        Players[i]=jsonVariable;
        Players[i].NameElement.innerHTML=Players[i].Name;
        x++;
    }
}

// var PlayerLabel = document.getElementById("PlayerNameBottomLeft");
// var ActionLabel = document.getElementById("PlayerActionBottomLeft");
// jsonVariable = {NameElement:PlayerLabel,ActionElement:ActionLabel,Hand:bottomleft};
// Postions.push(jsonVariable);


// var PlayerLabel = document.getElementById("PlayerNameMiddleLeft");
// var ActionLabel = document.getElementById("PlayerActionMiddleLeft");
// jsonVariable = {NameElement:PlayerLabel,ActionElement:ActionLabel,Hand:centerleft};
// Postions.push(jsonVariable);

// var PlayerLabel = document.getElementById("PlayerNameTopLeft");
// var ActionLabel = document.getElementById("PlayerActionTopLeft");
// jsonVariable = {NameElement:PlayerLabel,ActionElement:ActionLabel,Hand:topleft};
// Postions.push(jsonVariable);

// var PlayerLabel = document.getElementById("PlayerNameTopMiddle");
// var ActionLabel = document.getElementById("PlayerActionTopMiddle");
// jsonVariable = {NameElement:PlayerLabel,ActionElement:ActionLabel,Hand:topmiddle};
// Postions.push(jsonVariable);

// var PlayerLabel = document.getElementById("PlayerNameTopRight");
// var ActionLabel = document.getElementById("PlayerActionTopRight");
// jsonVariable = {NameElement:PlayerLabel,ActionElement:ActionLabel,Hand:topright};
// Postions.push(jsonVariable);

// var PlayerLabel = document.getElementById("PlayerNameMiddleRight");
// var ActionLabel = document.getElementById("PlayerActionMiddleRight");
// jsonVariable = {NameElement:PlayerLabel,ActionElement:ActionLabel,Hand:centerright};
// Postions.push(jsonVariable);

// var PlayerLabel = document.getElementById("PlayerNameBottomRight");
// var ActionLabel = document.getElementById("PlayerActionBottomRight");
// jsonVariable = {NameElement:PlayerLabel,ActionElement:ActionLabel,Hand:bottomright};
// Postions.push(jsonVariable);

// var x=0;
// for (var i=Players.length-1;i<Postions.length;i++){
// 	Postions[i].NameElement.style.visibility="hidden";
// 	Postions[i].ActionElement.style.visibility="hidden";
// }
// Postions.splice(Players.length-1,Postions.length-Players.length);

// Players.find(function(item,i){
//     if (item == username){
//         indexInArray = i;
//     }
// });

// jsonVariable = {Name:username, NameElement:"N/A",ActionElement:"N/A",Hand:yourHand};
// Players[indexInArray] = jsonVariable;
// var YourName = document.getElementById("PlayerNameBottomMiddle");
// YourName.innerHTML=username;

	

// for (var i=indexInArray+1;i<Players.length;i++){
//     jsonVariable=Postions[x];
//     jsonVariable["Name"]=Players[i];
//     Players[i]=jsonVariable;
//     Players[i].NameElement.innerHTML=Players[i].Name;
//     x++;
// }
// if(indexInArray!=0){
//     for (var i=0;i<indexInArray;i++){
//         jsonVariable=Postions[x];
//         jsonVariable["Name"]=Players[i];
//         Players[i]=jsonVariable;
//         Players[i].NameElement.innerHTML=Players[i].Name;
//         x++;
//     }
// }
// 

document.title = document.title +"-"+ServerName;
alert(username+ " go fish beta v1.2.17");

UpdateDB = function(nextPlayer, endGame){
    if (endGame) {
		var tempDeck = new cards.Deck();
		tempDeck.addCards(cards.all);
		cards.shuffle(tempDeck);
	  var deckToPass = [];
	  for (var i=0;i<tempDeck.length;i++){
	    deckToPass.push(tempDeck[i].name);
	  }
		for (var i = 0; i < Players.length; i++) {
			db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(Players[i].Name).set({
				HandArray:[],
                MostRecentAction:"",
                NumOfSets:0,
			},{merge:true});
		}

		setTimeout(() => { db.collection("Games").doc(ServerName).set({
			CurrentPlayerTurn:nextPlayer,
			RoundType:newroundtype,
			Deck:deckToPass,
		},{merge:true}); },3000);

	}else{
        var deckToPass =[];
        var handToPass =[];
		for (var i=0;i<deck.length;i++){
	        deckToPass.push(deck[i].name);
	    }
		Players.find(function(item,i){
			if (item.Name == username){
				indexInArray = i;
			}
		});
		for (var i=0;i<yourHand.length;i++){
			handToPass.push(Players[indexInArray].Hand[i].name);
        }
        setTimeout(() => { db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(username).set({
            MostRecentAction:action,
            HandArray:handToPass,
        },{merge:true}); }, 2000);

        setTimeout(() => { db.collection("Games").doc(ServerName).set({
			CurrentPlayerTurn:nextPlayer,
            Deck:deckToPass,
            RoundType:newroundtype,
		},{merge:true}); },3000);
    }



}

DealYourHand = function (){
	deck.deal(5,[Players[indexInArray].Hand],100,function(){
		deck.render();
	});
}


EndTurn = function(){
    newroundtype=roundtype;
	Players.find(function(item,i){
		if (item.Name == username){
			indexInArray = i;
		}
	});
    var nextPlayer = Players[indexInArray].Name;
    db.collection("Games").doc(ServerName).collection("PlayerDetails").get().then(function(collection){
        do{
            var hasNoCards=false;
            Players.find(function(item,i){
				if (item.Name == nextPlayer){
					indexInArray = i;
				}
			});
			if (indexInArray==Players.length-1){
                nextPlayer = Players[0].Name;
                collection.forEach(function(doc){
                    if ((doc.data().Name==nextPlayer)&&(doc.data().HandArray.length=0)){
                        hasNoCards=true;
                    }
                });
            }else{
                nextPlayer = Players[indexInArray+1].Name;
                collection.forEach(function(doc){
                    if ((doc.data().Name==nextPlayer)&&(doc.data().HandArray.length=0)){
                        hasNoCards=true;
                    }
                });
            }

        }while(hasNoCards)
        if (roundtype=="deal"){
            DealYourHand();
            if (nextPlayer==Players[0].Name){
                newroundtype="play";
            }
        }

        if (nextPlayer==username){
            setTimeout(()=> {UpdateDB(nextPlayer,true)});
        }else{
            setTimeout(() => {UpdateDB(nextPlayer,false)}, 500);
        }
    });
}




getGameUpdates = function(){
    gameListener = db.collection("Games").doc(ServerName).onSnapshot(function(doc){
        var docData = doc.data();
        if (docData.Active){
            roundtype = docData.RoundType;
            if (docData.CurrentPlayerTurn == username){
                YourTurn = true;
                if (docData.RoundType=="deal"){
                    EndTurn();
                }else{
                    var InstructionLabel = document.getElementById("Instructions");
                    InstructionLabel.style.visibility="visible";
                }
            }else{
                YourTurn = false
                var InstructionLabel = document.getElementById("Instructions");
                InstructionLabel.style.visibility="hidden";
            }

            for (var i=deck.length;i>-1;i--){ //clears client deck ready for update
				deck.removeCard(deck[i]);
			}
			for (var i=0; i<docData.Deck.length;i++){ //updates clients deck
				var cardtoAdd = cards.all.find(function(item){
					if (item.name == docData.Deck[i]){
						return item;
					}
				});
				deck.addCard(cardtoAdd);
            }
            
            var waitingForLabel = document.getElementById("WaitingFor");
			if (YourTurn){
				waitingForLabel.innerHTML = "Your Turn";
			} else {
				waitingForLabel.innerHTML = "Waiting for "+docData.CurrentPlayerTurn+"..."
            }
            roundtype = docData.RoundType;

        }else{
            setTimeout(() => {document.location="index.html"}, 500);
        }
    });
}


getPlayerUpdates = function () { //works!
	for (var i = 0; i < Players.length; i++) {
		playerListener=db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(Players[i].Name).onSnapshot(function (doc){
			console.log(doc.data().Name, "was updated");
			Players.find(function(item,i){
				if (item.Name == doc.data().Name){
					indexInArray = i;
				}
			});
			if (doc.data().Name == username){
                if ((!YourTurn) && (doc.data().MostRecentAction!="Go Fish")){
                    for (var i=Players[indexInArray].Hand.length;i>-1;i--){ //clear your own hand
                        Players[indexInArray].Hand.removeCard(Players[indexInArray].Hand[i]);
                    }
                    for (var i=0; i<doc.data().HandArray.length;i++){ //update your own hand
                        var cardtoAdd = cards.all.find(function(item){
                            if (item.name == doc.data().HandArray[i]){
                                return item;
                            }
                        });
                        Players[indexInArray].Hand.addCard(cardtoAdd);
                        Players[indexInArray].Hand.render();
                    }
                }
                Players[indexInArray].ChipElement.innerHTML="Your Sets = "+doc.data().NumOfSets;
			}else {
					Players[indexInArray].ActionElement.style.visibility="visible";
                    Players[indexInArray].ActionElement.innerHTML=doc.data().MostRecentAction;
                    Players[indexInArray].ChipElement.innerHTML="Sets = "+doc.data().NumOfSets;
					setTimeout(function(){Players[indexInArray].ActionElement.style.visibility="hidden";},5000);
					for (var i=Players[indexInArray].Hand.length; i>-1;i--){ //clear other players hands ready for update
						Players[indexInArray].Hand.removeCard(Players[indexInArray].Hand[i]);
					}
					for (var i=0;i<doc.data().HandArray.length;i++){ //updates players hands
						var cardtoAdd = cards.all.find(function(item){
							if (item.name==doc.data().HandArray[i]){
								return item;
							}
						});
						Players[indexInArray].Hand.addCard(cardtoAdd);
						Players[indexInArray].Hand.render();
					}
			}

			//display user action for short period
			//update chips on display

		});
	}
}

setTimeout(() => {  getGameUpdates(); }, 2000);
setTimeout(() => {  getPlayerUpdates(); }, 2000);

GetStringRank = function(rank){
    switch (rank){
        case "1":
            return "Aces";
        case "2":
            return "Twos";
        case "3":
            return "Threes";
        case "4": 
            return "Fours";
        case "5":
            return "Fives";
        case "6":
            return "Sixes";
        case "7":
            return "Sevens";
        case "8":
            return "Eights";
        case "9":
            return "Nines";
        case "10":
            return "Tens";
        case "11":
            return "Jacks";
        case "12":
            return "Queens";
        case "13":
            return "Kings";
            
    }
}

function RemoveCardfromHand(card){
    db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(username).update({
        HandArray: firebase.firestore.FieldValue.arrayRemove(card)
    });
}


function CheckForSets(playerToAsk,Orginalrank){
    //db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(username).get().then(function(doc){
        //var playerData = doc.data();
        //var playerHand = playerData.HandArray;
        var playerHand = yourHand;
        var NumOfRank =0;
        for (var i=0;i<playerHand.length;i++){
            if ((playerHand[i].name.includes(ranktoCheck))&&(playerHand[i].name.length==ranktoCheck.length+1)){ //checks if player has a set
                NumOfRank++;  // temp note: need to make sure rank 1 (ace) not confused with rank 10 because 10 conatains 1 above should fix it,add to other places that need it
            }
        }
        if (NumOfRank==4){
            for (var i=0;i<playerHand.length;i++){
                if((playerHand[i].name.includes(ranktoCheck))&&(playerHand[i].name.length==ranktoCheck.length+1)){ //removes cards of that rank if they have a set
                    //RemoveCardfromHand(playerHand[i].name)
                    var cardtoRemove = cards.all.find(function(item){
                        if (item.name==playerHand[i].name){
                            return item;
                        }
                    });
                    yourHand.removeCard(cardtoRemove);
                    i--;
                    

                }
            }
            yourHand.render();
        }
        var InstructionLabel = document.getElementById("Instructions");
        InstructionLabel.style.visibility="hidden";
        action = playerToAsk + " do you have any "+GetStringRank(Orginalrank)+"?";
        setTimeout(() => {  EndTurn(); }, 1000);        
    //});
}

function CheckOtherPlayersHandEtc(rank,playerToAsk){
    db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(playerToAsk).get().then(function(doc){
        var Orginalrank = rank;
        var playerData = doc.data();
        var playerHand = playerData.HandArray;
        var playerHasCards = false;
        for (var i=0;i<playerHand.length;i++){
            if ((playerHand[i].includes(rank))&&(playerHand[i].length==rank.length+1)){
                playerHasCards = true;
                //some how move cards from one players hand to another both in database and client 
                //function that updates your own cards when they change in the database(in getplayerupdates function)
                db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(playerToAsk).update({
                    HandArray: firebase.firestore.FieldValue.arrayRemove(playerHand[i])
                });
                db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(username).update({
                    HandArray: firebase.firestore.FieldValue.arrayUnion(playerHand[i])
                });
                var cardtoAdd = cards.all.find(function(item){
                    if (item.name==playerHand[i]){
                        return item;
                    }
                });
                yourHand.addCard(cardtoAdd);
            }// end of if
        }//end of for
        if (!playerHasCards){
            db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(playerToAsk).set({
                MostRecentAction:"Go Fish",
            },{merge:true});
            rank = deck.topCard().name.substring(1);
            yourHand.addCard(deck.topCard());
        }
        yourHand.render();
        ranktoCheck = rank
        setTimeout(() => { CheckForSets(playerToAsk,Orginalrank);},2000);
    }); //end of database reference

}

yourHand.click(function(card){
	if (YourTurn){
        var Orginalrank = card.name.substring(1); // gets rank of card
        var rank = Orginalrank;
        var playerExists = true;
        var playerToAsk = prompt("Enter username of player you would like to ask","");
        do{
            if (!playerExists){
                var playerToAsk = prompt("Player does not exist. Try again","");
            }
            db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(playerToAsk).get().then(docSnapshot=>{
                if (docSnapshot && docSnapshot.exists){
                    playerExists = true;     
                }else{
                    playerExists = false;
                }
            });
        }while(!playerExists);

        CheckOtherPlayersHandEtc(rank,playerToAsk)

        
        
        
        
	}// end of if
});// end of function