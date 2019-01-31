import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators
} from '@angular/forms';
import { Http } from '@angular/http';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { FormValidations } from '../shared/form-validations';

@Component({
    selector: 'app-data-form',
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private http: Http,
        private cepService: ConsultaCepService,
        private dropdownService: DropdownService
    ) { }

    form: FormGroup;
    estados: EstadoBr[];
    cargos: any[];
    tecnologias: any[];
    newsletter: any;

    frameworks = ['Angular', 'React', 'Sencha'];

    ngOnInit() {

        this.dropdownService.getEstadosBr()
            .subscribe(dados => { this.estados = dados; });

        this.cargos = this.dropdownService.getCargos();
        this.tecnologias = this.dropdownService.getTecnologias();
        this.newsletter = this.dropdownService.getNewsletter();

        //FormGroup
        this.form = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
            email: [null, [Validators.required, Validators.email]],
            confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      
            endereco: this.formBuilder.group({
              cep: [null, [Validators.required, FormValidations.cepValidator]],
              numero: [null, Validators.required],
              complemento: [null],
              rua: [null, Validators.required],
              bairro: [null, Validators.required],
              cidade: [null, Validators.required],
              estado: [null, Validators.required]
            }),
      
            cargo: [null],
            tecnologias: [null],
            newsletter: ['s'],
            termos: [null, Validators.pattern('true')],
            frameworks: this.buildFrameworks()
          });
      

    }

    buildFrameworks() {
        const values = this.frameworks.map(v => new FormControl(false));
        return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
        /* this.formBuilder.array( [
          new FormControl(false), // angular
          new FormControl(false), // react
          new FormControl(false), // vue
          new FormControl(false) // sencha
        ]); */
    }
    setarCargo() {
        const cargos = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
        this.form.get('cargo').setValue(cargos);
    }

    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.http.post('http://localhost:4200', JSON.stringify(this.form.value))
                .subscribe(dados => {
                    console.log(dados);
                });
        } else {
            console.log('Formulario invalido!');
            this.verificarValidacoesForm(this.form);
        }
    }
    verificarValidacoesForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(campo => {
            console.log(campo);
            const controle = formGroup.get(campo);
            controle.markAsDirty();
            if (controle instanceof FormGroup) {
                this.verificarValidacoesForm(controle);
            }
        });
    }

    verificaValidTouched(campo) {
        return !this.form.get(campo).valid && (this.form.get(campo).touched || this.form.get(campo).dirty);
    }

    resetar() {
        this.form.reset();
    }

    aplicaCssErro(campo) {
        return {
            'has-error': this.verificaValidTouched(campo),
            'has-feedback': this.verificaValidTouched(campo)
        };
    }

    populaDadosForm(dados) {
        this.form.patchValue({
            endereco: {
                rua: dados.logradouro,
                complemento: dados.complemento,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            }
        });
        this.form.get('nome').setValue('Iane Soares Saraiva');
        this.form.get('email').setValue('ianesosaraiva@gmail.com');
        this.form.get('numero').setValue('123');
    }
    consultaCEP() {
        const cep = this.form.get('endereco.cep').value;

        if (cep != null && cep !== '') {
            this.cepService.consultaCEP(cep)
                .subscribe(dados => this.populaDadosForm(dados));
        }
    }

    resetaDadosForm() {
        this.form.patchValue({
            endereco: {
                rua: null,
                complemento: null,
                bairro: null,
                cidade: null,
                estado: null
            }
        });
    }
}

    /*FormBuilder
    this.form = this.fromBuild.group({
      nome: [null],
      email: [null]
    });*/