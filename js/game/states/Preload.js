ZenvaRunner.Preload=function(){
    this.ready=false;
};

ZenvaRunner.Preload.prototype={
    preload: function(){
        this.splash=this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'logo' );
        this.splash.anchor.setTo(0.5);

        this.preloadBar=this.add.sprite(this.game.world.centerX,this.game.world.centerY+50, 'preloadbar' );
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('ground','assets/images/rarara3.png');
        this.load.image('background','assets/images/rarara1.png');
        this.load.image('foreground','assets/images/rarara2.png');

        this.load.spritesheet('bat','assets/images/bat.png',200,200,4);
        this.load.spritesheet('player','assets/images/apex.png',200,200,6);
        this.load.spritesheet('player2','assets/images/bosschar.png',200,200,7);
        this.load.spritesheet('missile','assets/images/ice.png',200,200,3);
        this.load.spritesheet('missile2','assets/images/Untitled-21.png',200,200,3);
        this.load.spritesheet('fall','assets/images/icefall.png',200,200,3);
        this.load.spritesheet('sword','assets/images/sword.png',200,200,4);
        this.load.spritesheet('sbox','assets/images/sbox.png',200,200,5);
        

        this.load.audio('gameMusic',['assets/audio/Pamgaea.mp3','assets/audio/Pamgaea.ogg']);
        this.load.audio('bat','assets/audio/bats.mp3');
        this.load.audio('wing','assets/audio/wing flap.mp3');
        this.load.audio('fire','assets/audio/fire.mp3');
        this.load.audio('ifeel','assets/audio/ifeel.mp3');
        this.load.audio('night','assets/audio/night.mp3');
        this.load.audio('bounce','assets/audio/bounce.wav');
        this.load.audio('coin','assets/audio/coin.wav');
        this.load.audio('death','assets/audio/death.wav');
        this.load.audio('skill1','assets/audio/skill1.mp3');
        this.load.audio('skill1h','assets/audio/skill1hit.mp3');
        this.load.audio('skill2','assets/audio/skill2.mp3');
        this.load.audio('skill2h','assets/audio/skill2hit.mp3');
        this.load.audio('skill3','assets/audio/skill3.mp3');
        this.load.audio('skill3h','assets/audio/night.mp3');
        this.load.audio('ready','assets/audio/ready.mp3');
        this.load.audio('victory','assets/audio/victory.mp3');

        this.load.bitmapFont('minecraftia','assets/fonts/minecraftia/minecraftia.png','assets/fonts/minecraftia/minecraftia.xml');
        
        this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    create: function(){
        this.preloadBar.cropEnable=false;
    },
    update: function(){
        // if(this.cache.isSoundDecoded('gameMusic') && this.ready === true){

            if(this.ready === true){
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready=true;
    }
};