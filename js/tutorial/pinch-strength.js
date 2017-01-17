Leap.loop({background: true}, {

  hand: function(hand){
  if (hand.pinchStrength > .8 && finished.status === false){
    moveOn("You did it!! You can move on.", 'finger-angle.html')
    finished.status = true
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


var output = document.getElementById('output'),
    progress = document.getElementById('progress');