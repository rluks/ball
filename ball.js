var team = [];

function init(){
  //console.log("init");
  team = localStorage.getItem("ISB-Team");
  if(team === null){team = [];}

  document.getElementById("ISB-Team").value = team;
  loadTeam();
  clear();
  extendPage();
  resetThrowBtn();
}

function choose() {
  var randomId = Math.floor(Math.random() * team.length);
  var person = team[randomId];
  team.splice(randomId, 1);
  return person;
}

function print(contentString){
  var theDiv = document.getElementById("ISB-Output");
  contentString += "<br>";
  theDiv.innerHTML += contentString;
}


function printTeam(contentString){
  var theDiv = document.getElementById("ISB-Team-Output");
  contentString = "Team:<br>" + contentString;
  contentString += "<br>";
  theDiv.innerHTML = contentString;
}

function clear(){
  var theDiv = document.getElementById("ISB-Output");
  theDiv.innerHTML = "&#8203;";
}

function extendPage(){
  var extenderDiv = document.getElementById("ISB-Extender");
  extenderDiv.innerHTML = "&#8203;";
  var i;
  for (i = 0; i < team.length; i++) {
    extenderDiv.innerHTML += "<br>";
  }
}

function loadTeam(){
  var teamString = document.getElementById("ISB-Team").value.trim();
  var teamString = teamString.replace(/(^,)|(,$)/g, "")//remove leading and trailing comma

  if (teamString.length == 0) {return;}

  var teamSplit = teamString.split(',');
  team = teamSplit.filter(item => item);//remove empty

  document.getElementById("ISB-Team").value = team;
  localStorage.setItem("ISB-Team", team);

  printTeam(team);
}

function exchangeComplete(){
    //console.log("complete");
    document.getElementById("ISB-Throw").innerHTML  = "Done, Reset?";
    document.getElementById("ISB-Throw").removeEventListener("click", throwBall);
    document.getElementById("ISB-Throw").addEventListener("click", init);
}

function resetThrowBtn(){
  //console.log("resetbtn");
  document.getElementById("ISB-Throw").removeEventListener("click", init);
  document.getElementById("ISB-Throw").addEventListener("click", throwBall);
  document.getElementById("ISB-Throw").innerHTML  = "Throw!";
}

function throwBall(){
  //console.log("throw");
  extendPage();
  if(team.length == 0){
    exchangeComplete();
    return;
  }
  printPerson(choose());
}

function printPerson(person){
  person = "<b>" + person + "</b>";
  var outputString = "";
  var dice = Math.floor(Math.random() * Math.floor(11));
  switch(dice) {
  case 0:
    outputString = person + " has the ball";
    break;
  case 1:
    outputString = "The ball is in the hands of " + person;
    break;
  case 2:
    outputString = "Perfect catch by " + person;
    break;
  case 3:
    outputString = person + " uses the Force to pull the ball";
    break;
  case 4:
    outputString = person + " jumps and grabs the ball mid-air";
    break;
  case 5:
    outputString = person + " wins the ball";
    break;
  case 6:
    outputString = "Look at " + person + " go, what a catch!";
    break;
  case 7:
    outputString = person + "'s ball control is excellent";
    break;
  case 8:
    outputString = "Nobody catches better than " + person;
    break;
  case 9:
    outputString = "The team gazes in awe at " + person + "'s superb skills"
    break;
  case 10:
    outputString = "It's " + person + "!";
    break;
  default:
    outputString = "It's " + person + "!";
}
  print(outputString);
}
