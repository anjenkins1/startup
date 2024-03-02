function loadReactions() {
    let rxns = [];
    const rxnsText = localStorage.getItem('rxns');
    if (rxnsText) {
      rxns = JSON.parse(rxnsText);
    }
  
    const tableBodyEl = document.querySelector('#tbl_saves');
  
    if (rxns.length) {
      const rowHeaders = document.getElementById('save_rows');
      addCheckboxButton(rowHeaders, "head");
      for (const [i, rxn] of rxns.entries()) {
        const userNameEl = document.createElement('td');
        const forwardNEl = document.createElement('td');
        const forwardPEl = document.createElement('td');
        const reverseNEl = document.createElement('td');
        const reversePEl = document.createElement('td');
        const fragSizeEl = document.createElement('td');
        const polEl = document.createElement('td');
        const rxnCondEl = document.createElement('td');
  
        userNameEl.textContent = rxn.user;
        forwardNEl.textContent = rxn.reaction.forward_name;
        forwardPEl.textContent = rxn.reaction.forward_primer;
        reverseNEl.textContent = rxn.reaction.reverse_name;
        reversePEl.textContent = rxn.reaction.reverse_primer;
        fragSizeEl.textContent = rxn.reaction.fragment_size;
        polEl.textContent = rxn.reaction.polymerase;
        rxnCondEl.innerHTML = rxn.reaction.reaction_cond;

        const rowEl = document.createElement('tr');
        rowEl.appendChild(userNameEl);
        rowEl.appendChild(forwardNEl);
        rowEl.appendChild(forwardPEl);
        rowEl.appendChild(reverseNEl);
        rowEl.appendChild(reversePEl);
        rowEl.appendChild(fragSizeEl);
        rowEl.appendChild(polEl);
        rowEl.appendChild(rxnCondEl);

        addCheckboxButton(rowEl, i)
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to make a reaction</td></tr>';
    }
  }
  
  loadReactions();

// Create a function to add a checkbox button to a row.
function addCheckboxButton(row, rowId) {
  // Create a new cell at the beginning of the row.
  var cell = row.insertCell(0);

  // Create a new checkbox button element.
  var checkbox = document.createElement("input");

  // Set the type of the element to "checkbox".
  checkbox.type = "checkbox";

  // Set the name and value of the checkbox button.
  checkbox.name = "checkbox_name_" + rowId;

  // Append the checkbox button to the cell.
  cell.appendChild(checkbox);
}

// Get all of the rows in the table.
var rows = document.querySelectorAll("table tr");

// // Loop through the rows and add a checkbox button to each one.
// for (var i = 0; i < rows.length; i++) {
//   addCheckboxButton(rows[i], i);
// }  