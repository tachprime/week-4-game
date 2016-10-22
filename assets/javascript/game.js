var player;
var enemy;
var fighterChosen = false;
var enemyChosen = false;
var enemiesLeft = 3;
var FighterOne;
var FighterTwo;
var FighterThree;
var FighterFour;
var fightersList = [];

function startFighters() {
        FighterOne = {
            name: "Raphael",
            health: 120,
            attack: 8,
            counter: 10,
            img: "assets/images/raphael.gif",
            
            increaseAttack: function() {
                this.attack += 8;
            }
        };
    
        FighterTwo = {
            name: "Michealangelo",
            health: 100,
            attack: 10,
            counter: 5,
            img: "assets/images/michealangelo.gif",
            
            increaseAttack: function() {
                this.attack += 10;
            }
        };
    
        FighterThree = {
            name: "Donatello",
            health: 150,
            attack: 4,
            counter: 20,
            img: "assets/images/donatello.gif",
            
            increaseAttack: function() {
                this.attack += 4;
            }
        };
    
        FighterFour = {
            name: "Leonardo",
            health: 180,
            attack: 7,
            counter: 25,
            img: "assets/images/leonardo.gif",
            
            increaseAttack: function() {
                this.attack += 7;
            }
        };
    
    fightersList = [FighterOne, FighterTwo, FighterThree, FighterFour];
}

function showFigthers() {
    for (var i = 0; i < fightersList.length; i++){
        //create div for player cards
        var fighterDiv = $('<div>');
        fighterDiv.addClass('fighter-card fighter-player');
        fighterDiv.attr('id', fightersList[i].name);
        fighterDiv.data('fighter', fightersList[i]);
        $('.fightersArea').append(fighterDiv);
        
        //display names;
        var name = $('<p>');
        name.text(fightersList[i].name);
        $(fighterDiv).append(name);
        
        //create images for player cards
        var fighterImg = $('<img>');
        fighterImg.attr('src', fightersList[i].img);
        fighterImg.addClass("fighter");
        
        //attach images to div
        $('#'+fightersList[i].name).append(fighterImg);
        
        //display health
        var health = $('<p>');
        health.addClass('health-'+ fightersList[i].name);
        health.text(fightersList[i].health);
        $(fighterDiv).append(health);
    }
}

function chooseFighter() {
    $(".fighter-player").on("click", function() {
        //get ID of current image
        var currentFighter = $(this).attr('id');
        
        if (!fighterChosen) {
            for (var i = 0; i < fightersList.length; i++) {
                if($(this).attr('id') == fightersList[i].name){
                    player = fightersList[i];
                }
            }
            
            fighterChosen = true;
            moveToEnemyArea();
            playGame();
        }
    });
}

function chooseEnemy() {
    $(".fighter-enemy").on("click", function() {
        //get ID of current image
        var currentFighter = $(this).attr('id');
        
        if (fighterChosen && !enemyChosen) {
            for (var i = 0; i < fightersList.length; i++) {
                if($(this).attr('id') == fightersList[i].name){
                    enemy = fightersList[i];
                }
            }
            enemyChosen = true;
            moveToDefenderArea();
        }
    });
}

function moveToEnemyArea() {
    for (var i = 0; i < fightersList.length; i++) {
        if (player != fightersList[i]) {
            $('#'+ fightersList[i].name).removeClass('fighter-player').addClass('fighter-enemy');
            $('#'+ fightersList[i].name).appendTo('.enemyArea');
        }
    }
}

function moveToDefenderArea() {
    $("#"+ enemy.name).addClass('figther-defender');
    $("#"+ enemy.name).appendTo('.defenderArea');
}

function reset() {
    fighterChosen = false;
    enemyChosen = false;
    playerDead = false;
    enemyDead = false;
    enemiesLeft = 3;
    fightersList = [];
    $('.fighter-card').remove();
    $('#restartBtn').remove();
    $('.log').remove();
    
    startFighters();
    showFigthers();
    playGame();
}

function showRestartBtn() {
    var restartBtn = $('<button>');
    restartBtn.text("Restart");
    restartBtn.attr('id', "restartBtn");
    $('.defenderSection').append(restartBtn);
    
    $('#restartBtn').on("click", function() {
       reset(); 
    });
}

function updateHealth() {
    $('.health-' + player.name).text(player.health);
    $('.health-' + enemy.name).text(enemy.health);
}

function fightLog() {
    var atk = player.name + " Attacked " + enemy.name + " for " + player.attack + " damage. " + enemy.name + " counter hits for " + enemy.counter;
    var loss = "You lost hit restart to try again";
    var won = "You won congratualtions";
    var log = $('<p>');
    log.addClass('log');
    
    if (player.health > 0 && enemy.health > 0) {
        $('.log').empty();
        log.text(atk);
    } else if (player.health <= 0) {
        $('.log').empty();
        log.text(loss);
    } else if (enemy.health <= 0) {
        $('.log').empty();
        log.text(enemy.name + " is defeated");
    }
    
    if (enemiesLeft == 0) {
        log.text(won);
         $('.log').empty();
    }
    $('.fightLog').append(log);
}

function attack() {
    enemy.health -= player.attack;
    player.increaseAttack();
    
    if (player.health > 0) {
        //if enemy is alive counter-attack back
        if (enemy.health > 0) {
            player.health -= enemy.counter;
            updateHealth();
        } else if (enemy.health <= 0) {
            enemiesLeft--;
            $('#'+enemy.name).remove();
            enemyChosen = false;
            
            if (enemiesLeft == 0) {
                showRestartBtn();
            }   
        }
        if (player.health <= 0){
            showRestartBtn();
        } 
    }else {
        fighterChosen = false;
    }
    
    fightLog();
}

$('#attackBtn').on("click", function() {
    if (fighterChosen && enemyChosen) {
            attack();
    }
});

$(document).ready(function() {
    startFighters();
    showFigthers();
    playGame();
});

function playGame() {
    chooseFighter();
    chooseEnemy();
}