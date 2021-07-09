'use strict';

interface WidgetIntf {
}

class Widget implements WidgetIntf {
}

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

	static InsertChar(aStr: string, aChar: string, aPosition: number): string {
		let result = '';
		if (aStr.length > aPosition) {
			for(let cntr: number = 0; cntr < aStr.length; cntr++) {
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

class TextField extends Widget {
	static CLS_INPUT: string = 'form-control';

	static CreateTextField(aDisplayLabel: string, aValue: string, aId : string, aType: string, aMask: string, aFqn: string, aMaxLen: number = -1): HTMLElement {
		let inputTxt = TextField.CreateTextFieldNoLabel(aId, aValue);
		return(inputTxt);
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

	static SetTextFieldMask(aTextElement: HTMLInputElement, aMaskStr: string, aMaxLen: number = -1): void {
		if (aMaskStr.length <= 0) {
			throw new Error('Call TextField.SetTextFieldMask with empty mask parameter!');
		}

		aTextElement.setAttribute('placeholder', aMaskStr);
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
					let newStr = TextField.MaskStr(oldStr, evt.key, aMaskStr, aMaxLen);
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
			let newStr = TextField.MaskStr(oldStr, '', aMaskStr);
			setTimeout(() => {aTextElement.value = newStr}, 100);
		})
	}

	private static MaskNormaliseDotPosition(aDataStr: string, aMaskStr: string): string {
		let result: string = aDataStr;
		let maskDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
		if (maskDecimalPlace > 0) {
			let dataDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
			if (maskDecimalPlace != dataDecimalPlace) {
				let numData: number = +aDataStr;
				result = (Math.round(numData * 100) / 100).toFixed(maskDecimalPlace);
			}
		}
		return result;
	}

	private static MaskRemove(aDataStr: string, aMaskStr: string) {
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

	private static MaskDigitOnly(aDataStr: string): string {
		let result: string = '';
		for(let cntr: number = 0; cntr < aDataStr.length; cntr++) {
			let theChar: string = aDataStr.charAt(cntr);
			if (Generic.IsNumeric(theChar)) {
				result += theChar;
			}
		}
		return result;
	}

	private static MaskPadData(aDataStr: string, aMaskStr: string): string {
		let result: string = '';
		let reverseMask: string = Generic.ReverseString(aMaskStr);
		let reverseData: string = Generic.ReverseString(aDataStr);
		let cntrData: number = 0;
		for(let cntrMask: number = 0; cntrMask < reverseMask.length; cntrMask++) {
			let maskChar = reverseMask.charAt(cntrMask);
			let dataChar = reverseData.charAt(cntrData++);
			if (dataChar.length == 0) {
				result += maskChar;
			} else if (dataChar != maskChar) {
				if (Generic.IsNumeric(maskChar) || maskChar == '#') {
					result += dataChar;
				} else {
					result += maskChar;
					cntrData--;
				}
			} else {
				result += dataChar;
			}
		}
		return Generic.ReverseString(result);
	}

	private static MaskNeed2AppendBeforeNormalise(aDataStr: string, aMaskStr: string, aNewChar: string): boolean {
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

	private static MaskNeed2Normalise(aDataStr: string, aMaskStr: string, aNewChar: string): boolean {
		let result: boolean = true;
		let maskDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
		let dataDecimalPlace: number = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
		if ((maskDecimalPlace == dataDecimalPlace + 1) && Generic.IsNumeric(aNewChar)) { // after append key char, precision matches so no need normalise
			result = false;
		}
		return result;
	}

	private static MaskStr(aOldStr: string, aNewChar: string, aMaskStr: string, aMaxLen: number = -1): string {
		if (! aMaskStr) return(aOldStr);
		if (! (aOldStr + aNewChar)) return(aOldStr);
		if (aOldStr.indexOf('.') >= 0 && aNewChar == '.') return(aOldStr);
		if (aMaxLen > -1) {
			if (aOldStr.length + aNewChar.length > aMaxLen) {
				return(aOldStr);
			}
		}

		let char2Remove: number[] = [];
		let newStrData: string = aOldStr;
		let alreadyAppend: boolean = false;
		if (Generic.IsNumeric(aNewChar) || aMaskStr.indexOf(aNewChar) >= 0 || aNewChar.length == 0) {
			newStrData = TextField.MaskRemove(newStrData, aMaskStr); 
			if (TextField.MaskNeed2Normalise(newStrData, aMaskStr, aNewChar)) {
				if (TextField.MaskNeed2AppendBeforeNormalise(newStrData, aMaskStr, aNewChar)) {
					newStrData += aNewChar;
					alreadyAppend = true;
				}
				newStrData = TextField.MaskNormaliseDotPosition(newStrData, aMaskStr);
			}
			newStrData = TextField.MaskDigitOnly(newStrData);
			if (Generic.IsNumeric(aNewChar) && !alreadyAppend) newStrData += aNewChar;
			let newNumData: number = +newStrData;  // remove any preceding zero
			newStrData = newNumData + '';
			newStrData = TextField.MaskPadData(newStrData, aMaskStr);
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
					let inserted = Generic.InsertChar(newStrData, maskChar, newStrData.length - cntr);
					if (inserted.length == 0) { 
						newStrData = maskChar + dataChar + newStrData; 
					} else { 
						newStrData = inserted;
						newStrData = inserted
					}
				}
			}
		}

		let result: string = '';
		for(let cntr: number = newStrData.length; cntr >= 0; cntr--) {
			if (char2Remove.indexOf(cntr) < 0) {
				result = newStrData.charAt(cntr) + result;
			}
		}
		return result;
	}
}
