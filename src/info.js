class Info extends Phaser.Scene{
    constructor(){
        super("Info");
    }

    init(){
            
    }
    
    preload(){

        this.load.image("background", "assets/croquis_menu_start.png");
        this.load.image("menubutton","assets/first_menu_button.png");
        this.load.image("menubutton2","assets/second_menu_button.png");

    }

    create(){

        //créer le clicksound
        this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});

        //créer le background
        this.add.image(800,400,"background");

        //créer le bouton retournant a la scene Titlescreen
        this.menuButton = this.add.image(1350,200, "menuButton").setInteractive();

            this.menuButton.on("pointerdown", () => {
                this.clicksound.play()
                this.menuButton.destroy
                //this.menuButton = this.add.image(1350,200,"menuButton2").setScale(0.5)
                this.time.delayedCall(3000, onEvent, [], this);
                console.log("play")
                   
            })
            this.menuButton.setScale(0.5);


    }

    update(){

    }

    onEvent(){
        this.scene.start("Titlescreen")
    }
}