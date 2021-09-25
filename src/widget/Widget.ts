
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
export class Widget implements WidgetInterface {
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