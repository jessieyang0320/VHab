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
  }).on('release', function(mesh){
    mesh.material.color.setHex(0xd81a0d);
  });
}
