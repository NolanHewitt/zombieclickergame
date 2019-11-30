let value = 500;
let increaser = 10;
let ammo = 8;
let magazine = 8;
let gunlevel = 1;
let health = 100;
let zombieHealth = 100;
let zombieHealthMax = 100;
let zombieHealthPercent;
let zombieAlive = true;
let zombiesKilled = 0;
let gunDamage = 10;
let d;
let h;
let p;
let turretDamage = 100;
let electricDamage = 50;
let maxhealth = 100;
let hitChance = 0.10;
let headshotChance = 0.10;
let headshotMultiplier = 1.5;
let fullmag = true;
let reloading = false;
let autoreload = false;
let electricreload = false;
let speedreload = false;
let juggernaut = false;
let turret = false;
let turretShot = false;
let gunShot = true;
let turretAuto;
let turretIncreaser = 100;
let flash = "../public/images/gunshot2.gif";
let turretFlash = "../public/images/gunshot2.gif";
let audio5 = document.getElementById("audio5");
let audio4 = document.getElementById("audio4");
let audio3 = document.getElementById("audio3");
let audio2 = document.getElementById("audio2");
let audio = document.getElementById("audio");
//No lower than 120 for turret fire rate
let turretFirerate = 600;
let fireRate = 0;
let damage = 0;


//Starting Health Regen Mechanics
let oldhealth = setInterval(
    function(){
        if (health < maxhealth){
            health = health+1;
            document.getElementById('health').innerHTML = "HP: " + health;
                            };
        if (health <= 70){
            document.getElementById('health').style.color = "red";
        };
        if (health > 70){
            document.getElementById('health').style.color = "royalblue";
        };
    }, 300);


//Health Regenerator
function regeneration() {
if (juggernaut === false){
    oldhealth;
}
else if (juggernaut === true){
    clearInterval(oldhealth);
    setInterval(
        function(){
            if (health < maxhealth){
                health = health+1;
                document.getElementById('health').innerHTML = "HP: " + health;
                                };
                                if (health <= 70){
                                    document.getElementById('health').style.color = "red";
                                };
                                if (health > 70){
                                    document.getElementById('health').style.color = "rebeccapurple";
                                };
        }, 210);
    }
};
regeneration();

//If HP is less than zero you lose
setInterval(function(){
    if(health <= 0){
       window.location='lose';
    };

    if (zombieHealth <= 0 && zombieAlive === true){
        zombieAlive = false;
        zombiesKilled = zombiesKilled + 1;
        document.getElementById('zKilled').innerHTML = "Zombies Killed: " + zombiesKilled;
        document.getElementById('zombie').style.display = "none";
        document.getElementById('zHPbar').style.display = "none";
        document.getElementById('zHPbar').style.width = "8%";
        zombieHealth = Math.floor(100 * ((1.15)**zombiesKilled));
        zombieHealthMax = Math.floor(100 * ((1.15)**zombiesKilled));
    if (gunShot === true){
        if (gunlevel === 4 || gunlevel === 5){
                value=value+(increaser * 3);
                document.getElementById('value').innerHTML = "Money: $" + value;
        }
        else {
            if (h <= headshotChance){
                value=value+(increaser * 7);
                document.getElementById('value').innerHTML = "Money: $" + value;
            }
            else {
                value=value+(increaser * 3);
                document.getElementById('value').innerHTML = "Money: $" + value;
            };
        }
    }
    else if (turretShot === true){
        value=value+(turretIncreaser * 3);
                document.getElementById('value').innerHTML = "Money: $" + value;
    }

        setTimeout(function(){
            document.getElementById('zombie').style.display = 'block';
            document.getElementById('zHPbar').style.display = "block";
            zombieAlive = true;
            }, 2000);

    };
}, 100);

//Remove notification that you took damage after two seconds
function removedamagemessage(){
    setTimeout(function(){
        document.getElementById('damagetook').style.display = 'none';
        }, 2000);
}

document.getElementById('click').onclick = function() {
    //d is used to determine if the zombie hits you
    d = Math.random();
    //h decides if you gey a headshot
    h = Math.random();
    //p determines how many pellets hit between 1 and 8 for shotgun weapons
    p = (Math.floor(Math.random() * 8) + 1);

    //Getting hit by zombie mechanics
    //Trying to fire the gun wiht ammo causes the zombie to damage you 10% of the time.
if (d < hitChance && zombieAlive === true && ammo >= 0){
    health = health-70
    document.getElementById('health').innerHTML = "HP: " + health;
    document.getElementById('damagetook').style.display = 'block';
    removedamagemessage();
};

//Gun flash mechanics
if (ammo >= 1){
    document.getElementById("gunFlash").src= flash;
    document.getElementById("gunFlash").style.display= "block";

    setTimeout(function(){
        document.getElementById("gunFlash").style.display= "none";
        document.getElementById("gunFlash").src="junk";
    },100);

}


//Shooting mechanics
if (ammo > 1){
    ammo = ammo-1;
    fullmag=false;
    document.getElementById('ammo').innerHTML = "Ammo: " + ammo;

    if (zombieAlive === true){
        gunShot = true;
        turretShot = false;
        if (gunlevel === 4 || gunlevel === 5){
            value=value+(increaser*p);
        }
        else {
            value=value+increaser;
        };

    //Shotgun Damage
    if (gunlevel === 4 || gunlevel === 5){
        zombieHealth = zombieHealth - (gunDamage*p);
    console.log("Z hp is " + zombieHealth);
    document.getElementById('hitmarker').style.display="block";
    setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
    }

    //Other Damage
    else {
        if (h <= headshotChance) {
            zombieHealth = (zombieHealth - (gunDamage * headshotMultiplier));
            document.getElementById('hitmarkerRed').style.display="block";
    setTimeout(function(){ document.getElementById('hitmarkerRed').style.display="none"; }, 200);
            console.log("headshot");
        }
        else {
            zombieHealth = zombieHealth - gunDamage;
            document.getElementById('hitmarker').style.display="block";
    setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
            console.log("bodyshot");
        };
    };
    document.getElementById('value').innerHTML = "Money: $" + value;
    };
       
       //Shooting audio
       audio = document.getElementById("audio");
       audio.play();
       if (audio.currentTime > 0) {
        
        audio.currentTime = 0
        audio.play();
    };
    //Changeing Zombie Health Bar
    zombieHealthPercent = (8*(zombieHealth/zombieHealthMax));
    document.getElementById("zHPbar").style.width = zombieHealthPercent+"%";
  }
  //Shooting for the final shot in the magazine
  else if (ammo === 1){
    ammo = ammo-1;
    fullmag=false;
    document.getElementById('ammo').innerHTML = "Ammo: " + ammo;

    if (zombieAlive === true){
        gunShot = true;
        turretShot = false;
        if (gunlevel === 4 || gunlevel === 5){
            value=value+(increaser*p);
        }
        else {
            value=value+increaser;
        };

        //Shotgun Damage
        if (gunlevel === 4 || gunlevel === 5){
            zombieHealth = zombieHealth - (gunDamage*p);
        console.log("Z hp is " + zombieHealth);
        document.getElementById('hitmarker').style.display="block";
    setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
        }
        //Other Damage
        else {
            if (h <= headshotChance) {
                zombieHealth = (zombieHealth - (gunDamage * headshotMultiplier));
                document.getElementById('hitmarkerRed').style.display="block";
        setTimeout(function(){ document.getElementById('hitmarkerRed').style.display="none"; }, 200);
                console.log("headshot");
            }
            else {
                zombieHealth = zombieHealth - gunDamage;
                document.getElementById('hitmarker').style.display="block";
        setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
                console.log("bodyshot");
            };
        };
    document.getElementById('value').innerHTML = "Money: $" + value;
    };
       //Shooting Audio
       audio = document.getElementById("audio");
       audio.play();
       if (audio.currentTime > 0) {
        
        audio.currentTime = 0
        audio.play();
    }

  if (speedreload === false){
    if (autoreload === true){
    ammo = -1;
    reloading = true;

    if (electricreload === true){
        if (zombieAlive === true){
            gunShot = true;
    turretShot = false;
        value = value + (50 * gunlevel);
        document.getElementById('value').innerHTML = "Money: $" + value;
        zombieHealth = zombieHealth - electricDamage;
        document.getElementById('hitmarker').style.display="block";
    setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
        };
    }

    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        fullmag=true;
        reloading = false;
         }, 2700);

        audio3 = document.getElementById("audio3");
        audio3.play();
        if (audio3.currentTime > 0) {
            audio3.currentTime = 0
            audio3.play();
        };
        if (electricreload === true){
            setTimeout(function(){
                audio5 = document.getElementById("audio5");
                audio5.play();
            if (audio5.currentTime > 0) {
                audio5.currentTime = 0
                audio5.play();
            };
                }, 150);
        };
    }
  }
  if (speedreload === true){
    if (autoreload === true){
    ammo = -1;
    reloading = true;

    if (electricreload === true){
        if (zombieAlive === true){
            gunShot = true;
            turretShot = false;
            value = value + (50 * gunlevel);
            document.getElementById('value').innerHTML = "Money: $" + value;
            zombieHealth = zombieHealth - electricDamage;
            document.getElementById('hitmarker').style.display="block";
        setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
            };
    };

    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        fullmag=true;
        reloading = false;
         }, 1250);

        audio3 = document.getElementById("audio3");
        audio3.play();
        if (audio3.currentTime > 0) {
            audio3.currentTime = 0
            audio3.play();
        }
        if (electricreload === true){
            setTimeout(function(){
                audio5 = document.getElementById("audio5");
                audio5.play();
            if (audio5.currentTime > 0) {
                audio5.currentTime = 0
                audio5.play();
            };
                }, 150);
        };
    }
  }
  zombieHealthPercent = (8*(zombieHealth/zombieHealthMax));
    document.getElementById("zHPbar").style.width = zombieHealthPercent+"%";
 }
  else if (ammo === 0) {
        audio2 = document.getElementById("audio2");
        audio2.play();
        if (audio2.currentTime > 0) {
            audio2.currentTime = 0
            audio2.play();
        }

  }
};

document.getElementById('reload').onclick = function() {
  if (speedreload === false){
    if (reloading === false && fullmag === false){
        if (electricreload === true && ammo >= 1){
            if (zombieAlive === true){
                gunShot = true;
                turretShot = false;
                value = value + (50 * gunlevel);
                document.getElementById('value').innerHTML = "Money: $" + value;
                zombieHealth = zombieHealth - electricDamage;
                document.getElementById('hitmarker').style.display="block";
            setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
                };
        }
        else if (electricreload === true && ammo === 0){
            if (zombieAlive === true){
                gunShot = true;
                turretShot = false;
                value = value + (50 * gunlevel);
                document.getElementById('value').innerHTML = "Money: $" + value;
                zombieHealth = zombieHealth - electricDamage;
                document.getElementById('hitmarker').style.display="block";
            setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
                };
        };
        ammo = -1;
        reloading = true;
    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        reloading = false;
        fullmag=true;
         }, 2500);

          audio3 = document.getElementById("audio3");
          audio3.play();
          if (audio3.currentTime > 0) {
              audio3.currentTime = 0
              audio3.play();
          };
          if (electricreload === true){
            audio5 = document.getElementById("audio5");
            audio5.play();
        if (audio5.currentTime > 0) {
            audio5.currentTime = 0
            audio5.play();
        };
        };
    };
  }
  else if (speedreload === true){
    if (reloading === false && fullmag === false){
        if (electricreload === true && ammo >= 1){
            if (zombieAlive === true){
                gunShot = true;
                turretShot = false;
                value = value + (50 * gunlevel);
                document.getElementById('value').innerHTML = "Money: $" + value;
                zombieHealth = zombieHealth - electricDamage;
                document.getElementById('hitmarker').style.display="block";
            setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
                };
        }
        else if (electricreload === true && ammo === 0){
            if (zombieAlive === true){
                gunShot = true;
                turretShot = false;
                value = value + (50 * gunlevel);
                document.getElementById('value').innerHTML = "Money: $" + value;
                zombieHealth = zombieHealth - electricDamage;
                document.getElementById('hitmarker').style.display="block";
            setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);
                };

        };
        ammo = -1;
        reloading = true;
    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        reloading = false;
        fullmag=true;
         }, 1000);

          audio3 = document.getElementById("audio3");
          audio3.play();
          if (audio3.currentTime > 0) {
              audio3.currentTime = 0
              audio3.play();
          };
          if (electricreload === true){
            audio5 = document.getElementById("audio5");
            audio5.play();
        if (audio5.currentTime > 0) {
            audio5.currentTime = 0
            audio5.play();
        };
        };
    };
  }
  zombieHealthPercent = (8*(zombieHealth/zombieHealthMax));
    document.getElementById("zHPbar").style.width = zombieHealthPercent+"%";
}

function activateTurret() {
    turretAuto = setInterval(function(){
        if (zombieAlive === true){
        value = value + turretIncreaser;
        zombieHealth = zombieHealth - turretDamage;
        gunShot = false;
    turretShot = true;
        document.getElementById('hitmarker').style.display="block";
        setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 100);
        };

        document.getElementById("turretFlash").src= turretFlash;
    document.getElementById("turretFlash").style.display= "block";

    setTimeout(function(){
        document.getElementById("turretFlash").style.display= "none";
        document.getElementById("turretFlash").src="junk";
    },100);

        document.getElementById('value').innerHTML = "Money: $" + value;
        zombieHealthPercent = (8*(zombieHealth/zombieHealthMax));
    document.getElementById("zHPbar").style.width = zombieHealthPercent+"%";

        audio4 = document.getElementById("audio4");
        audio4.play();
        if (audio4.currentTime > 0) {
            audio4.currentTime = 0
            audio4.play();}
}, turretFirerate);
  }

document.getElementById('firstupgrade').onclick = function() {
    if (value >= 750){
    document.getElementById('increaser').innerHTML = increaser;
    increaser = increaser+10;
    gunDamage = 20;
    document.getElementById("firstupgrade").style.display = "none";
    document.getElementById("buygun").style.display = "block";
    console.log("Increase: " + increaser);
    value = value-750;
    document.getElementById('value').innerHTML = "Money: $" + value;
    document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
    document.getElementById('perkDescription1').innerHTML = "Damage+" +  "<br />" + "Magazine: 6";
    }
};

document.getElementById('secondupgrade').onclick = function() {
    if (value >= 10000){
    autoreload = true;
    document.getElementById("secondupgrade").style.display = "none";
    value = value-10000;
    document.getElementById('value').innerHTML = "Money: $" + value;
    }
};

document.getElementById('thirdupgrade').onclick = function() {
    if (value >= 750){
    electricreload = true;
    document.getElementById("thirdupgrade").style.display = "none";
    value = value-750;
    document.getElementById('value').innerHTML = "Money: $" + value;
    }
};

document.getElementById('fourthupgrade').onclick = function() {
    if (value >= 1500){
    speedreload = true;
    document.getElementById("fourthupgrade").style.display = "none";
    value = value-1500;
    document.getElementById('value').innerHTML = "Money: $" + value;
    }
};

document.getElementById('fifthupgrade').onclick = function() {
    if (value >= 5000){
    juggernaut = true;
    maxhealth = 150;
    document.getElementById("fifthupgrade").style.display = "none";
    value = value-5000;
    document.getElementById('value').innerHTML = "Money: $" + value;
    regeneration();
    }
};

document.getElementById('sixthupgrade').onclick = function() {
    if (value >= 2500){
    document.getElementById("sixthupgrade").style.display = "none";
    value = value-2500;
    document.getElementById('value').innerHTML = "Money: $" + value;
    hitChance = 0.05;
    }
};

document.getElementById('seventhupgrade').onclick = function() {
    if (value >= 7500){
    document.getElementById("seventhupgrade").style.display = "none";
    value = value-7500;
    document.getElementById('value').innerHTML = "Money: $" + value;
    headshotChance = 0.35;
    }
};

function hideDesc() {
    document.getElementById("perkdescriptionWrapper").style.display = "none";
    document.getElementById("perkdescriptionWrapper").style.height = "4%";
    document.getElementById("perkdescriptionWrapper").style.width = "25%";
    document.getElementById("perkDescription1").style.display = "none";
    document.getElementById("perkDescription2").style.display = "none";
    document.getElementById("perkDescription3").style.display = "none";
    document.getElementById("perkDescription4").style.display = "none";
    document.getElementById("perkDescription5").style.display = "none";
    document.getElementById("perkDescription6").style.display = "none";
    document.getElementById("perkDescription7").style.display = "none";
};

function showGunDesc1() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.height = "5.5%";
    document.getElementById("perkdescriptionWrapper").style.width = "6.5%";
    document.getElementById("perkDescription1").style.display = "block";
};

function showDesc1() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkDescription1").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.width = "15%";
};

function showDesc2() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkDescription2").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.width = "19%";
};

function showDesc3() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkDescription3").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.width = "18.5%";
};

function showDesc4() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkDescription4").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.width = "19.5%";
};

function showDesc5() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkDescription5").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.width = "20.5%";
};

function showDesc6() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkDescription6").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.width = "24.5%";
};

function showDesc7() {
    document.getElementById("perkdescriptionWrapper").style.display = "block";
    document.getElementById("perkDescription7").style.display = "block";
    document.getElementById("perkdescriptionWrapper").style.width = "18.5%";
};

document.getElementById('buygun').onclick = function() {
  if (gunlevel === 1){
    if (value >= 1000){
    value = value-1000;
    increaser = increaser+20;
    ammo = 6;
    magazine = 6;
    gunlevel = 2;
    gunDamage = 40;
    electricDamage = 100;
    headshotMultiplier = 2.0;
    document.getElementById('buygun').innerHTML = "Buy RW1" +  "<br />" + "1250$";
    document.getElementById('perkDescription1').innerHTML = "Damage++" +  "<br />" + "Magazine: 1";
    document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
    document.getElementById('value').innerHTML = "Money: $" + value;
    document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
    document.getElementById("gun").src="../public/images/revolver.png";
    document.getElementById("gun").style.marginLeft="75%";
    document.getElementById("gunFlash").style.marginLeft="57%";
    document.getElementById("gunFlash").style.marginTop="-4.75%";
    document.getElementById("gunFlash").style.width="22.5%";
    document.getElementById("audio").src="../public/sounds/revolver.mp3";
    }
  }
  else if (gunlevel === 2){
    if (value >= 1250){
        value = value-1250;
        increaser = increaser+60;
        ammo = 1;
        magazine = 1;
        gunlevel = 3;
        gunDamage = 100;
        electricDamage = 20;
        headshotMultiplier = 1.75;
        document.getElementById('buygun').innerHTML = "Buy Spas12" +  "<br />" + "2000$";
        document.getElementById('perkDescription1').innerHTML = "Damage+" +  "<br />" + "Magazine: 8";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/rw1.png";
        document.getElementById("gun").style.marginLeft="75%";
        document.getElementById("gunFlash").style.width="25%";
        document.getElementById("gunFlash").style.marginLeft="56.75%";
        document.getElementById("gunFlash").style.marginTop="-6%";
        document.getElementById("audio").src="../public/sounds/revolver.mp3";
        }
  }
  else if (gunlevel === 3){
    if (value >= 2000){
        value = value-2000;
        increaser = increaser-70;
        ammo = 8;
        magazine = 8;
        gunlevel = 4;
        gunDamage = 30;
        electricDamage = 150;
        headshotMultiplier = 1.0;
        document.getElementById('buygun').innerHTML = "Buy 1887" +  "<br />" + "3000$";
        document.getElementById('perkDescription1').innerHTML = "Damage+" +  "<br />" + "Magazine: 7";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/spas.png";
        document.getElementById("gun").style.marginLeft="60%";
        document.getElementById("gunFlash").style.width="20%";
        document.getElementById("gunFlash").style.marginLeft="59%";
        document.getElementById("gunFlash").style.marginTop="-4%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 4){
    if (value >= 3000){
        value = value-3000;
        increaser = increaser+10;
        ammo = 7;
        magazine = 7;
        gunlevel = 5;
        gunDamage = 40;
        electricDamage = 160;
        headshotMultiplier = 1.0;
        document.getElementById('buygun').innerHTML = "Buy MORS" +  "<br />" + "6000$";
        document.getElementById('perkDescription1').innerHTML = "Damage+++" +  "<br />" + "Magazine: 1";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/1887.png";
        document.getElementById("gun").style.marginLeft="25%";
        document.getElementById("gunFlash").style.marginLeft="54%";
        document.getElementById("gunFlash").style.marginTop="-3.5%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 5){
    if (value >= 6000){
        value = value-6000;
        increaser = increaser+360;
        ammo = 1;
        magazine = 1;
        gunlevel = 6;
        gunDamage = 400;
        electricDamage = 100;
        headshotMultiplier = 2.5;
        document.getElementById('buygun').innerHTML = "Buy Barrett" +  "<br />" + "9010$";
        document.getElementById('perkDescription1').innerHTML = "Damage-" +  "<br />" + "Magazine: 5";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/mors.png";
        document.getElementById("gun").style.marginLeft="75%";
        document.getElementById("gunFlash").style.width="25%";
        document.getElementById("gunFlash").style.marginLeft="60.25%";
        document.getElementById("gunFlash").style.marginTop="-4.5%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 6){
    if (value >= 9010){
        value = value-9010;
        increaser = increaser-100;
        ammo = 5;
        magazine = 5;
        gunlevel = 7;
        gunDamage = 300;
        electricDamage = 200;
        document.getElementById('buygun').innerHTML = "Buy Ray-Gun" +  "<br />" + "20000$";
        document.getElementById('perkDescription1').innerHTML = "Damage++" +  "<br />" + "Magazine: 20";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/barrett.png";
        document.getElementById("gun").style.marginLeft="25%";
        document.getElementById("gunFlash").style.marginLeft="53.5%";
        document.getElementById("gunFlash").style.marginTop="-5.75%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 7){
    if (value >= 20000){
        value = value-20000;
        increaser = increaser+200;
        ammo = 20;
        magazine = 20;
        gunlevel = 8;
        gunDamage = 500;
        electricDamage = 500;
        headshotMultiplier = 2.0;
        document.getElementById('buygun').innerHTML = "Upgrade Ray-Gun" +  "<br />" + "5000$";
        document.getElementById('perkDescription1').innerHTML = "Damage+" +  "<br />" + "Magazine: 40";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/raygun.png";
        document.getElementById("gun").style.marginLeft="25%";
        flash = "../public/images/raygunFlash.gif";
        document.getElementById("gunFlash").style.marginLeft="47.5%";
        document.getElementById("gunFlash").style.marginTop="-0.75%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 8){
    if (value >= 5000){
        value = value-5000;
        increaser = increaser+100;
        ammo = 40;
        magazine = 40;
        gunlevel = 9;
        gunDamage = 600;
        electricDamage = 1500;
        headshotMultiplier = 2.0;
        document.getElementById('buygun').innerHTML = "Buy Thundergun" +  "<br />" + "50000$";
        document.getElementById('perkDescription1').innerHTML = "Damage+++" +  "<br />" + "Magazine: 2";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/raygunpack.png";
        document.getElementById("gun").style.marginLeft="25%";
        document.getElementById("gunFlash").style.marginLeft="48.6%";
        document.getElementById("gunFlash").style.marginTop="0.75%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 9){
    if (value >= 50000){
        value = value-50000;
        increaser = increaser+2400;
        ammo = 2;
        magazine = 2;
        gunlevel = 10;
        gunDamage = 1000;
        electricDamage = 500;
        headshotMultiplier = 1.25;
        document.getElementById('buygun').innerHTML = "Upgrade Thundergun" +  "<br />" + "5000$";
        document.getElementById('perkDescription1').innerHTML = "Damage+" +  "<br />" + "Magazine: 4";
        document.getElementById("buygun").style.marginLeft="1%";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/thundergun.png";
        document.getElementById("gun").style.marginLeft="25%";
        flash = "findathunderguneffectandputithere";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 10){
    if (value >= 5000){
        value = value-5000;
        increaser = increaser+2000;
        ammo = 4;
        magazine = 4;
        gunlevel = 11;
        gunDamage = 1500;
        electricDamage = 750;
        headshotMultiplier = 1.25;
        document.getElementById("buygun").style.display="none";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/thundergunpack.png";
        document.getElementById("gun").style.marginLeft="25%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  };
};

document.getElementById('turretMenu').onclick = function() {

    if (turret === false){
        if (value >= 50000){
            value = value-50000;
            document.getElementById('value').innerHTML = "Money: $" + value;
            document.getElementById('turretMenu').innerHTML = "Open Turret Upgrades";
            document.getElementById("turret").style.display="block";
            turret = true;
            activateTurret();
            document.getElementById("turretIncreaser").style.display="block";
            document.getElementById("turretROF").style.display="block";
            document.getElementById('turretWrapper').classList.add("animated");
    document.getElementById('turretMenu').style.display="none";
    document.getElementById('hudwrapper').style.marginTop = "40.45%";

    setTimeout(function(){ 
        document.getElementById('turretWrapper').style.marginLeft="14.75%";
     }, 2000);
            }
    }
};

document.getElementById('turretFireRate').onclick = function() {
    if (fireRate === 0 && value >= 50000){
        value = value - 50000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 120rpm";
        document.getElementById('tFRVal').innerHTML = "$60000";
        fireRate = 1;
        turretFirerate = 500;
        clearInterval(turretAuto);
        activateTurret();
        console.log("firerate 1")
    }
    else if (fireRate === 1 && value >= 60000){
        value = value - 60000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 138rpm";
        document.getElementById('tFRVal').innerHTML = "$70000";
        fireRate = 2;
        turretFirerate = 433;
        clearInterval(turretAuto);
        activateTurret();
        console.log("firerate 2")
    }
    else if (fireRate === 2 && value >= 70000){
        value = value - 70000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 180rpm";
        document.getElementById('tFRVal').innerHTML = "$80000";
        fireRate = 3;
        turretFirerate = 333;
        clearInterval(turretAuto);
        activateTurret();
        console.log("firerate 3")
    }
    else if (fireRate === 3 && value >= 80000){
        value = value - 80000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 225rpm";
        document.getElementById('tFRVal').innerHTML = "$90000";
        fireRate = 4;
        turretFirerate = 266;
        clearInterval(turretAuto);
        activateTurret();
    }
    else if (fireRate === 4 && value >= 90000){
        value = value - 90000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 300rpm";
        document.getElementById('tFRVal').innerHTML = "$100000";
        fireRate = 5;
        turretFirerate = 200;
        clearInterval(turretAuto);
        activateTurret();
    }
    else if (fireRate === 5 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 360rpm";
        document.getElementById('tFRVal').innerHTML = "$125000";
        fireRate = 6;
        turretFirerate = 166;
        clearInterval(turretAuto);
        activateTurret();
    }
    else if (fireRate === 6 && value >= 125000){
        value = value - 125000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 450rpm";
        fireRate = 7;
        turretFirerate = 133;
        clearInterval(turretAuto);
        activateTurret();
        document.getElementById("turretFireRate").style.display = "none";
        document.getElementById("tFRVal").style.display = "none";
        document.getElementById("tMenuBr").style.display = "none";
        if (damage === 7){
            document.getElementById("turretWrapper").style.display = "none";
        };
    };
};

document.getElementById('turretDamage').onclick = function() {
    if (damage === 0 && value >= 50000){
        value = value - 50000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('tDmgVal').innerHTML = "$60000";
        damage = 1;
        turretIncreaser = 150;
        turretDamage = 125;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 1 && value >= 60000){
        value = value - 60000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('tDmgVal').innerHTML = "$70000";
        damage = 2;
        turretIncreaser = 175;
        turretDamage = 150;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 2 && value >= 70000){
        value = value - 70000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('tDmgVal').innerHTML = "$80000";
        damage = 3;
        turretIncreaser = 200;
        turretDamage = 175;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 3 && value >= 80000){
        value = value - 80000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('tDmgVal').innerHTML = "$90000";
        damage = 4;
        turretIncreaser = 250;
        turretDamage = 200;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 4 && value >= 90000){
        value = value - 90000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('tDmgVal').innerHTML = "$100000";
        damage = 5;
        turretIncreaser = 300;
        turretDamage = 250;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 5 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('tDmgVal').innerHTML = "$125000";
        damage = 6;
        turretIncreaser = 400;
        turretDamage = 300;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 6 && value >= 125000){
        value = value - 125000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 7;
        turretIncreaser = 500;
        turretDamage = 400;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
        document.getElementById("turretDamage").style.display = "none";
        document.getElementById("tDmgVal").style.display = "none";
        document.getElementById("tMenuBr").style.display = "none";
        if (fireRate === 7){
            document.getElementById("turretWrapper").style.display = "none";
        };
    };
};