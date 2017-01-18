addButton(-0.22, 0.1, -0.05, "Pinch", 110 , 280, buttonCallBack('views/pinch-strength.html'))

addButton(-0.12, 0.05, -0.05, "Stretch", 80 , 280, buttonCallBack('views/finger-angle.html'))

addButton(0, 0.03, -0.01, "Grab", 125 , 280, buttonCallBack('views/grab-strength.html'))

addButton(0.12, 0.05, -0.05, "WAM", 112 , 280, buttonCallBack('views/whackamole.html'))

addButton(0.22, 0.1, -0.05, "Select", 105 , 280, buttonCallBack('views/pinch-selector.html'))

function buttonCallBack(newLocation) {
  var callBack = function(mesh) {
    $("#button_sound")[0].play()
    setTimeout(function(){
      window.location.href = newLocation
    }, 1000)
  }
  return callBack
}
