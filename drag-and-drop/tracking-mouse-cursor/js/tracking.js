//function to get coords of center of eye
function getCoords(el) {
  const bounds = el.getBoundingClientRect();
  const x = (bounds.left + bounds.right) / 2;
  const y = (bounds.top + bounds.bottom) / 2;
  return {x, y};
}

//function to get degree to rotate eyes
function getDeg(e, coords) {
  const rad = Math.atan2(e.clientX - coords.x, e.clientY - coords.y);
  const modifier = 138; //modifier help to begin from 0 deg (by default eyes a directed about 138 degrees)
  const deg = (rad * (180 / Math.PI) * -1) + 180 - modifier;
  return deg;
}

document.addEventListener('DOMContentLoaded', () => {
  const leftEye = document.querySelector('.cat_position_for_left_eye');
  const rightEye = document.querySelector('.cat_position_for_right_eye');
  
  document.addEventListener('mousemove', e => {
    [leftEye, rightEye].forEach(eye => {
      eye.style.transform = `rotate(${getDeg(e, getCoords(eye))}deg)`;
    });
  });
    
});