var playing = false;
var score = 0;

var timer = 0;
var correctAnswer;

document.getElementById("start-reset").onclick = function(){
    //start reset button clicked function
    
    //checking we playing or not
    if(playing == true){
        location.reload(); //refresh the page
    }
    
    else{//not playing
        playing = true;
        score = 0;
        document.getElementById("score-value").innerHTML = score;
        document.getElementById("start-reset").innerHTML = "Reset Game";
        hide("game-over");
        show("time-remaining");
        timer = 60;
        document.getElementById("time-value").innerHTML = timer;
        startTimer();
        generateQA();
    }
}

function startTimer(){
    var action = setInterval(function(){
       timer -= 1;
        document.getElementById("time-value").innerHTML = timer;
        if(timer == 0){
            clearInterval(action);
            document.getElementById("game-over").innerHTML = "<p> GAME OVER! </p> <p> Your Score is " + score + ".</p>";
            show("game-over");
            hide("time-remaining");
            playing = false;
            document.getElementById("start-reset").innerHTML = "Start game";
        }   
    }, 1000);
}

function show(id){
    document.getElementById(id).style.display = "block";
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    
    document.getElementById("question").innerHTML = x + " x " + y;

    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    for(i=1;i<5;i++){
        
        if(i!=correctPosition){
            
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));        
            }while(answers.indexOf(wrongAnswer) > -1)
            
            answers.push(wrongAnswer);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
        }
    }
}

for(i = 1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("score-value").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                
                generateQA();
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}