const { ipcRenderer } = require('electron');
const items = require('./items.js');

let showModal = document.getElementById('show-modal'),
    closeModal = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    addItem = document.getElementById('add-item'),
    itemUrl = document.getElementById('url'),
    search = document.getElementById('search')

window.newItem = () => {
    showModal.click();
}

window.openItem = items.open;

window.deleteItem = () => {
    let selectedItem = items.getSelectedItem();
    items.delete(selectedItem.index);
}

// Open item in native browser
window.openItemNative = items.openNative;

// Focus to search items
window.searchItems = () => {
    search.focus();
}

search.addEventListener('keyup', event => {
    Array.from( document.getElementsByClassName('read-item') ).forEach( item => {
        let hasMatch = item.innerText.toLowerCase().includes(search.value)
        item.style.display = hasMatch ? 'flex' : 'none'
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        items.changeSelection(event.key);
    } 
});

// Disable & Enable modal buttons
const toggleModalButtons = () => {
    if (addItem.disabled === true) {
        addItem.disabled = false;
        addItem.style.opacity = 1;
        addItem.innerText = 'Add Item';
        closeModal.style.display = 'inline';
    } else {
        addItem.disabled = true;
        addItem.style.opacity = 0.5;
        addItem.innerText = 'Adding...';
        closeModal.style.display = 'none';
    }
}

showModal.addEventListener('click', event => {
    modal.style.display = 'flex';
    itemUrl.focus();
});

closeModal.addEventListener('click', event => {
    modal.style.display = 'none';
})

addItem.addEventListener('click', event => {

    // Check a url exists
    if (itemUrl.value) {

        // Send new item url to main process
        ipcRenderer.send('new-item', itemUrl.value);

        // Disable buttons
        toggleModalButtons();
    }
})

ipcRenderer.on('new-item-success', (e, newItem) => {
    items.addItem(newItem, true);
    toggleModalButtons();
    modal.style.display = 'none';
    itemUrl.value = '';
})


itemUrl.addEventListener('keyup', e => {
    if( e.key === 'Enter' ) addItem.click()
});
