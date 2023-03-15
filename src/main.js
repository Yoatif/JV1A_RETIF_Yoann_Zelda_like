var config = {
    width: 1600,
    height: 800,
    parent: "game-container",
    physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 0 },
              debug: true
          }
      },
      scene: [Titlescreen,Info,Scene1]
    }
  
  var game = new Phaser.Game(config);