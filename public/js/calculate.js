document.addEventListener("DOMContentLoaded", function() {


    // Function to update Tm value in the UI
    function updateTm(inputElement, tmElement) {
      let sequence = inputElement.value.toUpperCase()
      tmElement.innerHTML = tm_calc(sequence) + "°C";
    }

    function tm_calc(primer) {

      const A_count = (primer.match(/A/g) || []).length;
      const T_count = (primer.match(/T/g) || []).length;
      const G_count = (primer.match(/G/g) || []).length;
      const C_count = (primer.match(/C/g) || []).length;

      let tm = 0

      if (primer.length < 14) {
        tm = (A_count + T_count) * 2 + (G_count + C_count) * 4
      } else {
        tm = Math.round(64.9 + 41 * (G_count + C_count - 16.4) / primer.length)
      }

      return tm
    }

    // Function to update GC value in the UI
    function updateGC(inputElement, gcElement) {
        let sequence = inputElement.value.toUpperCase();
        let totalCount = sequence.length;
      
        const G_count = (sequence.match(/G/g) || []).length;
        const C_count = (sequence.match(/C/g) || []).length;
      
        // Calculate the percentage of GC content
        let gcPercentage = ((G_count + C_count) / totalCount) * 100;
      
        // Update the UI with the calculated GC content
        gcElement.innerHTML = gcPercentage.toFixed(2) + "% GC";
    }

    // Function to update NT value in the UI
    function updateNT(inputElement, ntElement) {
        let sequence = inputElement.value.toUpperCase();
        let ntLength = sequence.length

        ntElement.innerHTML = ntLength + " nt"
    }

    function extensionTime(polymerase, length) {
      let time = 1
      if(polymerase == "Q5") {
        time = 0.02 * length
      }
      else {
        time = 0.06 * length 
      }

      return (Math.floor(time / 60) + " min " + (time % 60) + " sec")
    }

    function reactionConditionCalculator(components) {
      forP = components.forward_primer
      revP = components.reverse_primer
      pol = components.polymerase
      fragSize = components.fragment_size
      rxnSteps = components.reaction_step_size

      const tm_F = tm_calc(forP)
      const tm_R = tm_calc(revP)
      let anneal_temp = Math.min(tm_F, tm_R)
      let extension_time = 60 //C
      let extension_temp = 68 //seconds

      if (pol == "Q5") {
        anneal_temp += 5;
        extension_time = 20 //seconds
        extension_temp = 72 //C
      }

      if (rxnSteps == "2-Step") {
        middle_steps = ("2-step, 30x:" + "\n" + 
                        "98C for 15 sec" + "\n" + 
                        anneal_temp + "C for " + extensionTime(pol, fragSize))
      } else {
        middle_steps = ("3-step, 30x:" + "\n" + 
                        "98C for 10 sec" + "\n" + 
                        anneal_temp + "C for 20 seconds" + "\n" + 
                        extension_temp + "C for " + extensionTime(pol, fragSize))
      }

      return(middle_steps)

    }
  
    // Get input and card elements
    const forwardPrimerInput = document.getElementById("forward_primer");
    const forwardTmElement = document.getElementById("forward_tm");
    const forwardGcElement = document.getElementById("forward_gc")
    const forwardNtElement = document.getElementById("forward_nt")

    //forward name input
    const forPrimerNameInput = document.getElementById("forward_name")
  
    const reversePrimerInput = document.getElementById("reverse_primer");
    const reverseTmElement = document.getElementById("reverse_tm");
    const reverseGcElement = document.getElementById("reverse_gc")
    const reverseNtElement = document.getElementById("reverse_nt")

    //reverse name input
    const revPrimerNameInput = document.getElementById("reverse_name")
  
    // Add event listeners to input fields
    forwardPrimerInput.addEventListener("input", function() {
      updateTm(forwardPrimerInput, forwardTmElement);
      updateGC(forwardPrimerInput, forwardGcElement)
      updateNT(forwardPrimerInput, forwardNtElement)
    });
  
    reversePrimerInput.addEventListener("input", function() {
      updateTm(reversePrimerInput, reverseTmElement);
      updateGC(reversePrimerInput, reverseGcElement)
      updateNT(reversePrimerInput, reverseNtElement)
    });


    // Get the calculate reaction button
    var calcButton = document.getElementById("calculate_btn");
    
    // Get the save reaction button
    var saveButton = document.getElementById("save_reaction");

    let bufferReaction = {};

    // Add event listener to the calculate reaction button
    calcButton.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Retrieve values entered by the user
      var forwardPrimerName = document.getElementById("forward_primer_name").value;
      var forwardPrimer = document.getElementById("forward_primer").value.toUpperCase();
      var reversePrimerName = document.getElementById("reverse_primer_name").value;
      var reversePrimer = document.getElementById("reverse_primer").value.toUpperCase();
      var fragmentSize = document.getElementById("pcr_len").value;
      var bp_kb = document.getElementById("pcr_len_select").value;
      if (bp_kb === "kb") {
        fragmentSize = fragmentSize * 1000
      }
      console.log(fragmentSize)
      var polymerase = document.getElementById("poly_select").value;
      var reactionConditions = document.getElementById("rxn_select").value;

      // Insert a new row into the table with these values
      var table = document.getElementById("tbl_saves");
      var newRow = table.insertRow(-1); // Insert at the end of the table
      table.deleteRow(1)

      // Insert cells into the new row
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);
      var cell6 = newRow.insertCell(5);
      var cell7 = newRow.insertCell(6);

      let components = {
        forward_primer: forwardPrimer,
        reverse_primer: reversePrimer,
        fragment_size: fragmentSize,
        polymerase: polymerase,
        reaction_step_size: reactionConditions,
      }

      // Set the inner HTML of the cells to the user-entered values
      cell1.innerHTML = forwardPrimerName;
      cell2.innerHTML = forwardPrimer;
      cell3.innerHTML = reversePrimerName;
      cell4.innerHTML = reversePrimer;
      cell5.innerHTML = fragmentSize;
      cell6.innerHTML = polymerase;
      cell7.innerHTML = reactionConditionCalculator(components);

      bufferReaction = {
        forward_name: cell1.innerHTML,
        forward_primer: cell2.innerHTML,
        reverse_name: cell3.innerHTML,
        reverse_primer: cell4.innerHTML,
        fragment_size: cell5.innerHTML,
        polymerase: cell6.innerHTML,
        reaction_cond: cell7.innerHTML,
      }
    });

    saveButton.addEventListener("click", function(event) {
      saveReaction();
      alert("Reaction saved!");
    });

    function getUsername() {
      return localStorage.getItem('userName') ?? 'Unknown Scientist'
    }

    async function saveReaction() {
      const userName = getUsername();
      const newReaction = { user: userName, reaction: bufferReaction}
      const userText = document.querySelector('#user-messages');
      userText.innerHTML =
      `<div class="event"><span class="user-event">${userName}</span> Made a reaction</div>` + userText.innerHTML;

      try {
        const response = await fetch('/api/reaction', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(newReaction),
        });
        const reactions = await response.json();
        localStorage.setItem('reactions', JSON.stringify(reactions));
      } catch {
        updateRxnsLocal(newReaction);
      }
    }

    function updateRxnsLocal(newReaction) {
        let rxns = [];
        const rxnsText = localStorage.getItem('reactions');

        if (rxnsText) {
          rxns = JSON.parse(rxnsText);
        }

        rxns.push(newReaction);
    
        localStorage.setItem('reactions', JSON.stringify(reactions));
      }

    function saveFakeReaction(otherUser, providedReaction) {
      const userName = otherUser;
      let rxns = [];
      const rxnsText = localStorage.getItem('reactions')
      if (rxnsText) {
        rxns = JSON.parse(rxnsText)
      }
      const newReaction = { user: userName, reaction: providedReaction}
      rxns.push(newReaction)
      localStorage.setItem('reactions', JSON.stringify(reactions))
      const userText = document.querySelector('#user-messages');
      userText.innerHTML =
        `<div class="event"><span class="user-event">${userName}</span>: Made a reaction</div>` + userText.innerHTML;
    
    }

    const playerNameEl = document.querySelector('.user-name');
    playerNameEl.textContent = getUsername();

    let counter = 0
    setInterval(() => {
      counter++;
      providedReaction = {
        forward_name: "fake_forward_" + counter,
        forward_primer: "AGCGCGC",
        reverse_name: "fake_reverse_" + counter,
        reverse_primer: "GGCTGCAAGT",
        fragment_size: 2000,
        polymerase: "TAQ",
        reaction_cond: "2-Step",
      }
    saveFakeReaction("Fake User", providedReaction)
    }, 15000);

    function configureWebSocket() {
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
      this.socket.onopen = (event) => {
        this.displayMsg('system', 'game', 'connected');
      };
      this.socket.onclose = (event) => {
        this.displayMsg('system', 'game', 'disconnected');
      };
      this.socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === GameEndEvent) {
          this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
        } else if (msg.type === GameStartEvent) {
          this.displayMsg('player', msg.from, `started a new game`);
        }
      };
    }
  
    function displayMsg(cls, from, msg) {
      const chatText = document.querySelector('#player-messages');
      chatText.innerHTML =
        `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
    }
  
    function broadcastEvent(from, type, value) {
      const event = {
        from: from,
        type: type,
        value: value,
      };
      this.socket.send(JSON.stringify(event));
    }
  });


  

  