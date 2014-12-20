/**
 * Created by yana on 12/17/14.
 */

var newTask = document.querySelector('#new-task > input'),
    submitButton = document.querySelector('#submit-button > input'),
    taskList = document.getElementById('task-list'),
    checkAll = document.getElementById('check-all'),
    deleteAll = document.getElementById('delete-all'),
    unCheckedItems;

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (!(newTask.value.length == 0)) {
        var taskHtml = document.createElement('li');
        taskList.appendChild(taskHtml);
        taskList.lastChild.innerHTML = '<a class="delete" href="#"></a><a class="check" href="#"></a>';
        taskList.lastChild.querySelector('.check').textContent = newTask.value;
        newTask.value = "";
    }
});

document.addEventListener('click', function(event) {
    if (event.target.className == 'delete') {
        event.preventDefault();
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }
    if (event.target.classList.contains('check')) {
        event.preventDefault();
        event.target.classList.toggle('checked');

        unCheckedItems = [].filter.call(document.querySelectorAll('.check'), function(element) {
            return !(element.classList.contains('checked'));
        }).length;
        if ((unCheckedItems == 1) && (checkAll.classList.contains('checked'))) {
            checkAll.classList.remove('checked');
        }
    }
});

checkAll.addEventListener('click', function(event) {
    event.preventDefault();

    if ([].some.call(document.querySelectorAll('.check'), function(element) {return true;})) {
        if (this.classList.contains('checked')) {
            [].forEach.call(document.querySelectorAll('.check'), function(element) {
                element.classList.remove('checked');
            });
        }
        else {
            [].forEach.call(document.querySelectorAll('.check'), function(element) {
                if (!(element.classList.contains('checked'))) {
                    element.classList.add('checked');
                }
            });
        }
        this.classList.toggle('checked');
    }
    else {
        alert('You should enter your tasks first!');
    }
});

deleteAll.addEventListener('click', function(event) {
    event.preventDefault();
    if ([].some.call(document.querySelectorAll('.check'), function(element) {return true;})) {
        [].forEach.call(document.querySelectorAll('.delete'), function(element) {
            element.parentNode.parentNode.removeChild(element.parentNode)
        });
    }
    else {
        alert('You should enter your tasks first!');
    }
});



