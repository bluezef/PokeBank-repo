function init(){
    localStorage.setItem('name','Ash Ketchum');
    localStorage.setItem('cuenta','0987654321');
    localStorage.setItem('pin',1234);
    localStorage.setItem('balance',500.00);
    localStorage.setItem('transacciones','[]');
}

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

function printPDF(transaccion,monto){
    var doc = new jsPDF();
    doc.text('Pokémon Bank',105,50,null,null,'center');
    doc.text('Comprobante de '+transaccion,105,65,null,null,'center');
    doc.text('Nombre del Cliente: '+localStorage.getItem('name'),15,80);
    doc.text('Transacción: '+transaccion,15,95);
    doc.text('Monto: $'+monto,15,110);
    doc.text('Balance de la cuenta: $'+localStorage.getItem('balance'),15,125);
    doc.text('Este es un comprobante de '+transaccion+' generado automáticamente.',105,260,null,null,'center')
    doc.save('comprobante.pdf');
}

function showSuccessAlert(transaccion) {
    Swal.fire({
        title: '¡Transacción Completada!',
        text: 'Tu '+transaccion+' fue completado exitosamente',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Realizar otra transacción',
        cancelButtonText: 'Terminar Sesión'
    }).then((result) => {
        // If "Go to Page 1" button is clicked, navigate to Page 1
        if (result.isConfirmed) {
            window.location.href = 'opciones.html';
        } 
        // If "Go to Page 2" button is clicked, navigate to Page 2
        else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = 'index.html';
        }
    });
}

function displayErrors(errors){
    var errorList=''
    for(const field in errors){
        errors[field].forEach(error=>{
            errorList+=`${error}`+('<br>');
        });
    }
    return errorList
}