'use strict';

$(document).ready(function() {
    
    // VARIABLES - It aint my birthday but I got my name on the cake.
    // ====================================================================================
        const questions = [
            {
                questionText: "Question One",
                options: [ "One", "Two", "Three"],
                correctAnswer: "One"
            },
            
            {
                questionText: "Question Two",
                options: ["One", "Two", "Three"],
                correctAnswer: "Two"
            }
        ]
        
        let timeRemaining = 120
        let countdownID = -1;
        

    // FUCNTIONS - What we doin'? Gettin' money. What they doin'? Hatin' on us.
    // =============================================================================================
       
    // Game over - ends game when all questions are answerd or time runs out
        function gameOver(){
            clearInterval(countdownID)
            let correctCounter = 0
            let wrongCounter = 0
            let missedCounter = 0

            // figure out the score
            for (let i = 0; i < questions.length; i++) {
                const selectedOption = $(`#answers-${i}`).children(":checked").val()

                 if (selectedOption === "") {
                     missedCounter++;
                 } else if (selectedOption === questions[i].correctAnswer) {
                     correctCounter++;
                 } else {
                    wrongCounter++;
                }
             }

            // Display the score
            $("#total").text(`Total: ${10 - wrongCounter - missedCounter}`);
            $("#correct").text(`Correct: ${correctCounter}`);
            $("#incorrect").text(`Wrong: ${wrongCounter}`);
            $("#missed").text(`Missed: ${missedCounter}`);


            // Hide timer, questions, answers, and responses.
            $("#question-view").hide();
            $("#count-down").hide();
            $("#end-game").hide();
            $("#game-title").hide();

            //Show game over message and score
            $("#game-over-banner").show();
            $("#score").show();

            //Display New Game button
            $("#new-game").show();
        };
        
        //Starts countdown timer
        function startCountdown(){

            // Show count down timer
            $("#count-down").show();
            $("#count-down").text(timeRemaining);

            //Update count down timer every second
            countdownID = setInterval(countDown, 1000)
        };

        //Reduce time remaining by one and display new count on DOM
        function countDown(){
            
            if (timeRemaining > 0) {
                timeRemaining --;
                $("#count-down").text(timeRemaining);
            } else {
                gameOver();
            }
        };

        //reset radio buttons
        function resetResponses(){
        
            //iterate over question array
           for (let i = 0; i < questions.length; i++) {

                // find any selected radio's
                const selectedOption = $(`#answers-${i}`).children(":checked");

                //uncheck them
                selectedOption.prop('checked', false);
            };
        };
        
        //Put questions and answers on DOM
        function displayQuestions() {

            //iterate over question array
            for (let i = 0; i < questions.length; i++) {
                    
                // create new div and ID for each question
                let questionDiv = $(`<div class="col-md-offset-5 col-md-2 text-center" id="question-${i}">`);
                    
                // Place each question's text within its div
                questionDiv.text(questions[i].questionText);

                // Append div to DOM
                $("#question-view").append(questionDiv);

                // create div to hold each question's answers
                let answerDiv = $(`<form><div class="answerDiv row" id="answers-${i}">`);

                // append answerDiv to questionDiv
                $("#question-" + i).append(answerDiv);

                // Create array that consists of the incorrect answers + the correct answer and randomize it
                // questionAnswers = shuffle(question[i].incorrect_answers.push(correct_answer))
                let questionAnswers = questions[i].options;

                // Iterate through the answerIndex for each question
                for (let j = 0; j < questionAnswers.length; j++) {
                        
                    // Create new radio for each answer
                    let answerButton  = $(`<input type="radio" value="${questionAnswers[j]}" name="answer-${i}" id="answer-${j}">${questionAnswers[j]}<br>`);

                    // Append new buttons to answer div
                    $("#answers-" + i).append(answerButton);
                };
            };
        };
    

    // MAIN Process - Stuntin' like my daddy.
    // ====================================================================================
        // Initial set up - hide the kids! hide everything!
        $("#game-over-banner").hide();
        $("#new-game").hide();
        $("#end-game").hide();
        $("#game-over-banner").hide();
        $("#score").hide();

        // When user clicks start initiate everything
        $("#start-game").on("click", function(event) {
            
            // remove startGame button
            $("#start-game").hide();

            // Display questions and answer options on DOM
            displayQuestions();

            // Start countdown clock
            startCountdown();

            $("#end-game").show();
        });

        // End the game if user clicks "I'm Done!"
        $("#end-game").on("click", function(event) {

            gameOver();

        });


        // When the user clicks reset, reset game.
        $("#new-game").on("click", function(event) {
           
            //Remove score and game over banner
            $("#game-over-banner").hide();
            $("#new-game").hide();
            $("#score").hide();

            
            //Replace question view, end game button and title
            $("#question-view").show();
            $("#game-title").show();
            $("#end-game").show();

            //Reset score counters
            resetResponses();

            //reset time counter
            timeRemaining = 120

            // start countdown clock
            startCountdown();
        });
            
});