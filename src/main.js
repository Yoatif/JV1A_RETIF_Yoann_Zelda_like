var config = {
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 0 },
              debug: false
          }
      },
      scene: [Titlescreen]
    }
  
  var game = new Phaser.Game(config);