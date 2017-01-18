camera.position.set( 0, 0.3, 0.3 );

var mole;
var counter = new Counter();

var yPositions = [0.1, 0.2, 0.3]
var xPositions = [-0.17, -0.14, -0.11, -0.08, -0.05, -0.02, 0.01, 0.05, 0.07, 0.11, 0.15]

// Circular button:
var gameCallBack = function(mesh){
  mesh.material.color.setHex(0xccccff);
  counter.hits += 1;
  if (counter.hits === 3) {
    alert("You won!");
  }
  $("#hit_count").html(counter.hits)
  scene.remove(this.plane.mesh)
}

var trapCallBack = function(mesh) {
  counter.traps += 1;
  $("#lives_count").html(3 - counter.traps);
  scene.remove(this.plane.mesh)
  if(counter.traps === 3){
    alert("game over");
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

function checkSuccess() {
  if(counter.hits === 4) {
    return true;
  }
}

function addWhackamole(callBackFunction) {

  var geometry = new THREE.CircleGeometry(0.03, 32);
  var jrMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("../img/jackrabbit.png") });
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
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', callBackFunction)
  setTimeout(function() {
    scene.remove(buttonMesh)
    addWhackamole(gameCallBack)
  }, 4000)
}

function addTrap(callBackFunction)  {
  var circleGeo = new THREE.CircleGeometry(0.02, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "trap";
  var px = sample(xPositions)
  var py = sample(yPositions)
  var pz = -0.05

  buttonMesh.material.color.setHex(0xe80606)
  buttonMesh.position.set(px, py, pz);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', callBackFunction)
  setTimeout(function() {
    scene.remove(buttonMesh)
    addTrap(trapCallBack)
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
