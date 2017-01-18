function Counter() {
  this.count = 0
}

var pinchStrength , oPinchStrength;
var pinchStrengthCutoff = .8;
var counter = new Counter();

Leap.loop({background: true}, {

  hand: function(hand){
    oPinchStrength = pinchStrength;
    pinchStrength = hand.pinchStrength;
  if (pinchStrength > pinchStrengthCutoff && oPinchStrength <= pinchStrengthCutoff && finished.status === false){
     counter.count +=1
     $("#pinch_sound")[0].play();
     console.log(counter.count)

    if(checkSuccess()){
      moveOn("You did it!! You can move on.", '../index.html')
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



function checkSuccess() {
  if(counter.count === 4) {
    return true;
  }
}


var output = document.getElementById('output'),
    progress = document.getElementById('progress');
