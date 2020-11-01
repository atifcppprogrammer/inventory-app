document.addEventListener('DOMContentLoaded', () => {
  const getCorrespondingApiUrl = () => {
    const locationArray = location.toString().split('/');
    return locationArray[4] === 'add' ? '/api/v1/add_anime.json' :
      '/api/v1/update_anime.json';
  }

  const selector = 'div.page-container > form > button, input, select, textarea';
  const nodes = document.querySelectorAll(selector);

  const preparePostRequest = () => {
    const anime = location.toString().split('/').pop().replace(/\%20/g, ' ');
    const description = nodes[2].value;
    const password = nodes[6].value;
    const poster = nodes[1].value;
    const stock = nodes[5].value;
    const price = nodes[4].value;
    const genre = nodes[3].value;
    const name = nodes[0].value;
    return {
      'headers':{ 'Content-Type':'application/json' },
      'body':JSON.stringify({ 
	doc:{ name, poster, description, genre, price, stock }, 'name':anime, password 
      }),
      'method':'post'
    }
  }

  const isValidUrl = url => {
    try { new URL(url) } catch(_){ return false; } return true;
  }
  
  const proceedWithSubmission = () => {
    const isMissing = Array.from(nodes).slice(0,6)
      .some(node => node.value.length == 0);
    const isUrl = isValidUrl(nodes[1].value);
    return !isMissing && isUrl;
  }

  nodes[7].addEventListener('click', async event => {
    if (!proceedWithSubmission()) return;
    event.preventDefault();
    const response  = await fetch(getCorrespondingApiUrl(), preparePostRequest());
    const payload = await response.json();
    if(!payload.error){
      const last = location.toString().split('/').pop();
      const name = nodes[3].value;
      window.open(last === 'add' ? '/' : `/genre/view/${name}`, '_self');
    }
    else nodes[6].value = payload.message;
  });
});

