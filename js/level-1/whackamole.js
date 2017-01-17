camera.position.set( 0, 0.3, 0.3 );


var counter = new Counter();

var yPositions = [0.1, 0.2, 0.3]
var xPositions = [-0.17, -0.14, -0.11, -0.08, -0.05, -0.02, 0.01, 0.05, 0.07, 0.11, 0.15]

// Circular button:
var gameCallBack = function(mesh){
  mesh.material.color.setHex(0xccccff);
  counter.hits += 1;
  $("#hit_count").html(counter.hits)
  scene.remove(this.plane.mesh)
  addWhackamole(gameCallBack)
}

var trapCallBack = function(mesh) {
  counter.traps += 1;
  $("#lives_count").html(3 - counter.traps);
  scene.remove(this.plane.mesh)
  addTrap(trapCallBack);
}

// Add Buttons to the scene
addWhackamole(gameCallBack)
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

  var circleGeo = new THREE.CircleGeometry(0.02, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "mole";
  // var px = parseFloat((Math.random() * (0.15 + 0.18) - 0.18).toFixed(2))
  // var py = parseFloat((Math.random() * (0.3 - 0.1) + 0.1).toFixed(2))
  var px = sample(xPositions)
  var py = sample(yPositions)
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

function addTrap(callBackFunction)  {
  var circleGeo = new THREE.CircleGeometry(0.02, 32);
  var buttonMesh = new THREE.Mesh(circleGeo, material.clone());
  buttonMesh.name = "mole";
  // var px = parseFloat((Math.random() * (0.15 + 0.18) - 0.18).toFixed(2))
  // var py = parseFloat((Math.random() * (0.3 - 0.1) + 0.1).toFixed(2))
  var px = sample(xPositions)
  var py = sample(yPositions)
  var pz = -0.05

  buttonMesh.material.color.setHex(0x223047)
  buttonMesh.position.set(px, py, pz);
  scene.add(buttonMesh);
  var roundButton = new PushButton(
    new InteractablePlane(buttonMesh, Leap.loopController, {moveX: false, moveY: false})
  ).on('press', callBackFunction)
}

function Counter() {
  this.hits = 0;
  this.traps = 0;
}

function sample(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
