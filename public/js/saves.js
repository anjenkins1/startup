async function loadReactions() {
  let reactions = [];
  try {
    // Get the latest reactions from the service
    const response = await fetch('/api/reactions');
    reactions = await response.json();

    // Save the reactions in case we go offline in the future
    localStorage.setItem('reactions', JSON.stringify(reactions));
  } catch {
    // If there was an error then just use the last saved reactions
    const reactionsText = localStorage.getItem('reactions');
    if (reactionsText) {
      reactions = JSON.parse(reactionsText);
    }
  }

  displayReactions(reactions);
}

function displayReactions(rxns) {
    // let rxns = [];
    // const rxnsText = localStorage.getItem('rxns');
    // if (rxnsText) {
    //   rxns = JSON.parse(rxnsText);
    // }
  
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
  


// Create a function to add a checkbox button to a row.
function addCheckboxButton(row, rowId) {

  var cell = row.insertCell(0);
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "checkbox_name_" + rowId;

  checkbox.addEventListener("click", function() {
    var row = this.closest("tr");
    console.log("Row selected: ", row);

    if (rowId === "head") {
      var checkboxes = document.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach(function(cb) {
        if (cb !== checkbox) {
          cb.checked = checkbox.checked;
        }
      });
    }
  });

  cell.appendChild(checkbox);
}

// Get the export reaction button
var exportBtn = document.getElementById("export_btn");

exportBtn.addEventListener("click", function(event) {
    // Create a new jsPDF instance
    var doc = new jsPDF();
    // Get all table rows
    var rows = document.querySelectorAll("table tr");
    var table_rows = []
    var table_head = []

    // Iterate over each row
    rows.forEach(function(row, index) {
      // Get the checkbox in the row
      var checkbox = row.querySelector("input[type='checkbox']");
      if (index === 0) {
        var cells = row.querySelectorAll("th:not(:first-child)");
        // Initialize an empty array to hold row data
        var rowData = [];
  
        // Iterate over each cell in the row
        cells.forEach(function(cell) {
          // Push cell content to rowData array
          rowData.push(cell.textContent.trim());
        });

        table_head.push(rowData)
      }

      // Check if the checkbox is checked
      if (checkbox && checkbox.checked && checkbox.name != "checkbox_name_head") {
        // Get all cells in the row
        var cells = row.querySelectorAll("td:not(:first-child)");

        // Initialize an empty array to hold row data
        var rowData = [];
  
        // Iterate over each cell in the row
        cells.forEach(function(cell) {
          // Push cell content to rowData array
          rowData.push(cell.textContent.trim());
        });
        table_rows.push(rowData)
      }
    });

    console.log(table_head)
    console.log(table_rows)
    
    doc.autoTable({
      head: table_head,
      body: table_rows,
      styles: {fontSize: 8 },
    })
    doc.save("selected_rows_data.pdf");
});

loadReactions();
