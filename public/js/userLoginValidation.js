window.onload = function (){

    const formulario = document.querySelector('#formulario-login');
    let inputEmail =  document.getElementById('email');
    let inputPassword =  document.getElementById('password');
    let emailExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    
    formulario.addEventListener ('submit', function (e) {
        let errors = 0;
        
            arrayInputs.forEach(function(input) {
                if(input.dataset.nombre == 'password' && input.value.length < 8){
                    input.nextElementSibling.nextElementSibling.innerHTML = 'El ' + input.dataset.nombre + ' debe tener al menos 8 digitos'
                    input.nextElementSibling.nextElementSibling.classList.add('is-invalid');
                    input.classList.remove('is-invalid');
                    errors++;
    
                }else if(input.dataset.nombre == 'email' && !input.value.match(emailExp) ){
                    input.nextElementSibling.nextElementSibling.innerHTML = 'El campo ' + input.dataset.nombre + ' debe ser una direccion valida.'
                    input.nextElementSibling.nextElementSibling.classList.add('is-invalid');
                    input.classList.remove('is-invalid');
                    errors++;
                }
                   
            })
    
            if(errors > 0){
    
                e.preventDefault ();
                alert('Verifica los datos ingresados') 
            }
    
        })
    
    const arrayInputs = [inputEmail, inputPassword]
        
        arrayInputs.forEach(function(input){
            input.addEventListener('blur', function(){
                
                if(input.dataset.nombre == 'password' && input.value.length < 8 ){
                    input.nextElementSibling.nextElementSibling.innerHTML = 'El campo ' + input.dataset.nombre + ' debe tener al menos 8 digitos.'
                    input.nextElementSibling.nextElementSibling.classList.add('is-invalid');
                    input.classList.remove('is-invalid');
                    
                    
                }else if(input.dataset.nombre == 'email' && !input.value.match(emailExp) ){
                    input.nextElementSibling.nextElementSibling.innerHTML = 'El campo ' + input.dataset.nombre + ' debe ser una direccion valida.'
                    input.nextElementSibling.nextElementSibling.classList.add('is-invalid');
                    input.classList.remove('is-invalid');
                    
                }else {
                    input.nextElementSibling.nextElementSibling.innerHTML="";
                    input.classList.remove('is-invalid')
                }
    
            })
        })
    
    }