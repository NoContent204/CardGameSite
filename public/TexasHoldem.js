//creates database reference
var db = firebase.firestore();
var action = "";
var noOfChipsExchanged=0;
var roundtype="";
var newroundtype="";
var playerListener;
var gameListener;
var indexInArray;
var YourTurn;
var winner;

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
//By default it's in the middle of the container, put it slightly to the side
deck.x -= 50;
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

CommunityCard1 = new cards.Hand({faceUp:true,y:210,x:220});
CommunityCard2 = new cards.Hand({faceUp:true,y:210,x:290});
CommunityCard3 = new cards.Hand({faceUp:true,y:210,x:360});
CommunityCard4 = new cards.Hand({faceUp:true,y:210,x:430});
CommunityCard5 = new cards.Hand({faceUp:true,y:210,x:500});



//Lets add a discard pile
// discardPile = new cards.Deck({faceUp:false});
// discardPile.x += 50;
// discardPile.y +=100;
// var selectArray =[];

/*
create postion array then hide the stuff that's not needed then get cut the redundent stuff from the array then:
	based on players position in player array, assign the other players the positions
	
*/

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
	 
//}
// 	jsonVariable = Postions[0];
// 	jsonVariable["Name"] = Players[i];
// 	Players[i]=jsonVariable;
// 	Players[i].NameElement.innerHTML=Players[i].Name;
// 	Postions.splice(0,1);
// 	//x++;
// }
// for (var i=0;i<Postions.length;i++){
// 	Postions[i].ChipElement.style.visibility="hidden";
// 	Postions[i].NameElement.style.visibility="hidden";
// 	Postions[i].ActionElement.style.visibility="hidden";
// }




document.title = document.title +"-"+ServerName;
alert(username+ " version 1.7");



UpdateDB = function (nextPlayer,raiseby,raisePlayer){
	if (roundtype=="end" && nextPlayer==Players[0].Name) {

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
			},{merge:true});
		}


		setTimeout(() => { db.collection("Games").doc(ServerName).set({
			CurrentPlayerTurn:nextPlayer,
			RoundType:newroundtype,
			Pot:0,
			Deck:deckToPass,
			DiscardPile:[],
			CurrentRaise:0,
            PlayerThatRaised:"",
            Community1:"",
            Community2:"",
            Community3:"",
            Community4:"",
            Community5:"",


		},{merge:true}); },3000);

	} else {

		if (typeof raiseby == "undefined"){
			raiseby = 0;//may need to be an increment
		}else {
			raiseby = firebase.firestore.FieldValue.increment(raiseby);
		}
		if (typeof raisePlayer == "undefined"){
			raisePlayer="";
		}


		var potIncrease = firebase.firestore.FieldValue.increment(noOfChipsExchanged);
		var deckToPass =[];
		var discardToPass =[];
		var handToPass =[];
		for (var i=0;i<deck.length;i++){
	    deckToPass.push(deck[i].name);
	  }
	// 	for (var i=0;i<discardPile.length;i++){
	//     discardToPass.push(discardPile[i].name);
	//   }
		Players.find(function(item,i){
			if (item.Name == username){
				indexInArray = i;
			}
		});
		for (var i=0;i<yourHand.length;i++){
			handToPass.push(Players[indexInArray].Hand[i].name);
		}



		var chipDecrease = firebase.firestore.FieldValue.increment(-Math.abs(noOfChipsExchanged));
		setTimeout(() => {  	db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(username).set({
				MostRecentAction:action,
				Chips:chipDecrease,
				HandArray:handToPass,

			},{merge:true}); }, 500);


        if (typeof CommunityCard1[0]== "undefined"){
            var CCard1="";
        } else{
            var CCard1 = CommunityCard1[0].name;
        }
        if (typeof CommunityCard2[0]== "undefined"){
            var CCard2="";
        }else{
            var CCard2 = CommunityCard2[0].name;
        }
        if (typeof CommunityCard3[0]== "undefined"){
            var CCard3="";
        }else{
            var CCard3 = CommunityCard3[0].name;
        }
        if (typeof CommunityCard4[0]== "undefined"){
            var CCard4="";
        }else{
            var CCard4 = CommunityCard4[0].name;
        }
        if (typeof CommunityCard5[0]== "undefined"){
            var CCard5="";
        }else{
            var CCard5 = CommunityCard5[0].name;
        }
            
		setTimeout(() => { db.collection("Games").doc(ServerName).set({
			CurrentPlayerTurn:nextPlayer,
			RoundType:newroundtype,
			Pot:potIncrease,
			Deck:deckToPass,
			DiscardPile:[],//discardToPass,
			CurrentRaise:raiseby,
            PlayerThatRaised:raisePlayer, //don't update if null
            Community1:CCard1,
            Community2:CCard2,
            Community3:CCard3,
            Community4:CCard4,
            Community5:CCard5,

		},{merge:true}); },3000);
	}

	noOfChipsExchanged = 0;


	//update deck (if necessary)
	//update discardPile (if necessary)
	//update hand (if necessary)
	//update pot  (if necessary) //using increment
	//update chips(if necessary) //using decrement and maybe increment (when user wins the pot)
	//update MostRecentAction
	//update RoundType (if necessary)

}


DealYourHand = function (){
	deck.deal(2,[Players[indexInArray].Hand],100,function(){
		deck.render();
	});
}

EndTurn = function (){
	// hide buttons
	document.getElementById("Check").style.visibility="hidden";
	document.getElementById("Fold").style.visibility="hidden";
	document.getElementById("Raise").style.visibility="hidden";
	document.getElementById("Call").style.visibility="hidden";
	// document.getElementById("Swap").style.visibility="hidden";
	// document.getElementById("EndTurn").style.visibility="hidden";

	newroundtype=roundtype;
	Players.find(function(item,i){
		if (item.Name == username){
			indexInArray = i;
		}
	});
	var nextPlayer = Players[indexInArray].Name;
	db.collection("Games").doc(ServerName).collection("PlayerDetails").get().then(function(collection){
		do {
			var hasFolded = false;
			Players.find(function(item,i){
				if (item.Name == nextPlayer){
					indexInArray = i;
				}
			});
			if (indexInArray==Players.length-1){
				nextPlayer = Players[0].Name;
				if ((roundtype!="end")&&(roundtype!="showdown")){
					collection.forEach(function(doc){
						if(((doc.data().Name==nextPlayer) && (doc.data().MostRecentAction=="Fold"))||Players[indexInArray].ChipElement.innerHTML=="Your Chips=0"){
							hasFolded = true;
						}
					});
				}
			} else {																					// possibly change so that CheckifPlayerHasFolded is only called if roundtype is bet (save reads)
				nextPlayer = Players[indexInArray+1].Name;     // need to add a check if the player has already folded (add loop until find player that hasn't folded)
				if ((roundtype!="end")&&(roundtype!="showdown")){
					collection.forEach(function(doc){
						if(((doc.data().Name==nextPlayer) && (doc.data().MostRecentAction=="Fold"))||Players[indexInArray].ChipElement.innerHTML=="Your Chips=0"){
							hasFolded = true;
						}
					});
				}
			}
		}
		while (hasFolded);
		if (nextPlayer==username){//if every one else has folded
				newroundtype="end";
				nextPlayer=Players[0].Name;
				setTimeout(() => {  UpdateDB(nextPlayer); }, 500);
		} else {

		if (roundtype=="end"){
			for (var i = 0; i < Players.length; i++) {
				if (Players[i].Name!=username){
                    Players[i].Hand.faceUp=false;
                    Players[i].Hand.render();
				}
			}
			action="";

			Players.find(function(item,i){
				if (item.Name == username){
					indexInArray = i;
				}
			});
			for (var i=Players[indexInArray].Hand.length; i>-1;i--){
				Players[indexInArray].Hand.removeCard(Players[indexInArray].Hand[i]);
			}
			Players[indexInArray].Hand.render();
			if (nextPlayer==Players[0].Name){
				newroundtype="deal";
			}
			setTimeout(() => {  UpdateDB(nextPlayer); }, 500);
		} else if (roundtype=="showdown"){
			if (nextPlayer==Players[0].Name){
				newroundtype="end";
			}
            setTimeout(() => {  UpdateDB(nextPlayer); }, 500);
        } else if (roundtype=="bet4"){
            var raiseby =0;
            var raisePlayer="";
            Players.find(function(item,i){
                if (item.Name == username){
                    indexInArray = i;
                }
            });
            if (action.includes("Raise")){
                raiseby = parseInt(action.replace("Raise",""));
                raisePlayer=username;
            }
            db.collection("Games").doc(ServerName).get().then(function(doc){
                var gameData=doc.data();
                if (((gameData.PlayerThatRaised=="") && (indexInArray==Players.length-1) && (raisePlayer=="")) || ((gameData.PlayerThatRaised==nextPlayer)&& !(action.includes("Raise")))){
                    newroundtype = "showdown";
                    nextPlayer = Players[0].Name;
                }
                setTimeout(() => {  UpdateDB(nextPlayer,raiseby,raisePlayer); }, 500);
            });
        } else if (roundtype=="bet3"){
            var raiseby =0;
            var raisePlayer="";
            Players.find(function(item,i){
                if (item.Name == username){
                    indexInArray = i;
                }
            });
            if (action.includes("Raise")){
                raiseby = parseInt(action.replace("Raise",""));
                raisePlayer=username;
            }
            db.collection("Games").doc(ServerName).get().then(function(doc){
                var gameData=doc.data();
                if (((gameData.PlayerThatRaised=="") && (indexInArray==Players.length-1) && (raisePlayer=="")) || ((gameData.PlayerThatRaised==nextPlayer)&& !(action.includes("Raise")))){
                    newroundtype = "bet4";
                    nextPlayer = Players[0].Name;
                }
                if (nextPlayer==Players[0].Name){
                    if(typeof CommunityCard5[0]=="undefined"){
                        CommunityCard5.addCard(deck.topCard());
                        CommunityCard5.render();
                    }
                }
                setTimeout(() => {  UpdateDB(nextPlayer,raiseby,raisePlayer); }, 500);
            });
		} else if (roundtype=="bet2"){
					var raiseby =0;
					var raisePlayer="";
					Players.find(function(item,i){
						if (item.Name == username){
							indexInArray = i;
						}
					});
					if (action.includes("Raise")){
						raiseby = parseInt(action.replace("Raise",""));
						raisePlayer=username;
					}
					db.collection("Games").doc(ServerName).get().then(function(doc){
						var gameData=doc.data();
						if (((gameData.PlayerThatRaised=="") && (indexInArray==Players.length-1) && (raisePlayer=="")) || ((gameData.PlayerThatRaised==nextPlayer)&& !(action.includes("Raise")))){
							newroundtype = "bet3";
							nextPlayer = Players[0].Name;
						}
                        if (nextPlayer==Players[0].Name){
                            if(typeof CommunityCard4[0]=="undefined"){
                                CommunityCard4.addCard(deck.topCard());
                                CommunityCard4.render();
                            }
                        }
                        setTimeout(() => {  UpdateDB(nextPlayer,raiseby,raisePlayer); }, 500);
                        
					});
		} else if (roundtype=="bet1"){
            var raiseby =0;
			var raisePlayer="";
			Players.find(function(item,i){
				if (item.Name == username){
					indexInArray = i;
				}
			});
			if (action.includes("Raise")){
				raiseby = parseInt(action.replace("Raise",""));
				raisePlayer=username;
			}
			db.collection("Games").doc(ServerName).get().then(function(doc){
				var gameData=doc.data();
				if (((gameData.PlayerThatRaised=="") && (indexInArray==Players.length-1) && (raisePlayer=="")) || ((gameData.PlayerThatRaised==nextPlayer)&& !(action.includes("Raise")))){
					newroundtype = "bet2";
					nextPlayer = Players[0].Name;
                }
                if (nextPlayer==Players[0].Name){
                    if(typeof CommunityCard1[0]=="undefined"){
                        CommunityCard1.addCard(deck.topCard());
                        CommunityCard1.render();
                    }
                    if(typeof CommunityCard2[0]=="undefined"){
                        CommunityCard2.addCard(deck.topCard());
                        CommunityCard2.render();
                    }
                    if(typeof CommunityCard3[0]=="undefined"){
                        CommunityCard3.addCard(deck.topCard());
                        CommunityCard3.render();
                    }
                }
				setTimeout(() => {  UpdateDB(nextPlayer,raiseby,raisePlayer); }, 500);
			});


		} else if (roundtype=="deal"){
			//deck is updated on client when updated in server with getGameUpdates
			Players.find(function(item,i){
				if (item.Name == username){
					indexInArray = i;
				}
			});
			var currentNoofChips = parseInt(Players[indexInArray].ChipElement.innerHTML.replace("Your Chips=",""));
			if (currentNoofChips != 0){
				noOfChipsExchanged=1; // ante 
				DealYourHand();
			}
			if (nextPlayer==Players[0].Name){
				newroundtype="bet1"
			}
			setTimeout(() => {  UpdateDB(nextPlayer); }, 2000);

		}
	}


	});

}

findCard = function(card){
    var cardtoAdd = cards.all.find(function(item){
        if (item.name == card){
            return item;
        }
    });
    return cardtoAdd
}


getGameUpdates = function () {
	gameListener=db.collection("Games").doc(ServerName).onSnapshot(function(doc){
		var hasRaised = false;
		var docData = doc.data();
		if (docData.Active){
			if (docData.CurrentPlayerTurn == username){
				YourTurn = true;
                if (docData.RoundType.includes("bet")) {
					// var endturnbutton = document.getElementById("EndTurn");
					// endturnbutton.style.visibility = "hidden";
					var raisebutton = document.getElementById("Raise");
					var foldbutton = document.getElementById("Fold");
					var checkbutton = document.getElementById("Check");
					var callbutton = document.getElementById("Call");
					raisebutton.style.visibility = "visible";
					foldbutton.style.visibility = "visible";
					db.collection("Games").doc(ServerName).collection("PlayerDetails").where("Name",">","").get().then(function(collection){
						collection.forEach(function(doc){
							var playerdocData = doc.data();
							if (playerdocData.MostRecentAction.includes("Raise")){ //checks if a raise has been made by any of the players
								hasRaised = true;
							}
						});
						if (hasRaised){
							checkbutton.style.visibility = "hidden";
							callbutton.style.visibility = "visible";
						} else {
							checkbutton.style.visibility = "visible";
							callbutton.style.visibility = "hidden";
						}
					});

				} else if (docData.RoundType=="showdown") {
					db.collection("Games").doc(ServerName).collection("PlayerDetails").get().then(function (collection){ //get all those who have not folded //change to get all players and check most reent action then if not fold then fip cards
						var noofPeopleFolded =0;
						collection.forEach(function(doc){																//.where("MostRecentAction",">","Fold").where("MostRecentAction","<","Fold")
							if (doc.data().MostRecentAction!="Fold"){
								Players.find(function(item,i){
									if (item.Name == doc.data().Name){
										indexInArray = i;
									}
								});
								Players[indexInArray].Hand.faceUp=true;
								
								//Players[indexInArray].Hand.render(); //first see if all but one have folded if so do not reveal if not reveal with for loop of render
							} else{
							    noofPeopleFolded++;
							}
						});
						if (noofPeopleFolded!=Players.length-1){
							for (var i=0;i<Players.length;i++){
								Players[i].Hand.render();
							}
						}

						EndTurn();
					});
				} else if (docData.RoundType=="end") {
					db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(username).get().then(function(doc){
						if (doc.data().Host){
							winner = prompt("Enter Username of winner of this hand?",""); // add validation 
							//check if user actually exists
							var potlabel = document.getElementById("Pot");
							var potlabelText = potlabel.innerHTML;
							var chipsInPotstr  = potlabelText.replace("Pot = ","");
							chipsInPotstr = chipsInPotstr.replace(" chips","");
							var chipsInPot = parseInt(chipsInPotstr);
							var chipIncrease = firebase.firestore.FieldValue.increment(chipsInPot);
							db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(winner).set({
									Chips:chipIncrease,
									HandArray:[],
							},{merge:true});
							var anotherHand = prompt("Play another hand (y/n)",""); // add validation
							if (anotherHand=="n"){
								setTimeout(() => {db.collection("Games").doc(ServerName).set({
									Active:false
								},{merge:true});}, 2000);
							}
							setTimeout(() => {EndTurn();}, 500);
						} else {
							EndTurn();
						}
					});
				}
			} else {
				YourTurn = false;
				// var endturnbutton = document.getElementById("EndTurn");
				// endturnbutton.style.visibility = "hidden";
				var raisebutton = document.getElementById("Raise");
				var foldbutton = document.getElementById("Fold");
				var checkbutton = document.getElementById("Check");
				var callbutton = document.getElementById("Call");
				raisebutton.style.visibility = "hidden";
				foldbutton.style.visibility = "hidden";
				checkbutton.style.visibility = "hidden";
				callbutton.style.visibility = "hidden";
			}
			var potlabel = document.getElementById("Pot");
			potlabel.innerHTML = "Pot = "+docData.Pot.toString()+" chips";
			roundtype = docData.RoundType;
			var raiselabel = document.getElementById("CurrentRaise");
			raiselabel.innerHTML="Current raise = "+docData.CurrentRaise.toString();


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

            if (docData.Community1!=""){
                cardtoAdd = findCard(docData.Community1);
                CommunityCard1.addCard(cardtoAdd);
                CommunityCard1.render();
            }
            if (docData.Community2!=""){
                cardtoAdd = findCard(docData.Community2);
                CommunityCard2.addCard(cardtoAdd);
                CommunityCard2.render();
            }
            if(docData.Community3!=""){   
                cardtoAdd = findCard(docData.Community3);
                CommunityCard3.addCard(cardtoAdd);
                CommunityCard3.render();
            }
            if(docData.Community4!=""){
                cardtoAdd = findCard(docData.Community4);
                CommunityCard4.addCard(cardtoAdd);
                CommunityCard4.render();
            }
            if(docData.Community5!=""){   
                cardtoAdd = findCard(docData.Community5);
                CommunityCard5.addCard(cardtoAdd);
                CommunityCard5.render();
            }
			var waitingForLabel = document.getElementById("WaitingFor");
			if (YourTurn){
				waitingForLabel.innerHTML = "Your Turn";
			} else {
				waitingForLabel.innerHTML = "Waiting for "+docData.CurrentPlayerTurn+"..."
			}

			if (docData.RoundType=="deal" && YourTurn) {
				EndTurn();
			}
		}else{
			setTimeout(() => {  document.location='index.html'; }, 500)
		}


	});
}


getPlayerUpdates = function () { //works!
	for (var i = 0; i < Players.length; i++) {
		playerListener=db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(Players[i].Name).onSnapshot(function (doc){
			console.log(doc.data().Name, "was updated");
			indexInArray;
			Players.find(function(item,i){
				if (item.Name == doc.data().Name){
					indexInArray = i;
				}
			});
			if (doc.data().Name == username){
				Players[indexInArray].ChipElement.innerHTML="Your Chips="+doc.data().Chips;
			}else {
					Players[indexInArray].ChipElement.innerHTML="Chips="+doc.data().Chips;
					Players[indexInArray].ActionElement.style.visibility="visible";
					Players[indexInArray].ActionElement.innerHTML="I "+doc.data().MostRecentAction;
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


setTimeout(() => {  getGameUpdates(); }, 1000);
setTimeout(() => {  getPlayerUpdates(); }, 1000);

$("#Raise").click(function(){
	do {
		var bet = prompt("Raise by?","");
		if (bet==""||bet=="0"){
			alert("Please enter a non zero raise");
		}
	}
	while (bet==""||bet=="0");
	action = "Raise "+bet;
	var CurrentRaise = parseInt(document.getElementById("CurrentRaise").innerHTML.replace("Current raise = ",""));   
	noOfChipsExchanged = parseInt(bet) + CurrentRaise;
	Players.find(function(item,i){
		if (item.Name == username){
			indexInArray = i;
		}
	});
	var currentNoofChips = parseInt(Players[indexInArray].ChipElement.innerHTML.replace("Your Chips=","")); 
	if (noOfChipsExchanged > currentNoofChips){
		alert("You don't have enough chips to make this bet");
	}else{
		EndTurn();
	}
	//sub raise from chips, add to pot (decide whether to do some client side response i.e. animation or similar if not just increment pot and decrement chips)
	

});

$("#Call").click(function(){
	var recentAction = "";
	var raise = 0;
	db.collection("Games").doc(ServerName).collection("PlayerDetails").doc(username).get().then(function(doc){
		recentAction = doc.data().MostRecentAction;
		db.collection("Games").doc(ServerName).get().then(function(doc){
			raise = doc.data().CurrentRaise;
			if (recentAction.includes("Raise")){
				var orginalraiseStr = recentAction.replace("Raise ","");
				var orginalraise = parseInt(orginalraiseStr);
				//var chipstogive = raise - orginalraise;
				noOfChipsExchanged = raise - orginalraise;
			} else {
				//var chipstogive = raise;
				noOfChipsExchanged = raise;
			}
			action = "Call";
			Players.find(function(item,i){
				if (item.Name == username){
					indexInArray = i;
				}
			});
			var currentNoofChips = parseInt(Players[indexInArray].ChipElement.innerHTML.replace("Your Chips=","")); 
			if (noOfChipsExchanged > currentNoofChips){
				alert("You don't have enough chips to make this bet");
			}else{
				EndTurn();
			}
			
	
		});
	});
});

$("#Fold").click(function (){
	action = "Fold";
	EndTurn();
});

$("#Check").click(function(){
	action = "Check";
	EndTurn();
});

this.drag = function(ev){
	ev.dataTransfer.setData('text/html', null);
	this.dragCard = $(ev.srcElement).data("card");
	if (yourHand.indexOf(this.dragCard)==-1){
		this.dragCard=null;
	}
}

