var cible = document.querySelector("#cible");
var zone_affichage_score = document.querySelector("#zone_affichage_score");

var start = document.querySelector("#start");
var pause = document.querySelector("#stop");
var restart = document.querySelector("restart");

var sound = new Audio("gun.mp3");

var score = 0;
var nombre_apparitions = 0;
var nombre_max_apparitions = 10;

var cible_touchable = false;

var cycle; // contiendra l'appel à setInterval (pour jouer la séquence en boucle)

var alien = document.querySelector("#alien");
var man1 = document.querySelector("#man1");

document.body.style.backgroundImage = "url(area.jpg)";

function sequence_cible() {
  deplacement_cible();

  apparition_cible();
  //aprés un délai : disparition_cibke()

  //disparition_cible est lancée aprés un délai de 1000 miliseconde(pour laisser la cible apparente pendant ces 1000ms)

  setTimeout(dispartion_cible, 1000);
}

function deplacement_cible() {
  // On prépare des coordonnées alétoires, qui placeront la cible à un point situé entre 0 et 100% de la largeur etv de la hauteur de la fenêtre

  var coord_X = Math.random() * 100;
  var coord_Y = Math.random() * 100;

  cible.style.top = coord_Y + "%";
  cible.style.left = coord_X + "%";
}
function apparition_cible() {
  // Ce qui doit changer dans la propriété transform de la cible : on repasse à l'échelle 1
  cible.style.transform = "translate(-50%, -50%) scale(1)";

  nombre_apparitions++; // ou nombre_apparitions = nombre_apparitions + 1

  maj_affichage_score();

  cible_touchable = true;
}
function dispartion_cible() {
  // Repasser à l'échelle 0
  cible.style.transform = "translate(-50%, -50%) scale(0)";

  cible_touchable = false;

  if (nombre_apparitions >= nombre_max_apparitions) setTimeout(fin_partie, 500);
}
function clic_sur_cible() {
  // Ici : prendre en compte aspect touchable / non touchable
  if (cible_touchable == true) {
    dispartion_cible();

    score++; //ou : score = score + 1

    maj_affichage_score();

    sound.play();
  }
}
function maj_affichage_score() {
  var message = score + " / " + nombre_apparitions;

  zone_affichage_score.textContent = message;
}
cible.onclick = clic_sur_cible;

function start_game() {
  // Lancement cyclique de la function sequence cible(), toutes le 1500 milliseconde
  score = 0;
  nombre_apparitions = 0;
  maj_affichage_score();
  cycle = setInterval(sequence_cible, 1500);

  start.style.top = "150%"; //dispartion du start button
  alien.style.top = "150%";
  man1.style.top = "150%";
}

start.onclick = start_game;

function fin_partie() {
  clearInterval(cycle);
  alert("GAME OVER ! You have " + score + " sur" + nombre_apparitions);
  start.style.top = ""; // rien ou "50%"
}

//pause.addEventListener("click", stop_game)

//function stop_game() {
   // if (pause.textContent === "STOP & PLAY") {
   //  start.textContent = "PLAY";
   //     pause.textContent = "STOP & PLAY";   
   // } else {
  //      start.textContent = "START";
  //      pause.textContent = "STOP & START";
  //  }
