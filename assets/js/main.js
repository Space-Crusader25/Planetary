// Datas
const longueur = 10;
const hauteur = 10;
const earth = {
    name:`Terre`,
    water:true,
    x:4,
    y:5
};
const mars = {
    name: `Mars`,
    water:false,
    x:7,
    y:2
};
const planets = [ 
    mars,
    earth

];
const spaceship = {
    x: 1,
    y: 1

}
let drawnPlanets = {};
const mapBox = document.querySelector("#mapBox");
const guiBox = document.querySelector("#gui");

// Fonctions
const drawMap = (w, h) => {
    let tablFin = `<table class="map">`;

    for(let i = 0; i < h; i++){
        tablFin += `<tr>`;
        for(let j = 0; j < w; j++){
            tablFin += "<td";
            planets.forEach(planet => {
                if(planet.x == j && planet.y == i){
                    tablFin += ` style="background-image: url('assets/img/${planet.name}.png'); background-size: 100% 100%;"`;
                }
            });
            tablFin += `>`;
            if(spaceship.x == j && spaceship.y == i){
                tablFin += `<img id="playerShip" src="assets/img/spaceship.png" alt="spaceship">`;
            }
            tablFin += `</td>`;
            
        }
        tablFin += `</tr>`;
    }
    tablFin += `</table>`;

    mapBox.innerHTML += tablFin;
}

const removeMap = () => {
    mapBox.innerHTML = null;
}

const restartMap = () => {
    removeMap();
    drawMap(longueur, hauteur);
    return "Restarted Succesfully";
}

drawMap(longueur, hauteur);
const shipImg = () => {
    return document.querySelector("#playerShip");
}
const resetDir = () => {

    shipImg().classList.remove("left", "right", "down");
}
const moveRight = () => {
    if(spaceship.x < longueur-1) {
        spaceship.x++;
    }else{
        spaceship.x = 0;
    }
    restartMap();
    resetDir();
    shipImg().classList.add("right");
}

const moveDown = () => {
    if(spaceship.y < hauteur-1) {
        spaceship.y++;
    }else{
        spaceship.y = 0;
    }
    restartMap();
    resetDir();
    shipImg().classList.add("down");
}

const moveLeft = () => {
    if(spaceship.x > 0) {
        spaceship.x--;
    }else{
        spaceship.x = longueur-1;
    }
    restartMap();
    resetDir();
    shipImg().classList.add("left");
}

const moveUp = () => {

    if(spaceship.y > 0) {
        spaceship.y--;
    }else{
        spaceship.y = hauteur-1;
    }
    restartMap();
    resetDir();
}
const updateGui = () => {
    planets.forEach(planet => {
        if(planet.x == spaceship.x && planet.y == spaceship.y){
            guiBox.innerHTML = planet.name;
        }
    });
}
const update = () => {
    updateGui();
}

setInterval(update, 1000);