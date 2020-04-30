 
 class ComponentFactory {
     constructor() {}

     static createElement = (componentName , classes, attributes, innerString) => {
        let componentElement = document.createElement(componentName);
        componentElement.setAttribute ('class', classes)
        if (attributes){
            attributes.forEach(att => {
                componentElement.setAttribute(att.name, att.value);
            });
        }
        if (innerString) {
            componentElement.innerHTML = innerString;
        }
        return componentElement; 
    }
 }
 
export { ComponentFactory };

