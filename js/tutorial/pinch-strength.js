Leap.loop({background: true}, {

  hand: function(hand){
  if (hand.pinchStrength > .8 && finished.status === false){
    moveOn("You did it!! You can move on.", '../index.html')
    finished.status = true
  }
  progress.style.width = hand.pinchStrength * 100 + '%';

}
}).use('boneHand', {
        targetEl: document.body,
        jointColor: new THREE.Color(0xffffff),
        rendererOps: {antialias: true}
      })
      .use('proximity');


var progress = document.getElementById('progress');
