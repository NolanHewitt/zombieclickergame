let value = 500;
let increaser = 10;
let ammo = 8;
let magazine = 8;
let gunlevel = 1;
let health = 100;
let maxhealth = 100;
let hitChance = 0.10;
let fullmag = true;
let reloading = false;
let autoreload = false;
let electricreload = false;
let speedreload = false;
let juggernaut = false;
let turret = false;
let turretAuto;
let turretIncreaser = 50;
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
    if(health<=0){
       window.location='lose';
    }
}, 100);

//Remove notification that you took damage after two seconds
function removedamagemessage(){
    setTimeout(function(){
        document.getElementById('damagetook').style.display = 'none';
        }, 2000);
}

document.getElementById('click').onclick = function() {
//Trying to fire the gun causes the zombie to damage you 10% of the time.
    var d = Math.random();
    console.log (d);
if (d < hitChance){
    health = health-70
    document.getElementById('health').innerHTML = "HP: " + health;
    document.getElementById('damagetook').style.display = 'block';
    removedamagemessage();
};
//Shooting mechanics
if (ammo > 1){
    ammo = ammo-1;
    value=value+increaser;
    fullmag=false;
    document.getElementById('value').innerHTML = "Money: $" + value;
    document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
    console.log("Value: " + value);

    document.getElementById('hitmarker').style.display="block";

    setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);

    var audio = document.getElementById("audio");
       audio.play();
       if (audio.currentTime > 0) {
        
        audio.currentTime = 0
        audio.play();
    }
  }
  else if (ammo === 1){
    ammo = ammo-1;
    value=value+increaser;
    fullmag=false;
    document.getElementById('value').innerHTML = "Money: $" + value;
    document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
    console.log("Value: " + value);

    document.getElementById('hitmarker').style.display="block";

    setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 200);

    var audio = document.getElementById("audio");
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
        value = value + (50 * gunlevel);
        document.getElementById('value').innerHTML = "Money: $" + value;
    }

    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        fullmag=true;
        reloading = false;
         }, 2700);

    var audio3 = document.getElementById("audio3");
        audio3.play();
        if (audio3.currentTime > 0) {
            audio3.currentTime = 0
            audio3.play();
        }
    }
  }
  if (speedreload === true){
    if (autoreload === true){
    ammo = -1;
    reloading = true;

    if (electricreload === true){
        value = value + (50 * gunlevel);
        document.getElementById('value').innerHTML = "Money: $" + value;
    }

    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        fullmag=true;
        reloading = false;
         }, 1250);

    var audio3 = document.getElementById("audio3");
        audio3.play();
        if (audio3.currentTime > 0) {
            audio3.currentTime = 0
            audio3.play();
        }
    }
  }
 }
  else if (ammo === 0) {
    var audio2 = document.getElementById("audio2");
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
        ammo = -1;
        reloading = true;
        if (electricreload === true){
            value = value + (50 * gunlevel);
            document.getElementById('value').innerHTML = "Money: $" + value;
        };
    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        reloading = false;
        fullmag=true;
         }, 2500);

         var audio3 = document.getElementById("audio3");
          audio3.play();
          if (audio3.currentTime > 0) {
              audio3.currentTime = 0
              audio3.play();
          }
    };
  }
  else if (speedreload === true){
    if (reloading === false && fullmag === false){
        ammo = -1;
        reloading = true;
        if (electricreload === true){
            value = value + (50 * gunlevel);
            document.getElementById('value').innerHTML = "Money: $" + value;
        };
    setTimeout(function(){ 
        ammo = magazine;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        reloading = false;
        fullmag=true;
         }, 1000);

         var audio3 = document.getElementById("audio3");
          audio3.play();
          if (audio3.currentTime > 0) {
              audio3.currentTime = 0
              audio3.play();
          }
    };
  }
}

function activateTurret() {
    turretAuto = setInterval(function()
    {
        value = value + turretIncreaser;
        document.getElementById('value').innerHTML = "Money: $" + value;

        document.getElementById('hitmarker').style.display="block";

        setTimeout(function(){ document.getElementById('hitmarker').style.display="none"; }, 100);

        let audio4 = document.getElementById("audio4");
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
    document.getElementById("firstupgrade").style.display = "none";
    document.getElementById("buygun").style.display = "block";
    console.log("Increase: " + increaser);
    value = value-750;
    document.getElementById('value').innerHTML = "Money: $" + value;
    document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
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

document.getElementById('buygun').onclick = function() {
  if (gunlevel === 1){
    if (value >= 1000){
    value = value-1000;
    increaser = increaser+30;
    ammo = 6;
    magazine = 6;
    gunlevel = 2;
    document.getElementById('buygun').innerHTML = "Buy RW1" +  "<br />" + "1250$";
    document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
    document.getElementById('value').innerHTML = "Money: $" + value;
    document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
    document.getElementById("gun").src="../public/images/revolver.png";
    document.getElementById("gun").style.marginLeft="75%";
    document.getElementById("audio").src="../public/sounds/revolver.mp3";
    }
  }
  else if (gunlevel === 2){
    if (value >= 1250){
        value = value-1250;
        increaser = increaser+70;
        ammo = 1;
        magazine = 1;
        gunlevel = 3;
        document.getElementById('buygun').innerHTML = "Buy Spas12" +  "<br />" + "2000$";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/rw1.png";
        document.getElementById("gun").style.marginLeft="75%";
        document.getElementById("audio").src="../public/sounds/revolver.mp3";
        }
  }
  else if (gunlevel === 3){
    if (value >= 2000){
        value = value-2000;
        increaser = increaser-40;
        ammo = 8;
        magazine = 8;
        gunlevel = 4;
        document.getElementById('buygun').innerHTML = "Buy 1887" +  "<br />" + "3000$";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/spas.png";
        document.getElementById("gun").style.marginLeft="25%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 4){
    if (value >= 3000){
        value = value-3000;
        increaser = increaser+20;
        ammo = 7;
        magazine = 7;
        gunlevel = 5;
        document.getElementById('buygun').innerHTML = "Buy MORS" +  "<br />" + "6000$";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/1887.png";
        document.getElementById("gun").style.marginLeft="25%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 5){
    if (value >= 6000){
        value = value-6000;
        increaser = increaser+600;
        ammo = 1;
        magazine = 1;
        gunlevel = 6;
        document.getElementById('buygun').innerHTML = "Buy Barrett" +  "<br />" + "9010$";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/mors.png";
        document.getElementById("gun").style.marginLeft="25%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 6){
    if (value >= 9010){
        value = value-9010;
        increaser = increaser-200;
        ammo = 5;
        magazine = 5;
        gunlevel = 7;
        document.getElementById('buygun').innerHTML = "Buy Ray-Gun" +  "<br />" + "20000$";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/barrett.png";
        document.getElementById("gun").style.marginLeft="-65%";
        document.getElementById("audio").src="../public/sounds/spas.mp3";
        document.getElementById("audio3").src="../public/sounds/spasreload.mp3";
        }
  }
  else if (gunlevel === 7){
    if (value >= 20000){
        value = value-20000;
        increaser = increaser+0;
        ammo = 20;
        magazine = 20;
        gunlevel = 8;
        document.getElementById('buygun').innerHTML = "Upgrade Ray-Gun" +  "<br />" + "5000$";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/raygun.png";
        document.getElementById("gun").style.marginLeft="25%";
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
        document.getElementById('buygun').innerHTML = "Buy Thundergun" +  "<br />" + "50000$";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/raygunpack.png";
        document.getElementById("gun").style.marginLeft="25%";
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
        document.getElementById('buygun').innerHTML = "Upgrade Thundergun" +  "<br />" + "5000$";
        document.getElementById("buygun").style.marginLeft="1%";
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
        document.getElementById("gun").src="../public/images/thundergun.png";
        document.getElementById("gun").style.marginLeft="25%";
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

    setTimeout(function(){ 
        document.getElementById('turretWrapper').style.marginLeft="14.75%";
     }, 2000);
            }
    }
};

document.getElementById('turretFireRate').onclick = function() {
    if (fireRate === 0 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 120rpm";
        fireRate = 1;
        turretFirerate = 500;
        clearInterval(turretAuto);
        activateTurret();
        console.log("firerate 1")
    }
    else if (fireRate === 1 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 138rpm";
        fireRate = 2;
        turretFirerate = 433;
        clearInterval(turretAuto);
        activateTurret();
        console.log("firerate 2")
    }
    else if (fireRate === 2 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 180rpm";
        fireRate = 3;
        turretFirerate = 333;
        clearInterval(turretAuto);
        activateTurret();
        console.log("firerate 3")
    }
    else if (fireRate === 3 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 225rpm";
        fireRate = 4;
        turretFirerate = 266;
        clearInterval(turretAuto);
        activateTurret();
    }
    else if (fireRate === 4 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 300rpm";
        fireRate = 5;
        turretFirerate = 200;
        clearInterval(turretAuto);
        activateTurret();
    }
    else if (fireRate === 5 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        document.getElementById('turretROF').innerHTML = "Turret Fire-Rate: 360rpm";
        fireRate = 6;
        turretFirerate = 166;
        clearInterval(turretAuto);
        activateTurret();
    }
    else if (fireRate === 6 && value >= 100000){
        value = value - 100000;
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
    if (damage === 0 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 1;
        turretIncreaser = 75;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 1 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 2;
        turretIncreaser = 100;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 2 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 3;
        turretIncreaser = 150;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 3 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 4;
        turretIncreaser = 200;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 4 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 5;
        turretIncreaser = 300;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 5 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 6;
        turretIncreaser = 400;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
    }
    else if (damage === 6 && value >= 100000){
        value = value - 100000;
        document.getElementById('value').innerHTML = "Money: $" + value;
        damage = 7;
        turretIncreaser = 500;
        document.getElementById("turretIncreaser").innerHTML = "Turret Value = " + turretIncreaser;
        document.getElementById("turretDamage").style.display = "none";
        document.getElementById("tDmgVal").style.display = "none";
        document.getElementById("tMenuBr").style.display = "none";
        if (fireRate === 7){
            document.getElementById("turretWrapper").style.display = "none";
        };
    };
};