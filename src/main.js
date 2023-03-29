var config = {
    width: 5120,
    height: 3072,
    parent: "game-container",
    physics: {
          default: 'arcade',
          arcade: {
            
              gravity: { y: 0 },
              debug: true
          }
      },
      pixelArt: true,      
      scene: [Titlescreen,Info,Scene1]
    }
  
  var game = new Phaser.Game(config);