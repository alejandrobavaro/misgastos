function addExpenseToList(expense) {
    const expenseTable = document.getElementById('expense-table');
    const expenseBody = expenseTable.querySelector('tbody');
    
    const expenseRow = document.createElement('tr');
    expenseRow.innerHTML = `
        <td>${expense.name}</td>
        <td>$${expense.amount}</td>
        <td>${expense.dueDate}</td>
        <td>${expense.paid ? 'Sí' : 'No'}</td>
    `;
    expenseBody.appendChild(expenseRow);

    updateTotalExpense(expense.amount);
}

function updateTotalExpense(amount) {
    const totalExpensesElement = document.getElementById('total-expenses');
    let totalExpenses = parseFloat(totalExpensesElement.textContent.replace('Total: $', '')) || 0;
    totalExpenses += parseFloat(amount); // Convertimos amount a float
    totalExpensesElement.textContent = `Total: $${totalExpenses.toFixed(2)}`;
}
