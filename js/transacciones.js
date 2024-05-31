function init(){
    //Inicializando los valores a almacenar en el localStorage
    localStorage.setItem('name','Ash Ketchum');
    localStorage.setItem('cuenta','0987654321');
    localStorage.setItem('pin',1234);
    localStorage.setItem('balance',500.00);
    localStorage.setItem('transacciones','[]');
}

//Función que permite retornar la lista a partir del localStorage
function returnList(){
    //Las transacciones están guardadas como JSON dentro del local storage
    //Se convierten a una lista utilizando JSON.parse para uso futuro
    const itemList =JSON.parse(localStorage.getItem('transacciones'))||[];
    return itemList
}

//Función que permite añadir una nueva transacción a la lista
function addItem(newItem){
    //Llama la función returnList
    let itemList=returnList()
    //Se hace push del nuevo elemento a la lista creada
    itemList.push(newItem);
    //Se convierte la lista a JSON para almacenarse nuevamente en el localStorage
    localStorage.setItem('transacciones',JSON.stringify(itemList));
}

//Función que sirve para mostrar la lista de transacciones en el historial
function showList(){
    //Llama a la función returnList
    let list=returnList();
    //Toma 2 listas dentro del documento
    //Transaccionesul se utilizara para mostrar las descripciones
    //Montosul se utilizara para mostrar los montos
    const descList=document.getElementById('transaccionesul');
    const descList2=document.getElementById('montosul');
    //Añade el titulo a la lista de descripciones en forma de un li
    let title = document.createElement('li');
    title.textContent='Descripción'
    descList.appendChild(title);
    //Los elementos en la lista se encuentran de la siguiente forma ['Descripcion',monto]
    //Mediante un for loop toma los elementos con índice par de la lista [0,2,4...] y los va agregando como li a transaccionesul
    for(let i=0;i<list.length;i+=2){
        const li = document.createElement('li');
        li.textContent=list[i]
        descList.appendChild(li);
    }
    //Añade el título a la lista de descripciones en forma de un li
    let title2 = document.createElement('li');
    title2.textContent='Monto'
        //Mediante un for loop toma los elementos con índice impar de la lista [1,3,5...] y los va agregando como li a montosul
    descList2.appendChild(title2);
    for(let i=1;i<list.length;i+=2){
        const li = document.createElement('li');
        li.textContent='$'+list[i];
        descList2.appendChild(li);
    }
}

//Función que sirve para descargar el pdf
//Parámetros: Tipo de transacción, Monto, NPE y Servicio si son pagos de servicio
function printPDF(transaccion,monto,npe=0,servicio=''){
    //Se establece a partir de que altura se escribira, 30px abajo del borde superior
    var y=30;
    //Se crea el elemento jsPDF
    var doc = new jsPDF();
    //Se escribe el nombre del banco centrado en x=105
    doc.text('Pokémon Bank',105,y,null,null,'center');
    //Se baja la altura de la escritura 15px
    y+=15;
    //Escribe el tipo de comprobante dependiendo de la transacción
    doc.text('Comprobante de '+transaccion,105,y,null,null,'center');
    y+=15;
    //Escribe el nombre del cliente
    doc.text('Nombre del Cliente: '+localStorage.getItem('name'),15,y);
    y+=15;
    //Escribe el número de cuenta
    doc.text('Número de Cuenta: '+localStorage.getItem('cuenta'),15,y);
    y+=15;
    //Escribe la transacción realizada y el servicio de ser pago de servicio
    doc.text('Transacción: '+transaccion+servicio,15,y);
    y+=15;
    //Si es pago de servicio y existe un npe, escribe el NPE
    if(npe!=0){
        doc.text('Número de Pago Electronico: '+npe,15,y);
        y+=15;
    }
    //Escribe el monto de la transacción
    doc.text('Monto: $'+monto,15,y);
    y+=15;
    //Escribe el nuevo balance de la cuenta luego de la transacción
    doc.text('Balance de la cuenta: $'+localStorage.getItem('balance'),15,y);
    //Mensaje
    doc.text('Este es un comprobante de '+transaccion+' generado automáticamente',105,275,null,null,'center');
    //Descarga el PDF
    doc.save('comprobante.pdf');
}

//Función que muestra una alerta al completarse una transacción
//Parámetros: Tipo de Transacción
function showSuccessAlert(transaccion) {
    //Hace uso de sweetalert para enviar una alerta
    Swal.fire({
        title: '¡Transacción Completada!',
        text: 'Tu '+transaccion+' fue completado exitosamente',
        icon: 'success',
        showCancelButton: true,
        //Muestra dos botones que permiten al usuario realizar otra transacción o cerrar su sesión
        confirmButtonText: 'Realizar otra transacción',
        cancelButtonText: 'Terminar Sesión'
    }).then((result) => {
        //Si selecciona el botón de realizar otra transacción lo lleva a las opciones de transacción
        if (result.isConfirmed) {
            window.location.href = 'opciones.html';
        } 
        //Caso contrario, regresa a la pantalla de inicio de sesión
        else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = 'index.html';
        }
    });
}

//Función que retorna una lista en forma de string con los errores encontrados por validatejs
//Parámetros errors, dict creado por validatejs
function displayErrors(errors){
    //Crea un string vacío
    var errorList=''
    //forloop por cada key del dict errors
    for(const field in errors){
        //forloop por cada item dentro del array que almacena la key
        errors[field].forEach(error=>{
            //lo añade al string seguido de un linebreak
            errorList+=`${error}`+('<br>');
        });
    }
    //retorna el string
    return errorList
}

//Función que permite hacer un conglomerado de los pagos para el gráfico
//p.ej. si hay 2 pagos de Luz de $15 y $20, el elemento creado mostrará Pago de Luz con un total de $35
function aggData(){
    //llama a la función returnList para utilizar la lista de transacciones
    list=returnList();
    //Crea un dict llamado aggregatedData para hacer el conglomerado
    aggregatedData={};
    //forloop sobre cada elemento dentro de la lista, saltando cada par de elementos
    for(let i=0;i<list.length;i+=2){
        //almacena label y value considerando que la lista lleva la forma ['label',value]
        var label = list[i]; //Labels serán las keys del dict
        var value = list[i+1]; //Value los values del dict
        //Si label es depósito, pasa al siguiente elemento
        //Las transacciones a mostrar en el gráfico son únicamente retiros y pagos
        if(label=='Depósito'){
            continue;
        }
        else{
            //Si la label ya se encuentra en el dict, le suma el nuevo valor
            if(aggregatedData[label]){
                aggregatedData[label]+=value;
            } 
            //Caso contrario guarda la label en el dict
            else{
                aggregatedData[label]=value;
            }
        }
    }
    //Retorna el dict
    return aggregatedData;
}