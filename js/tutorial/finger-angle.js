Leap.loop({background: true}, {

  hand: function(hand){
    var dotProduct = Leap.vec3.dot(
        hand.indexFinger.proximal.direction(),
        hand.middleFinger.proximal.direction()
    );

    window.TO_DEG = 180 / Math.PI;
    var angle = Math.acos(dotProduct);
    if (angle > .2 && finished.status === false){
      moveOn("You did it! You can move on.", 'grab-strength.html')
      finished.status = true;
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

  var progress = document.getElementById('progress');

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
