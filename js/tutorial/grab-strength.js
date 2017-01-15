Leap.loop({background: true}, {

  hand: function(hand){
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
