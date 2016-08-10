import {Directive, HostListener, ElementRef, Attribute, OnInit, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

// todo: Implement another masks

/**

 Utilizado com Patterns
 <input rcMask="(**) **** ****" ...

 Utilizado com Templates
 <input rcMask="money" ...

 */
@Directive({
    selector: '[rcMask]',
})
export class MaskDirective implements OnInit {

    private lastKnowLength: any = 0;
    private placeHolderCounts: number;
    private maskPattern: string;
    private templates: string[] = ['money', 'phone', 'date', 'date-hour'];
    private template: string;

    constructor(private _elRef: ElementRef, private model: NgControl, @Attribute("rcMask") param: string) {

        if (this.templates.indexOf(param) >= 0) {
            this.template = param;
        } else {
            this.generatePattern(param);
        }

    }

    ngOnInit() {
        // to be sure that initial value will be treated
        setTimeout(() => this.aplicarFormatacao())
    }

    @HostListener('keyup') onInputChange() {
        // apply format
        this.aplicarFormatacao();
    }

    private aplicarFormatacao() {

        // receive the input value (Digits only)
        let modelValue = this.getModelValue();

        let viewValue = "";

        // store the length to compare and allow the user to backspace
        let inputLength: any = modelValue.length;

        // choose between template or pattern mask
        if (this.template != null) {
            viewValue = this.formatTemplate(modelValue);
        } else {
            viewValue = this.format(modelValue);
        }

        // if the user want to backspace, it'll compare if the lastKnowLength is bigger then the inputLength
        if (this.lastKnowLength < inputLength) {
            this.formatPush(viewValue);
        }
        // set the lastKnowLength
        this.lastKnowLength = inputLength;

        // change de model value to without mask value
        this.model.viewToModelUpdate(modelValue);
    }

    private formatPush(formattedValue) {
        this._elRef.nativeElement.value = formattedValue;
    }

    private getModelValue() {

        // remove the mask from input value
        let elementValue = this._elRef.nativeElement.value;

        return elementValue.replace(/\D/g, '');

    }

    private generatePattern(patternString) {
        this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
        for (var i = 0; i < this.placeHolderCounts; i++) {
            patternString = patternString.replace('*', "{" + i + "}");
        }
        this.maskPattern = patternString;
    }

    private format(s) {
        var formattedString = this.maskPattern;
        for (var i = 0; i < this.placeHolderCounts; i++) {
            let charAtual = s.charAt(i);
            formattedString = formattedString.replace("{" + i + "}", charAtual);
        }
        return formattedString;
    }

    private formatTemplate(v: string): string {

        let retorno: string = "";
        if (this.template == "money") {

            v = v.replace(/\D/g, '');
            v = v.replace(/(\d{1,2})$/, ',$1');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            v = v != '' ? 'R$ ' + v : '';
            retorno = v;

        }

        return retorno;
    }

}
