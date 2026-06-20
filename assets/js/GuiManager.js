class GuiManager {
    constructor(mapBox, guiBox, planetsManager, spaceship, width = 10, height = 10) {
        this.mapBox = mapBox;
        this.guiBox = guiBox;
        this.planetsManager = planetsManager;
        this.spaceship = spaceship;
        this.width = width;
        this.height = height;
    }

    drawMap(w = this.width, h = this.height) {
        let tablFin = `<table class="map">`;
        console.log(this.planetsManager.planets);
        for (let i = 0; i < h; i++) {
            tablFin += `<tr>`;
            for (let j = 0; j < w; j++) {
                tablFin += "<td";
                for (let planet in this.planetsManager.planets) {
                    if (this.planetsManager.planets[planet].x == j && this.planetsManager.planets[planet].y == i) {
                        tablFin += ` style="background-image: url('assets/img/${this.planetsManager.planets[planet].name}.png'); background-size: 100% 100%;"`;
                    }
                }
                tablFin += `>`;
                if (this.spaceship.x == j && this.spaceship.y == i) {
                    tablFin += `<img id="playerShip" src="assets/img/spaceship.png" alt="spaceship">`;
                }
                tablFin += `</td>`;
            }
            tablFin += `</tr>`;
        }
        tablFin += `</table>`;

        this.mapBox.innerHTML += tablFin;
    }

    removeMap() {
        this.mapBox.innerHTML = null;
    }

    restartMap() {
        this.removeMap();
        this.drawMap(this.width, this.height);
        return "Restarted Succesfully";
    }

    shipImg() {
        return document.querySelector("#playerShip");
    }

    resetDir() {
        const img = this.shipImg();
        if (!img) return;
        img.classList.remove("left", "right", "down");
    }

    createBuildingButton(building, cost, planetName) {
        let plnt = this.planetsManager.planets[planetName];
        let buildingCount = plnt.buildings[building.toLowerCase()];
        let disabled = false;
        let costText = "";
        let costMax = 0;
        let stockValue = 0;
        let callback = "";

        for (let resource in cost) {
            costText += `${cost[resource]} ${resource} `;
            costMax += cost[resource];
            stockValue += Math.min(plnt.stock[resource], cost[resource]);
            if (plnt.stock[resource] < cost[resource]) {
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

    getResourceLine(icon, name, stock, prod, cons, building, buildingCount, cost, planetName) {
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
                    ${this.createBuildingButton(building, cost, planetName)}
                </td>
            </tr>`;
    }

    updateGui() {
        for (let planet in this.planetsManager.planets) {
            let plnt = this.planetsManager.planets[planet];
            if (plnt.x == this.spaceship.x && plnt.y == this.spaceship.y) {
                this.guiBox.innerHTML = `<h3>${plnt.name}</h3>`;
                this.guiBox.innerHTML += `<table>`;
                this.guiBox.innerHTML += this.getResourceLine("🔩", "Iron", plnt.ironStock, plnt.ironProd, plnt.ironCons, "Mine", plnt.buildings.mine, { iron: 150, plasma: 50 }, plnt.name);
                this.guiBox.innerHTML += this.getResourceLine("⚡", "Plasma", plnt.plasmaRest, plnt.plasmaProd, plnt.plasmaCons, "Refinery", plnt.buildings.refinery, { iron: 100 }, plnt.name);
                this.guiBox.innerHTML += `</table>`;
            }
        }
    }
}

window.GuiManager = GuiManager;
