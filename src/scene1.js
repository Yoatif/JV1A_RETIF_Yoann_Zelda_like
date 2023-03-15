class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
            
    }
    
    preload(){
        this.load.image("sol","assets/Croquis_map_1");

    }

    create(){
        this.add.image(500,500,"sol");

    }

    update(){

    }
}