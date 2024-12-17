let jugada = JSON.parse(localStorage.getItem("jugada"))||{
    "partidasJugadas": 0,
    "ganadas": 0,
    "perdidas": 0,
    "empatadas": 0,
    "porcentajeVictorias": 0
}
let menuUno = `
Inserta la opcion deseada:
Para jugar                     elegir(\"piedra\"), elegir(\"papel\"), elegir(\"tijeras\")
Estadísticas del Jugador       estadisticas()
Ver historial                  historial()
Borrar sesion                  reinicio()`;

let menuDos = ``;
let historialPartidas = [9];
let datos = [];
console.log(menuUno);
/**
 * en esta funcion se desarrolla el juego, se actualizan 
 * las estadisticas, se decide el ganador, se guarda el historial y el localstorage
 * @param {string} eleccion 
 */
function elegir(eleccion) {
    let ganador = "";
    let maquina = crearRandom();
    console.log(maquina);

    switch (eleccion) {
        case "piedra":
            console.log(`La maquina ha sacado ${maquina}`);
            if (eleccion === maquina) {
                jugada.empatadas += 1;
                ganador = "empate"
                console.log("Hemos empatado");
            } else if (maquina === "tijeras") {
                jugada.ganadas += 1;
                ganador = "jugador uno";
                console.log("Has ganado");
            } else {
                jugada.perdidas += 1;
                ganador = "la maquina";
                console.log("Has perdido");
            }
            break;

        case "papel":
            console.log(`La maquina ha sacado ${maquina}`);
            if (eleccion === maquina) {
                jugada.empatadas += 1;
                ganador = "Empate";
                console.log("Hemos empatado");

            } else if (maquina === "tijeras") {
                jugada.perdidas += 1;
                ganador = "la maquina";
                console.log("Has perdido");

            } else {
                jugada.ganadas += 1;
                ganador = "jugador uno";
                console.log("Has ganado");
            }
            break;

        case "tijeras":
            console.log(`La maquina ha sacado ${maquina}`);
            if (eleccion === maquina) {
                jugada.empatadas += 1;
                ganador = "empate";
                console.log("Hemos empatado");
            } else if (maquina === "tijeras") {
                jugada.perdidas += 1;
                ganador = "la maquina";
                console.log("Has perdido");
            } else {
                jugada.ganadas += 1;
                ganador = "jugador uno";
                console.log("Has ganado");
            }
            break;
        }
    jugada.partidasJugadas += 1;
    jugada.porcentajeVictorias = Math.floor(jugada.ganadas / jugada.partidasJugadas * 100);
    localStorage.setItem("jugada", JSON.stringify(jugada));
    estadisticas();
    guardarHistorial(eleccion, maquina, ganador);   
    console.log(menuUno);
}
/**
 * en este metodo guardamos la informacion que estara en el historial, 
 * comprobamos que el historial sea de solo 10, guardamos la informacion en el localstorage
 * @param {string} yo 
 * @param {string} maquina 
 * @param {string} ganador 
 */
function guardarHistorial( yo, maquina, ganador) {
    let info = `Ronda numero: ${jugada.partidasJugadas}, el jugador uno saco: ${yo}, la maquina saco: ${maquina}, el ganador es : ${ganador}`;
    if (datos.length > 10) { 
        datos.pop();
    }
    datos.unshift(info);
    localStorage.setItem("datos", JSON.stringify(datos));
 
}
/**
 * en este metoddo comprobamos si hay datos en el localstorage y de ser asi se actualizan para 
 * que sigan a partit de ahi
 */
function estadisticas() {

    if(!JSON.parse(localStorage.getItem("jugada")) ){
        localStorage.setItem("jugada", JSON.stringify(jugada));
        console.log("No existen estadisticas.");
    }else{
        jugada = JSON.parse(localStorage.getItem("jugada"));
    }
    console.log(
    `Partidas jugadas: ${jugada.partidasJugadas}
    Partidas ganadas: ${jugada.ganadas}
    Partidas perdidas: ${jugada.perdidas} 
    Partidas empatadas: ${jugada.empatadas}
    Porcentaje de victorias: ${jugada.porcentajeVictorias} %`
    );
}
/**
 * En este comprobamos si hay historial ene l localstorage, de ser asi lo imprimimos
 */
function historial(){
    if(JSON.parse(localStorage.getItem("datos")) ){
        
        datos = JSON.parse(localStorage.getItem("datos"));
        datos.forEach(dato=>console.log(dato));
    }else{
        console.log("No hay historial-------------------------------------------");
    }
}
/**
 * vaciamos todos los valores, el localstorage tambien
 */
function reinicio() {
    datos = [];
    jugada.partidasJugadas=0;
    jugada.ganadas=0;
    jugada.perdidas=0;
    jugada.empatadas=0;
    localStorage.clear();
    console.log("Los datos han sido borrados---------------------------------------")
}
/**
 * creamos un random hasta la posicion de nuestro array y devolvemos el valor que toque.
 * @returns un string
 */
function crearRandom() {
    let jugadaMaquina=["piedra","papel","tijeras"];
    return jugadaMaquina[Math.floor(Math.random() * 3)];
}


