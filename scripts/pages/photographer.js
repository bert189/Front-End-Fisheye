// Code trouvé sur stackoverflow

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const id = getParameterByName('id');

console.log(id);


// autre solution plus courte

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('id')
console.log(id);