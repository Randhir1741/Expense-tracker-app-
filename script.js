let addBtn = document.querySelector('.addBtn');
let expeseAmount = document.querySelector('.amoutInput');
let description = document.querySelector('.discription');
let category = document.querySelector('#category');


addBtn.addEventListener('click', setValue)


function setValue() {
    let amountValue = Number(expeseAmount.value);
    let descriptionValue = description.value;
    let categoryValue = category.value;

     if (amountValue === '' || descriptionValue === '' || categoryValue === '') {
        alert('Please fill all fields');
        return; 
    }

    console.log(descriptionValue);
    let expense = {
        id: Date.now(),
        amount: amountValue,
        description: descriptionValue,
        category: categoryValue
    };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    clearInputs();
    showExpenses();

}
function clearInputs() {
    expeseAmount.value = '';
    description.value = '';
    category.value = '';
}

let itemContainer = document.querySelector('.itemContainer');

function showExpenses() {
    itemContainer.innerHTML = '';
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {


        let div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
                <p class="expeseAmount">${expense.amount}</p>
                 <input type="text" class="editAmountInput" placeholder="Enter_Amount">
                <p class="discriptionItem">${expense.description}</p>
                 <input type="text" class="editDiscription" placeholder="Enter_Decription">
                <p class="category">${expense.category}</p>

                <div class="button">
                <button class="deleteBtn"> Delete</button>
                <button class="editBtn">Edit</button>
                <button class="saveBtn">Save</button>
                
            </div>`
        let editBtn = div.querySelector('.editBtn');
        let saveBtn = div.querySelector('.saveBtn');
        let deleteBtn = div.querySelector('.deleteBtn');

        let editAmount = div.querySelector('.editAmountInput');
        let editDescription = div.querySelector('.editDiscription');
        let expeseAmount = div.querySelector('.expeseAmount');
        let discriptionItem = div.querySelector('.discriptionItem');


        editBtn.addEventListener('click', function () {

            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline';

            editAmount.style.display = 'inline';
            editDescription.style.display = 'inline';

            expeseAmount.style.display = 'none';
            discriptionItem.style.display = 'none';

        });
        saveBtn.addEventListener('click', function () {
            let newAmount = editAmount.value;
            let newDescription = editDescription.value;
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

            expenses = expenses.map(ele => {
                if (ele.id === expense.id) {
                    ele.amount = newAmount;
                    ele.description = newDescription;
                }
                return ele;

            });
            localStorage.setItem('expenses', JSON.stringify(expenses));


            expeseAmount.textContent = newAmount;
            discriptionItem.textContent = newDescription;
            let newAmountLatest = editAmount.value === '' ? expense.amount : editAmount.value;
            let newDescriptionLatest = editDescription.value === '' ? expense.description : editDescription.value;
            expeseAmount.textContent =  newAmountLatest;
            discriptionItem.textContent = newDescriptionLatest;


            editBtn.style.display = 'inline';
            saveBtn.style.display = 'none';

            editAmount.style.display = 'none';
            editDescription.style.display = 'none';

            expeseAmount.style.display = 'inline';
            discriptionItem.style.display = 'inline';

        });
        deleteBtn.addEventListener('click', function () {

            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses = expenses.filter(ele => ele.id !== expense.id);

            localStorage.setItem('expenses', JSON.stringify(expenses));
            showExpenses();

        })



        itemContainer.appendChild(div);

    });
}


showExpenses();




