const appendTooltipText = async (componentName, targetElmt) => {
    const parser = new DOMParser();

    const res = await fetch(`./components/${componentName}.html`);
    const data = parser.parseFromString(await res.text(), "text/html");
    return targetElmt.append(data.body.innerHTML);
}

