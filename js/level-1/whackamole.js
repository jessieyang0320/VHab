camera.position.set( 0, 0.3, 0.3 );

function Counter() {
  this.count = 0
}

var counter = new Counter();



// Circular button:
var gameCallBack = function(mesh){
  mesh.material.color.setHex(0xccccff);
  counter.count += 1;
  if(checkSuccess()) {
    moveOn("You pushed all 4 buttons!", 'pinch-strength.html');
  }
}

// Add Buttons to the scene
addWhackamole(0.15, 0.3, -0.05, gameCallBack)
addWhackamole(0.15, 0.10, -0.05, gameCallBack)
addWhackamole(-0.18, 0.3, -0.05, gameCallBack)
addWhackamole(-0.18, 0.10, -0.05, gameCallBack)

// ranges:
// X: -0.18 - 0.15
// Y: 0.1 - 0.3
// Z: -0.05

function checkSuccess() {
  if(counter.count === 4) {
    return true;
  }
}

function addWhackamole(px, py, pz, callBackFunction) {

  var circleGeo = new THREE.CircleGeometry(0.03, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "round button";
  buttonMesh.position.set(px, py, pz);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', callBackFunction
  ).on('release', function(mesh){
    mesh.material.color.setHex(0xd81a0d);
  });
}
