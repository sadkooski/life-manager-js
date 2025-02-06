const inputTask = document.querySelector(".input-task");
const inputDescription = document.querySelector(".input-descr");
const listContainer = document.getElementById("list-container");
const tagsContainer = document.querySelector(".row-input-elements");

const tagOptions = ["Work", "Personal", "Urgent", "Low Priority"];
const listOptions = ["Shopping", "Chores", "Meetings", "Fitness"];

inputDescription.addEventListener("input", function () {
    if (inputDescription.value !== "") {
        tagsContainer.style.flexDirection = "column";
        tagsContainer.style.alignItems = "normal";
        tagsContainer.style.gap = "10px";
        inputDescription.style.maxWidth = "100%";
    } else {
        tagsContainer.style.flexDirection = "row";
        tagsContainer.style.alignItems = "center";
        tagsContainer.style.gap = "5px";
        inputDescription.style.maxWidth = "13.1ch";
    }
});

function addTask(){
    if(inputTask.value === ''){
        alert("you must write somethig");
    } else {
        let li = document.createElement("li");
        if (inputDescription.value !== ''){
            li.innerHTML = `
                <img class="checkpoint-off-svg" src="/frontend/public/icons/selection-box-off.svg">
                <img class="checkpoint-on-svg" src="/frontend/public/icons/selection-box-on.svg">
                <div>
                    <strong>${inputTask.value}</strong>
                    <p>${inputDescription.value}</p>
                </div>
                <img class="trash-svg" src="/frontend/public/icons/trash.svg">
                <img class="chevron-right-svg" src="/frontend/public/icons/chevron-right.svg">
            `;
        } else {
            li.innerHTML = `
                <img class="checkpoint-off-svg" src="/frontend/public/icons/selection-box-off.svg">
                <img class="checkpoint-on-svg" src="/frontend/public/icons/selection-box-on.svg">
                ${inputTask.value}
                <img class="trash-svg" src="/frontend/public/icons/trash.svg">
                <img class="chevron-right-svg" src="/frontend/public/icons/chevron-right.svg">
            `;
        }
        // li.classList.add("checked");
        listContainer.appendChild(li);
        inputTask.value = "";
        inputDescription.value = "";
        tagsContainer.style.flexDirection = "row"
        tagsContainer.style.alignItems = "center"
        tagsContainer.style.gap = "5px";
        inputDescription.style.maxWidth = "14ch";
    }
}

function toggleInput(type) {
    let container = document.querySelector(type === 'tag' ? '.tag-input-container' : '.list-input-container');
    let button = container.querySelector('.row-tag-button');
    let input = document.querySelector('.dynamic-input');
    let dropdown = document.querySelector(type === 'tag' ? '.tag-dropdown' : '.list-dropdown');
    let options = type === 'tag' ? tagOptions : listOptions;
    let markupInput = `<input type="text" class="dynamic-input" name="${type}" placeholder="${type === 'tag' ? 'Enter tag...' : 'Enter list name...'}">`;

    if (!input) {
        container.insertAdjacentHTML("afterbegin", markupInput);
        input = container.querySelector('.dynamic-input');
        input.focus();
        tagsContainer.style.flexDirection = 'column';
        tagsContainer.style.alignItems = 'flex-start';
        dropdown.style.visibility = 'visible';
        dropdown.innerHTML = options.map(option => `<button class="dropdown-item" onclick="selectOption('${type}', '${option}')">${option}</button>`).join('');
    } else {
        dropdown.style.visibility = 'hidden';
        let markupTag = `<span class="addedTag"> ${type === 'tag' ? `newTag = ${input.value}` : `newList = ${input.value}`} </span>`
        if (input.value === '' && input.name === type) {
            alert(`Write a name of ${type === 'tag' ? 'tag' : 'list'}`);
        } else if (input.value !== '' && input.name === type) {
            inputDescription.insertAdjacentHTML("afterend", markupTag)
            input.remove();
        } else if (input.name !== type) {
            input.remove();
            container.insertAdjacentHTML("afterbegin", markupInput);
        }
    }
}

function selectOption(type, value) {
    let input = document.querySelector(type === 'tag' ? '.tag-input-container .dynamic-input' : '.list-input-container .dynamic-input');
    let description = document.querySelector('.input-descr');
    
    if (input) {
        input.value = value;
    }
    
    description.value += description.value ? `, ${value}` : value;
}

// loadOptions();

document.addEventListener("click", function (event) {
    // Pobranie kontenerów dla tagów i list
    let tagContainer = document.querySelector(".tag-input-container");
    let listContainer = document.querySelector(".list-input-container");

    let clickedTag = tagContainer && tagContainer.contains(event.target);
    let clickedList = listContainer && listContainer.contains(event.target);

    // Pobranie inputów i dropdownów
    let tagInput = document.querySelector(".tag-input-container .dynamic-input");
    let listInput = document.querySelector(".list-input-container .dynamic-input");
    let tagDropdown = document.querySelector(".tag-dropdown");
    let listDropdown = document.querySelector(".list-dropdown");

    // Pobranie przycisków
    let tagButton = document.querySelector(".tag-input-container .row-tag-button");
    let listButton = document.querySelector(".list-input-container .row-tag-button");

    // Jeśli kliknięto **poza** tag-inputem, dropdownem i przyciskiem, zamknij je
    if (!clickedTag && tagInput && tagDropdown && !event.target.closest(".dynamic-input, .tag-dropdown, .row-tag-button")) {
        if (tagInput.value.trim() === "") {
            tagInput.remove(); // Jeśli input jest pusty, usuń go
        }
        tagDropdown.style.visibility = "hidden"; // Ukryj dropdown
    }

    // Jeśli kliknięto **poza** list-inputem, dropdownem i przyciskiem, zamknij je
    if (!clickedList && listInput && listDropdown && !event.target.closest(".dynamic-input, .list-dropdown, .row-tag-button")) {
        if (listInput.value.trim() === "") {
            listInput.remove(); // Jeśli input jest pusty, usuń go
        }
        listDropdown.style.visibility = "hidden"; // Ukryj dropdown
    }
});



// 1. po klikniecu na tag button dodac focus na input
// 2. dodać listę domyślnych wartości po kliknieciu na przycisk
// 3. mozliwosc filtrowania wartości z listy po wpisaniu wartosci  w input
// 4. mozliwosc dodania nowych wartosci do listy

// 5. wystylizowac wszystko
// 6. dodać możliwosć usuwania dodanych tagów
// 7. dodawnaie taskó ze wszystkimi danymi i stylowanie
// 8. zapisywanie do local stotrage taskó z danymi

//9. Strukturyzacja tasków na katalagoi, tagi i listy oddzilne okno z podzialem i podpisami
//10. wyszukiawanie po oknie katalgów poszczegolnych tasków i po kliknieciu w rekord zaladowanie odpowiednie go taska w oknie powiekszonym z edycją