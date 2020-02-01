(function () {

    var score = function () {
        var sc = 0;
        return function (correct) {
            if (correct) sc++;
            return sc;
        };
    };

    var keepScore = score();

    var Question = function (question, answers, correctIndex) {
        this.question = question;
        this.answers = answers;
        this.correctIndex = correctIndex;
    };

    Question.prototype.log = function () {
        console.log(this.question);
        console.log("=========================================================");
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (answer, callback) {
        var sc;
        if (answer == this.correctIndex) {
            console.log("Absolut korrekt! Du Genie.");
            sc = callback(true);
        } else {
            console.log("Das ist leider falsch.. Lern noch ein bisschen weiter.");
            sc = callback(false);
        }
        console.log("Deine aktuelle Punktzahl beträgt: " + sc);
        console.log("=========================================================");
    };

    var questions = [
        new Question("Wer ist der aktuelle amerikanische Präsident?", ["George W. Bush", "Barack Obama", "Donald Trump"], 2),
        new Question("Welcher Virus ist gerade weltweit relevant?", ["Ebola", "Vogelgrippe", "Corona", "Masern"], 2),
        new Question("Wie viele Gliedmaßen haben Elefanten?", ["2", "5", "4"], 1),
        new Question("Wie viele Tasten hat ein Klavier?", ["66", "88", "72"], 1)
    ];

    function nextQuestion() {
        var rndm = Math.floor(Math.random() * questions.length);
        questions[rndm].log();
        var userInput = prompt("Bitte gib die Zahl deiner Antwort ein. Möchtest du nicht mehr weiter spielen gib 'Beenden' ein.");
        if (userInput.toLowerCase() != 'beenden') {
            questions[rndm].checkAnswer(parseInt(userInput), keepScore);
            nextQuestion();
        } else {
            console.log("Das Spiel wurde beendet. Deine Gesamtpunktzahl ist: " + keepScore(false));
        }
    }

    nextQuestion();

})();