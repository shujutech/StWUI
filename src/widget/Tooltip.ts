import { Widget } from "./Widget";

export class Tooltip extends Widget {

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

		tipParent.appendChild(tipIcon);
		tipAngle.appendChild(tipInnerAngle);
		tipMsg.appendChild(tipAngle);
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
		tipInnerElement.innerHTML = aMsg + tipInnerElement.innerHTML;;
	}
}