
class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }

  

  let questions = [
    new Question("Une conduite apaisé :", ["Abime le moteur", "Limite la consommation de carburant", "Augmente la prise de risque", "Aucune idée"],"Limite la consommation de carburant"),
    new Question("Je suis sur une route prioritaire, je dois laisser la priorité à ?", ["A gauche","A droite", "Personne", "Aucune idée"], "Personne"),
    new Question("Sur autoroute lorsqu'il pleut je peux rouler à" , ["110 km/h","90 km/h", "130 km/h", "Aucune idée"], "110 km/h"),
    new Question("Si je suis sur la route nationale 7, je verrais ?" , ["A7","N7", "D7", "Aucune idée"], "N7"),
    new Question("De quelle couleur sont les panneaux provisoire ?", ["Rouges bandes blanches","Blancs bandes rouges", "Jaunes bandes rouges", "Aucune idée"], "Jaunes bandes rouges"),
    new Question("Un extincteur est obligatoire dans ?", ["Les motos","Les poids lourds", "Les voitures", "Aucune idée"], "Les poids lourds"),
    new Question("A partir de quelle cylindrée faut il avoir le permis moto ?", ["80cm3","125cm3", "50cm3", "450cm3"], "125cm3"),
    new Question("Vous roulez en ville à 50 Km/h, quelle distance vous est absolument nécessaire pour stopper votre véhicule ?", ["8 m","16 m", "26 m","30 m "], "26 m"),
    new Question("Lorsque je dois doubler un véhicule, dans quel rétroviseur dois-je regarder ?", ["Le gauche (coté conducteur) et le central","Les 3 rétroviseurs (droite, gauche et central)", "Le droit (coté passager) et le central", "Aucune idée"], "Le gauche (coté conducteur) et le central"),
    new Question("Comment sait on lorsque l'on doit changer les pneus sur un véhicule ?", ["Lorsque l'on se fait arrêter par les forces de l'ordre","Lorsque le véhicule a une mauvaise tenue de route", "Aucune idée", "Au témoin d'usure"], "Au témoin d'usure")
  ];
  
  console.log(questions);
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  // Regroup all  functions relative to the App Display
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // display choices and handle guess
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();
  
  console.log(quiz);
  
  