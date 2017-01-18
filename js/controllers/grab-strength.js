function Counter() {
  this.count = 5
}

var counter = new Counter();
var finished = new Finished();
var grabStrength , oGrabStrength;
var grabStrengthCutoff = .8;

Leap.loop({background: true}, {

  hand: function(hand){
    oGrabStrength = grabStrength;
    grabStrength = hand.grabStrength;

  if (grabStrength > grabStrengthCutoff && oGrabStrength<= grabStrengthCutoff && finished.status === false){
    counter.count -= 1
    console.log(counter.count)
    
    if (counter.count === 0) {
    moveOn("You did it!! You can move on.", '../index.html')
    finished.status = true    
    }

  }
  output.innerHTML = hand.grabStrength.toPrecision(2);
  progress.style.width = hand.grabStrength * 100 + '%';

}
}).use('boneHand', {
        targetEl: document.body,
        jointColor: new THREE.Color(0xffffff),
        rendererOps: {antialias: true}
      })
      .use('proximity');


var progress = document.getElementById('progress');
    output = document.getElementById('output');

