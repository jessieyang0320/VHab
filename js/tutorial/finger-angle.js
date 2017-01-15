Leap.loop({background: true}, {

  hand: function(hand){
    var dotProduct = Leap.vec3.dot(
        hand.indexFinger.proximal.direction(),
        hand.middleFinger.proximal.direction()
    );

    var angle = Math.acos(dotProduct);
    if (angle > .2 && finished.status === false){
      moveOn("You did it! You can move on.", 'grab-strength.html')
      finished.status = true;
    }

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
