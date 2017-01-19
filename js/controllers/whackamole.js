$(document).ready(function() {
  $(".message").fadeIn("slow");
  setTimeout(function() {
    $(".message").fadeOut("slow");
  }, 4000)
})



var pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set(1,1,2);
camera.add(pointLight);
camera.position.set( 0, 0.3, 0.3 );

var mole;
var counter = new Counter();

var yPositions = [0.1, 0.2, 0.3]
var xPositions = [-0.17, -0.14, -0.11, -0.08, -0.05, -0.02, 0.01, 0.05, 0.07, 0.11, 0.15]

// Circular button:
var gameCallBack = function(mesh){
  $("#rabbit_sound")[0].play();
  mesh.material.color.setHex(0xccccff);
  counter.hits += 1;
  if (counter.hits === 5) {
    moveOn("<h4>Nice Job!</h4>", '../index.html')
  }
  $("#hit_count").html(counter.hits)
  var px = sample(xPositions)
  var py = sample(yPositions)
  var pz = -0.05
  this.plane.mesh.position.set(px, py, pz)
}

var trapCallBack = function(mesh) {
  $("#tiger_sound")[0].play();
  counter.traps += 1;
  $("#lives_count").html(3 - counter.traps);
  var px = sample(xPositions)
  var py = sample(yPositions)
  var pz = -0.05
  if(counter.traps === 3){
    moveOn("<h4>You are Out of Lives</h4>", '../index.html')
    scene.children.splice(87, 3);
  }
  else {
    this.plane.mesh.position.set(px, py, pz)
  }
}
// Add Buttons to the scene
addWhackamole(gameCallBack)
addTrap(trapCallBack)
addTrap(trapCallBack)

// ranges:
// X: -0.18 - 0.15
// Y: 0.1 - 0.3
// Z: -0.05


function addWhackamole(callBackFunction) {

  var geometry = new THREE.CircleGeometry(0.03, 32);
  var jrMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("../img/bunny.png") });
  var buttonMesh = new THREE.Mesh(geometry, jrMaterial.clone());
  var px = sample(xPositions)
  var py = sample(yPositions)
  var pz = -0.05
  // buttonMesh.material.color.setHex(0x60D7F1)
  buttonMesh.name = "mole";
  buttonMesh.position.set(px, py, pz);
  scene.add(buttonMesh);
  mole = buttonMesh;
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {
      moveX: false,
      moveY: false,
      locking: false
    })
  ).on('press', callBackFunction)
  setInterval(function() {
    px = sample(xPositions)
    py = sample(yPositions)
    buttonMesh.position.set(px, py, pz)
  }, 4000)
}

function addTrap(callBackFunction)  {
  var geometry = new THREE.CircleGeometry(0.02, 32);
  var jrMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("../img/tiger.png") });
  var buttonMesh = new THREE.Mesh(geometry, jrMaterial.clone());
  // var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "trap";
  var px = sample(xPositions)
  var py = sample(yPositions)
  var pz = -0.05

  // buttonMesh.material.color.setHex(0xE05024)
  buttonMesh.position.set(px, py, pz);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController,
      {
        moveX: false,
        moveY: false,
        locking: false
      })
  ).on('press', callBackFunction)
  setInterval(function() {
    px = sample(xPositions)
    py = sample(yPositions)
    buttonMesh.position.set(px, py, pz)
  }, 3000)
}

  function Counter() {
    this.hits = 0;
    this.traps = 0;
}

function sample(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
