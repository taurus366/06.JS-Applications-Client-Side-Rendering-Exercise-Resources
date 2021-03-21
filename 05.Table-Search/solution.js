import {html, render} from 'https://unpkg.com/lit-html?module';
let tBody = document.querySelector('tbody');


async function populateBody() {
   let url = 'http://localhost:3030/jsonstore/advanced/table/';

   const bodyTemplate = (person) => html`
   <tr>
      <td>${person.firstName} ${person.lastName}</td>
      <td>${person.email}</td>
      <td>${person.course}</td>
   </tr>
`;

   async function getDataFromDB() {
      let response = await fetch(url);
      if (response.ok){
         return  await response.json();
      }else {
         alert(response.statusText);
      }
   }

   let readyPersons = Object.values(await getDataFromDB())
       .map(bodyTemplate)

   render(readyPersons, tBody);

}

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

  await populateBody();

   function onClick() {
      let searchField = document.querySelector('#searchField');
      let tBodyStudents = document.querySelectorAll('tbody > tr')
      if (searchField.value.length > 0){
         tBodyStudents
             .forEach(line =>{
                line.classList.remove('select');
                Array.from(line.children)
                    .forEach(line2 => {
                       if (line2.textContent.toLowerCase().includes(searchField.value.toLowerCase())){
                          line.classList.add('select');
                       }

                    })

             })
         searchField.value = '';
      }else {
         alert('Please be sure that you have written in input area')
      }


   }


}

await solve();