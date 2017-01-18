
      var camera, scene, renderer, container;

      var frame, controller;

      var sceneSize = 20;

      var selectableHoverMaterial;
      var selectableNeutralMaterial;
      var selectableSelectedMaterial;

      var selectables = [];

      var selectableSelected = false;

      var hoveredSelectable;

      var numOfSelectables = 5;

      var pinchPoint, pinchStrength , oPinchStrength;

      var pinchStrengthCutoff = .5;

      var movementStrength = .03;

      init();

      animate();


      function init(){

        controller = new Leap.Controller();

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          50 ,
          window.innerWidth / window.innerHeight,
          sceneSize / 100 ,
          sceneSize * 4
        );

        camera.position.z = sceneSize;

        container = document.createElement( 'div' );

        container.style.width      = '100%';
        container.style.height     = '100%';
        container.style.position   = 'absolute';
        container.style.top        = '0px';
        container.style.left       = '0px';
        container.style.background = '#000';

        document.body.appendChild( container );

        renderer = new THREE.WebGLRenderer();

        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize , false );


        initPinchPoint();
        initSelectables();
        initLights();

        controller.connect();


      }


      function initPinchPoint(){

        var geo = new THREE.SphereGeometry(2, 16, 16);

        pinchPoint = new THREE.Mesh(
          geo,
          new THREE.MeshNormalMaterial({
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 1
          })
        );


        pinchWireframe = new THREE.Mesh(
          geo,
          new THREE.MeshNormalMaterial({
            blending: THREE.AdditiveBlending,
            transparent: false,
            opacity: 1,
            wireframe: true
          })
        );

        var light = new THREE.PointLight( 0xffffff , 0.5 );

        pinchWireframe.position = pinchPoint.position;

        scene.add( pinchPoint );
        pinchPoint.add( pinchWireframe );
        pinchPoint.add( light );

      }

      function initLights(){

        var light = new THREE.DirectionalLight( 0xffffff , .5 );
        light.position.set( 0, 1 , 0 );
        scene.add( light );

      }


      function initSelectables(){

        selectableHoverMaterial = new THREE.MeshNormalMaterial({
          wireframe:false,
        });

        selectableNeutralMaterial = new THREE.MeshLambertMaterial({
          color:0xffffff,
          wireframe:true,
        });

        selectableSelectedMaterial = new THREE.MeshNormalMaterial();

        var geo = new THREE.IcosahedronGeometry( sceneSize / 30 , 2 );

        for( var i = 0; i < numOfSelectables; i++ ){

          var xPositions = [-2, -3, -4, -5, -6, -7, -10, -11, -12, -13]

          var selectable = new THREE.Mesh( geo , selectableNeutralMaterial );

          selectable.position.x = sample(xPositions);
          selectable.position.y = ( Math.random(window.innerHeight) * 10);
          selectable.position.z = ( Math.random() - .75 ) * sceneSize;


          selectable.difference = new THREE.Vector3();
          selectable.distance   = selectable.difference.length();


          selectable.hovered = false;
          selectable.selected = false;

          selectables.push( selectable );
          scene.add( selectable );

        }

      }


      function leapToScene( position ){

        var x = position[0] - frame.interactionBox.center[0];
        var y = position[1] - frame.interactionBox.center[1];
        var z = position[2] - frame.interactionBox.center[2];

        x /= frame.interactionBox.size[0];
        y /= frame.interactionBox.size[1];
        z /= frame.interactionBox.size[2];

        x *= sceneSize;
        y *= sceneSize;
        z *= sceneSize;

        z -= sceneSize;

        return new THREE.Vector3( x , y , z );

      }


      function updatePinchPoint(){

        if( frame.hands[0] ){

          var hand = frame.hands[0];

          // First position pinch point
          pinchPoint.position = leapToScene( hand.palmPosition );

          oPinchStrength = pinchStrength;
          pinchStrength = hand.pinchStrength;


          pinchPoint.material.opacity = pinchStrength;
          pinchPoint.materialNeedsUpdate = true;

        }


      }


      function updateSelectables(){


        for( var i = 0; i < selectables.length; i++ ){

          var selectable = selectables[i];

          selectable.difference.subVectors(
            selectable.position,
            pinchPoint.position
          );

          selectable.distance = selectable.difference.length();

        }


        if( !selectableSelected ){

          var closestDistance = Infinity;
          var closestSelectable;


          for( var i = 0; i < selectables.length; i++ ){

            if( selectables[i].distance < closestDistance ){

              closestSelectable = selectables[i];
              closestDistance   = selectables[i].distance;

            }

          }


          for( var i = 0; i < selectables.length; i++ ){

            if( selectables[i] == closestSelectable ){
              if( !selectables[i].hovered ){
                selectables[i].hovered = true;
                selectables[i].material = selectableHoverMaterial;
                selectables[i].materialNeedsUpdate = true;
              }

            }else{
              if( selectables[i].hovered ){
                selectables[i].hovered = false;
                selectables[i].material = selectableNeutralMaterial;
                selectables[i].materialNeedsUpdate = true;
              }
            }

          }

        }

        if(
          oPinchStrength < pinchStrengthCutoff &&
          pinchStrength >= pinchStrengthCutoff
        ){


          for( var i = 0; i < selectables.length; i++ ){

            if( selectables[i].hovered ){

              selectables[i].selected = true;
              selectables[i].material = selectableSelectedMaterial;

              selectableSelected = true;
            }
          }

        }else if(
          oPinchStrength > pinchStrengthCutoff &&
          pinchStrength <= pinchStrengthCutoff
        ){

           for( var i = 0; i < selectables.length; i++ ){

            if( selectables[i].selected ){

              selectables[i].selected = false;

              if( selectables[i].hovered ){
                selectables[i].material = selectableHoverMaterial;
              }else{
                selectables[i].material = selectableNeutralMaterial;
              }

              selectableSelected = false;

            }
          }

        }


        for( var i = 0; i < selectables.length; i++ ){

          if( selectables[i].selected ){

            var force = selectables[i].difference.clone();
            force.multiplyScalar( movementStrength );

            selectables[i].position.sub( force );

          }


        }


      }

      function update(){

        updatePinchPoint();
        updateSelectables();
        checkSuccess();
      }


      function animate(){

        frame = controller.frame();

        update();

        renderer.render( scene , camera );

        requestAnimationFrame( animate );

      }


      function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function sample(arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
      }

      function checkSuccess(){
        var finished;
        selectables.forEach(function(selectable) {
          if (selectable.position.x < 0){
            finished = false
          }
        })
        if (finished !== false){
          finished = true
        }
        return finished
      }
