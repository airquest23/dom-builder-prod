# DOMBuilder

## About

This is a very small (and uncomplete*) jQuery-like, lightweight, minimalist helper class to manipulate the DOM. I wanted to have a small and clean tool, without having to use jQuery, or any other dependency, allowing me to easily work with the DOM, also in a fun and intuitive way.

**Because I am lazy, I didn't put any error handling, you can add them as you want.*

## Installation

This is just a simple JS class that you can copy paste in your projects. It doesn't need any dependency or framework.

To check out the examples, just download this repo and open the 'index.html' file.

## Concept

The goal was to 'one-line' operations by chaining them. Also operations had to be written in a simple and intuitive way. So for example in your mind, you will think : 'First, I select the element, then I do some changes on it (f. ex. set its class), then I append children to it, and then I manipulate those children (f. ex. set their innerText, type, style, etc.). This example can be translated this way, in an intuitive 'one-liner':

`DOM('my_element_id').class('a_random_class').appendNew('div').class('d-flex flex-column').appendNew('p').text('Please click on the button below:').addAfter('button').set({ type: 'button', class: 'btn', html: 'Please click me!', event: ['click', (element, event) => { console.log('You clicked on me ...'); }] }).parent().parent().debug()`).

Displaying it vertically for more readability (with explanations):

```javascript
DOM('my_element_id')              // Select the element
//To select the body, you can do like this : DOM.query('body') ...
  .class('a_random_class')        // Set a class
    .appendNew('div')             // Append a child (now the selector will be on the 'div' child)
    .class('d-flex flex-column')  // Set a class on the 'div'
      .appendNew('p')                               // Append a child to the current 'div' (now the selector will be on the 'p' child)
      .text('Please click on the button below:')    // Sets the innerText on the 'p'
      .addAfter('button')                           // Add an element after the 'p' (now the selector will be on the 'button' sibling)
      .set({                                        // Set the 'button' properties
        type: 'button',
        class: 'btn',
        html: 'Please click me!',
        event: [
          'click',
          (element, event) => {
            console.log('You clicked on me ...');
          },
        ],
      })
    .parent()     // Go back to the parent 'div' with the selector
  .parent()       // Go back to the parent 'body' with the selector
  .debug();       // Log the accomplished work
```

The result will be this:

```html
<div id="my_element_id" class="a_random_class">
  <div class="d-flex flex-column">
    <p>Please click on the button below:</p>
    <button type="button" class="btn">Please click me!</button>
  </div>
</div>
```

And the console will print this:

```javascript
*************************
DEBUG START
************************* 
this: DOMBuilder {node: div#my_element_id.a_random_class, nodes: Array(0), stored: Array(0), #conditions: {…}} 

this.node: 
  <div id="my_element_id" class="a_random_class">
    <div class="d-flex flex-column">
      <p>Please click on the button below:</p>
      <button type="button" class="btn">Please click me!</button>
    </div>
  </div>

this.nodes: 
 EMPTY 

this.stored: 
 EMPTY 

this.#conditions: 
 {"value":true,"lastValue":true,"repeat":false} 

*************************
DEBUG END
*************************
```

and if you click on the button:

```
You clicked on me ...
```

## Basics

So basically, you can simply declare instances like this :

```javascript
const id = 'my_element_id';

// Select an existing element with id 'my_element_id', and toggle its class :
DOM.select(id)
  .toggle('a_random_class');

// or the shortcut (and equivalent) :
DOM(id)
  .toggle('a_random_class');

// or with a query selector :
DOM.query('#' + id)
  .toggle('a_random_class');

// Get the current working node as a variable
const node = DOM(id)        // Select the node
  .node;                    // Return the node
console.log(node);          // Print it

// Get the current working node as a variable, after some work in chaining :
const node = DOM(id)        // Select the node
  .toggle('a_random_class') // Toggle the class during the chaining
  .node;                    // Return the node
console.log(node);          // Print it

// Create a node :
DOM.create('button')
  .toggle('a_random_class') // Toggle the class
  .appendTo(                // Append it to the existing node with id 'my_element_id'
    DOM(id).node            // You must provide the HTMLElement object
  );

// Working with arrays :
const nodes = DOM(id)
  .queryAll('div')          // Select all 'div'
  //.array.perform()          //
  .nodes;                   // Return the nodes
console.log(nodes);         // So then here you can print it
```

`DOM.select(id)` or the shortcut (and equivalent) `DOM(id)` will create an instance of the class, select the found node as the "current working node", so you can manipulate it during the chaining.

If you want to get the node, just chain `.node` to return the HTMLElement object. To select another node, use `.select()` or `.create()`, or any other function that selects or creates a node (see documentation below), and now the chain will work on the new selected or created node.

You can also `.save()` a node (in the class) or `.saveGlobal()` (in an object) to reuse it later, either with `.load()` or by calling the class instance with `.callback(classInstance => { ... })`.

Example:

```javascript
DOM(id)                       // Select a node with its Id
  .save('a_random_id')        // Backup the node
  .create('button')           // Create a new one; working node will now be the 'button'
  .class('btn btn-primary')   // Set the class on the new 'button'
  // ... do other operations
  .appendTo('a_random_id');   // When done, append it to the saved node
```

This chain was just an example; it is actually shorter and equivalent to do it like so:

```javascript
DOM(id)                         // Select the parent node
  .append(                      // Append directly a new node to it
    DOM.create('button')
      .class('btn btn-primary')
      .node                     // You must append the node object (.node)
  );
```

or even shorter:

```javascript
DOM.create('button')    // Create a button
  .appendTo(            // Append it to a selected node
    DOM(id).node        // You must append it to the node object (.node)
  );
```

For the rest, you can do any operation: for example `.toggle()` will toggle a class on the element, `.append()` will append a child, `.children()` will append several children, etc.

See the documentation below for all references, and also the examples.

## Advanced usage and examples

Please check the examples: [html preview here](https://rawcdn.githack.com/airquest23/dom-builder-prod/fafe2bb133cbbd7a6524f24bb5719937695f92ef/index.html) / [source code here](./index.html).

## Documentation

|**Properties/Methods**|**Description**|**Parameters**|**Sets**|**Returns**|
|-------|------|-----------|----|-------|
|**GETTERS**|**********|**********|**********|**********|
|`node`|Gets the current node||Nothing (current node remains the same)|`{HTMLElement}` - The current node|
|`nodes`|Gets the current nodes array||Nothing (current node remains the same)|`{HTMLElement[]}` - The current nodes array|
|`stored`|Gets the current store||Nothing (current node remains the same)|`{StoredObject[]}` - The current store|
|**NODE SELECTION**|**********|**********|**********|**********|
|`select(node)`|Selects a node and stores it as the current node|`node`: `{String/HTMLElement}` - An ID / or a node to select|Current node = selected node|The current class instance|
|`query(selector, scope = null)`|Selects a node with querySelector and stores it as the current node|`selector`: `{String}` - Selector<br><br>`scope`: `{null/HTMLElement/String}` - Null / a node to define as the scope / 'this' to scope on the current node / or another string as a stored node ID. (If null, queries the whole 'document'; you can enter 'this' to query the current node; if another string is provided (other than 'this'), it looks for a stored node with the string as the node ID).|Current node = the queried node|The current class instance|
|`queryOn(selector)`|Same as 'query' (selects a node with querySelector and stores it as the current node), but with the current node as the scope|`selector`: `{String}` - Selector|Current node = the queried node|The current class instance|
|`parent(child = null)`|Gets the parent and stores it as the current node|`child`: `{null/HTMLElement/String}` - Null / a child node / or a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).|Current node = parent|The current class instance|
|`getChild(parent = null)`<br><br>`firstChild(parent = null)`|Gets the first child and stores it as the current node|`parent`: `{null/HTMLElement/String}` - Null / a parent node / or a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).|Current node = first child|The current class instance|
|`lastChild(parent = null)`|Gets the last child and stores it as the current node|`parent`: `{null/HTMLElement/String}` - Null / a parent node / or a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).|Current node = last child|The current class instance|
|`previous(node = null)`|Gets the previous node and stores it as the current node|`node`: `{null/HTMLElement/String}` - Null / a parent node / or a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).|Current node = previous node|The current class instance|
|`next(node = null)`|Gets the next node and stores it as the current node|`node`: `{null/HTMLElement/String}` - Null / a parent node / or a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).|Current node = next node|The current class instance|
|**NODE MANIPULATION**|**********|**********|**********|**********|
|*1. Place an existing node relatively to the current*|||||
|`append(child, returnParent = false)`<br><br>`child(child, returnParent = false)`|Appends a node to the current node|`child`: `{HTMLElement/String}` - Node to append / or a stored node ID. (If a string is provided, looks for a stored node).<br><br>`returnParent`: `{Boolean}` - Return the parent node ?|Current node = the child / if returnParent, then the parent|The current class instance|
|`children(children)`|Appends several nodes to the current node|`children`: `{HTMLElement[]/String[]}` - Nodes to append / or stored node IDs. (If a string is provided, looks for a stored nodes).|Nothing (current node remains the same)|The current class instance|
|`before(node)`|Inserts a node before the current node|`node`: `{HTMLElement/String}` - Node to insert before / or a stored node ID. (If a string is provided, looks for a stored nodes).|Nothing (current node remains the same)|The current class instance|
|`after(node)`|Inserts a node after the current node|`node`: `{HTMLElement/String}` - Node to insert after / or a stored node ID. (If a string is provided, looks for a stored nodes).|Nothing (current node remains the same)|The current class instance|
|*2. Place the current node relatively to another node*|||||
|`appendTo(parent)`|Appends the current node to another node|`parent`: `{HTMLElement/String}` - Node to which to append the current node / or a stored node ID. (If a string is provided, looks for a stored nodes).|Nothing (current node remains the same)|The current class instance|
|`insertBefore(node)`|Inserts the current node before another node|`node`: `{HTMLElement/String}` - Node to which to insert before / or a stored node ID. (If a string is provided, looks for a stored nodes).|Nothing (current node remains the same)|The current class instance|
|`insertAfter(node)`|Inserts the current node after another node|`node`: `{HTMLElement/String}` - Node to which to insert after / or a stored node ID. (If a string is provided, looks for a stored nodes).|Nothing (current node remains the same)|The current class instance|
|`moveUp()`|Moves the current node up in the tree||Nothing (current node remains the same)|The current class instance|
|`moveDown()`|Moves the current node down in the tree||Nothing (current node remains the same)|The current class instance|
|*3. Remove a node from the DOM*|||||
|`remove(node = null, returnRemoved = false)`|Removes a node from the DOM|`node`: `{null/HTMLElement/String}` - Null / a node to remove / a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).<br><br>`returnRemoved`: `{Boolean}` - If true, will return the removed node|Nothing (current node remains the same) / if returnRemoved, then the removed node|The current class instance|
|*4. Functions*|||||
|`perform(fn)`|Executes a function with the current node as a parameter|`fn`: `{function(HTMLElement) : void}` - Function to execute with (HTMLElement : the current node)|Nothing (current node remains the same)|The current class instance|
|`performAll(fn)`|Executes a function with the current node, nodes array and store as parameters|`fn`: `{function(HTMLElement, HTMLElement[], StoredObject[]) : void}` - Function to execute with (HTMLElement : the current node, HTMLElement[] : the current nodes array, StoredObject[] : the current store)|Nothing (current node remains the same)|The current class instance|
|`callback(fn)`|Executes a function with with the current class instance as a parameter|`fn`: `{function(DOMBuilder) : void}` - Function to execute with (DOMBuilder : the current class instance)|Nothing (current node remains the same)|The current class instance|
|**NODE CREATION**|**********|**********|**********|**********|
|*1. Create*|||||
|`create(tag)`<br><br>`new(tag)`|Creates a node and stores it as the current node|`tag`: `{String}` - Tag of the node to create|Current node = created node|The current class instance|
|`createFn(tag, fn)`<br><br>`newFn(tag, fn)`|Creates a node and returns a function with a new class for this element|`tag`: `{String}` - Tag of the node to create<br><br>`fn`: `{function(DOMBuilder, HTMLElement) : void}` - The function to execute with (DOMBuilder : a new class of the created element, HTMLElement : the current node)|Nothing (current node remains the same)|The current class instance|
|*2. Create and set*|||||
|`createSet(tag, props, value)`<br><br>`newSet(tag, props, value)`|Creates a node, stores it as the current node and sets its properties|`tag`: `{String}` - Tag of the node to create<br><br>`props`: `{Object/String}` - An attributes object / or an attribute property<br><br>`value`: `{any}` - An attribute value (if a property is provided as the 2nd parameter)|Current node = created node|The current class instance|
|*3. Create and append*|||||
|`appendNew(tag, returnParent = false)`<br><br>`appendChild(tag, returnParent = false)`<br><br>`addChild(tag, returnParent = false)`<br><br>`newChild(tag, returnParent = false)`|Creates a node and append it to the current node|`tag`: `{String}` - Tag of the node to create<br><br>`returnParent`: `{Boolean}` - Return the parent node ?|Current node = the created child / if returnParent, then the parent|The current class instance|
|*4. Create, append and set*|||||
|`appendNewSet(tag, props, value, returnParent = false)`<br><br>`appendChildSet(tag, props, value, returnParent = false)`<br><br>`addChildSet(tag, props, value, returnParent = false)`<br><br>`newChildSet(tag, props, value, returnParent = false)`|Creates a node and append it to the current node, then sets its properties|`tag`: `{String}` - Tag of the node to create<br><br>`props`: `{Object/String}` - An attributes object / or an attribute property<br><br>`value`: `{any/Boolean}` - An attribute value (if a property is provided as 1st param) / or a boolean value for 'returnParent'<br><br>`returnParent`: `{Boolean}` - Return the parent ?|Current node = the created child / if returnParent, then the parent|The current class instance|
|*5. Create and insert before / after*|||||
|`addBefore(tag)`<br><br>`newBefore(tag)`|Inserts a new node before the current node|`tag`: `{String}` - Tag of the node to create|Current node = the created node|The current class instance|
|`add(tag)`<br><br>`addAfter(tag)`<br><br>`newAfter(tag)`|Inserts a new node after the current node|`tag`: `{String}` - Tag of the node to create|Current node = the created node|The current class instance|
|*6. Create, insert after and set*|||||
|`addSet(tag, props, value, returnSource = false)`<br><br>`addAfterSet(tag, props, value, returnSource = false)`<br><br>`newAfterSet(tag, props, value, returnSource = false)`|Inserts a new node after the current node and sets its properties|`tag`: `{String}` - Tag of the node to create<br><br>`props`: `{Object/String}` - An attributes object / or an attribute property<br><br>`value`: `{any/Boolean}` - An attribute value (if a property is provided as 1st param) / or a boolean value for 'returnSource'<br><br>`returnSource`: `{Boolean}` - Return the source node (not the created) ?|Current node = the created node / if returnSource, then the source node|The current class instance|
|*7. Copy and insert before / after*|||||
|`copyBefore(node = null, doNotCopyChildren)`|Inserts a new same node before the defined node|`node`: `{null/HTMLElement/String/Boolean}` - Null / a node to copy / a stored node ID / a boolean value for 'doNotCopyChildren'. (If null, takes the current node; if a string is provided, looks for a stored node; you can also provide a boolean value for 'doNotCopyChildren' for the current node).<br><br>`doNotCopyChildren`: `{Boolean}` - Do not copy children ?|Current node = new created node (the clone)|The current class instance|
|`copy(node = null, doNotCopyChildren)`<br><br>`copyAfter(node = null, doNotCopyChildren)`|Inserts a new same node after the defined node|`node`: `{null/HTMLElement/String/Boolean}` - Null / a node to copy / a stored node ID / a boolean value for 'doNotCopyChildren'. (If null, takes the current node; if a string is provided, looks for a stored node; you can also provide a boolean value for 'doNotCopyChildren' for the current node).<br><br>`doNotCopyChildren`: `{Boolean}` - Do not copy children ?|Current node = new created node (the clone)|The current class instance|
|**NODES ARRAY**|**********|**********|**********|**********|
|`queryAll(selector, scope = null)`|Stores nodes in the nodes array with querySelectorAll|`selector`: `{String}` - Selector<br><br>`scope`: `{null/HTMLElement/String}` - Null / a node to define as the scope / 'this' to scope on the current node / or another string as a stored node ID. (If null, queries the whole 'document'; you can enter 'this' to query the current node; if another string is provided (other than 'this'), it looks for a stored node with the string as the node ID).|The nodes array = the queried nodes (the current node is not affected)|The current class instance|
|`queryAllOn(selector)`|Same as 'queryAll' (stores nodes in the nodes array with querySelectorAll), but with the current node as the scope|`selector`: `{String}` - Selector|The nodes array = the queried nodes (the current node is not affected)|The current class instance|
|`getChildren(parent = null)`|Gets the children and stores them in the nodes array|`parent`: `{null/HTMLElement/String}` - Null / a parent node / or a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).|The nodes array = the children (the current node is not affected)|The current class instance|
|`siblings(node = null)`|Gets the siblings and stores them in the nodes array|`node`: `{null/HTMLElement/String}` - Null / a node / or a stored node ID. (If null, takes the current node; if a string is provided, looks for a stored node).|The nodes array = the siblings (the current node is not affected)|The current class instance|
|**ARRAY OBJECT**|**********|**********|**********|**********|
|`array.add(node = null)`|Adds a node to the nodes array|`node`: `{null/HTMLElement}` - Null / a node to add (optional, if null adds the current node)|Pushes the node to the array|The current class instance|
|`array.get(index)`|Gets an item based on its index|`index`: `{Number}` - An index|Nothing|`{HTMLElement}` - The found element|
|`array.select(idxOrAttr, attrValue = null)`|Selects a node from the current nodes array and stores it in the current node|`idxOrAttr`: `{Number/String}` - An index to look for / or a node attribute<br><br>`attrValue`: `{null/String}` - Null / or an attribute value, if the 1st parameter is an attribute|Current node = the selected node|The current class instance|
|`array.remove(node = null)`|Removes a node from the nodes array|`node`: `{null/HTMLElement}` - Null / a node to remove (optional, if null removes the current node)|Removes the node from the array|The current class instance|
|`array.removeLast()`|Removes last nodes array item||Removes the node from the array|The current class instance|
|`array.flush()`|Flushes the nodes array||Store = empty array|The current class instance|
|`array.append(child = null, nodes = null)`|Appends a node to each node in the current nodes array|`child`: `{null/HTMLElement}` - Null / or a node to append to the array (optional, if null appends the current node)<br><br>`nodes`: `{null/HTMLElement[]}` - Null / or nodes (array) to which the child will be appended (optional, if null uses the current nodes array)|Nothing|The current class instance|
|`array.appendTo(parent = null, nodes = null)`|Appends all nodes from the current nodes array to a node|`parent`: `{null/HTMLElement}` - Null / or a node to which the array will be appended (optional, if null appends to the current node)<br><br>`nodes`: `{null/HTMLElement[]}` - Null / or nodes (array) to append (optional, if null appends the current nodes array)|Nothing|The current class instance|
|`array.perform(fn)`|Executes a function with the nodes array as a parameter|`fn`: `{function(HTMLElement[]) : void}` - Function to execute with (HTMLElement[] : the nodes array)|Nothing|The current class instance|
|`array.forEach(fn)`|Executes a function with a new class instance for each array item as a parameter|`fn`: `{function(DOMBuilder, Number, HTMLElement) : void}` - Function to execute with (DOMBuilder : a new class instance for the item, Number : the item index, HTMLElement : the current node)|Nothing|The current class instance|
|**NODES STORING**|**********|**********|**********|**********|
|`save(node = null, id = null)`|Saves a node in the store|`node`: `{null/HTMLElement/String}` - Null / a node to store / or an ID to save the current node. (If null, stores the current node; in that case, you can enter an ID as the 1st parameter to retrieve it later with load()).<br><br>`id`: `{null/String}` - Null / or an internal ID to set for the saved node (optional, but useful to retrieve it later with load()).|Pushes the node into the store|The current class instance|
|`load(id = null)`|Loads a node from the store to the current node|`id`: `{null/String}` - Null / or the internal ID of the node to retrieve (optional, if no ID is entered the last saved node will be loaded).|Current node = loaded node|The current class instance|
|`detach(node = null, id = null)`|Detaches a node from the DOM (it will save its position to reuse it later)|`node`: `{null/HTMLElement/String}` - Null / a node to detach / or an ID to save the current node. (If null, detaches the current node; in that case, you can enter an ID as the 1st parameter, to retrieve it later with load()).<br><br>`id`: `{null/String}` - Null / or an internal ID to set for the detached node (optional, but useful to retrieve it later with reattach()).|Pushes the detached node into the store|The current class instance|
|`attach(id = null)`<br><br>`reattach(id = null)`|Reattaches a detached node to the DOM at same position|`id`: `{null/String}` - Null / or the internal ID of the node to reattach (optional, if no ID is entered the last detached node will be reattached).|Nothing|The current class instance|
|`saveGlobal(emptyObject, prop = null)`|Saves the current node globally in an object, to reuse it later (you must pass a variable representing { ... })|`obj`: `{Object}` - A variable representing an object<br><br>`prop`: `{null/String}` - Null / a property name (if null, will store the object in obj.node)|Nothing|The current class instance|
|**STORE OBJECT**|**********|**********|**********|**********|
|`store.add(node = null, id = null)`|Same as `save(node = null, id = null)`. You can refer to the documentation above.||||
|`store.get(id = null)`|Same as `load(id = null)`. You can refer to the documentation above.||||
|`store.remove(node = null)`|Removes a node from the store|`node`: `{null/HTMLElement/String}` - Null / a node to remove / or an ID of a node to remove. (If null, it will try with the current node).|Removes the node from the store|The current class instance|
|`store.removeLast()`|Removes last node from the store||Removes the node from the store|The current class instance|
|`store.flush()`|Flushes the store array||Store = empty array|The current class instance|
|`store.perform(fn)`|Executes a function with store as a parameter|`fn`: `{function(StoredObject[]) : void}` - The function to execute with (StoredObject[] : the store array)|Nothing|The current class instance|
|**CONDITIONS**|**********|**********|**********|**********|
|`if(condition, repeat = false)`<br><br>`condition(condition, repeat = false)`|Sets a condition; next chain is skipped if condition is false (next chain will be executed only if condition is true)|`condition`: `{Boolean/function(HTMLELement):Boolean}` - A condition (boolean value) / A function with the current node as the parameter, returning a boolean value<br><br>`repeat`: `{Boolean}` - Repeat ? (if true, you must use later cancelCondition() to stop skipping the chain in case of false return)|Next chain is skipped if condition is false / if repeat and condition is false, then all next chains are skipped until calling cancelCondition()|The current class instance|
|`elseIf(condition, repeat = false)`|Next chain is skipped if the last condition was true (next chain is executed only if the last condition was false) and again (like condition()) next chain is skipped if condition is false (next chain is executed only if condition is true)|`condition`: `{Boolean/function(HTMLELement):Boolean}` - A condition (boolean value) / A function with the current node as the parameter, returning a boolean value<br><br>`repeat`: `{Boolean}` - Repeat ? (if true, you must use later cancelCondition() to stop skipping the chain in case of false return)|Next chain is skipped if condition is false / if repeat and condition is false, then all next chains are skipped until calling cancelCondition()|The current class instance|
|`else(repeat = false)`|Next chain is skipped if the last condition was true (next chain will be executed only if the last condition was false)|`repeat`: `{Boolean}` - Repeat ? (if true, you must use later cancelCondition() to stop skipping the chain if the last condition was true)|Next chain is skipped if the last condition was true|The current class instance|
|`cancelIf()`<br><br>`cancelCondition()`|Cancels the last condition (see condition())||Last condition will not be applied anymore to the next chains|The current class instance|
|**ATTRIBUTES SETTERS**|**********|**********|**********|**********|
|`set(props, value)`|Sets attribute on the current node|`props`: `{Object/String}` - An attributes object / or an attribute property<br><br>`value`: `{any}` - An attribute value (if a property is provided as the 1st parameter)|Nothing|The current class instance|
|`id(value)`|Sets ID on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`name(value)`|Sets name on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`type(value)`|Sets type on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`for(value)`|Sets for on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`placeholder(value)`|Sets placeholder on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`value(value)`|Sets value on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`href(value)`|Sets href on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`text(value)`|Sets innerText on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`html(value)`|Sets innerHTML on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`class(value)`|Sets class on the current node|`value`: `{String}` - Value|Nothing|The current class instance|
|`toggle(values)`|Toggles class(es) on the current node|`values`: `{String/String[]}` - Values (one string, or can be an array of strings)|Nothing|The current class instance|
|`style(props, value)`|Sets style on the current node|`props`: `{Object/String}` - A style object / or a style property<br><br>`value`: `{any}` - A style value (if a property is provided as the 1st parameter)|Nothing|The current class instance|
|`disable()`|Disables the current node||Nothing|The current class instance|
|`disableIf()`|Disables conditionally the current node|`condition`: `{Boolean}` - A condition|Nothing|The current class instance|
|`enable()`|Enables the current node||Nothing|The current class instance|
|`enableIf()`|Enables conditionally the current node|`condition`: `{Boolean}` - A condition|Nothing|The current class instance|
|`checked(value = true)`|Sets checked on the current node|`value`: `{Boolean}` - A value (if empty = true)|Nothing|The current class instance|
|`event(event, fn)`|Adds an event listener on the current node|`event`: `{String}` - Event<br><br>`fn`: `{function(HTMLElement, HTMLEventListener) : void}` - Function to execute on event with (HTMLElement : the current node, HTMLEventListener : the event)|Nothing|The current class instance|
|**CLASSES OBJECT**|**********|**********|**********|**********|
|`classes.set(value)`|Same as `class(value)`. You can refer to the documentation above.||||
|`classes.add(values)`|Adds class(es) on the current node|`values`: `{String/String[]}` - Values (one string, or can be an array of strings)|Nothing|The current class instance|
|`classes.remove(values)`|Removes class(es) on the current node|`values`: `{String/String[]}` - Values (one string, or can be an array of strings)|Nothing|The current class instance|
|`classes.toggle(values)`|Same as `toggle(values)`. You can refer to the documentation above.||||
|`classes.contains(value)`|Check if classList contains the value|`value`: `{String}` - Value|Nothing|`{Boolean}` - A boolean value|
|**EVENTS OBJECT**|**********|**********|**********|**********|
|`events.add(event, fn)`|Same as `event(event, fn)`. You can refer to the documentation above.||||
|`events.remove(event, fn)`|Removes an event listener on the current node|`event`: `{String}` - Event<br><br>`fn`: `{function(HTMLElement, HTMLEventListener) : void}` - Function to remove with (HTMLElement : the current node, HTMLEventListener : the event)|Nothing|The current class instance|
|**OTHERS**|**********|**********|**********|**********|
|`debug()`|Debug function (logs the current class state)||Nothing|The current class instance|
