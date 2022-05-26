# Overview
Build and inject reusable components & webpages with pure HTML, CSS, and JavaScript!
# Instructions
1. Create ```components``` folder in your project and add **component_boilerplate.html**
2. Add **fetchHTML.js** to main directory
3. Open **component_boilerplate.html**
    1. Replace ```boilerplate``` in file name with new component name
    2. Replace ```[NAME]``` in div with same component name
    3. Add ALL component html, css, & js within corresponding element tags
4. Open main .html file (where component will be injected)
    1. Add the following line of code: *(NOTE THE PATH MUST POINT TO **fetchHTML.js**)*
        ```
        <script type="module">import { injectComponent } from './fetchHTML.js';</script>
        ```
    2. Add div element with ```id="container"```
        - This will be the element the component div is appended to
        - Alternatively, pass a target element as the second parameter of injectComponent()
    3. Call ```injectComponent()```
---
## Syntax
```
injectComponent(componentName, targetElmt, divManip(), componentPath)
```
## Parameters
|Parameter|Description|
|-|-|
|componentName|Required.<br/>The name of component to be injected.|
|targetElmt|Optional.<br/>Default value ```document.getElementById("container")```.<br/>The element component will be injected into.|
|divManip()|Optional.<br/>Default value ```() => {return}```.<br/>Accepts function that allows for manipulation of the div element BEFORE it is appended to target document.|
|componentPath|Optional.<br/>Default value ```./components/```.<br/>The component's .html filepath.<br/>*(NOTE THE PATH IS RELATIVE TO WHERE **injectComponent()** IS IMPORTED)*|

>*Final Note: for fetch() to function properly, project will likely need to be run on a server. I personally achieve this by opening the project folder in VSCode and running the [Live Preview extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) on index.html*
