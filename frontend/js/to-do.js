const inputTask = document.querySelector(".input-task");
const inputDescription = document.querySelector(".input-descr");
const listContainer = document.getElementById("list-container");
const tagsContainer = document.querySelector(".row-input-elements");

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

