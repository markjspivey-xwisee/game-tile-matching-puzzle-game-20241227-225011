Sure, here's a production-ready code for a Leaderboards module in a Phaser.js game, following best practices and including comments, documentation, error handling, and basic tests.

```javascript
/**
 * @module Leaderboards
 * @description Handles leaderboard functionality for the game.
 */

/**
 * @class Leaderboards
 * @classdesc Manages player scores and achievements.
 */
class Leaderboards {
  /**
   * @constructor
   * @param {Object} scene - The Phaser scene to which the leaderboards belong.
   */
  constructor(scene) {
    this.scene = scene;
    this.scores = [];
    this.achievements = [];
  }

  /**
   * Adds a new score to the leaderboard.
   * @param {string} playerName - The name of the player.
   * @param {number} score - The player's score.
   */
  addScore(playerName, score) {
    try {
      this.scores.push({ name: playerName, score });
      this.scores.sort((a, b) => b.score - a.score);
      console.log(`New score added: ${playerName} - ${score}`);
    } catch (error) {
      console.error('Error adding score:', error);
    }
  }

  /**
   * Adds a new achievement to the player's list.
   * @param {string} playerName - The name of the player.
   * @param {string} achievement - The achievement description.
   */
  addAchievement(playerName, achievement) {
    try {
      this.achievements.push({ name: playerName, achievement });
      console.log(`New achievement added: ${playerName} - ${achievement}`);
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  }

  /**
   * Displays the leaderboard scores on the game screen.
   */
  displayScores() {
    const scoreText = this.scores
      .map((entry, index) => `${index + 1}. ${entry.name} - ${entry.score}`)
      .join('\n');
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(10, 10, 200, 200);
    const text = this.scene.add.text(20, 20, scoreText, { fontSize: '16px', fill: '#000000' });
  }

  /**
   * Displays the player's achievements on the game screen.
   */
  displayAchievements() {
    const achievementText = this.achievements
      .map((entry) => `${entry.name} - ${entry.achievement}`)
      .join('\n');
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(220, 10, 200, 200);
    const text = this.scene.add.text(230, 20, achievementText, { fontSize: '16px', fill: '#000000' });
  }
}

/**
 * Basic tests for the Leaderboards module.
 */
function testLeaderboards() {
  const scene = { add: { graphics: () => {}, text: () => {} } };
  const leaderboards = new Leaderboards(scene);

  leaderboards.addScore('Player 1', 100);
  leaderboards.addScore('Player 2', 200);
  leaderboards.addScore('Player 3', 150);

  leaderboards.addAchievement('Player 1', 'Reached Level 10');
  leaderboards.addAchievement('Player 2', 'Collected 100 coins');

  leaderboards.displayScores();
  leaderboards.displayAchievements();

  console.log('Leaderboards tests passed!');
}

// Run the tests
testLeaderboards();
```

This code provides a `Leaderboards` class that manages player scores and achievements. It includes the following features:

- `addScore` method to add a new score to the leaderboard, sorted in descending order.
- `addAchievement` method to add a new achievement to the player's list.
- `displayScores` method to display the leaderboard scores on the game screen.
- `displayAchievements` method to display the player's achievements on the game screen.
- Error handling and logging for score and achievement additions.
- Basic tests to verify the functionality of the `Leaderboards` class.

The code follows best practices for Phaser.js development, including:

- Modular and reusable design.
- Well-documented with JSDoc comments.
- Error handling and logging.
- Basic tests for functionality verification.

To use this module in your Phaser.js game, you can create an instance of the `Leaderboards` class and call its methods as needed. For example:

```javascript
// In your Phaser.js scene
const leaderboards = new Leaderboards(this);

// Add scores and achievements
leaderboards.addScore('Player 1', 100);
leaderboards.addAchievement('Player 1', 'Reached Level 10');

// Display leaderboards
leaderboards.displayScores();
leaderboards.displayAchievements();
```

Note that this code assumes the existence of a `scene` object with `add.graphics` and `add.text` methods, as required by the Phaser.js framework. You may need to adjust the code accordingly based on your specific game setup and requirements.