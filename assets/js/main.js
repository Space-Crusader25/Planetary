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

// Fonctions
const drawMap = (w, h) => {
    let tablFin = `<table class="map">`;
    console.log($planetsManager.planets);
    for(let i = 0; i < h; i++){
        tablFin += `<tr>`;
        for(let j = 0; j < w; j++){
            tablFin += "<td";
            for(let planet in $planetsManager.planets){
                console.log(planet);
                if($planetsManager.planets[planet].x == j && $planetsManager.planets[planet].y == i){
                    tablFin += ` style="background-image: url('assets/img/${$planetsManager.planets[planet].name}.png'); background-size: 100% 100%;"`;
                }
            };
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
const createBuildingButton = (building, cost, planetName) => {
    let plnt = $planetsManager.planets[planetName];
    let buildingCount = plnt.buildings[building.toLowerCase()];
    let disabled = false;
    let costText = "";
    let costMax = 0;
    let stockValue = 0;
    let callback = "";

    for(let resource in cost){
        costText += `${cost[resource]} ${resource} `;
        costMax += cost[resource];
        stockValue += Math.min(plnt.stock[resource], cost[resource]);
        if(plnt.stock[resource] < cost[resource]){
            disabled = true;
        }
    }

    callback = `createBuilding('${building}',
    '${planetName}',
    ${JSON.stringify(cost).replace(/"/g, `'`)})`;

    return `<button class="resource-btn"
                onclick="${callback}"
                ${disabled ? ' disabled' : ''}>
                Create ${building}(${buildingCount}), cost: ${costText.toString()}
                <progress
                    value="${stockValue}" max="${costMax}"
                    class="resource-progress">
                </progress>
            </button>`;
}
const createBuilding = (building, planetName, cost) => {
    let plnt = $planetsManager.planets[planetName];

    plnt[`create${building}`](cost);
}
const getResourceLine = (icon, name, stock, prod, cons, building, buildingCount, cost, planetName) => {
    return `<tr>
                <td>
                    <span class="resource-icon">${icon}</span>
                    <span class="resource-name">${name}</span>
                </td>
                <td>
                    ${stock}
                    (
                    <span class="resource-prod">
                        +${prod}
                    </span>
                    <span class="resource-cons">
                        -${cons}
                    </span>
                    <span class="resource-next">
                        ${stock + prod - cons}
                    </span>
                    )
                </td>
                <td>
                    ${createBuildingButton(building, cost, planetName)}
                </td>
            </tr>`;
}
const updateGui = () => {
    for(let planet in $planetsManager.planets){
        let plnt = $planetsManager.planets[planet];
        if(plnt.x == spaceship.x && plnt.y == spaceship.y){
            
            guiBox.innerHTML = `<h3>${plnt.name}</h3>`;
            guiBox.innerHTML += `<table>`;
            guiBox.innerHTML += getResourceLine("🔩", "Iron", plnt.ironStock, plnt.ironProd, plnt.ironCons, "Mine", plnt.buildings.mine, { iron: 150 }, plnt.name);
            //guiBox.innerHTML += getResourceLine("🧪", "Plasma", plnt.plasmaStock, plnt.plasmaProd, plnt.plasmaCons);
            guiBox.innerHTML += `</table>`;
        }
    };
}
const update = () => {
    updateGui();
    for(let planet in $planetsManager.planets){
        let plnt = $planetsManager.planets[planet];
        plnt.update();
    }
}
const startGame = () => {
    $planetsManager = new PlanetManager();
    let newPlanet = $planetsManager.planet("earth");
    newPlanet = $planetsManager.planet("mars");

    drawMap(longueur, hauteur);
    setInterval(update, 1000);
}
// Execution
startGame();