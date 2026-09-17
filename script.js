// ==========================================
// SAUKLAUE
// ==========================================

// Aktuelle Einstellungen
let difficulty = "easy";

let score = 0;
let streak = 0;
let bestStreak = 0;

let questionNumber = 1;

let correctAnswers = 0;
let wrongAnswers = 0;

let currentAnswer = "";

const maxQuestions = 10;


// ==========================================
// AUFGABEN
// ==========================================

const questions = {

    easy: [
        "Hallo",
        "Katze",
        "Hund",
        "Schule",
        "Computer",
        "Sommer",
        "Fußball",
        "Minecraft",
        "Freund",
        "Haus",
        "Auto",
        "Apfel",
        "Wasser",
        "Bruder",
        "Mutter"
    ],

    normal: [
        "Guten Morgen",
        "Ich gehe zur Schule",
        "Der Hund läuft",
        "Heute ist Montag",
        "Ich spiele Fußball",
        "Das Wetter ist schön",
        "Mein Computer ist schnell",
        "Wir treffen uns später",
        "Ich programmiere eine Website",
        "Der Bus kommt gleich",
        "Ich habe meine Hausaufgaben gemacht",
        "Minecraft macht Spaß"
    ],

    hard: [
        "Morgen gehen wir gemeinsam einkaufen",
        "Der Computer steht auf meinem Schreibtisch",
        "Ich möchte später Programmierer werden",
        "Heute spielen wir ein wichtiges Fußballspiel",
        "Die Schule beginnt um halb acht",
        "Mein Freund programmiert ein Minecraft Datapack",
        "Am Wochenende möchte ich ausschlafen",
        "Ich muss morgen meine Hausaufgaben abgeben",
        "Die neue Website sieht richtig gut aus",
        "Wir treffen uns nach dem Training"
    ],

    extreme: [
        "Ich möchte später eine eigene Softwarefirma gründen",
        "Programmieren macht mir mehr Spaß als Hausaufgaben",
        "Heute Abend spiele ich mit meinen Freunden",
        "Die neue Version meiner Website ist endlich fertig",
        "Ich möchte eine Ausbildung zum Fachinformatiker machen",
        "Mein Lieblingsspiel ist Minecraft",
        "Wir müssen das Projekt bis Freitag fertigstellen",
        "Ich lerne gerade JavaScript und Webentwicklung"
    ],

    impossible: [
        "Eine schlechte Handschrift kann manchmal schwerer zu lesen sein als eine Fremdsprache",
        "Ich programmiere gerade ein eigenes Spiel für meine Website",
        "Vielleicht wird meine kleine Idee irgendwann ein richtig großes Projekt",
        "Die schwierigste Sauklaue muss man besonders genau entziffern",
        "Mit genügend Konzentration kann man auch sehr schlechte Schrift verstehen",
        "Ich möchte später eigene Software entwickeln und damit Geld verdienen"
    ]
};


// ==========================================
// DIFFICULTY INFOS
// ==========================================

const difficultyInfo = {

    easy: {
        name: "🟢 Leicht",
        points: 10,
        rotation: 1,
        fontSize: 48,
        blur: 0
    },

    normal: {
        name: "🟡 Normal",
        points: 20,
        rotation: 2,
        fontSize: 46,
        blur: 0
    },

    hard: {
        name: "🟠 Schwer",
        points: 35,
        rotation: 4,
        fontSize: 43,
        blur: 0.3
    },

    extreme: {
        name: "🔴 Extrem",
        points: 50,
        rotation: 7,
        fontSize: 40,
        blur: 0.7
    },

    impossible: {
        name: "☠️ Sauklaue",
        points: 100,
        rotation: 10,
        fontSize: 38,
        blur: 1
    }
};


// ==========================================
// SPIEL STARTEN
// ==========================================

function startGame(selectedDifficulty) {

    difficulty = selectedDifficulty;

    score = 0;
    streak = 0;
    bestStreak = 0;

    questionNumber = 1;

    correctAnswers = 0;
    wrongAnswers = 0;

    document
        .getElementById("startScreen")
        .classList.add("hidden");

    document
        .getElementById("endScreen")
        .classList.add("hidden");

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

    updateStats();

    showQuestion();
}


// ==========================================
// FRAGE ANZEIGEN
// ==========================================

function showQuestion() {

    const list = questions[difficulty];

    const randomIndex =
        Math.floor(Math.random() * list.length);

    currentAnswer = list[randomIndex];

    const handwriting =
        document.getElementById("handwriting");

    handwriting.textContent = currentAnswer;

    const settings =
        difficultyInfo[difficulty];

    document.getElementById(
        "difficultyLabel"
    ).textContent = settings.name;

    // Zufällige Sauklaue erzeugen

    const randomRotation =
        (Math.random() * settings.rotation * 2)
        - settings.rotation;

    const randomScale =
        0.9 + Math.random() * 0.2;

    const randomSpacing =
        Math.floor(Math.random() * 5);

    handwriting.style.fontSize =
        settings.fontSize + "px";

    handwriting.style.transform =
        `rotate(${randomRotation}deg) scale(${randomScale})`;

    handwriting.style.letterSpacing =
        randomSpacing + "px";

    handwriting.style.filter =
        `blur(${settings.blur}px)`;


    // Input zurücksetzen

    const input =
        document.getElementById("answerInput");

    input.value = "";

    input.disabled = false;

    document.getElementById(
        "submitButton"
    ).disabled = false;

    document.getElementById(
        "feedback"
    ).textContent = "";

    document.getElementById(
        "feedback"
    ).className = "feedback";

    document.getElementById(
        "nextButton"
    ).classList.add("hidden");

    input.focus();

    updateStats();
}


// ==========================================
// ANTWORT PRÜFEN
// ==========================================

function checkAnswer() {

    const input =
        document.getElementById("answerInput");

    const userAnswer =
        input.value.trim();

    if (userAnswer === "") {
        return;
    }

    const feedback =
        document.getElementById("feedback");

    // Antworten vergleichen
    const normalizedUser =
        normalizeAnswer(userAnswer);

    const normalizedCorrect =
        normalizeAnswer(currentAnswer);


    if (normalizedUser === normalizedCorrect) {

        correctAnswers++;

        streak++;

        if (streak > bestStreak) {
            bestStreak = streak;
        }

        // Streak-Multiplikator

        let multiplier = 1;

        if (streak >= 10) {
            multiplier = 3;
        } else if (streak >= 5) {
            multiplier = 2;
        } else if (streak >= 3) {
            multiplier = 1.5;
        }

        const basePoints =
            difficultyInfo[difficulty].points;

        const earnedPoints =
            Math.round(basePoints * multiplier);

        score += earnedPoints;

        feedback.textContent =
            `✓ Richtig! +${earnedPoints} Punkte`;

        if (multiplier > 1) {
            feedback.textContent +=
                ` (${multiplier}x Multiplikator)`;
        }

        feedback.className =
            "feedback correct";

    } else {

        wrongAnswers++;

        streak = 0;

        feedback.textContent =
            `✗ Falsch! Richtig wäre: "${currentAnswer}"`;

        feedback.className =
            "feedback wrong";
    }


    // Eingabe sperren

    input.disabled = true;

    document.getElementById(
        "submitButton"
    ).disabled = true;

    document.getElementById(
        "nextButton"
    ).classList.remove("hidden");

    updateStats();
}


// ==========================================
// NÄCHSTE FRAGE
// ==========================================

function nextQuestion() {

    if (questionNumber >= maxQuestions) {

        endGame();

        return;
    }

    questionNumber++;

    showQuestion();
}


// ==========================================
// SPIEL BEENDEN
// ==========================================

function endGame() {

    document
        .getElementById("gameScreen")
        .classList.add("hidden");

    document
        .getElementById("endScreen")
        .classList.remove("hidden");

    document.getElementById(
        "finalScore"
    ).textContent = score;

    document.getElementById(
        "correctAnswers"
    ).textContent = correctAnswers;

    document.getElementById(
        "wrongAnswers"
    ).textContent = wrongAnswers;

    document.getElementById(
        "bestStreak"
    ).textContent = bestStreak;
}


// ==========================================
// ZURÜCK ZUM MENÜ
// ==========================================

function backToMenu() {

    document
        .getElementById("gameScreen")
        .classList.add("hidden");

    document
        .getElementById("endScreen")
        .classList.add("hidden");

    document
        .getElementById("startScreen")
        .classList.remove("hidden");
}


// ==========================================
// ENTER-TASTE
// ==========================================

function handleEnter(event) {

    if (event.key === "Enter") {

        const nextButton =
            document.getElementById("nextButton");

        if (!nextButton.classList.contains("hidden")) {
            nextQuestion();
        } else {
            checkAnswer();
        }
    }
}


// ==========================================
// STATISTIK AKTUALISIEREN
// ==========================================

function updateStats() {

    document.getElementById(
        "score"
    ).textContent = score;

    document.getElementById(
        "streak"
    ).textContent = streak + " 🔥";

    document.getElementById(
        "questionNumber"
    ).textContent = questionNumber;
}


// ==========================================
// ANTWORT NORMALISIEREN
// ==========================================

function normalizeAnswer(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}