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
    2. Add div element to append component to and add id
        - Use ```id="container"``` or a custom id that will need to be passed as an argument in the **injectComponent()** function
    3. Call ```injectComponent()```
---
## Syntax
```
injectComponent(componentName, targetId, componentPath)
```
## Parameters
|Parameter|Description|
|-|-|
|componentName|Required.<br/>The name of component to be injected.|
|targetId|Optional.<br/>Default value ```container```.<br/>The id of element component will be injected into.|
|componentPath|Optional.<br/>Default value ```./components/```.<br/>The component's .html filepath.<br/>*(NOTE THE PATH IS RELATIVE TO WHERE **injectComponent()** IS IMPORTED)*|

>*Final Note: for fetch() to function properly, project will likely need to be run on a server. I personally achieve this by opening the project folder in VSCode and running the [Live Preview extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) on index.html*