

let testDiv = document.getElementById('idTest');
let testInput: HTMLInputElement = TextField.CreateTextFieldNoLabel('idText', '');
testInput.style.textAlign = 'right';
//TextField.SetTextFieldMask(testInput, '###,##0.00');
//TextField.SetTextFieldMask(testInput, '$###,##0.00');
TextField.SetTextFieldMask(testInput, 'MYR ###,##0.00');
//TextField.SetTextFieldMask(testInput, '##########');
//TextField.SetTextFieldMask(testInput, '#######000');
//TextField.SetTextFieldMask(testInput, '######-##-####', 14);
//testInput.maxLength = 14;
testDiv?.appendChild(testInput);