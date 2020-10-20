ZenvaRunner.Game = function(){
  this.playerMinAngle = -20; //minimum player rotation
  this.playerMaxAngle = 20; //maximum player rotation

  this.coinRate = 5000;
  this.coinTimer = 0; //coin wii loop
  this.coincount=0;

  this.enemyRate = 100;
  this.enemyTimer = 0;

  this.bossBulletRate= 3000;
  this.bossBulletTimer= 0;
  
  this.jumpRate = 1500;
  this.jumpTimer = 0; 
  this.jump=false;

  this.skil1Rate = 1000;
  this.skil1Timer = 0;
  this.cd1=0; 
  this.skil1=false;

  this.skil2Rate = 1000;
  this.skil2Timer = 0;
  this.cd2=0; 
  this.skil2=false;

  this.skil3Rate = 1000;
  this.skil3Timer = 0;
  this.cd3=0; 
  this.skil3=false;
  


  this.bossLife=20;
  this.playerLife=10;


};
ZenvaRunner.Game.prototype = {        //extend the Game method prototype
  create: function(){
    
    this.background=this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
    this.background.scale.setTo(2);

    this.foreground=this.game.add.tileSprite(0,150,this.game.width,this.game.height-200,'foreground');

    this.ground = this.game.add.tileSprite(0, this.game.height -120, this.game.width, 150, 'ground');

    this.bskill1 = this.add.sprite(10 , 70,'sbox');
    this.bskill2= this.add.sprite(10, 170,'sbox');
    this.bskill3 = this.add.sprite(10 , 270,'sbox');
    this.bskill1.scale.setTo(0.5);
    this.bskill2.scale.setTo(0.5);
    this.bskill3.scale.setTo(0.5);

    this.skill1 = this.add.sprite(10 , 70,'missile');
    this.sskill2= this.add.sprite(10, 170,'fall');
    this.sskill3 = this.add.sprite(10 , 270,'sword');
    this.skill1.scale.setTo(0.5);
    this.sskill2.scale.setTo(0.5);
    this.sskill3.scale.setTo(0.5);


    this.player = this.add.sprite(0 , this.game.height/2,'player');
    this.player.anchor.setTo(1);
    this.player.scale.setTo(1);

    this.player.animations.add('front', [3,4,5,4,3]);
    this.player.animations.add('back', [0,1,2,1,0]);

    this.boss = this.add.sprite(this.game.width, 100  ,'player2');
    this.boss.anchor.setTo(1);
    this.boss.scale.setTo(1.5);

    this.boss.animations.add('fly', [0,1,2,3]);
    this.boss.animations.add('att', [4,5,6]);
  
  



    // this.player.animations.add('fly', [0,1,2,3,2,1]);
    // this.player.animations.play('fly', 8, true);
    //this will enable physics to our game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //using the arcade physics system we are setting the gravity in the horizontal direction of 400, the higher the value the more gravity
    this.game.physics.arcade.gravity.y = 1000;
    this.game.physics.arcade.gravity.x = 0;
    this.game.physics.arcade.enableBody(this.ground); //add gravity to our ground( in preload.js)

    this.ground.body.allowGravity = false; // we dont want our ground affected by gravity
    this.ground.body.immovable = true; //this will keep the ground stay in place

    this.game.physics.arcade.enableBody(this.player); //apply physics to our player
    this.game.physics.arcade.enableBody(this.boss); 
    
    this.player.body.collideWorldBounds = true;// if player fall (the player gone) if dont enable
    // this.player.body.bounce.set(0.25); // we want our player to bounce when it runs
    
    this.boss.body.collideWorldBounds = true;// if player fall (the player gone) if dont enable
    this.boss.body.bounce.set(0.25); // we want our player to bounce when it runs

    this.mobs = this.game.add.group();
    this.pow1 = this.game.add.group();
    this.pow2 = this.game.add.group();
    this.pow3 = this.game.add.group();
    this.fire = this.game.add.group();

    this.bat=this.game.add.audio('bat');
    this.wing=this.game.add.audio('wing');
    this.fireb=this.game.add.audio('fire');
    this.ifeel=this.game.add.audio('ifeel');
    this.victory=this.game.add.audio('victory');
    this.night=this.game.add.audio('night');
    this.sskill1=this.game.add.audio('skill1');
    this.skill1h=this.game.add.audio('skill1h');
    this.sskill2=this.game.add.audio('skill2');
    this.skill2h=this.game.add.audio('skill2h');
    this.sskill3=this.game.add.audio('skill3');
    this.skill3h=this.game.add.audio('skill3h');
    this.bounce=this.game.add.audio('bounce');
    this.deathSound=this.game.add.audio('death');
    this.gameMusic=this.game.add.audio('gameMusic');
    this.night.play();



    this.PText=this.game.add.bitmapText(10,10,'minecraftia', 'Playerlife'+this.playerLife, 24);
    this.BLText=this.game.add.bitmapText(this.game.width-200,10,'minecraftia', 'bosslife'+this.bossLife, 24);
    this.scoreText1=this.game.add.bitmapText(12 , 70,'minecraftia', '1', 24);
    this.scoreText2=this.game.add.bitmapText(12 , 170,'minecraftia', '2', 24);
    this.scoreText3=this.game.add.bitmapText(12 , 270,'minecraftia', '3', 24)
    
    cursors = this.input.keyboard.createCursorKeys();
    this.key1=this.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key2=this.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.key3=this.input.keyboard.addKey(Phaser.Keyboard.THREE);
  },
 

  update: function(){
    if (cursors.left.isDown){
      this.player.body.velocity.x-=20;
      this.player.animations.play('back', 6, true)
    }
    else if (cursors.right.isDown){
      this.player.body.velocity.x +=20;
      this.player.animations.play('front', 6, true)

    }
    else if (cursors.up.isDown){
      this.bounce.play();
      if(this.jump==true){
        this.player.body.velocity.y -=800;
        this.jump=false;
      };
    }
     else{
        this.player.body.velocity.x =0;
    }

    if ( this.key1.isDown){
      if(this.skil1==true){
        this.createEnemy(this.player.x, this.player.y-100 );
        this.skil1=false;
        this.cd1=0
      };
    }
    if ( this.key2.isDown){
      if(this.skil2==true){
        this.skill2();
        this.skil2=false;
        this.cd2=0
      };
    }
    if ( this.key3.isDown){
      if(this.skil3==true){
        this.Skill3(this.player.x, this.player.y-100 );
        this.skil3=false;
        this.cd3=0
      };
    }


    
    if(this.bossBulletTimer < this.game.time.now){
      this.createbossbullet(this.boss.x-100, this.boss.y);
      this.bossBulletTimer = this.game.time.now + this.bossBulletRate;
      this.boss.animations.play('att', 1, true);
    } else if(this.bossBulletTimer > this.game.time.now){this.boss.animations.play('fly', 6, true);}

    if(this.coinTimer < this.game.time.now){
      this.createBat();
      this.coinTimer = this.game.time.now + this.coinRate;
    }

    if(this.skil1Timer < this.game.time.now){
      this.box1();
      this.skil1Timer =this.game.time.now + this.skil1Rate;
      this.cd1++;
    }
    if(this.skil2Timer < this.game.time.now){
      this.box2();
      this.skil2Timer =this.game.time.now + this.skil2Rate;
      this.cd2++;
    }
    if(this.skil3Timer < this.game.time.now){
      this.box3();
      this.skil3Timer =this.game.time.now + this.skil3Rate;
      this.cd3++;
    }




    this.game.physics.arcade.collide(this.boss, this.ground, this.bgroundHit, null, this);
    this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);
    this.game.physics.arcade.overlap(this.boss, this.pow1, this.bossHit1, null, this);
    this.game.physics.arcade.overlap(this.boss, this.pow2, this.bossHit2, null, this);
    this.game.physics.arcade.overlap(this.boss, this.pow3, this.bossHit3, null, this);
    this.game.physics.arcade.overlap(this.player, this.mobs, this.mobsHit, null, this);
    this.game.physics.arcade.overlap(this.player, this.fire, this.playerHit, null, this);
  },
  shutdown: function(){
    this.bossLife=25;
    this.playerLife=10;

    this.bossBulletTimer=0;
    this.coinTimer=0;
    this.skil1Timer=0;
    this.skil2Timer=0;
    this.skil3Timer=0;
    this.cd1=0;
    this.skil1=false;
    this.cd2=0;
    this.skil2=false;
    this.cd3=0;
    this.skil3=false;
  },
  box1: function(){
    if(this.cd1==0){
      this.bskill1.animations.add('zero', [0]);
      this.bskill1.animations.play('zero', 8, true);
    }
    if(this.cd1==1){
      this.bskill1.animations.add('one', [1]);
      this.bskill1.animations.play('one', 8, true);
    }
    if(this.cd1==2){
      this.bskill1.animations.add('two', [2]);
      this.bskill1.animations.play('two', 8, true);
    }
    if(this.cd1==3){
      this.bskill1.animations.add('three', [3]);
      this.bskill1.animations.play('three', 8, true);
    }
    if(this.cd1>=4){
      this.bskill1.animations.add('four', [4]);
      this.bskill1.animations.play('four', 8, true);
      this.skil1=true;
    }
  },
  box2: function(){
    if(this.cd2==0){
      this.bskill2.animations.add('zero', [0]);
      this.bskill2.animations.play('zero', 8, true);
    }
    if(this.cd2==2){
      this.bskill2.animations.add('one', [1]);
      this.bskill2.animations.play('one', 8, true);
    }
    if(this.cd2==4){
      this.bskill2.animations.add('two', [2]);
      this.bskill2.animations.play('two', 8, true);
    }
    if(this.cd2==6){
      this.bskill2.animations.add('three', [3]);
      this.bskill2.animations.play('three', 8, true);
    }
    if(this.cd2>=8){
      this.bskill2.animations.add('four', [4]);
      this.bskill2.animations.play('four', 8, true);
      this.skil2=true;
    }
  },
  box3: function(){
    if(this.cd3==0){
      this.bskill3.animations.add('zero', [0]);
      this.bskill3.animations.play('zero', 8, true);
    }
    if(this.cd3==3){
      this.bskill3.animations.add('one', [1]);
      this.bskill3.animations.play('one', 8, true);
    }
    if(this.cd3==6){
      this.bskill3.animations.add('two', [2]);
      this.bskill3.animations.play('two', 8, true);
    }
    if(this.cd3==9){
      this.bskill3.animations.add('three', [3]);
      this.bskill3.animations.play('three', 8, true);
    }
    if(this.cd3>=12){
      this.bskill3.animations.add('four', [4]);
      this.bskill3.animations.play('four', 8, true);
      this.skil3=true;
    }
  },

  createBat: function(){
    this.bat.play();
    this.wing.play();
    var mobs = this.mobs.getFirstExists(false);
    if(!mobs){
      mobs = new Bat(this.game, 0, 0);
      this.mobs.add(mobs);
      this.coincount++;
    }
    mobs.reset(this.boss.x + 6, this.boss.y - 200);
    mobs.revive();
    
  },


  createEnemy: function(x,y){
    this.sskill1.play();

      if(this.enemyTimer < this.game.time.now){
        enemy = new skill1(this.game, x, y);
        this.enemyTimer = this.game.time.now + this.enemyRate;
      }

      this.pow1.add(enemy);

    enemy.revive();
  },
  skill2: function(){
    this.sskill2.play();
    if(this.enemyTimer < this.game.time.now){
      enemy = new Skill2(this.game,this.boss.x-200, 0);
      this.enemyTimer = this.game.time.now + this.enemyRate;
    }
    this.pow2.add(enemy);

  enemy.revive();
},
Skill3: function(x,y){
  this.sskill3.play();
  if(this.enemyTimer < this.game.time.now){
    enemy = new Skill3(this.game, x, y);
    this.enemyTimer = this.game.time.now + this.enemyRate;
  }

  this.pow3.add(enemy);

enemy.revive();
},
createbossbullet: function(x,y){
  this.fireb.play();
  if(this.bossBulletTimer < this.game.time.now){
    enemy2 = new Enemy2(this.game, x, y);
    this.bossBulletTimer= this.game.time.now + this.bossBulletRate;
  }

    this.fire.add(enemy2);

  enemy2.revive();
},

  bossHit1: function(boss, enemy){
    this.skill1h.play();
    enemy.kill();
    this.bossLife--;
    this.BLText.text='bosslife: '+this.bossLife;

    if(this.bossLife<=0){
      this.bosskill(this.boss);
    }
  },
  bossHit2: function(boss, enemy){
    this.skill2h.play();
    enemy.kill();
    this.bossLife=this.bossLife-2;
    this.BLText.text='bosslife: '+this.bossLife;

    if(this.bossLife<=0){
      this.bosskill(this.boss);
    }
  },
  bossHit3: function(boss, enemy){
    this.sskill2.play();
    enemy.kill();
    this.bossLife=this.bossLife-3;
    this.BLText.text='bosslife: '+this.bossLife;

    if(this.bossLife<=0){
      this.bosskill(this.boss);
    }
  },
  mobsHit: function(player, mobs){
      mobs.kill();
     this.playerLife--;
     this.PText.text='Playerlife: '+this.playerLife;
 
     if(this.playerLife==0){
      this.Die(this.boss);
     }
 
  },
  playerHit: function(player, enemy2){
    enemy2.kill();
    this.playerLife--;
    this.PText.text='Playerlife: '+this.playerLife;

    if(this.playerLife==0){
      this.Die(this.boss);
    }
  },
  bosskill: function(boss,enemy){
    this.victory.play();
    this.player.kill(); 
    this.pplayer= this.add.sprite(this.game.width/2, this.game.height/2  ,'player');
    this.pplayer.animations.add('fly', [3,4,5,6]);
    this.pplayer.animations.play('fly', 6, true);
    boss.kill(); 
    this.bossBulletTimer=Number.MAX_VALUE;
    this.coinTimer=Number.MAX_VALUE;
    this.skil1Timer=Number.MAX_VALUE;
    this.skil2Timer=Number.MAX_VALUE;
    this.skil3Timer=Number.MAX_VALUE;
    var scoreboard=new Victory(this.game);
    scoreboard.show(this.score);
  },
  Die: function(){
    this.ifeel.play();
    this.boss.kill(); 
    this.bboss= this.add.sprite(this.game.width/2, this.game.height/2  ,'player2');
    this.bboss.animations.add('fly', [0,1,2,3]);
    this.bboss.animations.play('fly', 10, true);
    this.player.kill();  
    this.bossBulletTimer=Number.MAX_VALUE;
    this.coinTimer=Number.MAX_VALUE;
    this.skil1Timer=Number.MAX_VALUE;
    this.skil2Timer=Number.MAX_VALUE;
    this.skil3Timer=Number.MAX_VALUE;
    var die=new PlayerDie(this.game);
    die.show(this.score);
  },
  groundHit: function(player, ground){
    this.jump=true;
    player.body.velocity.y = -20 ;
  },
  bgroundHit: function(boss, ground){
    boss.y=boss.y;
  },
};