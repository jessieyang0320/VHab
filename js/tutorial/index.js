addButton(-0.2, 0.1, -0.05, buttonCallBack('tutorial/buttons.html'))

addButton(-0.1, 0.1, -0.05, buttonCallBack('tutorial/pinch-strength.html'))

addButton(0, 0.1, -0.05, buttonCallBack('tutorial/finger-angle.html'))

addButton(0.1, 0.1, -0.05, buttonCallBack('tutorial/grab-strength.html'))

addButton(0.2, 0.1, -0.05, buttonCallBack('level-1/whackamole.html'))

function buttonCallBack(newLocation) {
  var callBack = function(mesh) {
    $("#button_sound")[0].play()
    setTimeout(function(){
      window.location.href = newLocation
    }, 1000)
  }
  return callBack
}
