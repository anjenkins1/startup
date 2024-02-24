document.addEventListener("DOMContentLoaded", function() {
    // Function to update Tm value in the UI
    function updateTm(inputElement, tmElement) {
      let sequence = inputElement.value.toUpperCase();

      let A_count = (sequence.match(/A/g) || []).length;
      let T_count = (sequence.match(/T/g) || []).length;
      let G_count = (sequence.match(/G/g) || []).length;
      let C_count = (sequence.match(/C/g) || []).length;
  
      let tm = (A_count + T_count) * 2 + (G_count + C_count) * 4;
      tmElement.innerHTML = tm + "°C";
    }

    // Function to update GC value in the UI
    function updateGC(inputElement, gcElement) {
        let sequence = inputElement.value.toUpperCase();
        let gcCount = 0;
        let totalCount = sequence.length;
      
        // Loop through each character in the sequence
        for (let i = 0; i < totalCount; i++) {
          // Count occurrences of 'G' and 'C'
          if (sequence[i] === 'G' || sequence[i] === 'C') {
            gcCount++;
          }
        }
      
        // Calculate the percentage of GC content
        let gcPercentage = (gcCount / totalCount) * 100;
      
        // Update the UI with the calculated GC content
        gcElement.innerHTML = gcPercentage.toFixed(2) + "% GC";
    }

    // Function to update NT value in the UI
    function updateNT(inputElement, ntElement) {
        let sequence = inputElement.value.toUpperCase();
        let ntLength = sequence.length

        ntElement.innerHTML = ntLength + " nt"
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


    // Get the save reaction button
    const saveButton = document.getElementById("save_reaction");

    // Add event listener to the save reaction button
    saveButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Your code to handle saving the reaction goes here
    alert("Reaction saved!");
    });
  });

  