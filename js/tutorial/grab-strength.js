Leap.loop({background: true}, {

  hand: function(hand){
  if (hand.grabStrength > .8){
    moveOn("You did it!! You can move on.")
  }
  output.innerHTML = hand.grabStrength.toPrecision(3);
  progress.style.width = hand.grabStrength * 100 + '%';

}
}).use('boneHand', {
        targetEl: document.body,
        jointColor: new THREE.Color(0xffffff),
        rendererOps: {antialias: true}
      })
      .use('proximity');


var output = document.getElementById('output'),
    progress = document.getElementById('progress');
