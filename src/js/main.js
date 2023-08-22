import $ from "jquery";

$(document).ready(function () {
    const getID = () => Math.round(Math.random() * 10000000000);
    let toDoTasks = [];

    const LS_Set = () => localStorage.setItem("todo_tasks", JSON.stringify(toDoTasks));

    const createTask = (task) => {
        const actionDiv = $("<div></div>");

        const btnEdit = $(`<button class="me-3"></button>`).html(`<i class="fa-solid fa-pencil text-sky-200"></i>`);

        const btnDelete = $(`<button></button>`).html(`<i class="fa-solid fa-trash-can text-sky-200"></i>`);

        btnDelete.click(function () {
            const { id } = task;
            $(this).parents("li").remove();

            const filterToDo = toDoTasks.filter((todo) => todo.id !== id);
            toDoTasks = [...filterToDo];
            LS_Set();
        });
        console.log(btnDelete);

        btnEdit.click(function () {
            const btnSaveChange = $(`<button class="me-3" id="btnSaveChange"></button>`).html(`<i class="fa-solid fa-check text-sky-200"></i>`);

            const btnCancel = $(`<button id="btnCancel"></button>`).html(`<i class="fa-solid fa-xmark text-sky-200"></i>`);
            const { text, id } = task;

            const inp_edit = $("<input/>").val(text).addClass("bg-sky-500 outline-none text-sky-50");
            $(this).parent().prev().children("p").replaceWith(inp_edit);
            inp_edit.focus();

            btnSaveChange.click(function () {
                $(this).parent().children().toggleClass("hidden");
            });

            $(this).parent().children().toggleClass("hidden");
            $("#btnSaveChange, #btnCancel").remove();
            $(this).parent().append(btnSaveChange, btnCancel);

            console.log("Clicked Edit");
        });
        console.log(btnDelete);
        actionDiv.append(btnEdit, btnDelete);

        const liContent = $(`<div class="flex items-center gap-3"></div>`).html(`<input class="border-none" type="radio" name="rdo-completed" id="rdo-completed"/><p class="text-sky-50">${task.text}</p>`);
        //     const liContent = `<div class="flex items-center gap-3">
        //     <input type="radio" class="border-none" name="rdo-completed" id="rdo-completed">
        //     <p class="text-sky-50">${task.text}</p>
        // </div>
        // <div>
        //     <i class="fa-solid fa-pencil me-3 text-sky-200"></i>
        //     <i class="fa-solid fa-trash-can text-sky-200"></i>
        // </div>`;

        const li = $(
            '<li class="flex p-4 bg-sky-500 justify-between w-full"></li>'
        );
        li.append(liContent, actionDiv);
        $("#task-list").append(li);
    };

    $("#frm-task").submit(function (e) {
        e.preventDefault();
        const inpTask = $("#task");
        const newTask = { id: getID(), text: inpTask.val(), completed: false };
        if (inpTask.val()) {
            createTask(newTask);
            toDoTasks.push(newTask);
            inpTask.val("");
            LS_Set();
        } else {
            // alert("please enter your task");
            inpTask.addClass("input_error");
            inpTask.focus();
            console.log(inpTask.parent());
            const error_el = $(`<span id="error_msg"></span>`).css({ "color": "red", "font-size": "normal" }).text("error message");
            $("#error_msg").remove();
            inpTask.parent().after(error_el);
        }
    });

    $("#task").keyup(function (e) {
        if ($("#task").val()) {
            $(this).removeClass("input_error");
            $("#error_msg").remove();
        }
    })

    const onLoad = () => {
        const lS_Data = JSON.parse(localStorage.todo_tasks);
        console.log(lS_Data);
        lS_Data.map((task) => {
            createTask(task);
            toDoTasks.push(task);
        });
    };
    onLoad();
});