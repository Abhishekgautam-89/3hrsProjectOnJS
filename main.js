var submit = document.getElementById('submit');

addEventListener('DOMContentLoaded', (e)=>{
    // localStorage.getItem();
    Object.keys(localStorage).forEach(key=>{
        let originalData = localStorage.getItem(key);
        let parsedData = JSON.parse(originalData);
        addDatatoList(parsedData);
    });
});


submit.addEventListener('click',(e)=>{
    e.preventDefault();
    var expense = document.getElementById('expense').value;
    var description = document.getElementById('desc').value;
    var select = document.getElementById('category');
    var selectValue=select.options[select.selectedIndex].value;
    var obj = {
    expense : expense,
    description: description,
    option: selectValue
    };
    localStorage.setItem(description, JSON.stringify(obj));
    addDatatoList(obj);
}) 



function addDatatoList(obj){
    var list = document.getElementById('expenseList');
    var li =document.createElement('li');
    var edit = document.createElement('button');
    var del = document.createElement('button');
    
    li.appendChild(document.createTextNode(`${obj.expense} ${obj.description} ${obj.option}`));
    li.id=obj.description;
    edit.appendChild(document.createTextNode('Edit'));
    del.appendChild(document.createTextNode('Delete'));
    edit.addEventListener('click', ()=>{
        document.getElementById('desc').value = obj.description;
        document.getElementById('expense').value = obj.expense;
        li.remove();
        localStorage.removeItem(obj.description);
    });
    li.appendChild(edit);
    del.addEventListener('click', ()=>{
        localStorage.removeItem(obj.description);
        li.remove();
    });
    li.appendChild(del);
    list.appendChild(li);
}

