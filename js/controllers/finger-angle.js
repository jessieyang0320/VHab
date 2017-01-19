function Counter() {
  this.count = 0
}
var fingerAngle , oFingerAngle;
var fingerAngleCutoff = .4
var counter = new Counter();
camera.position.set( 0, 0.3, 0.4 );

Leap.loop({background: true}, {

  hand: function(hand){
    var dotProduct = Leap.vec3.dot(
        hand.indexFinger.proximal.direction(),
        hand.middleFinger.proximal.direction()
    );

    window.TO_DEG = 180 / Math.PI;
    var angle = Math.acos(dotProduct);

    oFingerAngle = fingerAngle;
    fingerAngle = angle;

    
    if (fingerAngle > fingerAngleCutoff && oFingerAngle<=fingerAngleCutoff && finished.status === false){

      console.log(counter.count)
      counter.count +=1
      $("#angle_sound")[0].play();

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

    output_rad.innerHTML = (angle ).toPrecision(2) + ' rad';
    output_deg.innerHTML = (angle * TO_DEG).toPrecision(2) + '°';

    progress.style.width = angle * 100 + '%';
}
}).use('transform', {
        vr: 'desktop'
      })
      .use('boneHand', {
        targetEl: document.body,
        jointColor: new THREE.Color(0xffffff),
        rendererOps: {antialias: true}
      })
      .use('proximity');


function checkSuccess() {
  if(counter.count === 5) {
    return true;
  }
}

  var progress = document.getElementById('progress');


