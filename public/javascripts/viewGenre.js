document.addEventListener('DOMContentLoaded', () => {
  let nodes = Array.from(document.querySelectorAll('div.content-container'));
  const listeners = nodes.map(node => {
    const name = node.children[0].textContent;
    return { 
      'update':() => window.open(`/anime/update/${name}`, '_self'),
      'delete':() => window.open(`/anime/delete/${name}`, '_self'),
    };
  });
  nodes = Array.from(document.querySelectorAll('div.action-container'));
  nodes.forEach((node, index) => {
    const buttons = node.children;
    buttons[1].addEventListener('click', listeners[index].update);
    buttons[0].addEventListener('click', listeners[index].delete);
  });

  const node = document.querySelector('div.button-container > button');
  node.removeEventListener('click', headerButtonListener)
  node.addEventListener('click', () => window.open('/anime/add', '_self'));
});
