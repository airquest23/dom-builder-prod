const exampleBtnToggle_tableId_regular = 'exampleBtnToggle_tableId_regular';
const exampleBtnToggle_gridId_regular = 'exampleBtnToggle_gridId_regular';
const exampleBtnToggle_tableBtnId_regular = 'exampleBtnToggle_tableBtnId_regular';
const exampleBtnToggle_gridBtnId_regular = 'exampleBtnToggle_gridBtnId_regular';

const exampleBtnToggle_tableId_dom = 'exampleBtnToggle_tableId_dom';
const exampleBtnToggle_gridId_dom = 'exampleBtnToggle_gridId_dom';
const exampleBtnToggle_tableBtnId_dom = 'exampleBtnToggle_tableBtnId_dom';
const exampleBtnToggle_gridBtnId_dom = 'exampleBtnToggle_gridBtnId_dom';

const exampleBtnToggle_tableMessage = '-->> I\'M A TABLE <<--';
const exampleBtnToggle_gridMessage = '-->> I\'M A GRID <<--';

function exampleBtnToggle_result(args) {
  return `
    <div class="d-flex align-items-center">
      <button
        type="button"  
        class="btn btn-outline-secondary me-2 disabled"
        aria-label="Table view"
        id="${args.tableBtnId}"
        onclick="${args.tableBtnFn}"
        disabled
      ><i class="bi bi-table"></i></button>
      <button
        type="button"  
        class="btn btn-outline-secondary"
        aria-label="Grid view"
        id="${args.gridBtnId}"
        onclick="${args.gridBtnFn}"
      ><i class="bi bi-grid-fill"></i></button>
    </div>
    <div class="mt-3 p-3 border border-1 text-center">
      <div id="${args.tableId}">${exampleBtnToggle_tableMessage}</div>
      <div id="${args.gridId}" class="d-none"></div>
    </div>
  `;
};

function exampleBtnToggle_result_regular() {
  return exampleBtnToggle_result({
    tableId: exampleBtnToggle_tableId_regular,
    gridId: exampleBtnToggle_gridId_regular,
    tableBtnId: exampleBtnToggle_tableBtnId_regular,
    tableBtnFn: 'exampleBtnToggle_tableBtnFn_regular()',
    gridBtnId: exampleBtnToggle_gridBtnId_regular,
    gridBtnFn: 'exampleBtnToggle_gridBtnFn_regular()',
  });
};

function exampleBtnToggle_result_dom() {
  return exampleBtnToggle_result({
    tableId: exampleBtnToggle_tableId_dom,
    gridId: exampleBtnToggle_gridId_dom,
    tableBtnId: exampleBtnToggle_tableBtnId_dom,
    tableBtnFn: 'exampleBtnToggle_tableBtnFn_dom()',
    gridBtnId: exampleBtnToggle_gridBtnId_dom,
    gridBtnFn: 'exampleBtnToggle_gridBtnFn_dom()',
  });
};

function exampleBtnToggle_tableBtnFn_regular() {
  // Make the grid disappear
  const grid = document.getElementById(exampleBtnToggle_gridId_regular);
  grid.classList.toggle('disappearing');
  grid.classList.toggle('opacity-0');
  setTimeout(() => {
    // Reset the grid
    grid.classList.toggle('d-none');
    grid.classList.toggle('disappearing');
    grid.classList.toggle('opacity-0');
    grid.innerHTML = '';
    // Show the table
    const table = document.getElementById(exampleBtnToggle_tableId_regular);
    table.classList.toggle('d-none');
    table.innerHTML = exampleBtnToggle_tableMessage;
    // Change the buttons appearance
    const tableBtn = document.getElementById(exampleBtnToggle_tableBtnId_regular);
    tableBtn.classList.toggle('disabled');
    tableBtn.disabled = true;
    const gridBtn = document.getElementById(exampleBtnToggle_gridBtnId_regular);
    gridBtn.classList.toggle('disabled');
    gridBtn.disabled = false;
    // Render table
    // Do the things you want after switching from grid view to table view (render the table, etc.)
  }, 618);
};

function exampleBtnToggle_tableBtnFn_dom() {
  // Make the grid disappear
  const dom = DOM(exampleBtnToggle_gridId_dom).toggle('disappearing').toggle('opacity-0');
  setTimeout(() => {
    // Reset the grid
    dom.toggle('d-none').toggle('disappearing').toggle('opacity-0').html('');
    // Show the table
    DOM(exampleBtnToggle_tableId_dom).toggle('d-none').html(exampleBtnToggle_tableMessage);
    // Change the buttons appearance
    DOM(exampleBtnToggle_tableBtnId_dom).toggle('disabled').disable();
    DOM(exampleBtnToggle_gridBtnId_dom).toggle('disabled').enable();
    // Render table
    // Do the things you want after switching from grid view to table view (render the table, etc.)
  }, 618);
};

function exampleBtnToggle_gridBtnFn_regular() {
  // Make the table disappear
  const table = document.getElementById(exampleBtnToggle_tableId_regular);
  table.classList.toggle('disappearing');
  table.classList.toggle('opacity-0');
  setTimeout(() => {
    // Reset the table
    table.classList.toggle('d-none');
    table.classList.toggle('disappearing');
    table.classList.toggle('opacity-0');
    table.innerHTML = '';
    // Show the grid
    const grid = document.getElementById(exampleBtnToggle_gridId_regular);
    grid.classList.toggle('d-none');
    grid.innerHTML = exampleBtnToggle_gridMessage;
    // Change the buttons appearance
    const gridBtn = document.getElementById(exampleBtnToggle_gridBtnId_regular);
    gridBtn.classList.toggle('disabled');
    gridBtn.disabled = true;
    const tableBtn = document.getElementById(exampleBtnToggle_tableBtnId_regular);
    tableBtn.classList.toggle('disabled');
    tableBtn.disabled = false;
    // Render grid
    // Do the things you want after switching from table view to grid view (render the grid, etc.)
  }, 618);
};

function exampleBtnToggle_gridBtnFn_dom() {
  // Make the table disappear
  const dom = DOM(exampleBtnToggle_tableId_dom).toggle('disappearing').toggle('opacity-0');
  setTimeout(() => {
    // Reset the table
    dom.toggle('d-none').toggle('disappearing').toggle('opacity-0').html('');
    // Show the grid
    DOM(exampleBtnToggle_gridId_dom).toggle('d-none').html(exampleBtnToggle_gridMessage);
    // Change the buttons appearance
    DOM(exampleBtnToggle_gridBtnId_dom).toggle('disabled').disable();
    DOM(exampleBtnToggle_tableBtnId_dom).toggle('disabled').enable();
    // Render grid
    // Do the things you want after switching from table view to grid view (render the grid, etc.)
  }, 618);
};