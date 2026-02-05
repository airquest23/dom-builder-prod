const exampleNodeSelection_divId = 'exampleNodeSelection_divId';

const styleRed = {
  backgroundColor: 'red',
  color: 'yellow',
};

const styleGreen = {
  backgroundColor: 'green',
  color: 'white',
};

function exampleNodeSelection_result() {
  return `
    <div class="d-flex justify-content-center border border-1" id="${exampleNodeSelection_divId}">
      -->> I'M A DIV <<--
    </div>
  `;
};

function exampleNodeSelection_select() {
  DOM(exampleNodeSelection_divId)       // Select the div
  // This is equivalent to (and a shortcut for) : DOM.select(exampleNodeSelection_divId)
  // equivalent in plain JS : document.getElementById(exampleNodeSelection_divId)
    .if(div => div.style.backgroundColor !== 'green', true) // Sets a condition (color isn't green)
    .style(styleGreen)                  // If true => style to green
    .html('-->> I\'M A GREEN DIV <<--') // If true => change innerHTML
    .cancelIf()
    .else(true)                         // else
    .style(styleRed)                    // Style to red
    .html('-->> I\'M A RED DIV <<--')   // Change innerHTML
    .cancelIf();
};

function exampleNodeSelection_query() {
  DOM.query('#' + exampleNodeSelection_divId)
  // equivalent in plain JS : document.querSelector('#' + exampleNodeSelection_divId)
    .if(div => div.style.backgroundColor !== 'green', true)
    .style(styleGreen)
    .html('-->> I\'M A GREEN DIV <<--')
    .cancelIf()
    .else(true)
    .style(styleRed)
    .html('-->> I\'M A RED DIV <<--')
    .cancelIf();
};