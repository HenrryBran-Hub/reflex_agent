// MIT License
// Copyright (c) 2020 Luis Espino

document.addEventListener("DOMContentLoaded", function() {
    function reflex_agent(location, state) {
        if (state == "DIRTY") return "CLEAN";
        else if (location == "A") return "RIGHT";
        else if (location == "B") return "LEFT";
    }

    function dirtyRooms(states) {
        // Ensuciar ambos cuartos
        states[1] = "DIRTY";
        states[2] = "DIRTY";
    }

    function test(states, visitedStates) {
        var location = states[0];
        var state = states[0] == "A" ? states[1] : states[2];
        var action_result = reflex_agent(location, state);

        // Formatear el estado actual
        var currentState = location + " " + state + " " + (location == "A" ? states[2] : states[1]);

        // Mostrar estado en el log
        document.getElementById("log").innerHTML += "<br>Location: " + location + " | State A: " + states[1] + " | State B: " + states[2] + " | Action: " + action_result;

        // Agregar estado a la lista de estados visitados
        if (!visitedStates.includes(currentState)) {
            visitedStates.push(currentState);
        }

        // Verificar si se han visitado todos los estados
        if (visitedStates.length >= 8) {
            document.getElementById("log").innerHTML += "<br>All states visited!";
            return;
        }

        // Realizar la acción y actualizar el estado
        if (action_result == "CLEAN") {
            if (location == "A") states[1] = "CLEAN";
            else if (location == "B") states[2] = "CLEAN";
        } else if (action_result == "RIGHT") states[0] = "B";
        else if (action_result == "LEFT") states[0] = "A";

        // Verificar si ambos cuartos están limpios y ensuciarlos si es necesario
        if (states[1] === "CLEAN" && states[2] === "CLEAN") {
            document.getElementById("log").innerHTML += "<br>Both rooms are CLEAN. Dirtying them now.";
            dirtyRooms(states);
        }

        // Continuar con la siguiente iteración después de un retraso
        setTimeout(function() { test(states, visitedStates); }, 2000);
    }

    // Inicializar los estados y la lista de estados visitados
    var states = ["A", "DIRTY", "DIRTY"];
    var visitedStates = [];

    // Iniciar la prueba
    test(states, visitedStates);
});
