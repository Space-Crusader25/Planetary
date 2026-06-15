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
let drawnPlanets = {};

const drawContent = (x, y) => {
    
   
}

const drawMap = (w, h) => {

    let body = document.querySelector("body");
    let tablFin = `<table>`;

    for(let i = 0; i < h; i++){
        tablFin += `<tr>`;
        for(let j = 0; j < w; j++){
            let content;
            planets.forEach(planet => {
                if(planet.x == j && planet.y == i){
                    content = `<img src="assets/img/${planet.name}.png" alt="${planet.name}">`;
                }
            });
            tablFin += `<td> ${content} </td>`;
        }
        tablFin += `</tr>`;
    }
    tablFin += `</table>`;

    body.innerHTML += tablFin;
}

const removeMap = () => {
    const tableau = document.querySelector("table:last-of-type");
    tableau.innerHTML = null;
};
drawMap(longueur, hauteur);