AFRAME.registerComponent("ball", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        this.createBall()
      }
    });
  },
  createBall: function () {
    var ballEl = document.createElement("a-entity");

    ballEl.setAttribute("gltf-model", "../Assets/bowling_ball/scene.gltf");

    ballEl.setAttribute("scale", { x: 3, y: 3, z: 3 });

    var cam = document.querySelector("#camera");

    pos = cam.getAttribute("position");

    ballEl.setAttribute("position", {
      x: pos.x,
      y: pos.y - 1.2,
      z: pos.z,
    });

    var cameraEl = document.querySelector("#camera").object3D;


    var direction = new THREE.Vector3();
    cameraEl.getWorldDirection(direction);


    ballEl.setAttribute("velocity", direction.multiplyScalar(-10));

    var sceneEl = document.querySelector("#scene");

    ballEl.setAttribute('dynamic-body', {
      shape: 'sphere',
      
    })

    ballEl.addEventListener('collide', this.removeBall)

    sceneEl.appendChild(ballEl);
  },
  removeBall:function(e){
    element=e.detail.target.el
    element_hit=e.detail.body.el
    
    if(element_hit.id.includes('pin')){ 
      impulse=new CANNON.Vec3(0,1,-15)
      world_point=new CANNON.Vec3().copy(element_hit.getAttribute('position'))
      element_hit.body.applyForce(impulse,world_point)

      element.removeEventListener('collide', this.throwBall)
    scene = document.querySelector("#scene")
    scene.removeChild(element)
    }
  }
});


