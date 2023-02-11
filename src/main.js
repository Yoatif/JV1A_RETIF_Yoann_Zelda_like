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
      scene: [titleScreen,scene1,scene2,gameOver,gameWin]
    }
  
  var game = new Phaser.Game(config);