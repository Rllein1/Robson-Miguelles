var Enemy2=function(game,x,y,key,frame){
    key='missile2';
    Phaser.Sprite.call(this,game,x,y,key,frame);
   
    this.scale.setTo(0.5);
    this.anchor.setTo(1.5);

    this.animations.add('fly');

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);
};

Enemy2.prototype=Object.create(Phaser.Sprite.prototype);
Enemy2.prototype.constructor= Enemy2;

Enemy2.prototype.onRevived=function(){
    this.game.add.tween(this).to({y:this.y-16},Phaser.Easing.Linear.NONE, true,0,Infinity,true);

    this.body.velocity.x=-400;
    this.animations.play('fly',10,true);
};