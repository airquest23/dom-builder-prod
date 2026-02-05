const exampleNodeManipulation_divId1 = 'exampleNodeManipulation_divId1';
const exampleNodeManipulation_divId2 = 'exampleNodeManipulation_divId2';

function exampleNodeManipulation_result() {
  return `
    <div class="d-flex flex-column text-center align-items-center border border-1">
      <div class="d-flex" id="${exampleNodeManipulation_divId1}">
        I'M DIV 1
      </div>
      <div class="d-flex" id="${exampleNodeManipulation_divId2}">
        I'M DIV 2
      </div>
    </div>
  `;
};

function exampleNodeManipulation() {
  DOM(exampleNodeManipulation_divId1)
    .if(currentNode => {
      const nextNode = DOM(currentNode).next().node;
      return nextNode && nextNode.id === exampleNodeManipulation_divId2;
    })
    .moveDown()
    .else()
    .moveUp();
};