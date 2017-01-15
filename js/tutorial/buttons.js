function Counter() {
  this.count = 0
}

var counter = new Counter();

var material = new THREE.MeshPhongMaterial();
material.color.setHex(0xd81a0d)

// Circular button:
var gameCallBack = function(mesh){
  mesh.material.color.setHex(0xccccff);
  counter.count += 1;
  if(checkSuccess()) {
    moveOn("You pushed all 4 buttons!", 'pinch-strength.html');
  }
}

// Add Buttons to the scene
addButton(0.08, 0.25, -0.05, gameCallBack)
addButton(0.08, 0.10, -0.05, gameCallBack)
addButton(-0.08, 0.25, -0.05, gameCallBack)
addButton(-0.08, 0.10, -0.05, gameCallBack)

function checkSuccess() {
  if(counter.count === 4) {
    return true;
  }
}
