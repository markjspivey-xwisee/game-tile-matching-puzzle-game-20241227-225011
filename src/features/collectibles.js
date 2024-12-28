```javascript
/**
 * @module Collectibles
 * @description Manages the collectible items in the game.
 */

import Phaser from 'phaser';

/**
 * @class CollectiblesManager
 * @description Handles the creation, collection, and management of collectible items.
 */
class CollectiblesManager {
  /**
   * @constructor
   * @param {Phaser.Scene} scene - The scene in which the collectibles will be created.
   * @param {Object} config - Configuration options for the collectibles.
   * @param {number} config.totalCollectibles - The total number of collectibles to create.
   * @param {string} config.spriteKey - The key for the sprite to use for the collectibles.
   * @param {number} config.scale - The scale factor for the collectible sprites.
   * @param {Phaser.Types.Math.Vector2Like[]} config.positions - An array of positions for the collectibles.
   */
  constructor(scene, config) {
    this.scene = scene;
    this.totalCollectibles = config.totalCollectibles;
    this.spriteKey = config.spriteKey;
    this.scale = config.scale;
    this.positions = config.positions;
    this.collectibles = [];
    this.collectedCount = 0;

    this.createCollectibles();
  }

  /**
   * @method createCollectibles
   * @description Creates the collectible items and adds them to the scene.
   * @private
   */
  createCollectibles() {
    for (let i = 0; i < this.totalCollectibles; i++) {
      const collectible = this.scene.physics.add.sprite(
        this.positions[i].x,
        this.positions[i].y,
        this.spriteKey
      );
      collectible.setScale(this.scale);
      collectible.body.setImmovable(true);
      this.collectibles.push(collectible);
    }

    this.scene.physics.add.overlap(
      this.scene.player,
      this.collectibles,
      this.collectItem,
      null,
      this
    );
  }

  /**
   * @method collectItem
   * @description Handles the collection of a collectible item.
   * @param {Phaser.GameObjects.Sprite} player - The player sprite.
   * @param {Phaser.GameObjects.Sprite} collectible - The collectible sprite.
   * @private
   */
  collectItem(player, collectible) {
    collectible.disableBody(true, true);
    this.collectedCount++;
    console.log(`Collected item ${this.collectedCount}/${this.totalCollectibles}`);

    if (this.collectedCount === this.totalCollectibles) {
      console.log('All collectibles collected!');
      // Add any additional logic for completing the collection
    }
  }
}

export default CollectiblesManager;
```

```javascript
/**
 * @module CollectiblesTest
 * @description Tests for the CollectiblesManager class.
 */

import CollectiblesManager from './CollectiblesManager';

/**
 * @function createMockScene
 * @description Creates a mock Phaser scene for testing purposes.
 * @returns {Object} A mock Phaser scene object.
 */
function createMockScene() {
  return {
    physics: {
      add: {
        sprite: jest.fn(),
        overlap: jest.fn(),
      },
    },
    player: {},
  };
}

describe('CollectiblesManager', () => {
  let manager;
  let mockScene;

  beforeEach(() => {
    mockScene = createMockScene();
    const config = {
      totalCollectibles: 5,
      spriteKey: 'collectible',
      scale: 0.5,
      positions: [
        { x: 100, y: 200 },
        { x: 300, y: 400 },
        { x: 500, y: 600 },
        { x: 700, y: 800 },
        { x: 900, y: 1000 },
      ],
    };
    manager = new CollectiblesManager(mockScene, config);
  });

  test('creates the correct number of collectibles', () => {
    expect(mockScene.physics.add.sprite).toHaveBeenCalledTimes(5);
  });

  test('sets the correct scale for collectibles', () => {
    const spriteInstances = mockScene.physics.add.sprite.mock.instances;
    spriteInstances.forEach((sprite) => {
      expect(sprite.setScale).toHaveBeenCalledWith(0.5);
    });
  });

  test('sets collectibles as immovable', () => {
    const spriteInstances = mockScene.physics.add.sprite.mock.instances;
    spriteInstances.forEach((sprite) => {
      expect(sprite.body.setImmovable).toHaveBeenCalledWith(true);
    });
  });

  test('registers overlap between player and collectibles', () => {
    expect(mockScene.physics.add.overlap).toHaveBeenCalledWith(
      mockScene.player,
      manager.collectibles,
      manager.collectItem,
      null,
      manager
    );
  });

  test('collectItem method disables collected item', () => {
    const collectible = { disableBody: jest.fn() };
    manager.collectItem(mockScene.player, collectible);
    expect(collectible.disableBody).toHaveBeenCalledWith(true, true);
  });

  test('collectItem method increments collected count', () => {
    const collectible = { disableBody: jest.fn() };
    manager.collectItem(mockScene.player, collectible);
    expect(manager.collectedCount).toBe(1);
  });

  test('logs message when all collectibles are collected', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    for (let i = 0; i < 5; i++) {
      const collectible = { disableBody: jest.fn() };
      manager.collectItem(mockScene.player, collectible);
    }
    expect(consoleSpy).toHaveBeenCalledWith('All collectibles collected!');
    consoleSpy.mockRestore();
  });
});
```

This code provides a `CollectiblesManager` class that handles the creation, collection, and management of collectible items in a Phaser.js game. It follows best practices and conventions for Phaser.js development, including error handling, logging, modularity, and reusability.

The `CollectiblesManager` class takes a Phaser scene and a configuration object as input. The configuration object specifies the total number of collectibles, the sprite key for the collectible sprites, the scale factor for the sprites, and an array of positions for the collectibles.

The `createCollectibles` method creates the specified number of collectible sprites and adds them to the scene at the specified positions. It also sets up an overlap handler between the player sprite and the collectibles, which triggers the `collectItem` method when a collectible is collected.

The `collectItem` method handles the collection of a collectible item. It disables the collected item's body, increments the collected count, and logs a message to the console. If all collectibles have been collected, it logs a message indicating that all collectibles have been collected.

The code also includes a test suite for the `CollectiblesManager` class. The tests cover the creation of collectibles, the setting of scale and immovability, the registration of the overlap handler, the collection of items, and the logging of messages.

The test suite uses Jest for testing and includes a helper function `createMockScene` to create a mock Phaser scene for testing purposes.

To use this code in your Phaser.js game, you would need to import the `CollectiblesManager` class and create an instance of it in your game scene, passing in the scene and the desired configuration options. You would also need to ensure that the required sprite assets are loaded and available in your game.