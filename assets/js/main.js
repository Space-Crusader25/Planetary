let longueur = 8;
let hauteur = 3;

let testTabl = `<table>
    <tr>
        <td>
            X
        </td>
        <td>
            A
        </td>
        <td>
            B
        </td>
        <td>
            C
        </td>
    </tr>
    <tr>
        <td>
            1
        </td>
        <td>
            
        </td>
        <td>
            
        </td>
        <td>
            
        </td>
    </tr>
    <tr>
        <td>
            2
        </td>
        <td>
            
        </td>
        <td>
            
        </td>
        <td>
            
        </td>
    </tr>
</table>`;

let body = document.querySelector("body");

let tablFin = `<table>`;

for(let i = 0; i < hauteur; i++){
    tablFin += `<tr>`;
    for(let j = 0; j < longueur; j++){
        tablFin += `<td> ${j} / ${i} </td>`;
    }
    tablFin += `</tr>`;
}
tablFin += `</table>`;

body.innerHTML += tablFin;