// Fetches HTML using DOMParser
const fetchHTML = async (componentName, componentPath) => {
    const parser = new DOMParser();

    const res = await fetch(`${componentPath}${componentName}.html`);
    return parser.parseFromString(await res.text(), "text/html");
};

// Builds array of component elements from fetched HTML
const buildComponentElmts = (componentName, componentHTML) => {
    let elmtsToGenerate = ['style','script','div'];

    return elmtsToGenerate.flatMap(elmtType => {
        if(elmtType != 'div' && document.querySelector(`#${componentName}-${elmtType}`)) return [];

        const component = componentHTML.querySelector(`${elmtType}.component`).innerHTML;
        const importedElmt = document.createElement(elmtType);
            importedElmt.id = `${componentName}-${elmtType}`;
            importedElmt.innerHTML = component;
            if(elmtType == 'div') importedElmt.className = componentName;

        return elmtType = importedElmt;
    });
};

// Generates unique component id by retrieving highest existing increment value of components and adds 1
const genUniqueComponentId = (componentName) => {
    const existingComponentArray = document.querySelectorAll(`div.${componentName}`);
    let highestIncrement = 0;

    existingComponentArray.forEach(existingComponent => {
        const existingIncrement = parseInt(existingComponent.dataset.increment);
        if(highestIncrement < existingIncrement) highestIncrement = existingIncrement;
    });

    return highestIncrement + 1;
};

// Appends/prepends component elements where appropriate
export const injectComponent = async (componentName, targetId="container", componentPath="./components/") => {
    const componentHTML = await fetchHTML(componentName, componentPath);
    const componentElmts = buildComponentElmts(componentName, componentHTML);
    const uniqueComponentId = genUniqueComponentId(componentName);

    componentElmts.forEach(elmt => {
        if(elmt.tagName == 'STYLE') return document.body.prepend(elmt);
        if(elmt.tagName == 'DIV') {
            elmt.dataset.increment = uniqueComponentId;
            elmt.id += uniqueComponentId;
            return document.getElementById(targetId).append(elmt);
        };
        if(elmt.tagName == 'SCRIPT') return document.body.append(elmt);
    });
};