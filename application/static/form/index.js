export function showListId(inputId) {
    document.getElementById(inputId).style.display = 'block';
};
export function hideListId(inputId) {
    document.getElementById(inputId).style.display = 'none';
};

export function hideListIdByMouse(inputId) {
    document.getElementById(inputId).addEventListener('mouseleave', function() {
    hideListId(inputId);
    });
}
export function handleDropdownKeyEvents(inputId, listId, selectedIndexVar) {
    var input = document.getElementById(inputId);
    var container = document.getElementById(listId);
    var options = container.getElementsByTagName('button');

    input.addEventListener('keydown', function(event) {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            while (selectedIndexVar > 0) {
                selectedIndexVar--;
                if (options[selectedIndexVar].style.display !== 'none') {
                    break;
                }
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            while (selectedIndexVar < options.length - 1) {
                selectedIndexVar++;
                if (options[selectedIndexVar].style.display !== 'none') {
                    break;
                }
            }
        } else if (event.key === "Enter") {
            if (selectedIndexVar > -1 && options[selectedIndexVar].style.display !== 'none') {
                var selectedOption = options[selectedIndexVar].textContent;
                var inputText = selectedOption.split("Tồn: ")[0];
                
                input.value = inputText;
                container.style.display = 'none';
                selectedIndexVar = -1;
            }
        }

        for (var i = 0; i < options.length; i++) {
            if (i === selectedIndexVar) {
                options[i].classList.add('active');
                var scrollTop = container.scrollTop;
                var optionTop = options[i].offsetTop;
                var optionBottom = optionTop + options[i].offsetHeight;
                
                if (optionTop < scrollTop) {
                    container.scrollTop = optionTop;
                } else if (optionBottom > scrollTop + container.offsetHeight) {
                    container.scrollTop = optionBottom - container.offsetHeight;
                }
            } else {
                options[i].classList.remove('active');
            }
        }
    });
}
