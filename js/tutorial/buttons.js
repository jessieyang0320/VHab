function Counter() {
  this.count = 0
}

var counter = new Counter();

var material = new THREE.MeshPhongMaterial();
material.color.setHex(0xd81a0d)

// Circular button:
function addButton(px, py, pz) {

  var circleGeo = new THREE.CircleGeometry(0.05, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "round button";
  buttonMesh.position.set(px, py, pz);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', function(mesh){
    mesh.material.color.setHex(0xccccff);
    counter.count += 1;
    if(checkSuccess()) {
      moveOn();
    }
  }).on('release', function(mesh){
    mesh.material.color.setHex(0xd81a0d);
  });
}


// Add Buttons to the scene
// addButton(0, 0.15, -0.05)
addButton(0.1, 0.25, -0.05)
addButton(0.1, 0.05, -0.05)
addButton(-0.1, 0.25, -0.05)
addButton(-0.1, 0.05, -0.05)

function moveOn() {
  var successMsg = "<p>You pushed all 4 buttons!</p>";
  $(".message").html(successMsg);
}

function checkSuccess() {
  if(counter.count === 4) {
    return true;
  }
}
