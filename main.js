var submit = document.getElementById('submit');
var editBtn = document.getElementById('edit');
addEventListener('DOMContentLoaded', (e)=>{
    // localStorage.getItem();
    // Object.keys(localStorage).forEach(key=>{
    //     let originalData = localStorage.getItem(key);
    //     let parsedData = JSON.parse(originalData);
    //     addDatatoList(parsedData);
    // });
    axios.get('https://crudcrud.com/api/7f9b2ba0218143238042152a86ed5bfb/expense-list')
    .then((object)=>{
        for(var i = 0; i<object.data.length; i++){
             addDatatoList(object.data[i]);
        }        
    })
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
    // localStorage.setItem(description, JSON.stringify(obj));
    // addDatatoList(obj);
    axios.post('https://crudcrud.com/api/7f9b2ba0218143238042152a86ed5bfb/expense-list', obj)
    .then(()=>{
        addDatatoList(obj);
    })
}) 



function addDatatoList(obj){
    var list = document.getElementById('expenseList');
    var li =document.createElement('li');
    var edit = document.createElement('button');
    var del = document.createElement('button');
    
    li.appendChild(document.createTextNode(`${obj.expense} ${obj.description} ${obj.option}`));
    li.id=obj._id;    
    edit.appendChild(document.createTextNode('Edit'));
    del.appendChild(document.createTextNode('Delete'));
    edit.addEventListener('click', ()=>{
        document.getElementById('desc').value = obj.description;
        document.getElementById('expense').value = obj.expense;
        document.getElementById('opt').value = obj.option;
        // li.remove();
        // localStorage.removeItem(obj.description);        
        editBtn.disabled = false;

        editBtn.addEventListener('click', ()=>{
            let expense = document.getElementById('expense').value;
            var description = document.getElementById('desc').value;
            var select = document.getElementById('category');
            var selectValue=select.options[select.selectedIndex].value;
            var objec = {
            expense : expense,
            description: description,
            option: selectValue
            };
        
            axios({
                method: 'put',
                url:`https://crudcrud.com/api/7f9b2ba0218143238042152a86ed5bfb/expense-list/${obj._id}`,
                data: objec
            })
            .then((resolve)=>{
                editBtn.disabled=true;
                console.log(resolve.data)
            })     
        })       
    });
    li.appendChild(edit);
    del.addEventListener('click', ()=>{
        // localStorage.removeItem(obj.description);
        li.remove();
        axios.delete(`https://crudcrud.com/api/7f9b2ba0218143238042152a86ed5bfb/expense-list/${obj._id}`)
        .then(()=>{
            li.remove();
        })
    });
    li.appendChild(del);
    list.appendChild(li);
}

