
const inputTask = document.querySelector(".input-task");
const inputDescription = document.querySelector(".input-descr");
const listContainer = document.getElementById("list-container");
const tagsContainer = document.querySelector(".row-input-elements");
const tagList = document.querySelector('.tag-list');

const tagOptions = ["Work", "Personal", "Urgent", "Low Priority"];
const listOptions = ["Shopping", "Chores", "Meetings", "Fitness"];

// Dynamiczna zmiana wyglądu pola opisu
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

// Funkcja dodawania zadania
function addTask() {
    if (inputTask.value === '') {
        alert("You must write something");
        return;
    }

    let taskData = {
        task: inputTask.value,
        description: inputDescription.value,
        tags: Array.from(document.querySelectorAll(".tag-list .addedTag[style*='background-color: blue']")).map(tag => tag.textContent.trim()),
        lists: Array.from(document.querySelectorAll(".tag-list .addedTag[style*='background-color: red']")).map(list => list.textContent.trim())
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    resetInputs();
}

// Funkcja wyświetlająca zadania z Local Storage
function displayTasks() {
    listContainer.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((taskData, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img class="checkpoint-off-svg" src="/frontend/public/icons/selection-box-off.svg">
            <img class="checkpoint-on-svg" src="/frontend/public/icons/selection-box-on.svg">
            <div>
                <strong class="input-box input-task">${taskData.task}</strong>
                ${taskData.description ? `<p class="input-box input-descr-displayed">${taskData.description}</p>` : ''}
                <div class="tagsDiv">
                    ${taskData.tags.map(tag => `<li class="addedTag" style="background-color: blue; color: white; border-radius: 10px">${tag}</li>`).join('')}
                    ${taskData.lists.map(list => `<li class="addedTag" style="background-color: red; color: white; border-radius: 2px"">${list}</li>`).join('')}
                </div>
            </div>
            <img class="trash-svg" src="/frontend/public/icons/trash.svg" data-index="${index}">
            <img class="chevron-right-svg" src="/frontend/public/icons/chevron-right.svg">
        `;

        listContainer.appendChild(li);
    });
}

// Funkcja resetowania inputów
function resetInputs() {
    inputTask.value = "";
    inputDescription.value = "";
    tagsContainer.style.flexDirection = "row";
    tagsContainer.style.alignItems = "center";
    tagsContainer.style.gap = "5px";
    inputDescription.style.maxWidth = "14ch";
    tagList.innerHTML = ''; // Czyszczenie listy tagów
}

// Usuwanie zadania po kliknięciu w ikonę kosza
listContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("trash-svg")) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let index = event.target.getAttribute("data-index");

        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
});

// Funkcja do obsługi dodawania tagów i list
function toggleInput(type) {
    let container = document.querySelector(type === 'tag' ? '.tag-input-container' : '.list-input-container');
    let input = document.querySelector('.dynamic-input');
    let dropdown = document.querySelector(type === 'tag' ? '.tag-dropdown' : '.list-dropdown');
    let options = type === 'tag' ? tagOptions : listOptions;

    if (!input) {
        container.insertAdjacentHTML("afterbegin", `<input type="text" class="dynamic-input" name="${type}" placeholder="${type === 'tag' ? 'Enter tag...' : 'Enter list name...'}">`);
        input = container.querySelector('.dynamic-input');
        input.focus();
        dropdown.style.display = 'flex';
        dropdown.innerHTML = options.map(option => `<button class="dropdown-item" onclick="selectOption('${type}', '${option}')">${option}</button>`).join('');
    } else {
        dropdown.style.display = 'none';

        let markupTag = `<li class="addedTag" style="background-color: ${type === 'tag' ? 'blue' : 'red'}; color: white; border-radius: ${type === 'tag' ? '10px' : '2px'};">
            ${input.value}
        </li>`;

        if (input.value !== '') {
            tagList.insertAdjacentHTML("beforeend", markupTag);
            input.remove();
        }
    }
}

// Funkcja do wyboru opcji z dropdowna
function selectOption(type, value) {
    let input = document.querySelector('.dynamic-input');
    if (input) {
        input.value = value;
    }
}

// Zamknięcie inputów tagów i list po kliknięciu poza nimi
document.addEventListener("click", function (event) {
    let tagInput = document.querySelector(".tag-input-container .dynamic-input");
    let listInput = document.querySelector(".list-input-container .dynamic-input");
    let tagDropdown = document.querySelector(".tag-dropdown");
    let listDropdown = document.querySelector(".list-dropdown");

    if (!event.target.closest(".tag-input-container, .dynamic-input, .tag-dropdown")) {
        if (tagInput) tagInput.remove();
        if (tagDropdown) tagDropdown.style.display = "none";
    }

    if (!event.target.closest(".list-input-container, .dynamic-input, .list-dropdown")) {
        if (listInput) listInput.remove();
        if (listDropdown) listDropdown.style.display = "none";
    }
});

// Wczytaj zadania po załadowaniu strony
document.addEventListener("DOMContentLoaded", displayTasks);


// DONE 1. po klikniecu na tag button dodac focus na input
// DONE 2. dodać listę domyślnych wartości po kliknieciu na przycisk
// 3. mozliwosc filtrowania wartości z listy po wpisaniu wartosci  w input
// 4. mozliwosc dodania nowych wartosci do listy

// 5. wystylizowac wszystko
// DONE 6. dodać możliwosć usuwania dodanych tagów
// 7. dodawnaie tasków ze wszystkimi danymi i stylowanie
// DONE 8. zapisywanie do local stotrage tasków z danymi

//9. Strukturyzacja tasków na katalagoi, tagi i listy oddzilne okno z podzialem i podpisami
//10. wyszukiawanie po oknie katalgów poszczegolnych tasków i po kliknieciu w rekord zaladowanie odpowiednie go taska w oknie powiekszonym z edycją







// const inputTask = document.querySelector(".input-task");
// const inputDescription = document.querySelector(".input-descr");
// const listContainer = document.getElementById("list-container");
// const tagsContainer = document.querySelector(".row-input-elements");
// const tagList = document.querySelector('.tag-list');


// const tagOptions = ["Work", "Personal", "Urgent", "Low Priority"];
// const listOptions = ["Shopping", "Chores", "Meetings", "Fitness"];

// inputDescription.addEventListener("input", function () {
//     if (inputDescription.value !== "") {
//         tagsContainer.style.flexDirection = "column";
//         tagsContainer.style.alignItems = "normal";
//         tagsContainer.style.gap = "10px";
//         inputDescription.style.maxWidth = "100%";
//     } else {
//         tagsContainer.style.flexDirection = "row";
//         tagsContainer.style.alignItems = "center";
//         tagsContainer.style.gap = "5px";
//         inputDescription.style.maxWidth = "13.1ch";
//     }
// });

// function addTask() {
//     if (inputTask.value === '') {
//         alert("You must write something");
//     } else {
//         let li = document.createElement("li");

//         // Pobranie wybranych tagów i list (kopiowanie pełnych elementów HTML)
//         let selectedTags = Array.from(document.querySelectorAll(".tag-list .addedTag[style*='background-color: blue']"));
//         let selectedLists = Array.from(document.querySelectorAll(".tag-list .addedTag[style*='background-color: red']"));

//         // Tworzenie UL dla tagów i list (jeśli istnieją)
//         let tagsContainer = selectedTags.length > 0 ? document.createElement("ul") : null;
//         let listsContainer = selectedLists.length > 0 ? document.createElement("ul") : null;
//         let tagsDiv = (selectedTags.length > 0 || selectedLists.length > 0) ? document.createElement("div") : null;

//         if (tagsContainer) tagsContainer.classList.add("tag-list");
//         if (listsContainer) listsContainer.classList.add("tag-list");
//         if (tagsDiv) tagsDiv.classList.add("tagsDiv")

//             if (tagsContainer) {
//                 tagsContainer.innerHTML = selectedTags.map(tag => `
//                     <li class="addedTag" style="
//                         background-color: blue;
//                         color: white;
//                         border-radius: 10px;
//                         margin-left: 0px;">
//                         ${tag.textContent.trim()}
//                     </li>
//                 `).join('');
//                 tagsDiv.appendChild(tagsContainer);
//             }
            
//             // Dodanie skopiowanych list do nowego UL jako LI
//             if (listsContainer) {
//                 listsContainer.innerHTML = selectedLists.map(list => `
//                     <li class="addedTag" style="
//                         background-color: red;
//                         color: white;
//                         border-radius: 2px;
//                         margin-left: 10px;">
//                         ${list.textContent.trim()}
//                     </li>
//                 `).join('');
//                 tagsDiv.appendChild(listsContainer);
//             }

//         // Tworzenie treści zadania
//         let taskContent = `
//             <img class="checkpoint-off-svg" src="/frontend/public/icons/selection-box-off.svg">
//             <img class="checkpoint-on-svg" src="/frontend/public/icons/selection-box-on.svg">
//             <div>
//                 <strong class="input-box input-task">${inputTask.value}</strong>
//                 ${inputDescription.value ? `<p class="input-box input-descr">${inputDescription.value}</p>` : ''}
//                 ${tagsDiv ? tagsDiv.outerHTML : ''}
//             </div>
//             <img class="trash-svg" src="/frontend/public/icons/trash.svg">
//             <img class="chevron-right-svg" src="/frontend/public/icons/chevron-right.svg">
//         `;

//         li.innerHTML = taskContent;

//         listContainer.appendChild(li);

//         // Resetowanie inputów
//         inputTask.value = "";
//         inputDescription.value = "";

//         // Resetowanie stylów kontenera tagów
//         tagsContainer.style.flexDirection = "row";
//         tagsContainer.style.alignItems = "center";
//         tagsContainer.style.gap = "5px";
//         inputDescription.style.maxWidth = "14ch";
//         tagList.innerHTML = ''; // Resetowanie listy tagów po dodaniu taska
//     }
// }

// function toggleInput(type) {
//     let container = document.querySelector(type === 'tag' ? '.tag-input-container' : '.list-input-container');
//     let button = container.querySelector('.row-tag-button');
//     let input = document.querySelector('.dynamic-input');
//     let dropdown = document.querySelector(type === 'tag' ? '.tag-dropdown' : '.list-dropdown');
//     let options = type === 'tag' ? tagOptions : listOptions;
//     let markupInput = `<input type="text" class="dynamic-input" name="${type}" placeholder="${type === 'tag' ? 'Enter tag...' : 'Enter list name...'}">`;
//     // let tagList = document.querySelector('.tag-list');

//     if (!input) {
//         container.insertAdjacentHTML("afterbegin", markupInput);
//         input = container.querySelector('.dynamic-input');
//         input.focus();
//         tagsContainer.style.flexDirection = 'column';
//         tagsContainer.style.alignItems = 'flex-start';
//         dropdown.style.display = 'flex';
//         dropdown.innerHTML = options.map(option => `<button class="dropdown-item" onclick="selectOption('${type}', '${option}')">${option}</button>`).join('');
//     } else {
//         dropdown.style.display = 'none';

//         // Sprawdzenie, czy jest już jakiś element 'list' w ul
//         let firstListItem = tagList.querySelector(".addedTag[style*='background-color: red']");

//         // Jeśli dodajemy LIST, sprawdzamy, czy to pierwszy element
//         let isFirstList = firstListItem === null;
        
//         let markupTag = `<li class="addedTag"
//             style="background-color: ${type === 'tag' ? 'blue' : 'red'};
//             color: white;
//             border-radius: ${type === 'tag' ? '10px' : '2px'};
//             margin-left: ${type === 'list' ? (isFirstList ? '10px' : '0px') : '0px'};">
//             ${input.value}
//         </li>`;

//         if (input.value === '' && input.name === type) {
//             alert(`Write a name of ${type === 'tag' ? 'tag' : 'list'}`);
//         } else if (input.value !== '' && input.name === type) {
//             if (type === 'list') {
//                 // Jeśli dodajemy 'list', dodajemy na koniec
//                 tagList.insertAdjacentHTML("beforeend", markupTag);
//             } else {
//                 // Jeśli dodajemy 'tag', wstawiamy przed pierwszym 'list' lub na koniec
//                 if (firstListItem) {
//                     firstListItem.insertAdjacentHTML("beforebegin", markupTag);
//                 } else {
//                     tagList.insertAdjacentHTML("beforeend", markupTag);
//                 }
//             }
//             input.remove();
//         } else if (input.name !== type) {
//             input.remove();
//             container.insertAdjacentHTML("afterbegin", markupInput);
//         }
//     }
// }



// function selectOption(type, value) {
//     let input = document.querySelector(type === 'tag' ? '.tag-input-container .dynamic-input' : '.list-input-container .dynamic-input');
    
//     if (input) {
//         input.value = value;
//     }

// }

// document.addEventListener("click", function (event) {
//     // Pobranie kontenerów dla tagów i list
//     let tagContainer = document.querySelector(".tag-input-container");
//     let listContainer = document.querySelector(".list-input-container");

//     let clickedTag = tagContainer && tagContainer.contains(event.target);
//     let clickedList = listContainer && listContainer.contains(event.target);

//     // Pobranie inputów i dropdownów
//     let tagInput = document.querySelector(".tag-input-container .dynamic-input");
//     let listInput = document.querySelector(".list-input-container .dynamic-input");
//     let tagDropdown = document.querySelector(".tag-dropdown");
//     let listDropdown = document.querySelector(".list-dropdown");

//     // Pobranie przycisków
//     let tagButton = document.querySelector(".tag-input-container .row-tag-button");
//     let listButton = document.querySelector(".list-input-container .row-tag-button");

//     // Jeśli kliknięto **poza** tag-inputem, dropdownem i przyciskiem, zamknij je
//     if (!clickedTag && tagInput && tagDropdown && !event.target.closest(".dynamic-input, .tag-dropdown, .row-tag-button")) {
//         if (tagInput.value.trim() === "") {
//             tagInput.remove();
//         }
//         tagDropdown.style.display = "none";
//     }

//     // Jeśli kliknięto **poza** list-inputem, dropdownem i przyciskiem, zamknij je
//     if (!clickedList && listInput && listDropdown && !event.target.closest(".dynamic-input, .list-dropdown, .row-tag-button")) {
//         if (listInput.value.trim() === "") {
//             listInput.remove();
//         }
//         listDropdown.style.display = "hidden";
//     }
// });

// listContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("trash-svg")) {
//         event.target.parentElement.remove();
//     }
// });





