// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "admin123") {
        window.location = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid Login!";
    }
}

function logout() {
    window.location = "index.html";
}

// BOOK MANAGEMENT
document.addEventListener("DOMContentLoaded", displayBooks);

document.getElementById("bookForm")?.addEventListener("submit", addBook);

function addBook(e) {
    e.preventDefault();

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.push({
        id: bookId.value,
        name: bookName.value,
        author: author.value,
        status: "Available"
    });

    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    bookForm.reset();
}

function displayBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let list = document.getElementById("bookList");
    if (!list) return;

    list.innerHTML = "";
    books.forEach((b, i) => {
        list.innerHTML += `
        <tr>
            <td>${b.id}</td>
            <td>${b.name}</td>
            <td>${b.author}</td>
            <td>${b.status}</td>
            <td><button onclick="issueBook(${i})">Issue</button></td>
            <td><button onclick="returnBook(${i})">Return</button></td>
            <td><button onclick="deleteBook(${i})">Delete</button></td>
        </tr>`;
    });
}

function issueBook(i) {
    let books = JSON.parse(localStorage.getItem("books"));
    books[i].status = "Issued";
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

function returnBook(i) {
    let books = JSON.parse(localStorage.getItem("books"));
    books[i].status = "Available";
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

function deleteBook(i) {
    let books = JSON.parse(localStorage.getItem("books"));
    books.splice(i, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

function searchBook() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#bookList tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}
