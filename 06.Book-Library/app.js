import { render} from 'https://unpkg.com/lit-html?module';
import { layoutTemplate } from './main.js';
import * as api from './data.js';

// render(layoutTemplate(undefined, false, undefined), document.body)


await start();
async function start() {
    update();
}

function update(books , bookToEdit) {
    const result = layoutTemplate(books , bookToEdit);
    render(result , document.body);
}


export {
    update
}