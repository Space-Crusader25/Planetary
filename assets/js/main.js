// Datas
const longueur = 10;
const hauteur = 10;
let $planetsManager;
const spaceship = {
    x: 1,
    y: 1

}
let drawnPlanets = {};
const mapBox = document.querySelector("#mapBox");
const guiBox = document.querySelector("#gui");

// Gui manager (rendering moved to GuiManager class)
let guiManager;
const moveRight = () => {
    if(spaceship.x < longueur-1) {
        spaceship.x++;
    }else{
        spaceship.x = 0;
    }
    guiManager.restartMap();
    guiManager.resetDir();
    guiManager.shipImg().classList.add("right");
}

const moveDown = () => {
    if(spaceship.y < hauteur-1) {
        spaceship.y++;
    }else{
        spaceship.y = 0;
    }
    guiManager.restartMap();
    guiManager.resetDir();
    guiManager.shipImg().classList.add("down");
}

const moveLeft = () => {
    if(spaceship.x > 0) {
        spaceship.x--;
    }else{
        spaceship.x = longueur-1;
    }
    guiManager.restartMap();
    guiManager.resetDir();
    guiManager.shipImg().classList.add("left");
}

const moveUp = () => {

    if(spaceship.y > 0) {
        spaceship.y--;
    }else{
        spaceship.y = hauteur-1;
    }
    guiManager.restartMap();
    guiManager.resetDir();
}

const attachArrowKeyListeners = () => {
    document.addEventListener('keydown', (e) => {
        const activeTag = document.activeElement && document.activeElement.tagName;
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                moveUp();
                break;
            case 'ArrowDown':
                e.preventDefault();
                moveDown();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                moveLeft();
                break;
            case 'ArrowRight':
                e.preventDefault();
                moveRight();
                break;
        }
    });
}

const createBuilding = (building, planetName, cost) => {
    let plnt = $planetsManager.planets[planetName];

    plnt.createBuilding(cost, building.toLowerCase());
}

const update = () => {
    guiManager.updateGui();
    for(let planet in $planetsManager.planets){
        let plnt = $planetsManager.planets[planet];
        plnt.update();
    }
}
const startGame = () => {
    $planetsManager = new PlanetManager();
    let newPlanet = $planetsManager.planet("earth");
    newPlanet = $planetsManager.planet("mars");

    guiManager = new GuiManager(mapBox, guiBox, $planetsManager, spaceship, longueur, hauteur);
    guiManager.drawMap(longueur, hauteur);
    attachArrowKeyListeners();
    setInterval(update, 1000);
}
// Execution
startGame();