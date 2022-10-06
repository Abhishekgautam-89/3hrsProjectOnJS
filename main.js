var submit = document.getElementById('submit');
var editBtn = document.getElementById('edit');
addEventListener('DOMContentLoaded', async (e)=>{
    // localStorage.getItem();
    // Object.keys(localStorage).forEach(key=>{
    //     let originalData = localStorage.getItem(key);
    //     let parsedData = JSON.parse(originalData);
    //     addDatatoList(parsedData);
    // });
    try{ 
        let getObject = await axios.get('https://crudcrud.com/api/810e6da1bfa54d30974d588637a063a7/expense-list');
        
        for(var i = 0; i<getObject.data.length; i++){
            addDatatoList(getObject.data[i]);
        }       
    }
    catch (reject){
        console.log(`Something goes wrong and gives this error: ${reject} `);
    }
});


submit.addEventListener('click', async (e)=>{
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
    try{ 
    let postObject= await axios.post('https://crudcrud.com/api/810e6da1bfa54d30974d588637a063a7/expense-list', obj);
    console.log(postObject.data);
    addDatatoList(postObject.data);
    }
    catch (error) {
        console.log(error);
    }
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

        editBtn.addEventListener('click', async ()=>{
            let expense = document.getElementById('expense').value;
            var description = document.getElementById('desc').value;
            var select = document.getElementById('category');
            var selectValue=select.options[select.selectedIndex].value;
            var objec = {
            expense : expense,
            description: description,
            option: selectValue
            };
        try{ 
          let putObj =  await axios({
                method: 'put',
                url:`https://crudcrud.com/api/810e6da1bfa54d30974d588637a063a7/expense-list/${obj._id}`,
                data: objec
            });
            
                editBtn.disabled=true;
                console.log(putObj.data)
            }
            catch (error){
                console.log(error);
            }    
        })       
    });
    li.appendChild(edit);
    del.addEventListener('click', async ()=>{
        // localStorage.removeItem(obj.description);
        // li.remove();
        try{ 
       let delObj = await axios.delete(`https://crudcrud.com/api/810e6da1bfa54d30974d588637a063a7/expense-list/${obj._id}`);
         li.remove();
        }
        catch(error){
            console.log(error);
        }
    });
    li.appendChild(del);
    list.appendChild(li);
}

