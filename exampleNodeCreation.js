const exampleNodeCreation_tableId = 'exampleNodeCreation_tableId';

function exampleNodeCreation_result() {
  return `
    <div class="table-responsive small p-3">
      <table class="table" id="${exampleNodeCreation_tableId}">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>First1</td>
            <td>Last1</td>
            <td>Handle1</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>First2</td>
            <td>Last2</td>
            <td>Handle2</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>First3</td>
            <td>Last3</td>
            <td>Handle3</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

function exampleNodeCreation_plus() {
  const count = DOM(exampleNodeCreation_tableId).queryOn('tbody').queryAll('tr').nodes.length;
  DOM(exampleNodeCreation_tableId).queryOn('tbody')
    .appendChild('tr')
      .appendChildSet('th', {
        scope: 'row',
        text: count,
      })
      .add('td').text('First'  + count)
      .add('td').text('Last'   + count)
      .add('td').text('Handle' + count);
};

function exampleNodeCreation_minus() {
  DOM(exampleNodeCreation_tableId).queryOn('tbody')
    .lastChild()
    .remove();
};