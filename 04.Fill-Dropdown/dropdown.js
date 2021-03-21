import {html, render} from 'https://unpkg.com/lit-html?module';
let url = 'http://localhost:3030/jsonstore/advanced/dropdown/';

let menuDiv = document.querySelector('#menu');

const optionTemplate = (item) => html`
<option value=${item._id}>${item.text}</option>
`;

 async function addItem() {
     let result = Object.values(await getDataFromDB())
         .map(optionTemplate);

     render(result, menuDiv);
 }
async function getDataFromDB() {

    let response = await fetch(url);
    if (response.ok){
        return await response.json();
    }else {
        alert(response.statusText);
    }


}
await addItem();

 let btnSubmit = document.querySelector('[type=submit]');
 btnSubmit.addEventListener('click',onSubmit);

async function postDataToDB(text) {
    let response = await fetch(url,{
        method: 'post',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"text":text.value})
    })

    function clearInput(text) {
        text.value = '';
    }

    if (response.ok){
        await addItem();
        clearInput(text);
    }
}

async function onSubmit(ev) {
    ev.preventDefault();
    let text = document.querySelector('#itemText');
    if (text.value.length > 0) {
        console.log('here')
        await postDataToDB(text);

    }else {
        alert('Please input smth !')
    }
}
