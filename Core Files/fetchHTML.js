// Fetches HTML using DOMParser
const fetchHTML = async (componentName, componentPath) => {
    const parser = new DOMParser();

    const res = await fetch(`${componentPath}${componentName}.html`);
    return parser.parseFromString(await res.text(), "text/html");
};

// Builds array of component elements from fetched HTML
const buildComponentElmts = (componentName, componentHTML, targetDocument) => {
    let elmtsToGenerate = ['style','script','div'];

    return elmtsToGenerate.flatMap(elmtType => {
        if(elmtType != 'div' && targetDocument.querySelector(`#${componentName}-${elmtType}`)) return [];

        const component = componentHTML.querySelector(`${elmtType}.component`).innerHTML;
        const importedElmt = targetDocument.createElement(elmtType);
            importedElmt.id = `${componentName}-${elmtType}`;
            importedElmt.innerHTML = component;
            if(elmtType == 'div') importedElmt.className = componentName;

        return elmtType = importedElmt;
    });
};

// Generates unique component id by retrieving highest existing increment value of components and adds 1
const genUniqueComponentId = (componentName, targetDocument) => {
    const existingComponentArray = targetDocument.querySelectorAll(`div.${componentName}`);
    let highestIncrement = 0;

    existingComponentArray.forEach(existingComponent => {
        const existingIncrement = parseInt(existingComponent.dataset.increment);
        if(highestIncrement < existingIncrement) highestIncrement = existingIncrement;
    });

    return highestIncrement + 1;
};

// Appends/prepends component elements where appropriate
export const injectComponent = async (componentName, targetElmt=document.getElementById("container"), componentPath="./components/") => {
    const targetDocument = targetElmt.ownerDocument;

    const componentHTML = await fetchHTML(componentName, componentPath);
    const componentElmts = buildComponentElmts(componentName, componentHTML, targetDocument);
    const uniqueComponentId = genUniqueComponentId(componentName, targetDocument);

    componentElmts.forEach(elmt => {
        if(elmt.tagName == 'STYLE') return targetDocument.body.prepend(elmt);
        if(elmt.tagName == 'DIV') {
            elmt.dataset.increment = uniqueComponentId;
            elmt.id += uniqueComponentId;
            return targetElmt.append(elmt);
        };
        if(elmt.tagName == 'SCRIPT') return targetDocument.body.append(elmt);
    });
};
