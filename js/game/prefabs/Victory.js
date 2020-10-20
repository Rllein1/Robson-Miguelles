var Victory=function(game){
    Phaser.Group.call(this, game);
};

Victory.prototype=Object.create(Phaser.Group.prototype);
Victory.prototype.constructor=Victory;

Victory.prototype.show = function(score){

    var bmd, background,gameoverText, scoreText,highScoreText, newHighScoreText, startText;

    bmd=this.game.add.bitmapData(this.game.width,this.game.height);
    bmd.ctx.fillStyle='#000';
    bmd.ctx.fillRect(0,0,this.game.width,this.game.height);

    background=this.game.add.sprite(0,0,bmd);
    background.alpha=0.5;

    this.add(background);
    this.y=this.game.height;


    gameoverText=this.game.add.bitmapText(0,100, 'minecraftia', 'VICTORY!!!!',50 );
    gameoverText.x=this.game.width/2-(gameoverText.textWidth/2);
    this.add(gameoverText);



    startText=this.game.add.bitmapText(0,300, 'minecraftia', 'Tap to play again', 16);
    startText.x=this.game.width/2-(startText.textWidth/2);
    this.add(startText);


    this.game.add.tween(this).to({y:0},1000,Phaser.Easing.Bounce.Out,true);

    this.game.input.onDown.addOnce(this.restart,this);

};

Victory.prototype.restart=function(){
    this.game.state.start('Game');
};