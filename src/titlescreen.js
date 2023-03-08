class Titlescreen extends Phaser.Scene {
    constructor() {
        super("Titlescreen");
        }

        preload(){

            //import BG
            this.load.image("TitleScreen", "assets/Titlescreen.png");

            //import bouton
            this.load.image("boutonplay", "assets/bouton_start.png");
            this.load.image("boutonquit", "assets/bouton_quit.png");

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
                setXY: { x: 448, y: 224 },
                //setScale: { x:2, y: 2, }
            });
                
            //this.cursors = this.input.keyboard.createCursorKeys();

            
            this.boutonplay = this.add.image(750,85, "boutonplay").setInteractive();

            this.boutonplay.on("pointerdown", () => {
                //this.clicksound.play()
                console.log("play")
                this.scene.start("scene1")
            })


            this.boutonplay.setScale(1.5);

           

            
        }

        update(){

            /*if (this.cursors.space.isDown){
                this.scene.start("scene1");*/

        }

      
}