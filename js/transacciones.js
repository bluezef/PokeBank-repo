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
    const listElement=document.getElementById('transacciones');
    for(let i=0;i<list.length;i+=2){
        const li = document.createElement('li');
        li.textContent=list[i]+' $'+list[i+1];
        listElement.appendChild(li);
    }
}