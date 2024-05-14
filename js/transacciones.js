function addItem(newItem){
    let itemList=JSON.parse(localStorage.getItem('transacciones'))||[];
    itemList.push(newItem);
    localStorage.setItem('transacciones',JSON.stringify(itemList));
}

function returnList(){
    const itemList =JSON.parse(localStorage.getItem('transacciones'))||[];
    return itemList
}

function showList(list){
    const listElement=document.getElementById('transaccionesul');
    let title = document.createElement('li');
    title.textContent='Descripción'
    listElement.appendChild(title);
    for(let i=0;i<list.length;i+=2){
        const li = document.createElement('li');
        li.textContent=list[i]
        listElement.appendChild(li);
    }
    const listElement2=document.getElementById('montosul');
    let title2 = document.createElement('li');
    title2.textContent='Monto'
    listElement2.appendChild(title2);
    for(let i=1;i<list.length;i+=2){
        const li = document.createElement('li');
        li.textContent='$'+list[i];
        listElement2.appendChild(li);
    }
}

const range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i += step) {
      output.push(' ');
    }
    return output;
};