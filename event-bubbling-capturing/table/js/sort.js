'use strict';

function handleTableClick(event) {
  if(event.target.classList.contains('prop__name')) {
    const thDataset = event.target.dataset;
    const tableDataset = event.currentTarget.dataset;
    thDataset.dir = thDataset.dir ? -thDataset.dir : 1;
    tableDataset.sortBy = thDataset.propName;
    sortTable(tableDataset.sortBy, thDataset.dir);
  }
}
