let value = 0;
let increaser = 10;
let ammo = 8;
let reloading = false;
let autoreload = false;

document.getElementById('click').onclick = function() {

if (ammo > 1){
    ammo = ammo-1;
    value=value+increaser;
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

    if (autoreload === true){
    ammo = -1

    setTimeout(function(){ 
        ammo = 8;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
         }, 2700);

    var audio3 = document.getElementById("audio3");
        audio3.play();
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
    ammo = -1;

    if (reloading === false){
    setTimeout(function(){ 
        ammo = 8;
        document.getElementById('ammo').innerHTML = "Ammo: " + ammo;
        reloading = false;
         }, 2700);
    };

    reloading = true;

    var audio3 = document.getElementById("audio3");
        audio3.play();
}

document.getElementById('firstupgrade').onclick = function() {
    if (value >= 200){
    document.getElementById('increaser').innerHTML = increaser;
    increaser = increaser+10;
    document.getElementById("firstupgrade").style.display = "none";
    console.log("Increase: " + increaser);
    value = value-200;
    document.getElementById('value').innerHTML = "Money: $" + value;
    document.getElementById('increaser').innerHTML = "Click Value = " + increaser;
    }
};

document.getElementById('secondupgrade').onclick = function() {
    if (value >= 1000){
    autoreload = true;
    document.getElementById("secondupgrade").style.display = "none";
    value = value-1000;
    document.getElementById('value').innerHTML = "Money: $" + value;
    }
};