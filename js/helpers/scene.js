Leap.loop({background: true})
  .use('transform', {
    vr: 'desktop'
  })
  .use('boneHand', {
    targetEl: document.body,
    jointColor: new THREE.Color(0xffffff),
    rendererOps: {antialias: true},
    boneScale: 1/30
  })
  .use('proximity');

var scene = Leap.loopController.plugins.boneHand.scene;
var camera = Leap.loopController.plugins.boneHand.camera;
var renderer = Leap.loopController.plugins.boneHand.renderer;
camera.position.set( 0, 0.3, 0.6 );
