$(document).ready(function(){
    // Initialize jQuery UI sliders
    $('#slider-rowmin').slider({
        range: "min",
        slide: function(event, ui) {
            $('#rowmin').val(ui.value);
            generateTable(); // Update table dynamically
        }
    });
    $('#slider-rowmax').slider({
        range: "min",
        slide: function(event, ui) {
            $('#rowmax').val(ui.value);
            generateTable(); // Update table dynamically

        }
    });
    $('#slider-colmin').slider({
        range: "min",
        slide: function(event, ui) {
            $('#colmin').val(ui.value);
            generateTable(); // Update table dynamically

        }
    });
    $('#slider-colmax').slider({
        range: "min",
        slide: function(event, ui) {
            $('#colmax').val(ui.value);
            generateTable(); // Update table dynamically

        }
    });

    // Update input fields when sliders change
    $('#rowmin').on('input', function() {
        $('#slider-rowmin').slider('value', $(this).val());
        generateTable(); // Update table dynamically
    });
    $('#rowmax').on('input', function() {
        $('#slider-rowmax').slider('value', $(this).val());
        generateTable(); // Update table dynamically
    });
    $('#colmin').on('input', function() {
        $('#slider-colmin').slider('value', $(this).val());
        generateTable(); // Update table dynamically
    });
    $('#colmax').on('input', function() {
        $('#slider-colmax').slider('value', $(this).val());
        generateTable(); // Update table dynamically
    });

    // Initialize jQuery UI tabs
    $('#tabs').tabs({
        // Close button functionality
        beforeActivate: function(event, ui) {
            if ($(ui.newTab).hasClass('ui-tabs-active') && $(ui.newPanel).is(':visible')) {
                $('#tabs').tabs('refresh');
            }
        }
    });

    // Form validation initialization
    $('#tableform').validate({
        rules: {
            colmin: {
                required: true,
                number: true,
                range: [0, 100]
            },
            colmax: {
                required: true,
                number: true,
                range: [0, 100]
            },
            rowmin: {
                required: true,
                number: true,
                range: [0, 100]
            },
            rowmax: {
                required: true,
                number: true,
                range: [0, 100]
            }
        },
        messages: {
            colmin: {
                number: "Please enter a valid number",
                range: "Please enter a number between 0 and 100"
            },
            colmax: {
                number: "Please enter a valid number",
                range: "Please enter a number between 0 and 100"
            },
            rowmin: {
                number: "Please enter a valid number",
                range: "Please enter a number between 0 and 100"
            },
            rowmax: {
                number: "Please enter a valid number",
                range: "Please enter a number between 0 and 100"
            }
        }
    });
    // Save table button click event
    $('#savetable').on('click', function(event) {
        event.preventDefault();

        if ($('#tableform').valid()) {
            console.log('Form is valid!');
            saveTable(); // Save table as a new tab
        } else {
            console.log('Form is not valid');
        }
    });
    
    // Event delegation for close button functionality
        $('#tabs').on('click', '.ui-icon-close', function() {
            let panelId = $(this).closest('li').remove().attr('aria-controls');
            $('#' + panelId).remove();
            $('#tabs').tabs('refresh');
        });
    
    // Close selected tabs button click event
        $('#close-selected').on('click', function(event) {
            event.preventDefault();

            // Get all checkboxes that are checked
            $('.tab-checkbox:checked').each(function() {
                let panelId = $(this).closest('li').remove().attr('aria-controls');
                $('#' + panelId).remove();
            });

            // Refresh tabs to apply changes
            $('#tabs').tabs('refresh');
        });
    
});

// Generate table function
function generateTable() {
    // Get input values
    let cMin = parseInt(document.getElementById('colmin').value);
    let cMax = parseInt(document.getElementById('colmax').value);
    let rMin = parseInt(document.getElementById('rowmin').value);
    let rMax = parseInt(document.getElementById('rowmax').value);

    // Ensure max is greater than min
    if (cMin > cMax) {
        let temp = cMin;
        cMin = cMax;
        cMax = temp;
    }

    if (rMin > rMax){
        let temp = rMin;
        rMin = rMax;
        rMax = temp;
    }

    // Create table
    let table = '<table class="table table-bordered striped-table">';
    table += '<tr><th></th>'; // Start the first row with an empty cell for the top-left corner

    for (let i = cMin; i <= cMax; i++) {
        table += `<th>${i}</th>`; // Add the column headers
    }
    table += '</tr>'; // Close the header row

    for (let j = rMin; j <= rMax; j++) {
        table += `<tr><th>${j}</th>`; // Start the row with a header cell

        for (let i = cMin; i <= cMax; i++) {
            table += `<td>${i * j}</td>`; // Add the multiplication result cells
        }

        table += '</tr>'; // Close the row
    }

    table += '</table>'; // Finalize table
    document.getElementById('table-container').innerHTML = table; // Set table content
}


// Save table function
function saveTable() {
    // Get input values
    let cMin = parseInt(document.getElementById('colmin').value);
    let cMax = parseInt(document.getElementById('colmax').value);
    let rMin = parseInt(document.getElementById('rowmin').value);
    let rMax = parseInt(document.getElementById('rowmax').value);

    // Ensure max is greater than min
    if (cMin > cMax) {
        let temp = cMin;
        cMin = cMax;
        cMax = temp;
    }

    if (rMin > rMax){
        let temp = rMin;
        rMin = rMax;
        rMax = temp;
    }

    // Create table HTML
    let table = '<table class="table table-bordered striped-table">';
    table += '<tr><th></th>'; // Start the first row with an empty cell for the top-left corner

    for (let i = cMin; i <= cMax; i++) {
        table += `<th>${i}</th>`; // Add the column headers
    }
    table += '</tr>'; // Close the header row

    for (let j = rMin; j <= rMax; j++) {
        table += `<tr><th>${j}</th>`; // Start the row with a header cell

        for (let i = cMin; i <= cMax; i++) {
            table += `<td>${i * j}</td>`; // Add the multiplication result cells
        }

        table += '</tr>'; // Close the row
    }

    table += '</table>'; // Finalize table

    // Generate unique tab ID
        let tabId = `tab-${$('#tabs ul li').length + 1}`;
        let tabTitle = `Table (${rMin}-${rMax} x ${cMin}-${cMax})`;

        // Create tab HTML with checkbox
        let tabHTML = `<li><input type="checkbox" class="tab-checkbox"><a href="#${tabId}">${tabTitle}</a><span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>`;
        tabHTML += `<div id="${tabId}">${table}</div>`;

        // Append tab to tabs widget
        $('#tabs ul').append(tabHTML);
    
    
    // Refresh tabs to apply changes
    $('#tabs').tabs('refresh');
    $('#tabs').tabs('option', 'active', $('#tabs ul li').length - 1); // Switch to the newly created tab
    
}
