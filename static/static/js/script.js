document.getElementById('pnrForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const pnrInput = document.getElementById('pnrInput');
    const errorMsg = document.getElementById('errorMsg');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const resultContainer = document.getElementById('resultContainer');

    const pnr = pnrInput.value.trim();

    // Reset messages
    errorMsg.textContent = '';
    
    // Front-end validation
    if (pnr.length !== 10 || isNaN(pnr)) {
        errorMsg.textContent = 'Please enter a valid 10-digit numeric PNR number.';
        return;
    }

    // Toggle loading UI
    btnText.textContent = 'Searching...';
    btnSpinner.hidden = false;

    try {
        const response = await fetch('/api/pnr-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pnr: pnr })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            errorMsg.textContent = result.message || 'Error fetching PNR details.';
            resultContainer.hidden = true;
        } else {
            renderPNRDetails(result.data);
            resultContainer.hidden = false;
        }

    } catch (err) {
        errorMsg.textContent = 'Network error. Please try again later.';
        resultContainer.hidden = true;
    } finally {
        btnText.textContent = 'Check Status';
        btnSpinner.hidden = true;
    }
});

function renderPNRDetails(data) {
    document.getElementById('trainName').textContent = data.train_name;
    document.getElementById('trainNum').textContent = `#${data.train_number}`;
    document.getElementById('fromCode').textContent = data.from_station.code;
    document.getElementById('fromName').textContent = data.from_station.name;
    document.getElementById('toCode').textContent = data.to_station.code;
    document.getElementById('toName').textContent = data.to_station.name;
    document.getElementById('doj').textContent = data.doj;
    document.getElementById('journeyClass').textContent = data.class;
    document.getElementById('chartStatus').textContent = data.chart_status;

    const tbody = document.getElementById('passengerTableBody');
    tbody.innerHTML = '';

    data.passengers.forEach(p => {
        let statusClass = 'status-wl';
        if (p.current_status.includes('CNF')) statusClass = 'status-cnf';
        else if (p.current_status.includes('RAC')) statusClass = 'status-rac';

        const row = `
            <tr>
                <td>Passenger ${p.passenger_no}</td>
                <td>${p.booking_status}</td>
                <td class="${statusClass}">${p.current_status}</td>
                <td>${p.berth}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
