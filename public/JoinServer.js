var db = firebase.firestore();
var auth = firebase.auth();


auth.signInAnonymously();

$('#Submit').click(function(){
  var ServerNamefield = document.getElementById('ServerName');
  var Usernamefield = document.getElementById('Username');
  if (ServerNamefield.value==''||Usernamefield.value==''){
    alert('Please fill out all fields');
  } else {
    db.collection("Games").doc(ServerNamefield.value).get().then(docSnapshot=>{
      if (!(docSnapshot.exists)){
        alert("Server does not exist");
      } else {
        var docData = docSnapshot.data()
        var NoofPlayersInServer = docData.NoofPlayersInServer;
        var MaxNoofPlayers = docData.MaxNoofPlayers;
        var StartingChips = docData.StartingChips;
        if (MaxNoofPlayers==NoofPlayersInServer){
          alert("Server already has maximum number of players");
        } else {
          db.collection("Games").doc(ServerNamefield.value).collection("PlayerDetails").doc(Usernamefield.value).get().then(docSnapshot=>{
            if (docSnapshot.exists){
              alert("User with this username already exists on this server");
            } else {
              if (docData.GameType!="GoFish"){
                db.collection("Games").doc(ServerNamefield.value).collection("PlayerDetails").doc(Usernamefield.value).set({
                    Name:Usernamefield.value,
                    Chips:StartingChips,
                    MostRecentAction:"",
                    HandArray:[],
                    Host:false,
                }).catch(function(error){
                  console.log("error: ",error);
                });
              } else{
                db.collection("Games").doc(ServerNamefield.value).collection("PlayerDetails").doc(Usernamefield.value).set({
                  Name:Usernamefield.value,
                  NumOfSets:0,
                  MostRecentAction:"",
                  HandArray:[],
                  Host:false,
                }).catch(function(error){
                  console.log("error: ",error);
                });
              }
              const increment = firebase.firestore.FieldValue.increment(1);
              db.collection("Games").doc(ServerNamefield.value).set({
                NoofPlayersInServer:increment,
              },{merge:true});
              sessionStorage.username = Usernamefield.value;
              sessionStorage.ServerName = ServerNamefield.value;
              setTimeout(() => {auth.signOut();},2000);
              setTimeout(() => {  document.location='Lobby.html'; }, 500);
            }
          });
        }
      }
    });

  }
})
