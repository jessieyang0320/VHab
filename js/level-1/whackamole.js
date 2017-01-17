camera.position.set( 0, 0.3, 0.3 );

function Counter() {
  this.count = 0
}

var counter = new Counter();



// Circular button:
var gameCallBack = function(mesh){
  mesh.material.color.setHex(0xccccff);
  counter.count += 1;
  scene.remove(this.plane.mesh)
}

// Add Buttons to the scene
addWhackamole(gameCallBack)

// ranges:
// X: -0.18 - 0.15
// Y: 0.1 - 0.3
// Z: -0.05

function checkSuccess() {
  if(counter.count === 4) {
    return true;
  }
}

function addWhackamole(callBackFunction) {

  var circleGeo = new THREE.CircleGeometry(0.02, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "round button";
  var px = parseFloat((Math.random() * (0.15 + 0.18) - 0.18).toFixed(2))
  var py = parseFloat((Math.random() * (0.3 - 0.1) + 0.1).toFixed(2))
  var pz = -0.05

  buttonMesh.position.set(px, py, pz);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', callBackFunction
  ).on('release', function(mesh){
    mesh.material.color.setHex(0xd81a0d);
  });
}
