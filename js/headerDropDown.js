const DropdownMenu = {
    body: document.querySelector('body'),
    dropdownBtn: document.getElementById('burger-menu-btn'),
    dropdownContent: document.getElementById('header-dropdown-content'),
    toggle: false,
    openMenu: function() {
        this.dropdownContent.style.display = 'block';
        this.toggle = true;
    },
    closeMenu: function() {
        this.dropdownContent.style.display = 'none';
        this.toggle = false;
    }
}

DropdownMenu.body.addEventListener('click', (e) => {
    let target = e.target;
    switch(target.id) {
        case 'burger-menu-btn':
            if (DropdownMenu.toggle === false) {
                DropdownMenu.openMenu();
            } else {
                DropdownMenu.closeMenu();
            }
            break;
        default:
            DropdownMenu.closeMenu();
    } 
});

