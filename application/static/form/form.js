import { 
    showListId,
    hideListId, 
    hideListIdByMouse, 
    handleDropdownKeyEvents
} from "./index.js";

import { listAddress } from "./database/address.js";
import { products } from "./database/products.js";

document.getElementById('inputArea').oninput = function() {
    showListId('listArea');
    hideListIdByMouse('listArea');
    
    var input = document.getElementById('inputArea').value.toUpperCase();
    var container = document.getElementById('listArea');
    
    container.innerHTML = '';
    
    for (var area in listAddress) {
        if (area.toUpperCase().indexOf(input) > -1) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'list-group-item list-group-item-action';
            button.innerText = area;

            button.onclick = function() {
                document.getElementById('inputArea').value = this.innerText;
                hideListId('listArea');
            };
            container.appendChild(button);
        };
    };
    var selectedOptionIndexArea = -1;
    handleDropdownKeyEvents('inputArea', 'listArea', selectedOptionIndexArea);
};

document.getElementById('inputWard').onfocus = function() {
    showListId('listWard');
    hideListIdByMouse('listWard');

    var inputArea = document.getElementById('inputArea').value;
    var container = document.getElementById('listWard');
    
    container.innerHTML = '';

    if (inputArea == '') {
        hideListId('listWard');
        return;
    };
    for (var area in listAddress) {
        if (area === inputArea) {
            var wards = listAddress[area];
            for (var ward in wards) {
                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'list-group-item list-group-item-action displayed-item';
                button.innerText = wards[ward];

                button.onclick = function() {
                    document.getElementById('inputWard').value = this.innerText;
                    hideListId('listWard');
                };
                container.appendChild(button);        
            };
        };
    };
    document.getElementById('inputWard').oninput = function () {
        var inputWard = document.getElementById('inputWard').value.toUpperCase();
        var itemButtons = document.querySelectorAll('#listWard .displayed-item');
        
        for (let i = 0; i < itemButtons.length; i++) {
            if (itemButtons[i].innerText.toUpperCase().indexOf(inputWard) > -1) {
                itemButtons[i].style.display = "";
            } else {
                itemButtons[i].style.display = 'none';
            };
        };
    };
    var selectedOptionIndexWard = -1; 
    handleDropdownKeyEvents('inputWard', 'listWard', selectedOptionIndexWard);
};

document.getElementById('inputProducts').oninput = function () {
    showListId('Products');
    hideListIdByMouse('Products');
    
    var input = document.getElementById('inputProducts').value.toUpperCase();
    var container = document.getElementById('Products');

    container.innerHTML = '';

    for (var name in products) {
        if (name.toUpperCase().indexOf(input) > -1) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'list-group-item list-group-item-action';
            
            var span = document.createElement('span');
            span.innerText = name;
            button.appendChild(span);

            var badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge badge-pill badge-info';
            badgeSpan.innerText = "Tồn: " + products[name][2];
            button.appendChild(badgeSpan);

            button.onclick = function() {
                var nameContent = this.getElementsByTagName('span')[0].innerText;
                var price = products[nameContent][1];
                document.getElementById('Price').value = price;
                document.getElementById('inputProducts').value = nameContent;
                hideListId('Products');
            };
            document.getElementById('inputProducts').oninput = function () {
    showListId('Products');
    hideListIdByMouse('Products');
    
    var input = document.getElementById('inputProducts').value.toUpperCase();
    var container = document.getElementById('Products');

    container.innerHTML = '';

    for (var name in products) {
        if (name.toUpperCase().indexOf(input) > -1) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'list-group-item list-group-item-action';
            
            var span = document.createElement('span');
            span.innerText = name;
            button.appendChild(span);

            var badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge badge-pill badge-info';
            badgeSpan.innerText = "Tồn: " + products[name][2];
            button.appendChild(badgeSpan);

            button.onclick = function() {
                var nameContent = this.getElementsByTagName('span')[0].innerText;
                var price = products[nameContent][1];
                document.getElementById('Price').value = price;
                document.getElementById('inputProducts').value = nameContent;
                hideListId('Products');
            };
            button.onkeydown = function(event) {
                if (event.key === "Enter") {
                    var nameContent = this.getElementsByTagName('span')[0].innerText;
                    var price = products[nameContent][1];
                    document.getElementById('Price').value = price;
                    document.getElementById('inputProducts').value = nameContent;
                    hideListId('Products');
                };
            };
            button.onkeydown = function(event) {
                if (event.key === "Enter") {
                    var nameContent = this.getElementsByTagName('span')[0].innerText;
                    var price = products[nameContent][1];
                    document.getElementById('Price').value = price;
                    document.getElementById('inputProducts').value = nameContent;
                    hideListId('Products');
                };
            };

            container.appendChild(button)        
        };
    };
    var selectedOptionIndexProduct = -1;
    handleDropdownKeyEvents('inputProducts', 'Products', selectedOptionIndexProduct);
};

            container.appendChild(button)        
        };
    };
    var selectedOptionIndexProduct = -1;
    handleDropdownKeyEvents('inputProducts', 'Products', selectedOptionIndexProduct);
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addFormOder').addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
});