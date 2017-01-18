addButton(-0.2, 0.1, -0.05, "Pinch Strenth", 70 , 280, function(mesh){
  window.location.href = 'tutorial/buttons.html'
})

addButton(-0.1, 0.1, -0.05, "Finger Angle", 70 , 280, function(mesh) {
  mesh.texture.dynamicTexture.drawText('Pinch Strength', 70, 280, 'black')
  window.location.href = 'tutorial/pinch-strength.html'
})

addButton(0, 0.1, -0.05, "Grab Strength", 70 , 280, function(mesh){
  window.location.href = 'tutorial/finger-angle.html'
})

addButton(0.1, 0.1, -0.05, "Whackamole", 70 , 280, function(mesh){
  window.location.href = 'tutorial/grab-strength.html'
})

addButton(0.2, 0.1, -0.05, "Pinch Selection", 70 , 280, function(mesh){
  window.location.href = 'level-1/whackamole.html'
})
