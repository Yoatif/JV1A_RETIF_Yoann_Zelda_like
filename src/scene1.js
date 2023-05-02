class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    init(){
        
            
    }
    
    preload(){

        //preload diffent asset of the map

        //import tiles
        this.load.tilemapTiledJSON("scene1", "../LD/scene1.json");

        //import tileset
        this.load.image("jeudetuile","../LD/tileset.png");

        //creating player for test
        this.load.spritesheet("hero_down","assets/chara/chara_front.png",
                    { frameWidth: 365, frameHeight: 768 });

        //preload monster
        this.load.image("mobRock","assets/chara/chara_monstre_1.png");

        //preload skills
        this.load.image("fireball", "assets/chara/fireball.png")

    }

    create(){
        this.controller = false;
        this.player_block = false;
        this.player_beHit = false;
        this.clignotement = 0;
        this.trigger_shoot = false;
        this.doorBreak = true;
        
        //Création Attaque
        this.attaque_sword = this.physics.add.staticGroup();
        this.proj_Bow = this.physics.add.group();

        //Création Mbob
        this.mob = this.physics.add.group();
        this.anims.create({
            key: 'left_mob',
            frames: this.anims.generateFrameNumbers('mob_forest', {start:6,end:7}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'up_mob',
            frames: this.anims.generateFrameNumbers('mob_forest', {start:2,end:3}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'down_mob',
            frames: this.anims.generateFrameNumbers('mob_forest', {start:0,end:1}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'right_mob',
            frames: this.anims.generateFrameNumbers('mob_forest', {start:4,end:5}),
            frameRate: 2,
            repeat: -1
        });

        //Load Tiled
        this.carteForest = this.add.tilemap("darkForest");
        this.tileset = this.carteForest.addTilesetImage(
            "Tileset_Final",
            "FTileset"
        );

        //Load Calque
        //Mur
        this.bordure = this.carteForest.createLayer(
            "Bordure",
            this.tileset
        );

        this.river = this.carteForest.createLayer(
            "River",
            this.tileset
        );

        //Placement Ennemi
        this.calque_mob = this.carteForest.getObjectLayer('Ennemi');
        this.calque_mob.objects.forEach(calque_mob => {
            this.mob_create = this.physics.add.sprite(calque_mob.x + 16, calque_mob.y + 16, 'mob_forest').setScale(0.5);
            this.mob_create.anims.play('down_mob');
            this.mob.add(this.mob_create)
        });
        this.mob.setVelocityY(100);

        //Placement Test Monnaie et Soin
        this.heal = this.physics.add.group();
        this.calque_TestHeal = this.carteForest.getObjectLayer('TestSoin');
        this.calque_TestHeal.objects.forEach(calque_TestHeal => {
            const POHeal = this.heal.create(calque_TestHeal.x + 16, calque_TestHeal.y + 16, "Soin");
        });

        this.money = this.physics.add.group();
        this.calque_TestMoney = this.carteForest.getObjectLayer('TestMoney');
        this.calque_TestMoney.objects.forEach(calque_TestMoney => {
            const POHeal = this.money.create(calque_TestMoney.x + 16, calque_TestMoney.y + 16, "Monnaie");
        });

        //Placement Environnement
        this.rock = this.physics.add.staticGroup();
        this.calque_Rock = this.carteForest.getObjectLayer('Rock');
        this.calque_Rock.objects.forEach(calque_Rock => {
            const PORock = this.rock.create(calque_Rock.x + 16, calque_Rock.y + 16, "Rock");
        });
        if (this.doorBreak){
            this.door = this.physics.add.staticGroup();
            this.door.create(1968, 3120, "Door");
        }
        
        //Placement Changement Scene
        this.travelToPlain = this.physics.add.staticGroup();
        this.travelToPlain.create(2336, 16, "ForestToPlain");
        this.travelToTemple = this.physics.add.staticGroup();
        this.travelToTemple.create(1968, 3184, "ForestToTemple");

        //Bordure Mob
        this.calque_mob_switch_right = this.carteForest.createLayer(
            "Ennemi_Switch_Right",
            this.tileset
        );

        this.calque_mob_switch_left = this.carteForest.createLayer(
            "Ennemi_Switch_Left",
            this.tileset
        );

        this.calque_mob_switch_up = this.carteForest.createLayer(
            "Ennemi_Switch_Up",
            this.tileset
        );

        this.calque_mob_switch_down = this.carteForest.createLayer(
            "Ennemi_Switch_Down",
            this.tileset
        );
        
        this.calque_mob_switch_down.setVisible(false);
        this.calque_mob_switch_up.setVisible(false);
        this.calque_mob_switch_right.setVisible(false);
        this.calque_mob_switch_left.setVisible(false);

        //Inventaire
        this.add.image(0, 0, "BarreInventaire").setScrollFactor(0);

        //Placement PowerUp
        this.sword = this.physics.add.group();
        if (this.unlock_Sword == false){
            this.sword.create(1985, 2076, "sword_y");
        }

        this.bow = this.physics.add.group();
        if (this.unlock_Bow == false){
            this.bow.create(204, 270, "Bow");
        }

        //Inventaire
        this.add.image(0, 0, "BarreInventaire").setScrollFactor(0);
        if (this.unlock_Sword) {
            this.add.image(900, 50, 'sword_y').setScale(2.5).setScrollFactor(0);
        }
        if (this.unlock_Bow) {
            this.add.image(900, 50, 'Bow').setScale(2.5).setScrollFactor(0);
        }
        if (this.unlock_Tear) {
            this.add.image(900, 50, 'Tear').setScale(2.5).setScrollFactor(0);
        }
        if (this.unlock_Key) {
            this.add.image(850, 50, 'Key').setScale(2.5).setScrollFactor(0);
        }
        
        //Création Joueur
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'perso').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:12,end:15}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', {start:4,end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:8,end:11}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'left_stop',
            frames: [ { key: 'perso', frame: 12 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_stop',
            frames: [ { key: 'perso', frame: 8 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'up_stop',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'down_stop',
            frames: [ { key: 'perso', frame: 0 } ],
            frameRate: 20
        });

        //Calque Solide
        this.bordure.setCollisionByProperty({ estSolide: true });
        this.river.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_down.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_up.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_left.setCollisionByProperty({ estSolide: true });
        this.calque_mob_switch_right.setCollisionByProperty({ estSolide: true });

        //Création Caméra
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);

        //Création Barre de vie
        this.healthContainer = this.add.sprite(100, 40, "CadreVie").setScrollFactor(0);
        this.healthBar = this.add.sprite(this.healthContainer.x, this.healthContainer.y, "BarreVie").setScrollFactor(0);
        this.healthMask = this.add.sprite(this.healthBar.x - (100 - this.health), this.healthBar.y, "BarreVie").setScrollFactor(0);
        this.healthMask.visible = false;
        this.healthBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);

        //Création Inventaire Monnaie
        this.scoreText = this.add.text(1100, 16, "x" + this.porteMonnaie, { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        this.add.image(1080, 27, "Monnaie").setScale(3).setScrollFactor(0);

        //Récupération Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.gamepad.once('connected', function (pad) {
            console.log("Manette Connecté");
            this.controller = pad;
        }, this);
        
        //Création Collision
        //Joueur
        this.physics.add.collider(this.player, this.bordure);
        this.physics.add.collider(this.player, this.rock);
        this.physics.add.collider(this.player, this.river, null, this.checkTear, this);
        this.physics.add.collider(this.player, this.door, this.opendDoor, null, this);
        this.physics.add.overlap(this.player, this.mob, this.perteVie, this.getHit, this);

        //Pickup
        this.physics.add.overlap(this.player, this.heal, this.gainVie, null, this);
        this.physics.add.overlap(this.player, this.money, this.gainMoney, null, this);
        this.physics.add.overlap(this.player, this.sword, this.swordUnlock, null, this);
        this.physics.add.overlap(this.player, this.bow, this.bowUnlock, null, this);

        //Changement de scene
        this.physics.add.overlap(this.player, this.travelToPlain, this.toPlain, null, this);
        this.physics.add.overlap(this.player, this.travelToTemple, this.toTemple, null, this);

        //Création Collision Attaque
        this.physics.add.overlap(this.attaque_sword, this.bordure, this.clean_attaque, this.if_clean_sword, this);
        this.physics.add.collider(this.proj_Bow, this.bordure, this.clean_proj, null, this);
        this.physics.add.collider(this.proj_Bow, this.rock, this.destroyRock, null, this);

        //Ennemi
        this.physics.add.collider(this.mob, this.calque_mob_switch_down, this.mob_switch_down, null, this);
        this.physics.add.collider(this.mob, this.calque_mob_switch_up, this.mob_switch_up, null, this);
        this.physics.add.collider(this.mob, this.calque_mob_switch_left, this.mob_switch_left, null, this);
        this.physics.add.collider(this.mob, this.calque_mob_switch_right, this.mob_switch_right, null, this);
        this.physics.add.collider(this.mob, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mob, this.proj_Bow, this.kill_mob_bow, null, this);

    }

    update(){

        //Mouvement
        if (this.cursors.up.isDown) {
            this.player.anims.play('hero_up');
            this.player.setVelocityY(-300);
            this.player.setVelocityX(0);
            this.player_facing = "up";
            

        }
        else if (this.cursors.down.isDown) {
            this.player.anims.play('hero_down');
            this.player.setVelocityY(300);
            this.player.setVelocityX(0);
            this.player_facing = "down"

        }
        else if (this.cursors.right.isDown) {
            this.player.anims.play('hero_right');
            this.player.setVelocityX(300);
            this.player.setVelocityY(0);
            this.player_facing = "right";       

        }
        else if (this.cursors.left.isDown) {
            this.player.anims.play('hero_left');
            this.player.setVelocityX(-300);
            this.player.setVelocityY(0);
            this.player_facing = "left";
            

        }
        else{
            this.player.anims.play('turn', true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if (this.cursors.shift.isDown) {
            if (this.player_facing == "up") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityY(-200);
            }
            else if (this.player_facing == "down") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityY(200);
            }
            else if (this.player_facing == "right") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityX(200);
            }
            else if (this.player_facing == "left") {
                this.fireball.create(this.player.x, this.player.y, "fireball").body.setVelocityX(-200);
            }
        

    }
}
    //lancement scene == changement de carte
    
    fireballKill(mob, fireball) {
        mob.disableBody(true, true)
        fireball.disableBody(true, true)
        this.lootMob(mob);
    }}
