document.addEventListener('DOMContentLoaded', () => {
  let movedEl = null;

  document.addEventListener('mousedown', e => {
    if (e.target.classList.contains('logo')) {
      movedEl = e.target;
    }
  });

  document.addEventListener('mousemove', e => {
    if (movedEl) {
      e.preventDefault();
      movedEl.classList.add('moving');
      movedEl.style.left = `${e.pageX - parseInt(getComputedStyle(movedEl).width) / 2}px`;
      movedEl.style.top = `${e.pageY - parseInt(getComputedStyle(movedEl).height) / 2}px`;
      movedEl.style.zIndex = 2;
    }
  });

  document.addEventListener('mouseup', e => {
    if (movedEl) {
      e.preventDefault();

      if (e.target.id === 'trash_bin') {
        movedEl.style.display = 'none';
      }
      
      movedEl.classList.remove('moving');
      movedEl.style.zIndex = 1;
      movedEl = null;
    }
  });
});