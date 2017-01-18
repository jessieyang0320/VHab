addButton(-0.2, 0.1, -0.05, buttonCallBack('views/buttons.html'))

addButton(-0.1, 0.1, -0.05, buttonCallBack('views/pinch-strength.html'))

addButton(0, 0.1, -0.05, buttonCallBack('views/finger-angle.html'))

addButton(0.1, 0.1, -0.05, buttonCallBack('views/grab-strength.html'))

addButton(0.2, 0.1, -0.05, buttonCallBack('views/whackamole.html'))

function buttonCallBack(newLocation) {
  var callBack = function(mesh) {
    $("#button_sound")[0].play()
    setTimeout(function(){
      window.location.href = newLocation
    }, 1000)
  }
  return callBack
}
