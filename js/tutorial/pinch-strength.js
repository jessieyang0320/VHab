function Counter() {
  this.count = 0
}


var counter = new Counter();

Leap.loop({background: true}, {

  hand: function(hand){
      
  if (hand.pinchStrength > 0.8 && finished.status === false){
     counter.count +=1
     console.log("hello")
     sleep(800)

    if(checkSuccess()){    
      moveOn("You did it!! You can move on.", 'finger-angle.html')
      finished.status = true
    }


  }

  output.innerHTML = hand.pinchStrength.toPrecision(2);
  progress.style.width = hand.pinchStrength * 100 + '%';
}

}).use('boneHand', {
        targetEl: document.body,
        jointColor: new THREE.Color(0xffffff),
        rendererOps: {antialias: true}
      })
      .use('proximity');




function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function checkSuccess() {
  if(counter.count === 4) {
    return true;
  }
}


var output = document.getElementById('output'),
    progress = document.getElementById('progress');

