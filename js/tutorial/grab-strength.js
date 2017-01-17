function Counter() {
  this.count = 0
}

var counter = new Counter();


Leap.loop({background: true}, {

  hand: function(hand){
  if (hand.grabStrength > .8 && finished.status === false){
    counter.count += 1
    console.log(counter.count)
    sleep(800)
    // moveOn("You did it!! You can move on.", '../index.html')
    // finished.status = true
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

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }