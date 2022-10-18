var db = firebase.firestore();
var auth = firebase.auth();


/*auth.signInAnonymously();
auth.onAuthStateChanged(user=>{
  console.log(user);
});*/


$('#Submit').click(function(){
  var ServerNamefield = document.getElementById('Name');
  var NumberofPlayersfield = document.getElementById('NoofPlayers');
  var passwordfield = document.getElementById('Pass');
  if (ServerNamefield.value==''||NumberofPlayersfield.value==''||passwordfield.value==''){
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
    db.collection("Games").doc(ServerNamefield.value).get().then(docSnapshot=>{
        if (docSnapshot && docSnapshot.exists){
            alert("Server with this name already exits");
        }else{
            alert('Server created');
            db.collection("Games").doc(ServerNamefield.value).set({
                Name: ServerNamefield.value,
                MaxNoofPlayers: parseInt(NumberofPlayersfield.value),
                NoofPlayersInServer:0,
                CurrentPlayerTurn:"",
                Deck:deckToPass,
                Active: false,
                GameType:"GoFish",
                RoundType:"deal",
            },{merge:true});
        }
    });

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
              MostRecentAction:"",
              HandArray:[],
              Host:true,
              NumOfSets:0,
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
