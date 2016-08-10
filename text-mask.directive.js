System.register(['@angular/core', '@angular/forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, forms_1;
    var MaskDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            // todo: Implement another masks
            /**
            
             Utilizado com Patterns
             <input rcMask="(**) **** ****" ...
            
             Utilizado com Templates
             <input rcMask="money" ...
            
             */
            MaskDirective = (function () {
                function MaskDirective(_elRef, model, param) {
                    this._elRef = _elRef;
                    this.model = model;
                    this.lastKnowLength = 0;
                    this.templates = ['money', 'phone', 'date', 'date-hour'];
                    if (this.templates.indexOf(param) >= 0) {
                        this.template = param;
                    }
                    else {
                        this.generatePattern(param);
                    }
                }
                MaskDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    // to be sure that initial value will be treated
                    setTimeout(function () { return _this.aplicarFormatacao(); });
                };
                MaskDirective.prototype.onInputChange = function () {
                    // apply format
                    this.aplicarFormatacao();
                };
                MaskDirective.prototype.aplicarFormatacao = function () {
                    // receive the input value (Digits only)
                    var modelValue = this.getModelValue();
                    var viewValue = "";
                    // store the length to compare and allow the user to backspace
                    var inputLength = modelValue.length;
                    // choose between template or pattern mask
                    if (this.template != null) {
                        viewValue = this.formatTemplate(modelValue);
                    }
                    else {
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
                };
                MaskDirective.prototype.formatPush = function (formattedValue) {
                    this._elRef.nativeElement.value = formattedValue;
                };
                MaskDirective.prototype.getModelValue = function () {
                    // remove the mask from input value
                    var elementValue = this._elRef.nativeElement.value;
                    return elementValue.replace(/\D/g, '');
                };
                MaskDirective.prototype.generatePattern = function (patternString) {
                    this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
                    for (var i = 0; i < this.placeHolderCounts; i++) {
                        patternString = patternString.replace('*', "{" + i + "}");
                    }
                    this.maskPattern = patternString;
                };
                MaskDirective.prototype.format = function (s) {
                    var formattedString = this.maskPattern;
                    for (var i = 0; i < this.placeHolderCounts; i++) {
                        var charAtual = s.charAt(i);
                        formattedString = formattedString.replace("{" + i + "}", charAtual);
                    }
                    return formattedString;
                };
                MaskDirective.prototype.formatTemplate = function (v) {
                    var retorno = "";
                    if (this.template == "money") {
                        v = v.replace(/\D/g, '');
                        v = v.replace(/(\d{1,2})$/, ',$1');
                        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                        v = v != '' ? 'R$ ' + v : '';
                        retorno = v;
                    }
                    return retorno;
                };
                __decorate([
                    core_1.HostListener('keyup'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], MaskDirective.prototype, "onInputChange", null);
                MaskDirective = __decorate([
                    core_1.Directive({
                        selector: '[rcMask]',
                    }),
                    __param(2, core_1.Attribute("rcMask")), 
                    __metadata('design:paramtypes', [core_1.ElementRef, forms_1.NgControl, String])
                ], MaskDirective);
                return MaskDirective;
            }());
            exports_1("MaskDirective", MaskDirective);
        }
    }
});

//# sourceMappingURL=text-mask.directive.js.map
