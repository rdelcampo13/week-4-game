$(document).ready(function() {

// VARIABLES
// ------------------------------------------------------------------------

  var playerBankClone = $("#playerBank").clone();

  var game = {
    fighter: '',
    defender: '',
    enemies: [],
    playerChoices: ['goku', 'vegeta', 'buu', 'hercule'],

    characters: {
      goku: {
        name: 'Goku',
        health: 180,
        attack: 16,
        attackIncrease: 12,
        counterAttack: 32,
      },

      vegeta: {
        name: 'Vegeta',
        health: 180,
        attack: 12,
        attackIncrease: 14,
        counterAttack: 28,
      },

      buu: {
        name: 'Majin Buu',
        health: 190,
        attack: 20,
        attackIncrease: 10,
        counterAttack: 26,
      },

      hercule: {
        name: 'Hercule',
        health: 170,
        attack: 8,
        attackIncrease: 34,
        counterAttack: 16,
      },
    },
  };



// FUNCTIONS
// ------------------------------------------------------------------------

  function attack(fighter, defender) {
    // If fighter or defender are empty, kill the function
    if (fighter === '' || defender === '') {
      return;
    };

    // Fighter attacks defender
    // Defender health decreases by fighter's attack
    game.characters[defender].health -= game.characters[fighter].attack;

    // Print defender health and attack to the DOM
    $('#' + defender + '-health').html("Health: " + game.characters[defender].health);
    $('#' + defender + '-attack').html("Attack: " + game.characters[defender].counterAttack);

    // Print defender damage
    $('#fighter-damage').html("You attacked " + game.characters[defender].name + " for " + game.characters[fighter].attack + " damage.");

    // Print fighter damage
    $('#defender-damage').html(game.characters[defender].name + " attacked you back for " + game.characters[defender].counterAttack + " damage.");




    // If all defenders are dead
    if (game.characters[game.enemies[0]].health <=0 && game.characters[game.enemies[1]].health <=0 && game.characters[game.enemies[2]].health <=0) {

      // Print message to the DOM
      $("#message").html("You are the world champion! <br> Press restart to play again.");

      // Print world champion to fighter's health
      $('#' + fighter + '-health').html('World Champion');

      // Clear fighter's attack
      $('#' + fighter + '-attack').html('');

      // Print defeated to defender's health
      $('#' + defender + '-health').html('Defeated');

      // Print defeated to defender's health
      $('#' + defender + '-attack').html('');

      // Clear defender damage message
      $('#fighter-damage').html("");

      // Clear fighter damage message
      $('#defender-damage').html("");

      // Hide the player bank
      $("#playerBank").attr("class", "row hide");

      // Hide the attack button
      $("#attack").attr("class", "btn btn-primary btn-lg btn-block hide");

      // Append the restart button to the button bank
      $("#button-bank").append("<button type='button' class='btn btn-primary btn-lg btn-block' id='restart'>Restart</button>");

      // Kill the if statement
      return;

    };


    // If the defender health is 0 or less
    if (game.characters[defender].health <= 0) {

      // Empty the defender div
      $("#defender").empty();

      // Empty the defender variable in the game oject
      game.defender = '';

      // Print message to the DOM
      $("#message").html("You defeated " + game.characters[defender].name + "! <br> Select the next defender!");

      // Clear defender damage message
      $('#fighter-damage').html("");

      // Clear fighter damage message
      $('#defender-damage').html("");

      // Hide the attack button
      $("#attack").attr("class", "btn btn-primary btn-lg btn-block hide")

      // Kill the if statement
      return;
    };

    // Defender attacks fighter
    // Fighter health decreases by defender's attack
    game.characters[fighter].health -= game.characters[defender].counterAttack;

    // Print fighter health and attack to the DOM
    $('#' + fighter + '-health').html("Health: " + game.characters[fighter].health);
    $('#' + fighter + '-attack').html("Attack: " + game.characters[fighter].attack);

    // Fighter attack increases by attackIncrease
    game.characters[fighter].attack += game.characters[fighter].attackIncrease;


    // If fighters health is <= 0
    if (game.characters[fighter].health <= 0) {

      // Print message to the DOM
      $("#message").html("You were defeated. <br> Press restart to play again.");

      // Print defeated to fighter's health
      $('#' + fighter + '-health').html('Defeated');

      // Clear defender attack
      $('#' + fighter + '-attack').html("");

      // Clear defender damage message
      $('#fighter-damage').html("");

      // Clear fighter damage message
      $('#defender-damage').html("");

      // Hide the player bank
      $("#playerBank").attr("class", "row hide");

      // Hide the attack button
      $("#attack").attr("class", "btn btn-primary btn-lg btn-block hide");

      // Append the restart button to the button bank
      $("#button-bank").append("<button type='button' class='btn btn-primary btn-lg btn-block' id='restart'>Restart</button>");

      // Kill the if statement
      return;

    };

  };

  function resetGame() {
    $("#playerBank").replaceWith(playerBankClone.clone());

    game = {
      fighter: '',
      defender: '',
      enemies: [],
      playerChoices: ['goku', 'vegeta', 'buu', 'hercule'],

      characters: {
        goku: {
          name: 'Goku',
          health: 180,
          attack: 16,
          attackIncrease: 12,
          counterAttack: 32,
        },

        vegeta: {
          name: 'Vegeta',
          health: 180,
          attack: 12,
          attackIncrease: 14,
          counterAttack: 28,
        },

        buu: {
          name: 'Majin Buu',
          health: 190,
          attack: 20,
          attackIncrease: 10,
          counterAttack: 26,
        },

        hercule: {
          name: 'Hercule',
          health: 170,
          attack: 8,
          attackIncrease: 34,
          counterAttack: 16,
        },
      },

    };

    $("#selectedPlayer").empty();
    $("#defender").empty();

    $("#fighterBank").attr("class", "row hide");
    $("#defenderBank").attr("class", "row hide");

    $("#playerBank").attr("class", "row");
    // $("#attack").attr("class", "btn btn-primary btn-lg btn-block");
    $("#restart").remove();
    $("#message").html("Select at fighter to begin!");
    $("#playerBankTitle").html("Players:");

  };



// MAIN PROCESSES
// ------------------------------------------------------------------------

  $('#goku-health').html("Health: " + game.characters.goku.health);
  $('#goku-attack').html("Attack: " + game.characters.goku.attack);
  $('#vegeta-health').html("Health: " + game.characters.vegeta.health);
  $('#vegeta-attack').html("Attack: " + game.characters.vegeta.attack);
  $('#buu-health').html("Health: " + game.characters.buu.health);
  $('#buu-attack').html("Attack: " + game.characters.buu.attack);
  $('#hercule-health').html("Health: " + game.characters.hercule.health);
  $('#hercule-attack').html("Attack: " + game.characters.hercule.attack);

  // Choose a player
  $(document).on("click", ".players", function(){

    // If figher is empty
    if (game.fighter === '') {

      // Set fighter equal to element value
      game.fighter = $(this).data('player');
      $("#fighterBank").attr("class", "row");
      $(this).appendTo("#selectedPlayer");
      $(this).css("border-color", "green");
      $("#playerBankTitle").html("Enemies:");
      $("#message").html("Choose a defender!");

      // For every element in playerChoices
      game.playerChoices.forEach(function(player) {

        // If the current element does not equal fighter
        if (player !== game.fighter) {

          // Push to the enemies array
          game.enemies.push(player);
          $("#" + player).css("border-color", "red");
          $("#" + player + "-attack").html("Attack: " + game.characters[player].counterAttack);

        };
      });

    // If fighter is defined, then if selected element isn't fighter and defender is empty
    } else if ($(this).data('player') !== game.fighter && game.defender === '') {

      // Choose a defender
      game.defender = $(this).data('player');
      $("#defenderBank").attr("class", "row");
      $(this).appendTo("#defender");
      $("#message").html("Fight!");
      $("#attack").attr("class", "btn btn-primary btn-lg btn-block");

    };

  });

  $(document).on('click', '#attack', function(){

    attack(game.fighter, game.defender);

  });

  $(document).on('click', '#restart', function(){

    resetGame();

    $('#goku-health').html("Health: " + game.characters.goku.health);
    $('#goku-attack').html("Health: " + game.characters.goku.attack);
    $('#vegeta-health').html("Health: " + game.characters.vegeta.health);
    $('#vegeta-attack').html("Health: " + game.characters.vegeta.attack);
    $('#buu-health').html("Health: " + game.characters.buu.health);
    $('#buu-attack').html("Health: " + game.characters.buu.attack);
    $('#hercule-health').html("Health: " + game.characters.hercule.health);
    $('#hercule-attack').html("Health: " + game.characters.hercule.attack);

  });

});
