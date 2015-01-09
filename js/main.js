/**
 * Created by yana on 12/17/14.
 */

var newTask = document.querySelector('#new-task > input'),
    submitButton = document.querySelector('#submit-button > input'),
    taskList = document.getElementById('task-list'),
    checkAll = document.getElementById('check-all'),
    deleteButton = {
        all : document.getElementById('delete-all'),
        done : document.getElementById('delete-done')
    },
    filter = {
        list : document.getElementById('filters'),
        all : document.getElementById('show-all'),
        done : document.getElementById('show-done'),
        undone : document.getElementById('show-undone')
    },
    unCheckedItems;

//taskList.innerHTML = localStorage.getItem(JSON.parse('savedTasks'));

function tasksCount() {
    var doneTasksNumber = 0,
        tasksNumber = 0;
    [].forEach.call(document.querySelectorAll('.check.checked'), function(element) {
        doneTasksNumber++;
    });
    document.getElementById('done-tasks').textContent = doneTasksNumber + '';
    [].forEach.call(document.querySelectorAll('.check'), function(element) {
        tasksNumber++;
    });
    document.getElementById('all-tasks').textContent = tasksNumber + '';
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (!(newTask.value.length == 0)) {
        var taskHtml = document.createElement('li');
        taskList.appendChild(taskHtml);
        taskList.lastChild.innerHTML = '<a class="delete" href="#"></a><a class="check" href="#"></a><span></span>';
        taskList.lastChild.querySelector('span').textContent = newTask.value;
        newTask.value = "";
    }
  //  localStorage.setItem('savedTasks', JSON.stringify(taskList.children));
});

document.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.parentNode.parentNode == taskList ) {
        if (event.target.className == 'delete') {
            event.preventDefault();
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        }
        else if (event.target.classList.contains('check')) {
            event.preventDefault();
            event.target.classList.toggle('checked');

            unCheckedItems = [].filter.call(document.querySelectorAll('.check'), function(element) {
                return !(element.classList.contains('checked'));
            }).length;
            if ((unCheckedItems == 1) && (checkAll.classList.contains('checked'))) {
                checkAll.classList.remove('checked');
            }
            else if ((unCheckedItems == 0) && (!(checkAll.classList.contains('checked')))) {
                checkAll.classList.add('checked');
            }
        }
        else if (event.target == event.target.parentNode.querySelector('span')) {
            var editedTask = event.target.textContent,
                editedTaskParent = event.target.parentNode;
            editedTaskParent.innerHTML = '<form><input type="text"/><input class="edit" type="submit" name="submit" value="Edit task"/></form>';
            editedTaskParent.querySelector('input').value = editedTask;
            editedTaskParent.querySelector('input').focus();
        }
    }
    else if (event.target == event.target.parentNode.querySelector('.edit')) {
        var editedTask = event.target.parentNode.querySelector('input[type=text]').value,
            editedTaskParent = event.target.parentNode.parentNode;
        editedTaskParent.innerHTML = '<a class="delete" href="#"></a><a class="check" href="#"></a><span></span>';
        editedTaskParent.querySelector('span').textContent = editedTask;
    }
    else if (event.target.parentNode == filter.list) {
        if (!(event.target.classList.contains('active'))) {
            [].forEach.call(event.target.parentNode.querySelectorAll('li'), function(element) {
                if (element.classList.contains('active')) {
                    element.classList.remove('active')
                }
            });
            if (event.target == filter.all) {
                [].forEach.call(document.querySelectorAll('.delete'), function(element) {
                    element.parentNode.style.display = 'block';
                });
                filter.all.classList.add('active')
            }
            else if (event.target == filter.done) {
                [].forEach.call(document.querySelectorAll('.delete'), function(element) {
                    if (element.parentNode.querySelector('.check').classList.contains('checked')) {
                        element.parentNode.style.display = 'block';
                    }
                    else {
                        element.parentNode.style.display = 'none';
                    }
                });
                filter.done.classList.add('active')
            }
            else if (event.target == filter.undone) {
                [].forEach.call(document.querySelectorAll('.delete'), function(element) {
                    if (element.parentNode.querySelector('.check').classList.contains('checked')) {
                        element.parentNode.style.display = 'none';
                    }
                    else {
                        element.parentNode.style.display = 'block';
                    }
                });
                filter.undone.classList.add('active')
            }
        }
    }
    tasksCount();
});

checkAll.addEventListener('click', function(event) {
    event.preventDefault();

    if ([].some.call(document.querySelectorAll('.check'), function() {return true;})) {
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

deleteButton.all.addEventListener('click', function(event) {
    event.preventDefault();
    if ([].some.call(document.querySelectorAll('.check'), function() {return true;})) {
        [].forEach.call(document.querySelectorAll('.delete'), function(element) {
            element.parentNode.parentNode.removeChild(element.parentNode)
        });
    }
    else {
        alert('You should enter your tasks first!');
    }
});

deleteButton.done.addEventListener('click', function(event) {
    event.preventDefault();
    if ([].some.call(document.querySelectorAll('.check'), function() {return true;})) {
        [].forEach.call(document.querySelectorAll('.check.checked'), function(element) {
            element.parentNode.parentNode.removeChild(element.parentNode)
        });
    }
    else {
        alert('You should enter your tasks first!');
    }
    if (checkAll.classList.contains('checked')) {
        checkAll.classList.remove('checked');
    }
});




