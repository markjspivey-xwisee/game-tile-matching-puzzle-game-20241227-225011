```javascript
/**
 * @file powerups.js
 * @author [Your Name] <[your.email@example.com]>
 * @description Handles the creation, management, and application of powerups in the game.
 */

/**
 * @class PowerupManager
 * @description Manages the creation, activation, and deactivation of powerups.
 */
class PowerupManager {
  /**
   * @constructor
   * @param {Phaser.Scene} scene - The scene in which the powerups will be created.
   * @param {Object} powerupData - An object containing data for each powerup type.
   */
  constructor(scene, powerupData) {
    this.scene = scene;
    this.powerupData = powerupData;
    this.activePowerups = [];
  }

  /**
   * @method createPowerup
   * @param {string} type - The type of powerup to create.
   * @param {number} x - The x-coordinate at which to create the powerup.
   * @param {number} y - The y-coordinate at which to create the powerup.
   * @description Creates a new powerup of the specified type at the given coordinates.
   */
  createPowerup(type, x, y) {
    if (!this.powerupData[type]) {
      console.warn(`Powerup type "${type}" not found in powerup data.`);
      return;
    }

    const powerupData = this.powerupData[type];
    const powerup = this.scene.physics.add.sprite(x, y, powerupData.spriteKey);
    powerup.setData('type', type);
    powerup.setData('duration', powerupData.duration);
    powerup.setData('effect', powerupData.effect);
    powerup.body.setImmovable(true);

    this.scene.physics.add.overlap(
      this.scene.player,
      powerup,
      this.activatePowerup.bind(this),
      null,
      this
    );
  }

  /**
   * @method activatePowerup
   * @param {Phaser.GameObjects.Sprite} player - The player sprite.
   * @param {Phaser.GameObjects.Sprite} powerup - The powerup sprite.
   * @description Activates the powerup and applies its effect to the player.
   */
  activatePowerup(player, powerup) {
    const type = powerup.getData('type');
    const duration = powerup.getData('duration');
    const effect = powerup.getData('effect');

    powerup.disableBody(true, true);

    const activePowerup = {
      type,
      duration,
      effect,
      expirationTime: this.scene.time.now + duration,
    };

    this.activePowerups.push(activePowerup);
    effect(player, true);

    this.scene.time.delayedCall(
      duration,
      this.deactivatePowerup.bind(this),
      [activePowerup, player],
      this
    );
  }

  /**
   * @method deactivatePowerup
   * @param {Object} activePowerup - The active powerup object.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite.
   * @description Deactivates the powerup and removes its effect from the player.
   */
  deactivatePowerup(activePowerup, player) {
    const index = this.activePowerups.indexOf(activePowerup);
    if (index !== -1) {
      this.activePowerups.splice(index, 1);
      activePowerup.effect(player, false);
    }
  }

  /**
   * @method update
   * @param {number} time - The current time in milliseconds.
   * @param {number} delta - The delta time in milliseconds since the last frame.
   * @description Updates the active powerups and deactivates any that have expired.
   */
  update(time, delta) {
    const expiredPowerups = this.activePowerups.filter(
      (powerup) => time >= powerup.expirationTime
    );

    expiredPowerups.forEach((powerup) => {
      this.deactivatePowerup(powerup, this.scene.player);
    });
  }
}

/**
 * @module powerups
 * @description Exports the PowerupManager class.
 */
export default PowerupManager;
```

This code defines a `PowerupManager` class that handles the creation, activation, and deactivation of powerups in the game. Here's a breakdown of the code:

1. The `PowerupManager` constructor takes a reference to the current scene and an object containing data for each powerup type.
2. The `createPowerup` method creates a new powerup sprite of the specified type at the given coordinates. It sets up collision detection between the player and the powerup, and binds the `activatePowerup` method as the callback function.
3. The `activatePowerup` method is called when the player collides with a powerup. It applies the powerup's effect to the player, adds the powerup to the list of active powerups, and sets a timer to deactivate the powerup after its duration has elapsed.
4. The `deactivatePowerup` method is called when a powerup's duration has expired. It removes the powerup from the list of active powerups and deactivates its effect on the player.
5. The `update` method is called on each game loop iteration. It checks for any expired powerups and deactivates them.

The code also includes JSDoc comments for documentation and follows best practices for error handling, modularity, and reusability.

Note: You will need to provide the `powerupData` object containing the necessary data for each powerup type, such as the sprite key, duration, and effect function. Additionally, you may need to adjust the code to fit your specific game structure and requirements.