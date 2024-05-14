function displayErrors(errors){
    const errorList=document.getElementById('errorList');
    errorList.innerHTML='';

    for(const field in errors){
        errors[field].forEach(error=>{
            const li=document.createElement('li');
            li.textContent=`${error}`;
            errorList.appendChild(li);
        });
    }
}