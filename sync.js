// JSONBin Configuration (replace these values)
const BIN_ID = '67ff87d08a456b79668a952c'; // The ID from your JSONBin URL
const API_KEY = '$2a$10$bJ6UMIyyad'; // From JSONBin.io settings

// Function to load data from JSONBin
async function loadData() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Failed to load data');
        
        const result = await response.json();
        return result.record || [];
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

// Function to save data to JSONBin
async function saveData(data) {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Failed to save data');
        
        return await response.json();
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Usage in your application:

// 1. Load existing data when page loads
document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData();
    // Display your data here (modify based on your needs)
    console.log('Loaded data:', data);
    displayData(data);
});

// 2. When adding new data
async function addNewItem(item) {
    // First load existing data
    const currentData = await loadData();
    
    // Add new item
    currentData.push(item);
    
    // Save back to JSONBin
    await saveData(currentData);
    
    // Update display
    displayData(currentData);
    
    alert('Data saved successfully! It will appear on all devices.');
}

// Helper function to display data (modify for your needs)
function displayData(data) {
    const container = document.getElementById('data-container');
    if (!container) return;
    
    container.innerHTML = data.map(item => 
        `<div class="data-item">${JSON.stringify(item)}</div>`
    ).join('');
}
