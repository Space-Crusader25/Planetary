const earth = {
    name:`earth`,
    water:true,
    x:4,
    y:5
};
const mars = {
    name: `mars`,
    water:false,
    x:7,
    y:2
};
const planets = [ 
    mars,
    earth

];

class Planet {
    constructor(data){
        this._name = data.name;
        this._water = data.water;
        this._x = data.x;
        this._y = data.y;
        this._prod = {
            iron: 0,
            plasma: 0
        };
        this._cons = {
            iron: 0,
            plasma: 0
        };
        this._stock = {
            iron: 0,
            plasma: 0
        };
        this._buildings = {
            mine: 0,
            refinery: 0
        };
        this._counter = 0;
    }
    get name(){
        return this._name;
    }
    get water(){
        return this._water;
    }
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    get prod(){
        return this._prod;
    }
    get cons(){
        return this._cons;
    }
    get stock(){
        return this._stock;
    }
    get buildings(){
        return this._buildings;
    }
    get ironProd(){
        return this._buildings.mine * 10 + 10;
    }
    get ironCons(){
        return this._buildings.refinery * 5;
    }
    get ironStock(){
        return this._stock.iron;
    }
    get ironNextStock(){
        return this._stock.iron + this.ironProd - this.ironCons;
    }
    get plasmaRest(){
        return this._stock.plasma - this._cons.plasma;
    }
    resourcesEnough(cost){
        let enough = true;

        for(const resource in cost){
            if(this._stock[resource] < cost[resource]){
                enough = false;
            }
            
        }
        return enough;
    }
    createMine(cost){
        if(this.resourcesEnough(cost)){
            this._buildings.mine++;
            for(const resource in cost){
                this._stock[resource] -= cost[resource];
            }
        }else{
            console.log(`Not enough resources to create mine on ${this._name}`);
        }
    }
    update(){
        this._counter++;
        if(this._counter == 15){
            this._stock.iron += this.ironProd - this.ironCons;
            this._counter = 0;
        }
    }
}

class PlanetManager {
    constructor(planets){
        this._planets = {};
    }
    get planets(){
        return this._planets;
    }
    planet(name){
        if(!this._planets[name]) {
            if(!planets.find(p => p.name === name)){
                throw new Error(`Planet ${name} not found`);
            }
            this._planets[name] = new Planet(planets.find(p => p.name === name));
        }
        return this._planets[name];
    }
}