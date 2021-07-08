"use strict";
var testDiv = document.getElementById('idTest');
var testInput = TextField.CreateTextFieldNoLabel('idText', '');
testInput.style.textAlign = 'right';
//TextField.SetTextFieldMask(testInput, '###,##0.00');
//TextField.SetTextFieldMask(testInput, '$###,##0.00');
TextField.SetTextFieldMask(testInput, 'MYR ###,##0.00');
//TextField.SetTextFieldMask(testInput, '##########');
//TextField.SetTextFieldMask(testInput, '#######000');
//TextField.SetTextFieldMask(testInput, '######-##-####', 14);
//testInput.maxLength = 14;
testDiv === null || testDiv === void 0 ? void 0 : testDiv.appendChild(testInput);
//# sourceMappingURL=index.js.map