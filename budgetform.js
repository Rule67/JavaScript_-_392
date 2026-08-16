//2.1. เข้าถึง HTML Element
const form = document.getElementById("budget-form");
const titleInput = document.getElementById("item");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const typeInput = document.getElementById("category");

const totalIncomeEl = document.getElementById("revenue");
const totalExpenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("total");
const transactionList = document.getElementById("transaction-list");

//2.2. Array เก็บข้อมูล
let transactions = [
    { id: 1, title: "เงินค่าขนม", amount: 1000, date: "2026-08-16", time: "08:00", type: "รายรับ" },
];

//3. สร้าง submit ข้อมูล
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const time = timeInput.value;
    const type = typeInput.value;

    if (!title || !date || !time || !type) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    if (amount <= 0) {
        alert("จำนวนเงินต้องมากกว่า 0 บาท");
        return;
    }

    const newTransaction = {
        id: Date.now(),
        title: title,
        amount: amount,
        date: date,
        time: time,
        type: type
    };

    transactions.push(newTransaction);

    renderTransactions();   //6.1
    updateSummary();

    form.reset();   //6.2
});

//4. สร้าง function แสดงหน้าเว็บ
function renderTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {
        const listItem = document.createElement("li");

        listItem.textContent = `${transaction.title} - ${transaction.amount.toLocaleString()} บาท (${transaction.type}) [${transaction.date} ${transaction.time}]`;

        //7.สร้างปุ่มลบ
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "ลบ";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", function () {
            deleteTransaction(transaction.id);
        });

        listItem.appendChild(deleteBtn);
        transactionList.appendChild(listItem);
    });
}

//5. คำนวณรายรับ+รายจ่าย
function updateSummary() {
    const totalIncome = transactions
        .filter(transaction => transaction.type === "รายรับ")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = transactions
        .filter(transaction => transaction.type === "รายจ่าย")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    totalIncomeEl.textContent = totalIncome.toLocaleString('th-TH', { minimumFractionDigits: 2 });
    totalExpenseEl.textContent = totalExpense.toLocaleString('th-TH', { minimumFractionDigits: 2 });
    balanceEl.textContent = balance.toLocaleString('th-TH', { minimumFractionDigits: 2 });
}

//7.ส่วนที่เก็บที่ลบ
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    renderTransactions();
    updateSummary();
}

//เรียกใช้งานครั้งแรกเมื่อโหลดหน้าเว็บ
renderTransactions();
updateSummary();