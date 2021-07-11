'use strict';

/*
 * Generic
 * 
 */
class Generic {
	static IsNumeric(aValue: string): boolean {
		let result = false;
		aValue = aValue.trim();
		if (! aValue) return result;
		let num: number = +aValue;
		if (! isNaN(num)) {
			result = true;
		}
		return result;
	}

	static IsPrintable(aChar: string): boolean {
		let result = false;
		if (aChar.length == 1) result = true;
		return(result);
	}

	static ReverseString(aStr: string): string {
		return aStr.split("").reverse().join("");
	}

	static ReplaceChar(aStr: string, aChar: string, aPosition: number): string {
		let result = '';
		if (aStr.length > aPosition) {
			for(let cntr: number = 0; cntr < aStr.length; cntr++) {
				if (cntr == aPosition) {
					result += aChar;
				} else {
					result += aStr.charAt(cntr);
				}
			}
		}
		return(result);
	}

	static InsertString(aStr: string, aChar: string, aPosition: number): string {
		let result = '';
		if (aStr.length >= aPosition) {
			for(let cntr: number = 0; cntr <= aStr.length; cntr++) {
				if (cntr == aPosition) {
					result += aChar;
					result += aStr.charAt(cntr);
				} else {
					result += aStr.charAt(cntr);
				}
			}
		}
		return(result);
	}

	static GetDotPosition(aDataStr: string): number {
		let dotPosition: number = -1;
		for(let cntr: number = 0; cntr < aDataStr.length; cntr++) {
			if (aDataStr.charAt(cntr) == '.') {
				dotPosition = cntr;
				break;
			}
		}
		return(dotPosition);
	}


	static OnlyDigitAndDot(aDataStr: string): string {
		let result: string = '';
		for(let cntr: number = 0; cntr < aDataStr.length; cntr++) {
			let theChar: string = aDataStr.charAt(cntr);
			if (Generic.IsNumeric(theChar) || theChar == '.') {
				result += theChar
			}
		}
		return result;
	}
}

/*
 * WidgetInterface
 * 
 */
interface WidgetInterface {
}

/*
 * Widget
 * 
 */
class Widget implements WidgetInterface {
	static GetRandom5(): string {
		let numResult: number = (Math.floor(Math.random()*90000) + 10000);
		let result: string = numResult + '';
		return result;
	};

	static SpecialCharReplace(aFunctionName: string): string {
		let result: string = aFunctionName.replace(/ /g, '_');
		result = result.replace(/\[/g, 'bracketo');
		result = result.replace(/\]/g, 'bracketc');
		result = result.replace(/\./g, 'dot');
		return result;
	};

	static GenElementId(aId: string): string {
		return(aId);
	}

	// generate element id according to slideIndex and field Fqn
	static GenElementIdByFqn(aPrefix: string, aFieldFqn: string): string {
		let genId: string;
		if (aFieldFqn) {
			let fqnName: string = Widget.SpecialCharReplace(aFieldFqn);
			if (aPrefix) {
				genId = aPrefix + fqnName;
			} else {
				genId = 'wt_' + fqnName;
			}
		} else {
			genId = 'wt_rd' + Widget.GetRandom5();
		}
		return(genId);
	};
}

class Tooltip extends Widget {

	static CreateTooltip(aMsg: string): HTMLSpanElement {
		let tipParent: HTMLSpanElement = document.createElement('span');
		tipParent.classList.add('tooltip');
		tipParent.classList.add('bottom');
		//tipParent.classList.add('top');
		tipParent.style.marginLeft = '5px';

		let tipIcon: HTMLSpanElement = document.createElement('span');
		tipIcon.classList.add('info-icon');
		tipIcon.innerHTML = 'i';

		let tipMsg: HTMLSpanElement = document.createElement('span');
		tipMsg.innerHTML = aMsg;
		tipMsg.classList.add('tooltip-inner');

		let tipAngle : HTMLSpanElement = document.createElement('span');
		tipAngle.classList.add('tooltip-angle');

		let tipInnerAngle : HTMLSpanElement = document.createElement('span');
		tipInnerAngle.classList.add('tooltip-angle-inner');

		tipAngle.appendChild(tipInnerAngle);
		tipMsg.appendChild(tipAngle);
		tipParent.appendChild(tipIcon);
		tipParent.appendChild(tipMsg);

		return tipParent;
	}

	private static GetTooltipParent(aTipElement: HTMLSpanElement): HTMLSpanElement {
		if (aTipElement.classList.contains('tooltip')) {
			return aTipElement;
		} else {
			const tipElement = aTipElement.querySelector('.tooltip') as HTMLSpanElement;
			return tipElement;
		}
	}

	static HideTooltip(aTipElement: HTMLSpanElement): void {
		const tipElement = Tooltip.GetTooltipParent(aTipElement);
		tipElement.style.display = 'none';
	}

	static ShowTooltipMsg(aTipElement: HTMLSpanElement, aMsg: string): void {
		const tipElement = Tooltip.GetTooltipParent(aTipElement);
		tipElement.style.display = 'inline-block';
		const tipInnerElement = tipElement.querySelector('.tooltip-inner') as HTMLSpanElement;
		tipInnerElement.innerHTML = aMsg;
	}
}

/*
 * TextField
 * 
 */
class TextField extends Widget {
	static CLS_INPUT: string = 'form-control';
	static CLS_EACHFIELD = 'st-eachfield';
	static CLS_ROW = 'st-row';
	static CLS_EACHFIELD_ROW = TextField.CLS_EACHFIELD + ' ' + TextField.CLS_ROW;
	static CLS_LABEL_AREA = 'st-label-area inline field';
	static CLS_INPUT_AREA = 'st-input-area';
	static CLS_ERROR_MSG = 'st-error-msg';
	static CLS_EXTRA_LABEL = 'st-extra-label';
	static CLS_LABEL = 'st-label-txt';
	static CLS_CHECKBOX = 'st-checkbox';
	static CLS_DATE_PICKER = 'st-date-picker' + ' ' + TextField.CLS_INPUT;
	static CLS_COMBO_BOX = 'custom-select';
	static ImgErrorBlink = 'img/imgErrorBlink.gif';

	static CreateTextField(aDisplayLabel: string, aValue: string, aId : string, aType: string, aMask: string, aFqn: string, aSize: number, aMaxLen?: number): HTMLDivElement {
		let inputTxt: HTMLInputElement = TextField.CreateTextFieldNoLabel(aId, aValue);

		let elementId:string = Widget.GenElementIdByFqn('', aFqn);
		inputTxt.id = elementId;
		if (aSize) inputTxt.setAttribute('size', aSize + '');
	
		Mask.SetTextFieldMask(inputTxt, aMask, aMaxLen!, aType); // mask according to given mask or data type
	
		let widgetGrp: HTMLDivElement = TextField.CreateTextFieldWithLabel(aDisplayLabel, inputTxt);
		return(widgetGrp);
	}

	static CreateTextFieldNoLabel(aId: string, aValue: string): HTMLInputElement {
		let inputTxt: HTMLInputElement = document.createElement('input');
		inputTxt.setAttribute('class', TextField.CLS_INPUT);
		inputTxt.setAttribute('type', 'text');
		if (aValue) {
			inputTxt.setAttribute('value', aValue);
			inputTxt.value = aValue;
		}
		if (aId) {
			inputTxt.setAttribute('id', aId);
		}
		return(inputTxt);
	}

	static CreateTextFieldWithLabel(aDisplayLabel: string, aInputField: HTMLInputElement) {
		let parent: HTMLDivElement = document.createElement('div');
		parent.setAttribute('class', TextField.CLS_EACHFIELD_ROW);
	
		let labelArea: HTMLDivElement = document.createElement('div');
		labelArea.setAttribute('class', TextField.CLS_LABEL_AREA);
		labelArea.style.marginBottom = '0';

		let label: HTMLLabelElement = document.createElement('label');
		label.innerHTML = aDisplayLabel;
		label.setAttribute('class', TextField.CLS_LABEL);
		label.style.margin = '0';
		label.style.width = 'auto';
		
		let extraLabel: HTMLSpanElement = document.createElement('span');
		extraLabel.setAttribute('class', TextField.CLS_EXTRA_LABEL);
		extraLabel.style.display = 'none';
		extraLabel.style.color = 'red';
		extraLabel.style.fontSize= 'large';

		let tipInfo: HTMLSpanElement = Tooltip.CreateTooltip('');
		Tooltip.HideTooltip(tipInfo);

		let errImg: HTMLImageElement = document.createElement('img');
		errImg.setAttribute('src', TextField.ImgErrorBlink);
		errImg.style.display = 'none';
		errImg.style.marginLeft = '6px';
		errImg.style.marginRight = '5px';
		//err.style.marginBottom = '5px';

		let errMsg: HTMLSpanElement = document.createElement('span');
		errMsg.setAttribute('class', TextField.CLS_ERROR_MSG);
		errMsg.style.display = 'none';
		errMsg.style.color = 'red';
		errMsg.style.fontSize = 'small';
		errMsg.style.fontFamily = 'monospace';

		labelArea.appendChild(label);
		labelArea.appendChild(extraLabel);
		labelArea.appendChild(tipInfo);
		labelArea.appendChild(errImg);
		labelArea.appendChild(errMsg);
	
		let inputArea: HTMLDivElement = document.createElement('div');
		inputArea.setAttribute('class', TextField.CLS_INPUT_AREA);
	
		if (aInputField.tagName === 'parentwrapper') {
			for(var cntr = 0; cntr < aInputField.childNodes.length; cntr++) { 
				inputArea.appendChild(aInputField.childNodes[cntr]);
			}
		} else {
			inputArea.appendChild(aInputField);
		}
		parent.appendChild(labelArea);
		parent.appendChild(inputArea);
		
		return(parent);
	};

	static ShowTooltip(aInputElement: HTMLInputElement, aMsg: string): void {
		const parentElement = TextField.GetTextFieldParent(aInputElement);
		const tipElement = parentElement.querySelector('.tooltip') as HTMLSpanElement;
		Tooltip.ShowTooltipMsg(tipElement, aMsg);
	}

	static HideTooltip(aInputElement: HTMLInputElement): void {
		const parentElement = TextField.GetTextFieldParent(aInputElement);
		const tipElement = parentElement.querySelector('.tooltip') as HTMLSpanElement;
		Tooltip.HideTooltip(tipElement);
	}

	private static GetTextFieldParent(aTextElement: HTMLInputElement): HTMLDivElement {
		let result: HTMLDivElement = null!;
		if (aTextElement.parentElement && aTextElement.parentElement.parentElement) {
			let divParent: HTMLElement = aTextElement.parentElement?.parentElement;
			if (divParent.classList.contains(TextField.CLS_EACHFIELD) && divParent.classList.contains(TextField.CLS_ROW)) {
				if (divParent instanceof HTMLDivElement) {
					result = divParent;
				}
			}
		} 
		return result;
	}

	static GetInputElement(aTextDiv: HTMLDivElement): HTMLInputElement {
		let result: HTMLInputElement = null!;
		if (aTextDiv) {
			const inputElement = aTextDiv.querySelector('input') as HTMLInputElement;
			const parentElement = inputElement.parentElement;
			if (parentElement && parentElement.classList.contains(TextField.CLS_INPUT_AREA)) {
				result = inputElement;
			}
		}
		return result;
	}

	static ShowTextFieldExtraLabel(aTextElement: HTMLInputElement, aExtraLabel: string): void {
		const parentDiv: HTMLDivElement = TextField.GetTextFieldParent(aTextElement);
		if (parentDiv) {
			const extraLabel = parentDiv.querySelector('.' + TextField.CLS_EXTRA_LABEL) as HTMLSpanElement;
			if (extraLabel && extraLabel.style) {
				extraLabel.innerHTML = aExtraLabel;
				extraLabel.style.display = 'inline-block';
			}
		}
	}

	static HideTextFieldErrorMsg(aTextElement: HTMLInputElement): void {
		const parentDiv: HTMLDivElement = TextField.GetTextFieldParent(aTextElement);
		if (parentDiv) {
			const imgElem: HTMLImageElement = parentDiv.querySelector('img') as HTMLImageElement;
			if (imgElem && imgElem.style) {
				imgElem.style.display = 'none';
			}

			const errorElem = parentDiv.querySelector('.' + TextField.CLS_ERROR_MSG) as HTMLSpanElement;
			if (errorElem && errorElem.style) {
				errorElem.style.display = 'none';
			}
		}
	}

	static ShowTextFieldErrorMsg(aTextElement: HTMLInputElement, aErrorMsg: string): void {
		const parentDiv: HTMLDivElement = TextField.GetTextFieldParent(aTextElement);
		if (parentDiv) {
			const imgElem: HTMLImageElement = parentDiv.querySelector('img') as HTMLImageElement;
			if (imgElem && imgElem.style) {
				imgElem.style.display = 'inline-block';
			}

			const errorElem = parentDiv.querySelector('.' + TextField.CLS_ERROR_MSG) as HTMLSpanElement;
			if (errorElem && errorElem.style) {
				errorElem.innerHTML = aErrorMsg;
				errorElem.style.display = 'inline-block';
			}
		}
	}
}

/*
 * Mask
 * 
 */
class Mask {
	static SetTextFieldMask(aTextElement: HTMLInputElement, aMaskStr: string, aMaxLen: number, aType: string): void {
		if (aMaskStr.length <= 0) {
			throw new Error('Call TextField.SetTextFieldMask with empty mask parameter!');
		}

		if (aType == 'number') aTextElement.style.textAlign = 'right';
		let maskPlaceholder: string = aMaskStr;
		aTextElement.setAttribute('placeholder', maskPlaceholder);
		aTextElement.addEventListener('keypress', (evt) => {
			if (evt.key) {
				let selectSize: number = 0;
				if (aTextElement.selectionEnd != null && aTextElement.selectionStart != null) {
					selectSize = aTextElement.selectionEnd - aTextElement.selectionStart;
				} 
				if (selectSize >= aTextElement.value.length) {
					aTextElement.value = '';
				}

				if (Generic.IsPrintable(evt.key)) {
					let oldStr = aTextElement.value;
					let newStr = Mask.ApplyMask2Data(aTextElement, oldStr, evt.key, aMaskStr, aMaxLen);
					if (newStr == oldStr) {
						evt.preventDefault();
					} else {
						setTimeout(() => {
							//aTextElement.value = newStr;
						}, 100);
					}
				}
			} 
		})
		aTextElement.addEventListener('blur', (evt) => {
			let oldStr = aTextElement.value;
			let newStr = Mask.ApplyMask2Data(aTextElement, oldStr, '', aMaskStr, aMaxLen);
			setTimeout(() => {aTextElement.value = newStr}, 100);
		})
	}

	static RemoveMask(aDataStr: string, aMaskStr: string) {
		if (aDataStr.length == 0) return '';
		let noMaskData: string = '';
		for(let cntr: number = 0; cntr < aDataStr.length; cntr++) {
			let dataChar = aDataStr.charAt(cntr);
			if (aMaskStr.indexOf(dataChar) < 0 || Generic.IsNumeric(dataChar) || dataChar == '.') { // if data char is not any of the mask char
				noMaskData += dataChar; 
			} 
		}
		return noMaskData;
	}

	private static NormaliseDotPosition(aDataStr: string, aMaskStr: string): string {
		let result: string = aDataStr;
		let maskDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
		if (maskDecimalPlace > 0) {
			let dataDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
			if (maskDecimalPlace != dataDecimalPlace) {
				if (Mask.GetDigitOnly(aDataStr).length < 17) {
					let numData: number = +aDataStr;
					result = (Math.round(numData * 100) / 100).toFixed(maskDecimalPlace);
				} else {
					let floatPart: number = +(aDataStr.substr(aDataStr.indexOf('.')) + '0');
					let roundedStr: string = (Math.round(floatPart * 100) / 100).toFixed(maskDecimalPlace);
					let roundedPart: string = roundedStr.substr(roundedStr.indexOf('.'));
					let integerPart: string = aDataStr.substr(0, aDataStr.indexOf('.'));
					result = integerPart + roundedPart;

					// handle rounding of 0.9 -> 1.0
					if ((floatPart + '').indexOf('0.9') >= 0 && roundedStr.indexOf('1.0') >= 0) {
						//let roundedIntegerPart = +integerPart + 1;
						//result = roundedIntegerPart + roundedPart;
						console.log('Warn, over 17 digit, losing precision');
					}
				}
			}
		}
		return result;
	}

	private static GetDigitOnly(aDataStr: string): string {
		let result: string = '';
		for(let cntr: number = 0; cntr < aDataStr.length; cntr++) {
			let theChar: string = aDataStr.charAt(cntr);
			if (Generic.IsNumeric(theChar)) {
				result += theChar;
			}
		}
		return result;
	}

	private static LongEnough(aDataStr: string, aMaskStr: string): boolean {
		let result = Mask.PadMaskAndCheckLength(aDataStr, aMaskStr);
		return result.longEnough;
	}

	private static PadDataWithMask(aDataStr: string, aMaskStr: string): string {
		let result = Mask.PadMaskAndCheckLength(aDataStr, aMaskStr);
		return result.paddedData;
	}

	private static PadMaskAndCheckLength(aDataStr: string, aMaskStr: string): { paddedData: string, longEnough: boolean } {
		let paddedAll: boolean = true;
		let reversePadded: string = '';
		let reverseMask: string = Generic.ReverseString(aMaskStr);
		let reverseData: string = Generic.ReverseString(aDataStr);
		let cntrMask: number = 0;
		let cntrData: number = 0;
		for(cntrMask = 0; cntrMask < reverseMask.length; cntrMask++) {
			let maskChar = reverseMask.charAt(cntrMask);
			let dataChar = reverseData.charAt(cntrData++);
			if (dataChar.length == 0) {
				reversePadded += maskChar;
			} else if (dataChar != maskChar) {
				if (Generic.IsNumeric(maskChar) || maskChar == '#') {
					reversePadded += dataChar;
				} else {
					reversePadded += maskChar;
					cntrData--;
				}
			} else {
				reversePadded += dataChar;
			}
		}
		let cntrContinuePad : number = cntrData;
		let cntrLongEnough : number = cntrData;

		// continue padding if data len is > mask len
		for(let cntr: number = cntrContinuePad ; cntr < reverseData.length; cntr++) {
			let dataChar = reverseData.charAt(cntrContinuePad++);
			reversePadded += dataChar;
		}

		// check if all data is padded, if not meaning mask is not long enough
		if (cntrLongEnough <= reverseData.length - 1) {
			let remainData: number =  (reverseData.length - 1) - cntrLongEnough;
			if (remainData >= 0) paddedAll = false;
		}
		let paddedResult: string = Generic.ReverseString(reversePadded);

		return { paddedData: paddedResult, longEnough: paddedAll };
	}

	private static Need2AppendBeforeNormalise(aDataStr: string, aMaskStr: string, aNewChar: string): boolean {
		let result: boolean = false;
		if (aDataStr.indexOf('.') >= 0) {
			let maskDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
			let dataDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
			if ((maskDecimalPlace == dataDecimalPlace + 1) && Generic.IsNumeric(aNewChar)) { // after append key char, precision matches so no need normalise
			} else if ((maskDecimalPlace > dataDecimalPlace) && Generic.IsNumeric(aNewChar)) {
				result = true;
			}
		}
		return result;
	}

	private static Need2Normalise(aDataStr: string, aMaskStr: string, aNewChar: string): boolean {
		let result: boolean = true;
		let maskDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
		let dataDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
		if ((maskDecimalPlace == dataDecimalPlace + 1) && Generic.IsNumeric(aNewChar)) { // after append key char, precision matches so no need normalise
			result = false;
		}
		return result;
	}

	private static isSeparatorChar(aMaskChar: string): boolean {
		if (
		aMaskChar == ','
		|| aMaskChar == '.'
		|| aMaskChar == ' '
		|| aMaskChar == '-'
		) {
			return true;
		} else {
			return false;
		}
	}

	static GotSeparatorChar(aMaskStr: string): boolean {
		for(let cntr: number = 0; cntr < aMaskStr.length; cntr++) {
			if (Mask.isSeparatorChar(aMaskStr.charAt(cntr)))
				return true;
		}
		return false;
	}


	static GetRepeatingMask(aMaskStr: string): string {
		let result: string = '';
		if (Mask.GotSeparatorChar(aMaskStr)) {
			let repeatingStr: string = '';
			for(let cntr: number = 0; cntr < aMaskStr.length; cntr++) {
				let maskChar = aMaskStr.charAt(cntr);
				repeatingStr += maskChar;
				if (Mask.isSeparatorChar(maskChar)) {
					let remainingPart: string = aMaskStr.substr(cntr + 1);
					if (remainingPart.indexOf(repeatingStr) < 0) {
						repeatingStr = ''; // reset if is separator char
					} else {
						result = repeatingStr;
						break;
					}
				}
			}
		} else {
			result = aMaskStr;
		}
		return result;
	}

	private static ExtendMaskLength(aMaskResult: string, aDataStr: string): string {
		let result: string = '';
		let repeatingPart = Mask.GetRepeatingMask(aMaskResult);
		if (repeatingPart) {
			let splitPosition: number = aMaskResult.indexOf(repeatingPart);
			let leftPart: string = aMaskResult.substr(0, splitPosition);
			let rightPart: string = aMaskResult.substr(splitPosition);
			result = leftPart + repeatingPart + rightPart;
			if (Mask.LongEnough(aDataStr, result) == false) { // if mask length still shorter then data length
				result = Mask.ExtendMaskLength(result, aDataStr); // recursive until we extend till it's longer then original data length
			} 
		}
		return result;
	}

	private static GetNormaliseDigitForPadding(aMaskStr: string, aOldStr: string, aNewChar: string, aKeyPosition: number): string {
		if (Generic.IsNumeric(aNewChar) || aMaskStr.indexOf(aNewChar) >= 0 || aNewChar.length == 0) {
			let newStrData: string = aOldStr;
			newStrData = Mask.RemoveMask(newStrData, aMaskStr); 
			if (Generic.IsNumeric(aNewChar) || aNewChar == '.') {
				//newStrData += aNewChar;
				newStrData = Generic.InsertString(newStrData, aNewChar, aKeyPosition);
			}
			if (newStrData.indexOf('.') < 0) newStrData += '.';
			newStrData = Mask.NormaliseDotPosition(newStrData, aMaskStr);
			newStrData = Mask.GetDigitOnly(newStrData);
			return newStrData;
		} else {
			return '';
		}
	}

	private static ApplyMask2Data(aInputElement: HTMLInputElement, aOldStr: string, aNewChar: string, aMaskStr: string, aMaxLen: number): string {
		if (! aMaskStr) return(aOldStr);
		if (! (aOldStr + aNewChar)) return(aOldStr);
		if (aOldStr.indexOf('.') >= 0 && aNewChar == '.') return(aOldStr);
		let keyPosition: number = aInputElement.selectionStart as number;
		if (aMaxLen) {
			if (aOldStr.length + aNewChar.length > aMaxLen) {
				TextField.ShowTextFieldErrorMsg(aInputElement, 'Length exceeded');
				return(aOldStr);
			}
		} else { // no length limit
			let normaliseDigit : string = Mask.GetNormaliseDigitForPadding(aMaskStr, aOldStr, aNewChar, keyPosition)
			if (normaliseDigit && Mask.LongEnough(normaliseDigit, aMaskStr) == false) { // if need to extend mask length 
				aMaskStr = Mask.ExtendMaskLength(aMaskStr, normaliseDigit);
				if (aMaskStr.length == 0) {
					console.log('Cannot find repeating pattern in mask: ' + aMaskStr);
					TextField.ShowTextFieldErrorMsg(aInputElement, 'Length exceeded');
					return(aOldStr);
				} else {
					// do nothing
				}
			}
		}

		let result: string = aOldStr;
		if (Generic.IsNumeric(aNewChar) || aMaskStr.indexOf(aNewChar) >= 0 || aNewChar.length == 0) {
			result = Mask.GetAfterMaskingData(aOldStr, aNewChar, aMaskStr, keyPosition);
			TextField.HideTextFieldErrorMsg(aInputElement);
		} else {
			TextField.ShowTextFieldErrorMsg(aInputElement, 'Must be number');
		}
		return result;
	}

	private static GetAfterMaskingData(aOldStr: string, aNewChar: string, aMaskStr: string, keyPosition: number = -1): string {
		let char2Remove: number[] = [];
		let newStrData: string = aOldStr;
		if (Generic.IsNumeric(aNewChar) || aMaskStr.indexOf(aNewChar) >= 0 || aNewChar.length == 0) {
			newStrData = Mask.GetNormaliseDigitForPadding(aMaskStr, aOldStr, aNewChar, keyPosition);
			newStrData = Mask.PadDataWithMask(newStrData, aMaskStr);
			for(let cntr = aMaskStr.length - 1; cntr >= 0; cntr--) {
				let maskChar = aMaskStr.charAt(cntr);
				let dataChar = newStrData.charAt(cntr);
				if (maskChar == '#') {
					if (dataChar == '#') {
						char2Remove.push(cntr);
						dataChar = ' ';
					}
					let replaced: string = Generic.ReplaceChar(newStrData, dataChar, cntr);
					replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
				} else if (dataChar.length == 0) {
					newStrData = maskChar + newStrData; 
				} else if (Generic.IsNumeric(maskChar) && Generic.IsNumeric(dataChar)) { 
					let replaced: string = Generic.ReplaceChar(newStrData, dataChar, cntr);
					replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
				} else if (Generic.IsNumeric(maskChar) && !Generic.IsNumeric(dataChar)) {
					newStrData = dataChar + newStrData; 
				} else if (maskChar == dataChar) {
					let nextChar: string = newStrData.charAt(cntr - 1);
					if (nextChar.length == 0 || nextChar == '#') {
						if (nextChar == '#') {
							char2Remove.push(cntr);
							let replaced: string = Generic.ReplaceChar(newStrData, ' ', cntr);
							replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
						} else {
							let replaced: string = Generic.ReplaceChar(newStrData, dataChar, cntr);
							replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
						}
					}
				} else {
					let inserted = Generic.InsertString(newStrData, maskChar, newStrData.length - cntr);
					if (inserted.length == 0) { 
						newStrData = maskChar + dataChar + newStrData; 
					} else { 
						newStrData = inserted;
					}
				}
			}
		}

		let result: string = '';
		for(let cntr: number = newStrData.length - 1; cntr >= 0; cntr--) {
			if (char2Remove.indexOf(cntr) < 0) {
				result = newStrData.charAt(cntr) + result;
			}
		}
		return result;
	}
}