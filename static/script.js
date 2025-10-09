const a = document.getElementById('num1');
const b = document.getElementById('num2');

const butns = document.querySelectorAll('.butn');
const value = document.getElementById('ans');

butns.forEach(function(butn){
    butn.addEventListener('click', function(e){

        const styles = e.currentTarget.classList;
        
        if(styles.contains('RESET')){
            value.textContent = "THE OUTPUT";
            a.value = '';
            b.value = '';
            return; 
        }
        
        const num1Str = a.value;
        const num2Str = b.value;
        
        const num1 = parseFloat(num1Str);
        const num2 = parseFloat(num2Str);

        let result;

        if (!Number.isFinite(num1) || !Number.isFinite(num2)){
            value.textContent = "INVALID INPUT. Please enter valid numbers.";
            return;
        }

        if(styles.contains('ADD')){
            result = num1 + num2;
        } else if(styles.contains('SUB')){
            result = num1 - num2;
        } else if(styles.contains('MUL')){
            result = num1 * num2;
        } else if(styles.contains('DIV')){
            if(num2 === 0){
                value.textContent = "Error: Cannot divide by ZERO";
                return;
            }
            result = num1 / num2;
        } else if(styles.contains('POWER')){
            result = Math.pow(num1, num2);
        } else {
            value.textContent = "TRY AGAIN LATER !";
            return;
        }
        value.textContent = result;
    });
});