var db = firebase.firestore();
var auth = firebase.auth();


/*auth.signInAnonymously();
auth.onAuthStateChanged(user=>{
  console.log(user);
});*/


$('#Submit').click(function(){
  var ServerNamefield = document.getElementById('Name');
  var NumberofPlayersfield = document.getElementById('NoofPlayers');
  var StartingChipsfield=document.getElementById("NoofChips");
  var passwordfield = document.getElementById('Pass');
  var radiobuttons = document.getElementsByName("GameType");
  for (var i=0;i<radiobuttons.length;i++){
    if (radiobuttons[i].checked){
      var GameType = radiobuttons[i].value;
    }
  }
  if (ServerNamefield.value==''||NumberofPlayersfield.value==''||passwordfield.value=='' || GameType==""){
    alert('Please fill out all fields');
  }else {
    auth.signInWithEmailAndPassword("admin@poker.com",passwordfield.value).then(function(user){
      //user signed in
        cards.init();
    deck = new cards.Deck();
    deck.addCards(cards.all);
    var deckToPass = [];
    for (var i=0;i<deck.length;i++){
      deckToPass.push(deck[i].name);
    }
    alert('Server created');
    db.collection("Games").doc(ServerNamefield.value).set({
        Name: ServerNamefield.value,
        GameType:GameType,
        MaxNoofPlayers: parseInt(NumberofPlayersfield.value),
        NoofPlayersInServer:0,
        StartingChips:parseInt(StartingChipsfield.value),
        CurrentPlayerTurn:"",
        Pot:0,
        Deck:deckToPass,
        DiscardPile:[],
        RoundType:"deal",
        Active: false,
        CurrentRaise:0,
        PlayerThatRaised:"",
        Community1:"",
        Community2:"",
        Community3:"",
        Community4:"",
        Community5:"",
    },{merge:true});

    var Username = prompt("Please enter username","");
    while (Username==null || Username==""){ //change to while loop until user enters username
      var Username = prompt("Please enter username","");
      alert('Please enter a non blank useranme');
    }
      db.collection("Games").doc(ServerNamefield.value).collection("PlayerDetails").doc(Username).get().then(docSnapshot=>{
        if (docSnapshot && docSnapshot.exists){
          alert("User with this username already exists on this server");
        } else {
          db.collection("Games").doc(ServerNamefield.value).collection("PlayerDetails").doc(Username).set({
              Name:Username,
              Chips:parseInt(StartingChipsfield.value),
              MostRecentAction:"",
              HandArray:[],
              Host:true,
          }).catch(function(error){
            console.log("error: ",error);
          });
          const increment = firebase.firestore.FieldValue.increment(1);
          db.collection("Games").doc(ServerNamefield.value).set({
            NoofPlayersInServer:increment,
          },{merge:true});
          sessionStorage.username = Username;
          sessionStorage.ServerName = ServerNamefield.value;
          setTimeout(() => {auth.signOut();},2000);
          setTimeout(() => {  document.location='Lobby.html'; }, 500);
        }
      });

    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);         
      }
    });

  } 
});
