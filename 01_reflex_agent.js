// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states){
    var location = states[0];        
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    
    document.getElementById("log").innerHTML += "<br>ASPIRADORA LUGAR: ".concat(location)
        .concat(", HABITACION: A, ESTADO: ").concat(states[1])
        .concat(", HABITACION: B, ESTADO: ").concat(states[2]);
    
    var currentState = `ASPIRADORA LUGAR: ${location}, HABITACION: A, ESTADO: ${states[1]}, HABITACION: B, ESTADO: ${states[2]}`;
    visitedStates.add(currentState);
    uniqueStates.add(currentState);

    iterations++;

    if (action_result == "CLEAN"){
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
        cleanCount++;
    } else if (action_result == "RIGHT") {
        states[0] = "B";
    } else if (action_result == "LEFT") {
        states[0] = "A";        
    }

    // Verificar si hemos visitado los 8 estados únicos
    if (uniqueStates.size >= 8) {
        document.getElementById("log").innerHTML += `<br>Todos los estados han sido visitados en ${iterations} iteraciones.`;
        console.log(`Todos los estados han sido visitados en ${iterations} iteraciones.`);
        
        document.getElementById("log").innerHTML += `<br>Estados visitados: `;
        uniqueStates.forEach(state => {
            document.getElementById("log").innerHTML += `<br>${state}`;
        });
        return;
    }

    // Verificar si ambos cuartos están limpios
    if (states[1] == "CLEAN" && states[2] == "CLEAN") {
        bothCleanVerifiedCount++;
    }

    // Ensuciar las habitaciones si ambas están limpias y han sido verificadas tres veces
    if (bothCleanVerifiedCount >= 3) {
        var random = Math.floor(Math.random() * 3) + 1;
        if (random == 1) {
            states[1] = "DIRTY";
        } else if (random == 2) {
            states[2] = "DIRTY";
        } else if (random == 3) {
            states[1] = "DIRTY";
            states[2] = "DIRTY";
        }
        bothCleanVerifiedCount = 0; // Reiniciar el contador de verificación
        cleanCount = 0; // Reiniciar conteo de limpieza
        states[0] = Math.random() < 0.5 ? "A" : "B"; // Hacer la ubicación aleatoria
    }

    setTimeout(function(){ test(states); }, 2000);
}

var visitedStates = new Set();
var uniqueStates = new Set();
var iterations = 0;
var cleanCount = 0;
var bothCleanVerifiedCount = 0;
var states = ["A", "DIRTY", "DIRTY"];
test(states);
