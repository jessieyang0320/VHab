function Counter() {
  this.count = 0
}

var pinchStrength , oPinchStrength;
var pinchStrengthCutoff = .8;
var counter = new Counter();
camera.position.set( 0, 0.3, 0.4 );

Leap.loop({background: true}, {

  hand: function(hand){
    oPinchStrength = pinchStrength;
    pinchStrength = hand.pinchStrength;
  if (pinchStrength > pinchStrengthCutoff && oPinchStrength <= pinchStrengthCutoff && finished.status === false){
     counter.count +=1
     $("#pinch_sound")[0].play();
     console.log(counter.count)

  if (counter.count===2){
      $("#doing-well")[0].play();
  }

  if (counter.count===4){
      $("#you_are_so_close")[0].play();
  }
    
  if(checkSuccess()){
    $("#you-did-it")[0].play();
    moveOn("You did it!! You can move on.", '../index.html')
    finished.status = true
  }
  count.innerHTML = 'Count: ' + counter.count
  output.innerHTML = hand.pinchStrength.toPrecision(2);
  progress.style.width = hand.pinchStrength * 100 + '%';
}

}).use('boneHand', {
        targetEl: document.body,
        jointColor: new THREE.Color(0xffffff),
        rendererOps: {antialias: true},

      })
      .use('proximity');

function checkSuccess() {
  if(counter.count === 5) {
    return true;
  }
}


var output = document.getElementById('output'),
    progress = document.getElementById('progress');
    count = document.getElementById('count');