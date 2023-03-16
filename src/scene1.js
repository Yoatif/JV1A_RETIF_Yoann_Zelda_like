class Map1 extends Phaser.Scene{
    constructor(){
        super("Map1");
    }

    init(){
            
    }
    
    preload(){
        this.load.image("sol","assets/map_1/sol.png");

    }

    create(){
        this.add.image(800,400,"sol");

    }

    update(){

    }
}