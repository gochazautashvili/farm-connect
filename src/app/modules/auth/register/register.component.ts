import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { RegisterFormData, UserType, FarmSize, GeorgianRegion, ProductCategory } from './models';
import { passwordMatchValidator, phoneValidator, emailValidator, requiredIfValidator } from './validators';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    CheckboxModule,
    TextareaModule,
    FileUploadModule,
    ProgressBarModule,
    CardModule,
    MessageModule
  ],
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  userType = signal<UserType>('consumer');
  currentStep = signal(1);
  isLoading = signal(false);
  
  registerForm: FormGroup;
  
  productCategories: ProductCategory[] = [
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'meat', label: 'Meat & Poultry' },
    { value: 'herbs', label: 'Herbs & Spices' },
    { value: 'honey', label: 'Honey & Preserves' },
    { value: 'grains', label: 'Grains & Cereals' },
    { value: 'nuts', label: 'Nuts & Seeds' }
  ];
  
  georgianRegions: GeorgianRegion[] = [
    { value: 'tbilisi', label: 'Tbilisi' },
    { value: 'kakheti', label: 'Kakheti' },
    { value: 'samtskhe-javakheti', label: 'Samtskhe-Javakheti' },
    { value: 'imereti', label: 'Imereti' },
    { value: 'adjara', label: 'Adjara' },
    { value: 'guria', label: 'Guria' },
    { value: 'samegrelo-zemo-svaneti', label: 'Samegrelo-Zemo Svaneti' },
    { value: 'mtskheta-mtianeti', label: 'Mtskheta-Mtianeti' },
    { value: 'kvemo-kartli', label: 'Kvemo Kartli' },
    { value: 'shida-kartli', label: 'Shida Kartli' },
    { value: 'racha-lechkhumi', label: 'Racha-Lechkhumi' }
  ];
  
  farmSizes: FarmSize[] = [
    { value: 'small', label: 'Small (< 1 hectare)' },
    { value: 'medium', label: 'Medium (1-5 hectares)' },
    { value: 'large', label: 'Large (5-20 hectares)' },
    { value: 'xlarge', label: 'Very Large (> 20 hectares)' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.registerForm = this.createForm();
  }
  
  get totalSteps(): number {
    return this.userType() === 'farmer' ? 4 : 3;
  }
  
  get progress(): number {
    return (this.currentStep() / this.totalSteps) * 100;
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, emailValidator()]],
      phone: ['', [Validators.required, phoneValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      farmName: [''],
      farmLocation: [''],
      farmSize: [''],
      farmDescription: [''],
      productTypes: [[]],
      farmPhotos: [[]],
      deliveryAddress: [''],
      city: [''],
      region: [''],
      organicOnly: [false],
      localOnly: [false],
      notifications: [true]
    }, { validators: passwordMatchValidator() });
  }
  
  setUserType(type: UserType): void {
    this.userType.set(type);
    this.currentStep.set(1);
    this.updateFormValidators();
  }
  
  private updateFormValidators(): void {
    const isFarmer = this.userType() === 'farmer';
    
    const farmNameControl = this.registerForm.get('farmName');
    const farmLocationControl = this.registerForm.get('farmLocation');
    const farmSizeControl = this.registerForm.get('farmSize');
    const farmDescriptionControl = this.registerForm.get('farmDescription');
    const productTypesControl = this.registerForm.get('productTypes');
    
    const deliveryAddressControl = this.registerForm.get('deliveryAddress');
    const cityControl = this.registerForm.get('city');
    const regionControl = this.registerForm.get('region');
    
    if (isFarmer) {
      farmNameControl?.setValidators([Validators.required]);
      farmLocationControl?.setValidators([Validators.required]);
      farmSizeControl?.setValidators([Validators.required]);
      farmDescriptionControl?.setValidators([Validators.required]);
      productTypesControl?.setValidators([Validators.required]);
      
      deliveryAddressControl?.clearValidators();
      cityControl?.clearValidators();
      regionControl?.clearValidators();
    } else {
      deliveryAddressControl?.setValidators([Validators.required]);
      cityControl?.setValidators([Validators.required]);
      regionControl?.setValidators([Validators.required]);
      
      farmNameControl?.clearValidators();
      farmLocationControl?.clearValidators();
      farmSizeControl?.clearValidators();
      farmDescriptionControl?.clearValidators();
      productTypesControl?.clearValidators();
    }
    
    farmNameControl?.updateValueAndValidity();
    farmLocationControl?.updateValueAndValidity();
    farmSizeControl?.updateValueAndValidity();
    farmDescriptionControl?.updateValueAndValidity();
    productTypesControl?.updateValueAndValidity();
    deliveryAddressControl?.updateValueAndValidity();
    cityControl?.updateValueAndValidity();
    regionControl?.updateValueAndValidity();
  }
  
  nextStep(): void {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }
  
  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }
  
  toggleProductType(category: string): void {
    const productTypes = this.registerForm.get('productTypes')?.value || [];
    const index = productTypes.indexOf(category);
    
    if (index > -1) {
      productTypes.splice(index, 1);
    } else {
      productTypes.push(category);
    }
    
    this.registerForm.get('productTypes')?.setValue([...productTypes]);
  }
  
  onFileSelect(event: any): void {
    const files = event.files;
    this.registerForm.get('farmPhotos')?.setValue(files);
  }
  
  async handleSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Registration completed:', this.registerForm.value);
      } finally {
        this.isLoading.set(false);
      }
    }
  }
  
  isStepValid(): boolean {
    const form = this.registerForm;
    const step = this.currentStep();
    
    if (step === 1) {
      return !!(form.get('firstName')?.valid && 
             form.get('lastName')?.valid && 
             form.get('email')?.valid && 
             form.get('phone')?.valid && 
             form.get('password')?.valid && 
             form.get('confirmPassword')?.valid);
    }
    
    if (this.userType() === 'farmer') {
      if (step === 2) {
        return !!(form.get('farmName')?.valid && 
               form.get('farmLocation')?.valid && 
               form.get('farmSize')?.valid && 
               form.get('farmDescription')?.valid);
      }
      if (step === 3) {
        return !!form.get('productTypes')?.valid;
      }
    } else {
      if (step === 2) {
        return !!(form.get('deliveryAddress')?.valid && 
               form.get('city')?.valid && 
               form.get('region')?.valid);
      }
    }
    
    return true;
  }
}