document.addEventListener('DOMContentLoaded', () => {
  const getCorrespondingApiUrl = () => {
    const locationArray = location.toString().split('/');
    return `/api/v1/remove_${locationArray[3]}.json`;
  }

  const selector = 'div.page-container > form > *';
  const nodes = document.querySelectorAll(selector);

  const preparePostRequest = () => {
    const name = location.toString().split('/').pop().replace(/\%20/g,' ');
    const password = nodes[0].value;
    return {
      'headers':{ 'Content-Type':'application/json' },
      'body':JSON.stringify({ name, password }),
      'method':'post'
    }
  }

  nodes[1].addEventListener('click', async eventObject => {
    if (nodes[0].value.toString().length == 0) return;
    eventObject.preventDefault();
    const response = await fetch(getCorrespondingApiUrl(), preparePostRequest());
    const payload = await response.json();
    console.log(payload);
    if(!payload.error){
      const collection = location.toString().split('/')[3];
      window.open('/', '_self');
    }
    else nodes[0].value = payload.message;
  });
});
