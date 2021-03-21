import {cats} from './catSeeder.js';
import { html , render} from 'https://unpkg.com/lit-html?module';

let section = document.querySelector('#allCats');

function onClick(ev) {
   let isVisible = ev.target.parentNode.querySelector('.status');

   if (isVisible.style.display === 'none'){
       isVisible.style.display = 'block';
   }else {
       isVisible.style.display = 'none';
   }
}

const liTemplate = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onClick}>Show status code</button>
            <div class="status" style="display: none" id="100">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;


const ulTemplate = (allCats) => html`
<ul>
    ${allCats}
</ul>
`;

let result = ulTemplate(cats.map(liTemplate));
render(result,section);
