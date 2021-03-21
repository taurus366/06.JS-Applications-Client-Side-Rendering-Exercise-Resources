import {towns} from './towns.js';
import {html, render} from 'https://unpkg.com/lit-html?module';

let townsMain = document.querySelector('#towns');

let btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', search);

const liTemplate = (item) => html`
    <li>
        ${item}
    </li>
`;


const ulTemplate = (items) => html`
    <ul>
        ${items}
    </ul>
`;


function search(ev) {
    let word = document.querySelector('#searchText');
    let p = document.querySelector('#towns > ul').children;
    let matches = document.querySelector('#result');

    Array.from(p)
        .forEach(line => line.classList.remove('active'));
    matches.textContent = '';

    if (word.value.length > 0) {
        let count = Array.from(p)
            .filter(line => line.textContent.trim().substring(0, 2).toLowerCase().includes(word.value.toLowerCase()))

        count
            .forEach(line => line.classList.add('active'));
        matches.textContent = `${count.length} matches found`;

    }


}

function showTowns() {
    let townsInHTML = ulTemplate(towns.map(liTemplate));
    render(townsInHTML, townsMain);
}

showTowns();






