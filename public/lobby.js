var db = firebase.firestore();
var ServerName = sessionStorage.ServerName;
var Username = sessionStorage.username;
var Active = false;
var Title = document.getElementById("Title");
Title.innerHTML = Title.innerHTML + " for " + ServerName;

var auth = firebase.auth();
auth.signInAnonymously();
auth.onAuthStateChanged(user=>{
  console.log(user);
});

var playerListener;
var activeListner;

getPlayers = function () {
    playerListener = db.collection("Games").doc(ServerName).collection("PlayerDetails").where("Name",">","").onSnapshot(function (collection){ //change so clears table then updates it
    $("#PlayerTable").find("tr:not(:first)").remove(); 
    var players = [];
		collection.forEach(function(doc) {
      var table = document.getElementById("PlayerTable");
      var newRow = table.insertRow(-1);
      var usernameCell = newRow.insertCell(0);
      var hostCell = newRow.insertCell(1);
      usernameCell.innerHTML = doc.data().Name;
      if (doc.data().Host){
        hostCell.innerHTML = "Yes";
      } else {
        hostCell.innerHTML = "No";
      }
      if ((doc.data().Name == Username)&& (doc.data().Host)){
        var startbutton = document.getElementById("StartGame");
        startbutton.style.visibility="visible";
      }

      players.push(doc.data().Name);
    });
    sessionStorage.Players = JSON.stringify(players);

	});

}


OpenGame = function (GameType){
  playerListener();
  setTimeout(() => {  auth.signOut(); }, 500);
  if (GameType=="5card"){
    setTimeout(() => {  document.location='poker.html'; }, 2000);
  }else if(GameType=="Texas") {
    setTimeout(() => {  document.location='TexasHoldem.html'; }, 2000);
  }else if(GameType=="GoFish"){
    setTimeout(()=>{document.location="GoFish.html";},2000 );
  }
}

checkGameActive = function () {
  activeListner =db.collection("Games").doc(ServerName).onSnapshot(function (doc){
      Active = doc.data().Active;
      if (Active){
        var GameType = doc.data().GameType;
		    activeListner();
        setTimeout(() => {  OpenGame(GameType); }, 2000);
      }
  });

}


$('#StartGame').click(function(){
  var players = JSON.parse(sessionStorage.getItem("Players"));
  db.collection("Games").doc(ServerName).set({
    Active: true,
    CurrentPlayerTurn:players[0],
    },{merge:true});
});


setTimeout(() => {  getPlayers();}, 1000);
setTimeout(() => {  checkGameActive(); }, 1000);
