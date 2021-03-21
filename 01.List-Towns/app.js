import { html , render } from 'https://unpkg.com/lit-html?module';

let btnLoad = document.querySelector('#btnLoadTowns');
btnLoad.addEventListener('click',(ev)=> {
    ev.preventDefault();
    let divRoot = document.querySelector('#root');

    let text = document.querySelector('#towns').value;

   if (text.length > 0){
       text = text.split(', ');
       let result = ulTemplate(text.map(liTemplate));
       render(result,divRoot);
   }
});

 const ulTemplate =(articles) =>html`
        <ul>${articles}</ul>`;

const liTemplate = (article) => html`
<li>${article}</li>
`;



