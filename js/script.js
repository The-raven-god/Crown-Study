document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");
    const sendBtn = document.getElementById("send-btn");
    const suggestionsContainer = document.getElementById("suggestions");

    // Base de conocimiento con preguntas encadenadas
    const conversationFlow = {
        "hola": {
            response: "¡Hola! Soy tu asistente de gaming. ¿En qué puedo ayudarte?",
            suggestions: ["¿Cuáles son los géneros más populares?", "¿Cómo mejorar en juegos competitivos?", "Adiós"]
        },
        "adiós": {
            response: "¡Hasta luego! Que tengas un buen día. 😊",
            suggestions: []
        },
        "¿cuáles son los géneros más populares?": {
            response: "Los géneros más populares son RPG, FPS, MOBA, Battle Royale y mundo abierto. ¿Quieres detalles de alguno?",
            suggestions: ["¿Qué es un RPG?", "¿Qué es un FPS?", "¿Qué es un MOBA?", "Otro"]
        },
        "¿qué es un rpg?": {
            response: "RPG significa 'Role-Playing Game', donde tomas el papel de un personaje en una historia interactiva. Los RPG pueden ser por turnos o en tiempo real.",
            suggestions: ["Ejemplos de RPG", "¿Diferencia entre RPG y MMORPG?", "Otro"]
        },
        "ejemplos de rpg": {
            response: "Algunos RPG populares son The Witcher 3, Final Fantasy, Persona 5 y Skyrim. ¿Quieres saber cuáles son los más influyentes?",
            suggestions: ["¿Cuáles son los RPG más influyentes?", "Otro"]
        },
        "¿cuáles son los rpg más influyentes?": {
            response: "Algunos RPG influyentes son Baldur’s Gate, Chrono Trigger, The Elder Scrolls V: Skyrim y Dark Souls.",
            suggestions: ["Otro"]
        },
        "¿qué es un fps?": {
            response: "FPS significa 'First Person Shooter', juegos de disparos en primera persona, como Call of Duty, CS:GO y Overwatch.",
            suggestions: ["Ejemplos de FPS", "¿Cómo mejorar en FPS?", "Otro"]
        },
        "ejemplos de fps": {
            response: "Algunos FPS populares son Call of Duty, Counter-Strike, Doom, Overwatch y Valorant.",
            suggestions: ["¿Cuál es el mejor FPS de la historia?", "Otro"]
        },
        "¿cuál es el mejor fps de la historia?": {
            response: "Depende de la opinión, pero títulos como DOOM (1993), Half-Life 2, Counter-Strike y Overwatch han marcado la historia de los FPS.",
            suggestions: ["Otro"]
        },
        "¿qué es un moba?": {
            response: "MOBA significa 'Multiplayer Online Battle Arena', juegos donde equipos de jugadores compiten para destruir la base enemiga, como League of Legends y Dota 2.",
            suggestions: ["Ejemplos de MOBA", "¿Cómo mejorar en MOBA?", "Otro"]
        },
        "ejemplos de moba": {
            response: "Algunos MOBA populares son League of Legends, Dota 2, Heroes of the Storm y Smite.",
            suggestions: ["¿Cuál es el mejor MOBA?", "Otro"]
        },
        "¿cuál es el mejor moba?": {
            response: "League of Legends y Dota 2 son considerados los mejores MOBA, cada uno con una gran base de jugadores y competiciones profesionales.",
            suggestions: ["Otro"]
        },
        "¿cómo mejorar en juegos competitivos?": {
            response: "Para mejorar en juegos competitivos, practica regularmente, usa un equipo adecuado (mouse, teclado, monitor) y estudia estrategias de otros jugadores.",
            suggestions: ["¿Cómo mejorar reflejos?", "¿Qué equipos usar?", "Otro"]
        },
        "¿cómo mejorar reflejos?": {
            response: "Para mejorar tus reflejos, juega títulos rápidos como FPS o juegos de ritmo, haz ejercicios de reacción y mantén un estilo de vida saludable.",
            suggestions: ["¿Qué juegos ayudan a mejorar reflejos?", "Otro"]
        },
        "¿qué juegos ayudan a mejorar reflejos?": {
            response: "Juegos como CS:GO, Valorant, Overwatch y osu! son excelentes para mejorar reflejos y coordinación.",
            suggestions: ["Otro"]
        },
        "¿qué equipos usar?": {
            response: "Para juegos competitivos, te recomiendo un mouse con alta precisión (DPI ajustable), un teclado mecánico, un monitor de 144Hz o más y auriculares con buen sonido.",
            suggestions: ["¿Cómo elegir un buen mouse?", "Otro"]
        },
        "¿cómo elegir un buen mouse?": {
            response: "Elige un mouse con sensor óptico de alta precisión, botones programables y un diseño ergonómico que se adapte a tu mano.",
            suggestions: ["Otro"]
        },
        "¿cuál es el mejor procesador para gaming?": {
            response: "Los procesadores más recomendados para gaming son los de las series Intel Core i7/i9 y AMD Ryzen 7/9. Depende de tu presupuesto y necesidades.",
            suggestions: ["¿Qué tarjeta gráfica es mejor?", "Otro"]
        },
        "¿qué tarjeta gráfica es mejor?": {
            response: "Las tarjetas gráficas más potentes son las NVIDIA RTX 3080/3090 y AMD RX 6800 XT/6900 XT. Para presupuestos más ajustados, las RTX 3060 o RX 6700 XT son excelentes opciones.",
            suggestions: ["Otro"]
        },
        "¿cuáles son los motores gráficos más usados?": {
            response: "Algunos de los motores gráficos más usados son Unreal Engine, Unity, CryEngine y Frostbite.",
            suggestions: ["¿Qué juegos usan Unreal Engine?", "Otro"]
        },
        "¿qué juegos usan unreal engine?": {
            response: "Juegos como Fortnite, Gears of War, BioShock y Street Fighter V usan Unreal Engine.",
            suggestions: ["Otro"]
        },
        "otro": {
            response: "Puedes preguntarme sobre hardware, juegos, consejos o cualquier otra cosa relacionada con gaming.",
            suggestions: ["¿Cuál es el mejor juego del mundo?", "¿Cómo grabar mis partidas?", "Adiós"]
        },
        "¿cuál es el mejor juego del mundo?": {
            response: "Es subjetivo, pero títulos como The Legend of Zelda: Breath of the Wild, The Witcher 3 y Red Dead Redemption 2 son considerados entre los mejores.",
            suggestions: ["Otro"]
        },
        "¿cómo grabar mis partidas?": {
            response: "Puedes usar software como OBS Studio, NVIDIA ShadowPlay o Xbox Game Bar para grabar tus partidas.",
            suggestions: ["Otro"]
        }
    };

    // Función para limpiar y formatear el texto del usuario
    function cleanInput(text) {
        return text.trim().toLowerCase();
    }

    // Función para enviar mensajes
    function sendMessage(userText) {
        if (!userText) return;

        const cleanText = cleanInput(userText);
        addMessage("Tú", userText, "user-message");
        userInput.value = "";

        setTimeout(() => {
            let botResponse = conversationFlow[cleanText];

            if (botResponse) {
                addMessage("Bot", botResponse.response, "bot-message");
                showSuggestions(botResponse.suggestions);
            } else {
                addMessage("Bot", "No tengo información sobre eso. Prueba con otra pregunta.", "bot-message");
                showSuggestions(["Hola", "Adiós", "Otro"]);
            }
        }, 500);
    }

    // Función para agregar mensajes al chat
    function addMessage(sender, text, className) {
        const message = document.createElement("div");
        message.classList.add("message", className);
        message.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Función para mostrar sugerencias
    function showSuggestions(options) {
        suggestionsContainer.innerHTML = "";
        options.forEach(option => {
            let button = document.createElement("button");
            button.classList.add("suggestion-btn");
            button.innerText = option;
            button.onclick = () => sendMessage(option);
            suggestionsContainer.appendChild(button);
        });
    }

    // Función para abrir/cerrar el chat
    window.toggleChat = function () {
        chatContainer.style.display = chatContainer.style.display === "flex" ? "none" : "flex";
        if (chatContainer.style.display === "flex") {
            showSuggestions(["Hola", "Adiós"]);
        }
    };

    // Permitir enviar con Enter
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage(userInput.value.trim());
        }
    });

    // Botón de enviar
    sendBtn.addEventListener("click", function () {
        sendMessage(userInput.value.trim());
    });
});