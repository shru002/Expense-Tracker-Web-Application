const balance = document.getElementById('balance');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// State: Array to hold expense objects
let expenses = [];

// Load from Local Storage on startup
if (localStorage.getItem('expenses')) {
  expenses = JSON.parse(localStorage.getItem('expenses'));
}

function addExpense(e) {
  e.preventDefault(); // Stop form from refreshing page

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
    return;
  }

  // Create expense object
  const expense = {
    id: generateID(),
    text: text.value,
    amount: +amount.value // The + converts string to number
  };

  expenses.push(expense);

  addExpenseDOM(expense);
  updateValues();
  updateLocalStorage();

  // Clear inputs
  text.value = '';
  amount.value = '';
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addExpenseDOM(expense) {
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(expense.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${expense.text} <span>$${Math.abs(expense.amount)}</span>
    <button class="delete-btn" onclick="removeExpense(${expense.id})">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = expenses.map(expense => expense.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  balance.innerText = `$${total}`;
}

function removeExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  init(); // Re-render everything
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function init() {
  list.innerHTML = '';
  expenses.forEach(addExpenseDOM);
  updateValues();
}

// Event Listener
form.addEventListener('submit', addExpense);

// Start the app
init();