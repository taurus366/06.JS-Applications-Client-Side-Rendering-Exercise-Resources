import {html} from 'https://unpkg.com/lit-html?module';
import {getAllBooks, updateBook, getBookById, deleteBook,createBook} from "./data.js";
import {update} from './app.js';

async function onLoadBook() {
    let books = await getAllBooks();
    update(books);
}

async function onClick(ev) {
    let btn = ev.target;
    if (btn.classList.contains('editBtn')) {
        //console.log(await getBookById(btn.parentNode.dataset.id))

        let book = await getBookById(btn.parentNode.dataset.id);
        book._id = btn.parentNode.dataset.id;
        update(await getAllBooks(), book);
    } else if (btn.classList.contains('deleteBtn')) {
      //  console.log('deleteBtn', btn.parentNode.dataset.id);
        await deleteBook(btn.parentNode.dataset.id);
        await onLoadBook();
    }
}

async function onEdit(ev) {
    ev.preventDefault();
    let form = new FormData(ev.target.parentNode);
    let title = form.get('title');
    let author = form.get('author');

    await updateBook(ev.target.dataset.id, {title, author})
    await onLoadBook();
}

async function onCreate(ev) {
    ev.preventDefault();
    let form = new FormData(ev.target.parentNode);
   let title = form.get('title');
   let author = form.get('author');
   await createBook({title,author});
   await onLoadBook();
}
const createFormTemplate = () => html`
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit" @click=${onCreate}>
    </form>
`;

const editFormTemplate = (book) => html`
    <form id="edit-form" style="display: block">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." value=${book.author}>
        <input type="submit" value="Save" data-id=${book._id} @click=${onEdit}>
    </form>
`;

const booksTemplate = (book) => html`
    <tr>
        <td>${book[1].title}</td>
        <td>${book[1].author}</td>
        <td data-id=${book[0]}>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    </tr>
`;

function tableTemplate(books) {

    return html`
        <button id="loadBooks" @click=${onLoadBook}>LOAD ALL BOOKS</button>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody @click=${onClick}>
            ${books ? books.map(booksTemplate) : null}
            </tbody>
        </table>
    `;


}


const layoutTemplate = (books, bookToEdit) => html`
    ${books !== undefined ? tableTemplate(books) : tableTemplate()}
    ${bookToEdit ? editFormTemplate(bookToEdit) : createFormTemplate()}
`;

export {
    layoutTemplate
}