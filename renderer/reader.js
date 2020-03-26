let bookmarkClose = document.createElement('div');
bookmarkClose.innerText = 'Done';

// Style button
bookmarkClose.style.position = 'fixed';
bookmarkClose.style.bottom = '15px';
bookmarkClose.style.right = '15px';
bookmarkClose.style.padding = '5px 10px';
bookmarkClose.style.fontSize = '20px';
bookmarkClose.style.fontWeight = 'bold';
bookmarkClose.style.background = 'dodgerblue';
bookmarkClose.style.color = 'white';
bookmarkClose.style.borderRadius = '5px';
bookmarkClose.style.cursor = 'pointer';
bookmarkClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)';

bookmarkClose.onclick = event => {
    window.opener.postMessage({
        action: 'delete-reader-item',
        itemIndex: {{index}}
    }, '*');
}

// Append button to body
document.getElementsByTagName('body')[0].appendChild(bookmarkClose);
