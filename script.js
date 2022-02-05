const form = document.querySelector('#form');
const list = document.querySelector('#list');
const state = [];
let template;

function formHandler(e) {
    e.preventDefault();
    const item = {};

    if (!validateInputs(e.target.elements)) {
        return;
    }

    for (const el of e.target.elements) {
        if (el.classList.contains('btn')) {
            continue;
        }

        item[el.getAttribute('type')] = el.value.toLowerCase();
    }

    state.push(item)

    template = state.map((el)=>render(el));

    list.append(template[template.length-1]);
    e.target.reset();
}

function closeEventHandler() {
    this.remove();
    const index = state.indexOf(this.dataset.id);
    state.splice(index, 1);
}

function render(data) {
    const li = document.createElement('li');
    const email1 = document.createElement('p');
    const password = document.createElement('p');
    const text = document.createElement('p');

    email1.textContent = data.email1;
    password.textContent = data.password;
    text.textContent = data.text;
    li.dataset.id = Math.round(Math.random()*1000)+Math.round(Math.random()*1000);

    li.append(email1, password, text, closeBtn(li));

    return li;
}

function closeBtn(el) {
    const btn = document.createElement('button');
    btn.textContent = 'x';

    btn.addEventListener('click', closeEventHandler.bind(el));

    return btn;
}

function offocusValidate(e) {
    return validateInputs(e.currentTarget.elements)
}

function validateInputs(elems) {
    let statusValidate = true;

    for (const el of elems) {
        el.classList.remove('error');
    }

    for (const el of elems) {
        if (el.classList.contains('btn')) {
            continue;
        }

        const status = validate(el);

        if (status.error) {
            el.classList.add('error');
            statusValidate = false;
        } else {
            el.classList.add('success');
        }
    }

    return statusValidate;
}

function textValidate(val) {
    return val.length > 2;
}

function emailValidate(val) {
    const symbol1 = '.';
    const symbol2 = '@';
    if (!~val.indexOf(symbol2) && !~val.indexOf(symbol1)) {
        return false;
    }

    return val.indexOf(symbol2) > val.indexOf(symbol1);
}

function passwordValidate(val) {
    const symbols = [',', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    let res = false;

    if (val.length < 5) {
        return false;
    }

    for (const el of val) {
        if (symbols.includes(el)) {
            res = true;
            break;
        }
    }

    return res;
}

function validate(el) {
    const typeInput = el.getAttribute('type');
    const validateVal = el.value;
    let statusVal = null;

    switch(typeInput) {
        case 'text':
            statusVal = textValidate(validateVal);
            break;
        case 'email1':
            statusVal = emailValidate(validateVal);
            break;
        case 'password':
            statusVal = passwordValidate(validateVal);
            break;    
    }

    return {
        error: !statusVal,
        text: 'error',
    };
}

form.addEventListener('submit', formHandler);

form.addEventListener('blur', offocusValidate, true);
