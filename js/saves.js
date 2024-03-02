function loadReactions() {
    let rxns = [];
    const rxnsText = localStorage.getItem('rxns');
    if (rxnsText) {
      rxns = JSON.parse(rxnsText);
    }
  
    const tableBodyEl = document.querySelector('#tbl_saves');
  
    if (rxns.length) {
      for (const [i, score] of rxns.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const scoreTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = score.name;
        scoreTdEl.textContent = score.score;
        dateTdEl.textContent = score.date;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(scoreTdEl);
        rowEl.appendChild(dateTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to make a reaction</td></tr>';
    }
  }
  
  loadReactions();