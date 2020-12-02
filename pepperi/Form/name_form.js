
//assigning all required elements from DOM to the variables
const nameInput = document.querySelector('#name-value-input')
const outputList = document.querySelector('#name-values')
const xmlOutput = document.querySelector('#xml-output')
const inputLabel = document.querySelector('#input-group label')
const outputLabel = document.querySelector('#output-console label')

const addBtn = document.querySelector('#add-btn')
const deleteBtn = document.querySelector('#delete-btn')
const nameSortBtn = document.querySelector('#by-name')
const valueSortBtn = document.querySelector('#by-value')
const convertBtn = document.querySelector('#convert-btn')
const backToListBtn = document.querySelector('#return-btn')



//declaring helper functions and variables

let mainList = [];

const refresh = () =>{   
   outputList.innerHTML = '';
   mainList.forEach(item => outputList.appendChild(item))
} 

const createItem = nameValue =>{
   //cretes element to add later into the mainList array
   const item = document.createElement('div')   
   const deleteBox = document.createElement('input')
   deleteBox.type = 'checkbox'
   item.innerText = nameValue.join('=') + '  ';
   item.appendChild(deleteBox)
   return item;
}

const sorting = evt =>{
  
   const byName = evt.target.textContent.includes('name');
   mainList.sort((a, b) =>{
      
      pairA = a.innerText.trim().split('=');
      pairB = b.innerText.trim().split('=');
      return byName? pairA[0].localeCompare(pairB[0], 'en') : 
                     pairA[1].localeCompare(pairB[1], 'en')  
   })
   
   refresh();
}

const adder = () =>{
   
   let nameValuePairStr = nameInput.value;
   const nameValuePair = nameValuePairStr.split('=').map( i => i.trim());
   const checkerRegExp = /^\s*[a-z\d]+\s*=\s*[a-z\d]+\s*$/i

   if(!checkerRegExp.test(nameValuePairStr)){   
      inputLabel.textContent = 'Enter Name/Value pair in following format "Name=Value"!' 
      inputLabel.style.color = '#BD2031' 
      return

   }else{
      inputLabel.textContent = 'Enter pair according to the format'
      inputLabel.style.color = 'gray' 
      nameInput.value = ''
      const element = createItem(nameValuePair)
      mainList.push(element)
      outputList.appendChild(element)  
   }
}

//button event listeners

addBtn.addEventListener('click', adder)

deleteBtn.addEventListener('click', function(){
   mainList = mainList.filter( el => !el.children[0].checked)
   refresh();
})

nameSortBtn.addEventListener('click', sorting)

valueSortBtn.addEventListener('click', sorting)

convertBtn.addEventListener('click', function(){
   
   outputLabel.innerText = 'XML output'
   outputList.style.display = 'none'
   xmlOutput.innerHTML = ''
   xmlOutput.style.display = 'block'
   
   mainList.forEach(element => {
      let pair = element.innerText.trim().split('=')
      xmlStr = `<${pair[0]}>${pair[1]}</${pair[0]}> `
      let p = document.createElement('p');
      p.innerText = xmlStr;
      xmlOutput.appendChild(p); 
   })
})

backToListBtn.addEventListener('click', function(){ 
   outputLabel.innerText = 'Name/Values list (select to delete)'
   outputList.style.display = 'block'
   xmlOutput.style.display = 'none'
})
