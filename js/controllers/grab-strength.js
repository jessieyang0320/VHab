function Counter() {
  this.count = 0
}

var counter = new Counter();
var finished = new Finished();
var grabStrength , oGrabStrength;
var grabStrengthCutoff = .8;

camera.position.set( 0, 0.3, 0.4 );

Leap.loop({background: true}, {

  hand: function(hand){
    oGrabStrength = grabStrength;
    grabStrength = hand.grabStrength;

  if (grabStrength > grabStrengthCutoff && oGrabStrength <= grabStrengthCutoff && finished.status === false){
    counter.count += 1
    console.log(counter.count)
    $("#grab_sound")[0].play();


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

function checkSuccess() {
  if(counter.count === 5) {
    return true;
  }
}