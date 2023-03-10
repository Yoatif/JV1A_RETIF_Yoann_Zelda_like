class Titlescreen extends Phaser.Scene {
    constructor() {
        super("Titlescreen");
        }

        init(){

        }

        preload(){

            //import BG
            this.load.image("TitleScreen", "../assets/croquis_menu_start.png");

            //import bouton
            this.load.image("boutonplay", "assets/first_start_button.png");
            this.load.image("boutonplay2", "assets/second_start_button.png");
            this.load.image("boutonexit", "assets/first_exit_button.png");
            this.load.image("boutonexit2", "assets/second_exit_button.png");
            this.load.image("boutoninfo", "assets/first_info_button.png");
            this.load.image("boutoninfo2", "assets/second_info_button.png");

            // import audio

            //this.load.audio("theme", ["sound/theme.ogg", "sound/theme.mp3"]);
            //this.load.audio("button_sound", ["sound/click_button.ogg", "sound/click_button.mp3"]);

        }

        create(){

           

            //adding theme to Titlescreen
            //this.theme = this.sound.add("theme", {volume: 0.2, loop: true});
            //this.theme.play();

            //button_sound
            //this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});
            


            var group = this.add.group({
                key: 'TitleScreen',
                frameQuantity: 32,
                //setXY: { x: 448, y: 224 },
                //setScale: { x:2, y: 2, }
            });
                
            //this.cursors = this.input.keyboard.createCursorKeys();

            
            this.boutonplay = this.add.image(750,85, "boutonplay").setInteractive();

            this.boutonplay.on("pointerdown", () => {
                //this.clicksound.play()
                this.boutonplay = this.add.image(750,85,"boutonplay2")
                setTimeout()
                console.log("play")
                this.scene.start("scene1")
            })



            this.boutonplay.setScale(1);

           

            
        }

        update(){

            /*if (this.cursors.space.isDown){
                this.scene.start("scene1");*/

        }

      
}