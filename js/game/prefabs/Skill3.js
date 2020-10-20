var Skill3=function(game,x,y,key,frame){
    key='sword';
    Phaser.Sprite.call(this,game,x,y,key,frame);
   
    this.scale.setTo(1.5);
    this.anchor.setTo(0.3);

    this.animations.add('fly');

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);
};

Skill3.prototype=Object.create(Phaser.Sprite.prototype);
Skill3.prototype.constructor= Skill3;

Skill3.prototype.onRevived=function(){
    this.game.add.tween(this).to({y:this.y-16},Phaser.Easing.Linear.NONE, true,0,Infinity,true);

    this.body.velocity.x=+500;
    this.animations.play('fly',10,true);
};