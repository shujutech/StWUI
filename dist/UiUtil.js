'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Widget = /** @class */ (function () {
    function Widget() {
    }
    return Widget;
}());
var Generic = /** @class */ (function () {
    function Generic() {
    }
    Generic.IsNumeric = function (aValue) {
        var result = false;
        aValue = aValue.trim();
        if (!aValue)
            return result;
        var num = +aValue;
        if (!isNaN(num)) {
            result = true;
        }
        return result;
    };
    Generic.IsPrintable = function (aChar) {
        var result = false;
        if (aChar.length == 1)
            result = true;
        return (result);
    };
    Generic.ReverseString = function (aStr) {
        return aStr.split("").reverse().join("");
    };
    Generic.ReplaceChar = function (aStr, aChar, aPosition) {
        var result = '';
        if (aStr.length > aPosition) {
            for (var cntr = 0; cntr < aStr.length; cntr++) {
                if (cntr == aPosition) {
                    result += aChar;
                }
                else {
                    result += aStr.charAt(cntr);
                }
            }
        }
        return (result);
    };
    Generic.InsertChar = function (aStr, aChar, aPosition) {
        var result = '';
        if (aStr.length > aPosition) {
            for (var cntr = 0; cntr < aStr.length; cntr++) {
                if (cntr == aPosition) {
                    result += aChar;
                    result += aStr.charAt(cntr);
                }
                else {
                    result += aStr.charAt(cntr);
                }
            }
        }
        return (result);
    };
    Generic.GetDotPosition = function (aDataStr) {
        var dotPosition = -1;
        for (var cntr = 0; cntr < aDataStr.length; cntr++) {
            if (aDataStr.charAt(cntr) == '.') {
                dotPosition = cntr;
                break;
            }
        }
        return (dotPosition);
    };
    Generic.OnlyDigitAndDot = function (aDataStr) {
        var result = '';
        for (var cntr = 0; cntr < aDataStr.length; cntr++) {
            var theChar = aDataStr.charAt(cntr);
            if (Generic.IsNumeric(theChar) || theChar == '.') {
                result += theChar;
            }
        }
        return result;
    };
    return Generic;
}());
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextField.CreateTextField = function (aDisplayLabel, aValue, aId, aType, aMask, aFqn, aMaxLen) {
        if (aMaxLen === void 0) { aMaxLen = -1; }
        var inputTxt = TextField.CreateTextFieldNoLabel(aId, aValue);
        return (inputTxt);
    };
    TextField.CreateTextFieldNoLabel = function (aId, aValue) {
        var inputTxt = document.createElement('input');
        inputTxt.setAttribute('class', TextField.CLS_INPUT);
        inputTxt.setAttribute('type', 'text');
        if (aValue) {
            inputTxt.setAttribute('value', aValue);
            inputTxt.value = aValue;
        }
        if (aId) {
            inputTxt.setAttribute('id', aId);
        }
        return (inputTxt);
    };
    TextField.SetTextFieldMask = function (aTextElement, aMaskStr, aMaxLen) {
        if (aMaxLen === void 0) { aMaxLen = -1; }
        if (aMaskStr.length <= 0) {
            throw new Error('Call TextField.SetTextFieldMask with empty mask parameter!');
        }
        aTextElement.setAttribute('placeholder', aMaskStr);
        aTextElement.addEventListener('keypress', function (evt) {
            if (evt.key) {
                var selectSize = 0;
                if (aTextElement.selectionEnd != null && aTextElement.selectionStart != null) {
                    selectSize = aTextElement.selectionEnd - aTextElement.selectionStart;
                }
                if (selectSize >= aTextElement.value.length) {
                    aTextElement.value = '';
                }
                if (Generic.IsPrintable(evt.key)) {
                    var oldStr = aTextElement.value;
                    var newStr = TextField.MaskStr(oldStr, evt.key, aMaskStr, aMaxLen);
                    if (newStr == oldStr) {
                        evt.preventDefault();
                    }
                    else {
                        setTimeout(function () {
                            //aTextElement.value = newStr;
                        }, 100);
                    }
                }
            }
            /*
            let selectSize: number = 0;
            if (aTextElement.selectionEnd != null && aTextElement.selectionStart != null) {
                selectSize = aTextElement.selectionEnd - aTextElement.selectionStart;
            }
            let processKey: boolean = false;
            if (selectSize <= 0 && aTextElement.selectionEnd == aTextElement.value.length) {
                processKey = true;
            } else {
                if (selectSize >= aTextElement.value.length) {
                    aTextElement.value = '';
                    processKey = true;
                }
            }
            if (processKey) {
                if (evt.key) {
                    if (Generic.IsPrintable(evt.key)) {
                        let oldStr = aTextElement.value;
                        let newStr = TextField.MaskStr(oldStr, evt.key, aMaskStr, aMaxLen);
                        if (newStr == oldStr) {
                            evt.preventDefault();
                        } else {
                            setTimeout(() => {
                                aTextElement.value = newStr;
                            }, 100);
                        }
                    }
                }
            } else {
                if (evt.key) {
                    if (Generic.IsPrintable(evt.key)) {
                        let oldStr = aTextElement.value;
                        let newStr = TextField.MaskStr(oldStr, evt.key, aMaskStr, aMaxLen);
                        if (newStr == oldStr) {
                            evt.preventDefault();
                        }
                    }
                }
            }
            */
        });
        aTextElement.addEventListener('blur', function (evt) {
            var oldStr = aTextElement.value;
            var newStr = TextField.MaskStr(oldStr, '', aMaskStr);
            setTimeout(function () { aTextElement.value = newStr; }, 100);
        });
    };
    TextField.MaskNormaliseDotPosition = function (aDataStr, aMaskStr) {
        var result = aDataStr;
        var maskDecimalPlace = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
        if (maskDecimalPlace > 0) {
            var dataDecimalPlace = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
            if (maskDecimalPlace != dataDecimalPlace) {
                var numData = +aDataStr;
                result = (Math.round(numData * 100) / 100).toFixed(maskDecimalPlace);
            }
        }
        return result;
    };
    TextField.MaskRemove = function (aDataStr, aMaskStr) {
        if (aDataStr.length == 0)
            return '';
        var noMaskData = '';
        for (var cntr = 0; cntr < aDataStr.length; cntr++) {
            var dataChar = aDataStr.charAt(cntr);
            if (aMaskStr.indexOf(dataChar) < 0 || Generic.IsNumeric(dataChar) || dataChar == '.') { // if data char is not any of the mask char
                noMaskData += dataChar;
            }
        }
        return noMaskData;
    };
    TextField.MaskDigitOnly = function (aDataStr) {
        var result = '';
        for (var cntr = 0; cntr < aDataStr.length; cntr++) {
            var theChar = aDataStr.charAt(cntr);
            if (Generic.IsNumeric(theChar)) {
                result += theChar;
            }
        }
        return result;
    };
    TextField.MaskPadData = function (aDataStr, aMaskStr) {
        var result = '';
        var reverseMask = Generic.ReverseString(aMaskStr);
        var reverseData = Generic.ReverseString(aDataStr);
        var cntrData = 0;
        for (var cntrMask = 0; cntrMask < reverseMask.length; cntrMask++) {
            var maskChar = reverseMask.charAt(cntrMask);
            var dataChar = reverseData.charAt(cntrData++);
            if (dataChar.length == 0) {
                result += maskChar;
            }
            else if (dataChar != maskChar) {
                if (Generic.IsNumeric(maskChar) || maskChar == '#') {
                    result += dataChar;
                }
                else {
                    result += maskChar;
                    cntrData--;
                }
            }
            else {
                result += dataChar;
            }
        }
        return Generic.ReverseString(result);
    };
    TextField.MaskNeed2AppendBeforeNormalise = function (aDataStr, aMaskStr, aNewChar) {
        var result = false;
        if (aDataStr.indexOf('.') >= 0) {
            var maskDecimalPlace = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
            var dataDecimalPlace = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
            if ((maskDecimalPlace == dataDecimalPlace + 1) && Generic.IsNumeric(aNewChar)) { // after append key char, precision matches so no need normalise
            }
            else if ((maskDecimalPlace > dataDecimalPlace) && Generic.IsNumeric(aNewChar)) {
                result = true;
            }
        }
        return result;
    };
    TextField.MaskNeed2Normalise = function (aDataStr, aMaskStr, aNewChar) {
        var result = true;
        var maskDecimalPlace = Generic.GetDotPosition(Generic.ReverseString(aMaskStr));
        var dataDecimalPlace = Generic.GetDotPosition(Generic.ReverseString(aDataStr));
        if ((maskDecimalPlace == dataDecimalPlace + 1) && Generic.IsNumeric(aNewChar)) { // after append key char, precision matches so no need normalise
            result = false;
        }
        return result;
    };
    TextField.MaskStr = function (aOldStr, aNewChar, aMaskStr, aMaxLen) {
        if (aMaxLen === void 0) { aMaxLen = -1; }
        if (!aMaskStr)
            return (aOldStr);
        if (!(aOldStr + aNewChar))
            return (aOldStr);
        if (aOldStr.indexOf('.') >= 0 && aNewChar == '.')
            return (aOldStr);
        if (aMaxLen > -1) {
            if (aOldStr.length + aNewChar.length > aMaxLen) {
                return (aOldStr);
            }
        }
        var char2Remove = [];
        var newStrData = aOldStr;
        var alreadyAppend = false;
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
            if (Generic.IsNumeric(aNewChar) && !alreadyAppend)
                newStrData += aNewChar;
            var newNumData = +newStrData; // remove any preceding zero
            newStrData = newNumData + '';
            newStrData = TextField.MaskPadData(newStrData, aMaskStr);
            for (var cntr = aMaskStr.length - 1; cntr >= 0; cntr--) {
                var maskChar = aMaskStr.charAt(cntr);
                var dataChar = newStrData.charAt(cntr);
                if (maskChar == '#') {
                    if (dataChar == '#') {
                        char2Remove.push(cntr);
                        dataChar = ' ';
                    }
                    var replaced = Generic.ReplaceChar(newStrData, dataChar, cntr);
                    replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
                }
                else if (dataChar.length == 0) {
                    newStrData = maskChar + newStrData;
                }
                else if (Generic.IsNumeric(maskChar) && Generic.IsNumeric(dataChar)) {
                    var replaced = Generic.ReplaceChar(newStrData, dataChar, cntr);
                    replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
                }
                else if (Generic.IsNumeric(maskChar) && !Generic.IsNumeric(dataChar)) {
                    newStrData = dataChar + newStrData;
                }
                else if (maskChar == dataChar) {
                    var nextChar = newStrData.charAt(cntr - 1);
                    if (nextChar.length == 0 || nextChar == '#') {
                        if (nextChar == '#') {
                            char2Remove.push(cntr);
                            var replaced = Generic.ReplaceChar(newStrData, ' ', cntr);
                            replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
                        }
                        else {
                            var replaced = Generic.ReplaceChar(newStrData, dataChar, cntr);
                            replaced.length == 0 ? newStrData = dataChar + newStrData : newStrData = replaced;
                        }
                    }
                }
                else {
                    var inserted = Generic.InsertChar(newStrData, maskChar, newStrData.length - cntr);
                    if (inserted.length == 0) {
                        newStrData = maskChar + dataChar + newStrData;
                    }
                    else {
                        newStrData = inserted;
                        newStrData = inserted;
                    }
                }
            }
        }
        var result = '';
        for (var cntr = newStrData.length; cntr >= 0; cntr--) {
            if (char2Remove.indexOf(cntr) < 0) {
                result = newStrData.charAt(cntr) + result;
            }
        }
        return result;
    };
    TextField.CLS_INPUT = 'form-control';
    return TextField;
}(Widget));
//# sourceMappingURL=UiUtil.js.map