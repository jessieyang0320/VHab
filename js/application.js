var material = new THREE.MeshPhongMaterial();
material.color.setHex(0xd81a0d)

function Finished() {
  this.status = false;
}

var finished = new Finished();

function moveOn(message, newLocation) {
  var successMsg = "<p>" + message + "</p>";
  $(".message").html(successMsg);
  addNavigationButton(newLocation);
}

function addButton(px, py, pz, name, p1, p2, callBackFunction) {

  var dynamicTexture  = new THREEx.DynamicTexture(512,512)
  dynamicTexture.texture.needsUpdate  = true
  dynamicTexture.context.font = "60px Arial";
  dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy()  
  dynamicTexture.clear('#E6E6FA')
  texture1 = dynamicTexture.drawText(name, p1, p2, 'black')
  var material    = new THREE.MeshBasicMaterial({      
      map : texture.texture,
      color: 0xffffff, 
      linewidth: 2
  })
  var circleGeo = new THREE.CircleGeometry(0.04, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material);
  var buttonMesh = new THREE.Mesh(circleGeo, material2);
  var buttonMesh = new THREE.Mesh(circleGeo, material3);
  var buttonMesh = new THREE.Mesh(circleGeo, material2);
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

function addNavigationButton(newLocation) {
  var circleGeo = new THREE.CircleGeometry(0.025, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "round button";
  buttonMesh.position.set(0.18, 0.30, -0.05);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', function(mesh) {
    mesh.material.color.setHex(0xccccff);
    window.location.href = newLocation;
  }).on('release', function(mesh){
    mesh.material.color.setHex(0xd81a0d);
  });
}
