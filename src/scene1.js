class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
        this.coordPlayerX = 100;
        this.coordPlayerY = 100;
            
    }
    
    preload(){

        //preload diffent asset of the map
        this.load.image("sol","../assets/map1/sol.png");

        //creating player for test
        

    }

    create(){
        console.log("first map")
        this.add.image(800,400,"sol");
        
        this.scene.add('Character', Character, true, { x: 400, y: 300 });


        
       

    }

    update(){

    }
}