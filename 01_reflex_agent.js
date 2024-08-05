// MIT License
// Copyright (c) 2020 Luis Espino

document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded");

    function reflex_agent(location, state) {
        if (state == "DIRTY") return "CLEAN";
        else if (location == "A") return "RIGHT";
        else if (location == "B") return "LEFT";
    }

    function test(states, visitedStates) {
        var location = states[0];
        var state = states[0] == "A" ? states[1] : states[2];
        var action_result = reflex_agent(location, state);

        // Formatear el estado actual
        var currentState = location + " " + state + " " + (location == "A" ? states[2] : states[1]);
        
        // Mostrar estado en el log
        document.getElementById("log").textContent += "\nLocation: " + location + " | Action: " + action_result;

        // Agregar estado a la lista de estados visitados
        if (!visitedStates.includes(currentState)) {
            visitedStates.push(currentState);
        }

        // Verificar si se han visitado todos los estados
        if (visitedStates.length >= 8) {
            document.getElementById("log").textContent += "\nAll states visited!";
            return;
        }

        // Realizar la acción y actualizar el estado
        if (action_result == "CLEAN") {
            if (location == "A") states[1] = "CLEAN";
            else if (location == "B") states[2] = "CLEAN";
        } else if (action_result == "RIGHT") states[0] = "B";
        else if (action_result == "LEFT") states[0] = "A";

        // Continuar con la siguiente iteración después de un retraso
        setTimeout(function() { test(states, visitedStates); }, 2000);
    }

    // Inicializar los estados y la lista de estados visitados
    var states = ["A", "DIRTY", "DIRTY"];
    var visitedStates = [];

    console.log("Starting test...");
    test(states, visitedStates);
});