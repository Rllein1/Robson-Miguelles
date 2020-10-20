  
var Bat = function(game, x, y, key, frame){
    key ='bat';
    Phaser.Sprite.call(this, game, x, y, key, frame);
  
    this.scale.setTo(0.7);
    this.anchor.setTo(0);
  
    this.animations.add('fly', [0,1,2,3,2,1,0])
  
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
  
    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true; 
  
    this.events.onKilled.add(this.onKilled, this);
    this.events.onRevived.add(this.onRevived, this);
  
  };
  
  Bat.prototype = Object.create(Phaser.Sprite.prototype);
  Bat.prototype.constructor = Bat;
  
  Bat.prototype.onRevived = function(){
    this.body.velocity.x=-200;
    this.animations.play('fly', 10, true);
  };
  
  Bat.prototype.onKilled = function(){
    this.animations.frame = 0;
  };
  