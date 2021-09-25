/*
 * Generic
 * 
 */
export class Generic {
	static IsAlpha(aValue: string): boolean {
		let result: boolean = false;
		if ((aValue >= 'a' && aValue <= 'z')
		|| (aValue >= 'A' && aValue <= 'Z')
		) {
			result = true;
		}
		return result;
	}

	static CharOccurence(aData: string, aChar: string): number {
		let result: number = 0;
		for(let cntr: number = 0; cntr < aData.length; cntr++) {
			if (aData.charAt(cntr) == aChar) result++;
		}
		return result;
	}

	static IsNumeric(aValue: string): boolean {
		let result: boolean = false;
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
