
import "../css/st-common.css";
import "/img/imgErrorBlink.gif"
import { TextField } from "../src/widget/TextField";


//let testInput: HTMLInputElement = TextField.CreateTextFieldNoLabel('idText', '');
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'number', '$###,###,##0.00', 'data.test', 32, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'number', '$###,###,###,##0.00', 'data.test', 32, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'number', '$##,##,##,##0.00', 'data.test', 52, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'number', '$##,##,##,##0.00', 'data.test', 52, 3);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'number', '########', 'data.test', 52, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'number', '$###.##', 'data.test', 52, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'string', '$##0.00', 'data.test', 52, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'string', '$###,##0.00', 'data.test', 52, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'string', '######-##-####', 'data.test', 52, undefined);
//const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'string', 'U#######', 'data.test', 52, undefined);
const testInputDiv: HTMLDivElement = TextField.CreateTextField('Zip', '', 'id-test-input', 'string', '+## (#) ##-###-###-##', 'data.test', 30, 21);
//testInput.style.textAlign = 'right';
//TextField.SetTextFieldMask(testInput, '###,##0.00');
//TextField.SetTextFieldMask(testInput, '$###,##0.00');
//Mask.SetTextFieldMask(testInput, 'USD ###,##0.00');
//TextField.SetTextFieldMask(testInput, '##########');
//TextField.SetTextFieldMask(testInput, '#######000');
//TextField.SetTextFieldMask(testInput, '######-##-####', 14);
//testInput.maxLength = 14;
//const inputElement = document.getElementById('wt_datadottest') as HTMLInputElement;
const inputElement = TextField.GetInputElement(testInputDiv);
//TextField.ShowTextFieldErrorMsg(inputElement, 'Cannot be empty');
TextField.ShowTextFieldExtraLabel(inputElement, '*');
TextField.ShowTooltip(inputElement, 'Use alias to make person name unique');
//TextField.HideTooltip(inputElement);

const testDiv = document.getElementById('idTest');
testDiv?.appendChild(testInputDiv);
