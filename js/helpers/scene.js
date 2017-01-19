Leap.loop({background: true})
  .use('transform', {
    vr: 'desktop'
  })
  .use('boneHand', {
    targetEl: document.body,
    rendererOps: {antialias: true},
    jointColor: (new THREE.Color).setHex(0x43C59E),
    boneColor: (new THREE.Color).setHex(0xffffff),
    boneScale: 1/4
  })
  .use('proximity');

var scene = Leap.loopController.plugins.boneHand.scene;
var camera = Leap.loopController.plugins.boneHand.camera;
var renderer = Leap.loopController.plugins.boneHand.renderer;
camera.position.set( 0, 0.3, 0.6 );
