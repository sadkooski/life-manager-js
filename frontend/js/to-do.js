const tagOptions = ["Work", "Personal", "Urgent", "Low Priority"];
const listOptions = ["Shopping", "Chores", "Meetings", "Fitness"];

document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.querySelector('.tasks-add-btn');
    const detailsSection = document.querySelector('.details-section');
    const closeIcon = document.querySelector('.close-icon');
    const detailsFooter = detailsSection.querySelector('.details-footer');
    const detailsDeleteBtn = detailsSection.querySelector('.details-footer-delete-btn')
    const detailsSaveBtn = detailsSection.querySelector('.details-footer-save-btn')
    const detailsAddBtn = detailsSection.querySelector('.details-footer-add-btn')
    const detailsTagsList = detailsSection.querySelector('.details-list-tags');

    const taskTitle = document.querySelector('.details-task-title');
    const taskListSelect = document.querySelector('.details-list-options');
    const taskDate = document.querySelector('input[type="date"]');
    const tasksList = document.querySelector('.tasks-list');

    function renderTagOptions() {
        detailsTagsList.innerHTML = ''; // Czyści listę
        tagOptions.forEach(tag => {
            detailsTagsList.insertAdjacentHTML('beforeend', `<li class="details-list-tag-option" onclick="toggleTag(this)" style="cursor: pointer;">${tag}</li>`);
        });
        // Dodanie przycisku Add Tag na końcu listy
        detailsTagsList.insertAdjacentHTML('beforeend', '<li class="add-tag-li"><input type="text" class="add-tag-input" placeholder="New tag" style="display:none;"/><button class="details-list-tag-btn" onclick="toggleTagInput()">+ Add Tag</button></li>');
    }

    // Funkcja zaznaczania tagu
    window.toggleTag = (element) => {
        element.classList.toggle('selected');
        element.style.backgroundColor = element.classList.contains('selected') ? '#ADD8E6' : '';
    };

    window.toggleTagInput = () => {
        const input = document.querySelector('.add-tag-input');
        if (input.style.display === 'none') {
            input.style.display = 'inline-block';
            input.focus();
        } else if (input.value.trim() !== '') {
            tagOptions.push(input.value.trim());
            renderTagOptions();
        }
    };

    detailsAddBtn.addEventListener('click', () => {
        if (taskTitle.value.trim() === '') {
            alert('Title is required');
            return;
        }

        const selectedTags = Array.from(detailsTagsList.querySelectorAll('.details-list-tag-option.selected')).map(el => el.textContent);
        const taskData = {
            title: taskTitle.value.trim(),
            list: taskListSelect.value || '',
            date: taskDate.value || '',
            tags: selectedTags
        };

        localStorage.setItem(`task-${Date.now()}`, JSON.stringify(taskData));

        let tagsHtml = selectedTags.map(tag => `<li class="task-element-tag">${tag}</li>`).join('');
        let listHtml = taskData.list ? `<div class="tasks-element-list"><img class="list-icon" src="/frontend/public/icons/plus.svg" alt=""><span class="task-element-list-text">${taskData.list}</span></div>` : '';

        tasksList.insertAdjacentHTML('beforeend', `
            <li class="task-element">
                <div class="task-element-start">
                    <div class="task-element-checkpoint">
                        <img class="checkpoint-off-icon" src="/frontend/public/icons/selection-box-off.svg" alt="">
                        <div class="task-element-content">
                            <strong class="task-element-text">${taskData.title}</strong>
                        </div>
                    </div>
                    <div class="task-element-footer">
                        <img class="trash-icon" src="/frontend/public/icons/trash.svg" alt="Trash icon">
                        <img class="chevron-right-icon" src="/frontend/public/icons/chevron-right.svg" alt="Chevron right icon">
                    </div>
                </div>
                <div class="task-element-tags-container">
                    <ul class="task-element-tags-list">
                        ${tagsHtml}
                    </ul>
                    ${listHtml}
                </div>
            </li>
        `);a

        detailsSection.style.display = 'none';
        detailsSection.classList.remove('open');
        addTaskBtn.disabled = false;
        taskTitle.value = '';
        taskListSelect.value = '';
        taskDate.value = '';
    });

    // Funkcja otwierająca sekcję details-section
    addTaskBtn.addEventListener('click', () => {
        if (!detailsSection.classList.contains('open')) {
            detailsSection.style.display = 'flex';
            detailsSection.classList.add('open');
            detailsDeleteBtn.style.display = 'none';
            detailsSaveBtn.style.display = 'none';
            detailsAddBtn.style.display = 'flex'
            renderTagOptions(); // Renderuje tagi przy otwieraniu sekcji
            addTaskBtn.disabled = true; // Blokowanie ponownego kliknięcia
        }
    });

    // Zamknięcie sekcji po kliknięciu w close-icon
    closeIcon.addEventListener('click', () => {
        detailsSection.style.display = 'none';
        detailsSection.classList.remove('open');
        detailsDeleteBtn.style.display = 'flex';
        detailsSaveBtn.style.display = 'flex';
        detailsAddBtn.style.display = 'none'
        addTaskBtn.disabled = false; // Odblokowanie tasks-add-btn
    });
});

















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
//         return;
//     }

//     let taskData = {
//         task: inputTask.value,
//         description: inputDescription.value,
//         tags: Array.from(document.querySelectorAll(".tag-list .addedTag[style*='background-color: blue']")).map(tag => tag.textContent.trim()),
//         lists: Array.from(document.querySelectorAll(".tag-list .addedTag[style*='background-color: red']")).map(list => list.textContent.trim())
//     };

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.push(taskData);
//     localStorage.setItem("tasks", JSON.stringify(tasks));

//     displayTasks();
//     resetInputs();
// }

// function displayTasks() {
//     listContainer.innerHTML = "";
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     tasks.forEach((taskData, index) => {
//         let li = document.createElement("li");
//         li.innerHTML = `
//             <img class="checkpoint-off-svg" src="/frontend/public/icons/selection-box-off.svg">
//             <img class="checkpoint-on-svg" src="/frontend/public/icons/selection-box-on.svg">
//             <div>
//                 <strong class="input-box input-task">${taskData.task}</strong>
//                 ${taskData.description ? `<p class="input-box input-descr-displayed">${taskData.description}</p>` : ''}
//                 <div class="tagsDiv">
//                     ${taskData.tags.map(tag => `<li class="addedTag" style="background-color: blue; color: white; border-radius: 10px">${tag}</li>`).join('')}
//                     ${taskData.lists.map(list => `<li class="addedTag" style="background-color: red; color: white; border-radius: 2px"">${list}</li>`).join('')}
//                 </div>
//             </div>
//             <img class="trash-svg" src="/frontend/public/icons/trash.svg" data-index="${index}">
//             <img class="chevron-right-svg" src="/frontend/public/icons/chevron-right.svg">
//         `;

//         listContainer.appendChild(li);
//     });
// }

// function resetInputs() {
//     inputTask.value = "";
//     inputDescription.value = "";
//     tagsContainer.style.flexDirection = "row";
//     tagsContainer.style.alignItems = "center";
//     tagsContainer.style.gap = "5px";
//     inputDescription.style.maxWidth = "14ch";
//     tagList.innerHTML = '';
// }

// listContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("trash-svg")) {
//         let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//         let index = event.target.getAttribute("data-index");

//         tasks.splice(index, 1);
//         localStorage.setItem("tasks", JSON.stringify(tasks));

//         displayTasks();
//     }
// });

// function toggleInput(type) {
//     let container = document.querySelector(type === 'tag' ? '.tag-input-container' : '.list-input-container');
//     let input = document.querySelector('.dynamic-input');
//     let dropdown = document.querySelector(type === 'tag' ? '.tag-dropdown' : '.list-dropdown');
//     let options = type === 'tag' ? tagOptions : listOptions;

//     if (!input) {
//         container.insertAdjacentHTML("afterbegin", `<input type="text" class="dynamic-input" name="${type}" placeholder="${type === 'tag' ? 'Enter tag...' : 'Enter list name...'}">`);
//         input = container.querySelector('.dynamic-input');
//         input.focus();
//         dropdown.style.display = 'flex';
//         dropdown.innerHTML = options.map(option => `<button class="dropdown-item" onclick="selectOption('${type}', '${option}')">${option}</button>`).join('');
//     } else {
//         dropdown.style.display = 'none';

//         let markupTag = `<li class="addedTag" style="background-color: ${type === 'tag' ? 'blue' : 'red'}; color: white; border-radius: ${type === 'tag' ? '10px' : '2px'};">
//             ${input.value}
//         </li>`;

//         if (input.value !== '') {
//             tagList.insertAdjacentHTML("beforeend", markupTag);
//             input.remove();
//         }
//     }
// }

// function selectOption(type, value) {
//     let input = document.querySelector('.dynamic-input');
//     if (input) {
//         input.value = value;
//     }
// }

// document.addEventListener("click", function (event) {
//     let tagInput = document.querySelector(".tag-input-container .dynamic-input");
//     let listInput = document.querySelector(".list-input-container .dynamic-input");
//     let tagDropdown = document.querySelector(".tag-dropdown");
//     let listDropdown = document.querySelector(".list-dropdown");

//     if (!event.target.closest(".tag-input-container, .dynamic-input, .tag-dropdown")) {
//         if (tagInput) tagInput.remove();
//         if (tagDropdown) tagDropdown.style.display = "none";
//     }

//     if (!event.target.closest(".list-input-container, .dynamic-input, .list-dropdown")) {
//         if (listInput) listInput.remove();
//         if (listDropdown) listDropdown.style.display = "none";
//     }
// });

// document.addEventListener("DOMContentLoaded", displayTasks);


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





