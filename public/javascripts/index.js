document.addEventListener('DOMContentLoaded', () => {
  let nodes = Array.from(document.querySelectorAll('div.content-container'));
  const listeners = nodes.map(node => {
    const name = node.children[0].textContent;
    return { 
      'update':() => window.open(`/genre/update/${name}`, '_self'),
      'delete':() => window.open(`/genre/delete/${name}`, '_self'),
      'view':() => window.open(`/genre/view/${name}`, '_self')
    };
  });
  nodes = Array.from(document.querySelectorAll('div.action-container'));
  nodes.forEach((node, index) => {
    const buttons = node.children;
    buttons[2].addEventListener('click', listeners[index].update);
    buttons[1].addEventListener('click', listeners[index].delete);
    buttons[0].addEventListener('click', listeners[index].view);
  });
});
