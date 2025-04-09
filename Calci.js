let obj = {};
    let e = true;
    let l = document.querySelector('.re');
    const a = document.querySelector('.text');
    let s = JSON.parse(localStorage.getItem('result'));

    if (s) {
      l.innerHTML = s;
      a.value = s;
    }

    let con = false;

    function Calculate(input) {
      const operators = ['+', '-', '*', '/', '.'];
      const isOperator = operators.includes(input);
      const lastChar = a.value.slice(-1);

      if (performance.navigation.type === 1 && e) {
        if (isOperator) {
          if (input === '.') {
            const parts = a.value.split(/[\+\-\*\/]/);
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes('.')) {
              return;
            }
          }
          a.value = (s || '') + input;
        } else {
          a.value = input;
        }
        l.innerHTML = '';
        e = false;
        return;
      }

      if (con) {
        if (isOperator) {
          con = false;
        } else {
          a.value = input;
          l.innerHTML = '';
          con = false;
          return;
        }
      }

      if (isOperator && operators.includes(lastChar)) {
        return;
      }

      if (input === '.') {
        const parts = a.value.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
          return;
        }
      }

      a.value += input;
      l.innerHTML = '';
    }

    function Eval() {
      l.innerHTML = a.value;
      try {
        a.value = eval(a.value);
        localStorage.setItem('result', JSON.stringify(a.value));
      } catch (error) {
        a.value = a.value;
      }
      con = true;
    }

    function Clear() {
      a.value = '';
      l.innerHTML = '';
    }

    function Remove() {
      if (con && l.innerHTML != '') {
        con = false;
        a.value = l.innerHTML;
        l.innerHTML = '';
      } else {
        a.value = a.value.slice(0, -1);
        l.innerHTML = '';
      }
    }

    let sor = ['(', ')', '+', '-', '*', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        Remove();
      } else if (event.key === 'Delete') {
        Clear();
      } else if (event.key === 'Enter') {
        Eval();
      } else if (event.key != 'Shift') {
        if (sor.includes(event.key)) {
          Calculate(event.key);
        }
      }
    });