ZenvaRunner.MainMenu= function(){};

ZenvaRunner.MainMenu.prototype={
    create:function(){
        this.background=this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
        this.background.scale.setTo(2);

        this.foreground=this.game.add.tileSprite(0,150,this.game.width,this.game.height-200,'foreground');
        // this.foreground.autoScroll(-200,0);

        this.ground = this.game.add.tileSprite(0, this.game.height -120, this.game.width, 150, 'ground');
        // this.ground.autoScroll(-400,0);

        this.splash=this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.startText=this.game.add.bitmapText(0,0,'minecraftia', 'tap to start', 20);

        this.startText.x=this.game.width/2-this.startText.textWidth/2;
        this.startText.y=this.game.height/2+this.splash.height/2;

        this.ready=this.game.add.audio('ready');
        this.ready.play();
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start('Game');
        };
    }      
            
};








