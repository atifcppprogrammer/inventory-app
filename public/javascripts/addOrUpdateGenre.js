document.addEventListener('DOMContentLoaded', () => {
  const getCorrespondingApiUrl = () => {
    const locationArray = location.toString().split('/');
    return locationArray[4] === 'add' ? '/api/v1/add_genre.json' :
      '/api/v1/update_genre.json';
  }

  const selector = 'div.page-container > form > button, input';
  const nodes = document.querySelectorAll(selector);

  const preparePostRequest = () => {
    const genre = location.toString().split('/').pop().replace(/\%20/g, ' ');
    const password = nodes[2].value;
    const poster = nodes[1].value;
    const name = nodes[0].value;
    return {
      'headers':{ 'Content-Type':'application/json' },
      'body':JSON.stringify({ doc:{ name, poster }, 'name':genre, password }),
      'method':'post'
    }
  }

  const isValidUrl = url => {
    try { new URL(url) } catch(_){ return false; } return true;
  }
  
  const proceedWithSubmission = () => {
    const isMissing = Array.from(nodes).slice(0,3)
      .some(node => node.value.length == 0);
    const isUrl = isValidUrl(nodes[1].value);
    return !isMissing && isUrl;
  }

  nodes[3].addEventListener('click', async event => {
    if(!proceedWithSubmission()) return;
    event.preventDefault();
    const response  = await fetch(getCorrespondingApiUrl(), preparePostRequest());
    const payload = await response.json();
    !payload.error ? window.open('/', '_self') : nodes[2].value = payload.message;
  });
});

