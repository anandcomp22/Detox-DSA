import { Stack } from './stack.js';

document.onkeydown = function(event) {
    if(event.ctrlKey || event.metaKey) {
        event.preventDefault();
    }
};

onload = function() {
    const textbox = document.getElementById('comment');
    const undo = document.getElementById('undo');
    const clear = document.getElementById('clear');
    const temptext = document.getElementById('temptext');

    if (!textbox || !undo || !clear || !temptext) {
        console.error("Required elements are missing in the DOM.");
        return;
    }

    textbox.value = "";
    let text = "";
    let stack = new Stack();

    textbox.onclick = function() {
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };

    clear.onclick = function() {
        stack.clear();
        text="";
        textbox.value = "";
        temptext.innerHTML = "LIFO REAL WORLD EXAMPLE";
    };

    textbox.oninput = function(event) {
        switch(event.inputType){
            case "insertText":
                stack.push(0,event.data);
                break;
            case "deleteContentBackward":
                stack.push(1,text[text.length-1] || '');
                break;
        }

        temptext.innerHTML = "On stack "+stack.top()+"<br>"+temptext.innerHTML;
        text = textbox.value;
    };

    undo.onclick = function() {
        let operation = stack.pop();
        if(operation[0]!== -1){
            temptext.innerHTML = "Undo operation in Progress..<br>"+temptext.innerHTML;
            if(operation[0] === 0 ){
                let len = operation[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            }
            else{
                textbox.value += operation[1];
            }
            text = textbox.value
        }
    };
};