function validacion(event,errorList,constraints,formData,successlink){
    event.preventDefault();
    errors=validate(formData,constraints);
    if(!errors){
        window.location.href=successlink;
    }
    else{
        displayErrors(errors,errorList);
    }
}

function displayErrors(errors,errorList){    
    for(const field in errors){
        errors[field].forEach(error=>{
            const li=document.createElement('li');
            li.textContent='El '+`${error}`;
            errorList.appendChild(li);
        });
    }
}