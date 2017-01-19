var material = new THREE.MeshPhongMaterial();
material.color.setHex(0xd81a0d)

function Finished() {
  this.status = false;
}

var finished = new Finished();

function moveOn(message, newLocation) {
  var successMsg = "<p>" + message + "</p>";
  $(".message").html(successMsg);
  $(".message").fadeIn("slow");
  setTimeout(function() {
    $(".message").fadeOut("slow");
  }, 4000)
  addNavigationButton(newLocation);
}

function addButton(px, py, pz, name, p1, p2, callBackFunction) {

  var dynamicTexture  = new THREEx.DynamicTexture(512,512)
  dynamicTexture.texture.needsUpdate  = true
  dynamicTexture.context.font = "110px Montserrat, sans-serif";
  dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy()

  dynamicTexture.clear('#43C59E')
  texture = dynamicTexture.drawText(name, p1, p2, 'black')
  var material    = new THREE.MeshBasicMaterial({
      map : texture.texture,
      color: 0xffffff
  })
  var circleGeo = new THREE.CircleGeometry(0.05, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material);
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
  var dynamicTexture  = new THREEx.DynamicTexture(512,512)
  dynamicTexture.texture.needsUpdate  = true
  dynamicTexture.context.font = "110px Montserrat, sans-serif";
  dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy()

  dynamicTexture.clear('#43C59E')
  texture = dynamicTexture.drawText('Home', 110 , 280, 'black')
  var material    = new THREE.MeshBasicMaterial({
      map : texture.texture,
      color: 0xffffff
  })
  var circleGeo = new THREE.CircleGeometry(0.025, 35);
  var buttonMesh = new THREE.Mesh(circleGeo, material);
  buttonMesh.name = "round button";
  buttonMesh.material.color.setHex(0x43C59E);
  buttonMesh.position.set(0.18, 0.30, -0.05);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', function(mesh) {
    $("#button_sound")[0].play();
    mesh.material.color.setHex(0xccccff);
    setTimeout(function() {
      window.location.href = newLocation;
    }, 1000)
  }).on('release', function(mesh){
    mesh.material.color.setHex(0xd81a0d);
  });
}
