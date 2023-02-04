// création d'élement html avec attribut(s) et contenu textuel 

export function createElement(tag, attributes, textContent) {
    const element = document.createElement(tag);
    for (const attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]); // object key value
    };
    element.textContent = textContent;
    return element;
}