import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserSignUp } from 'src/utils/interfaces/user';
import { SignUpService } from '../../utils/services/sign-up.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  formSignUp: any;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) {
    this.formSignUp = this.formBuilder.group({
      dni: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {

  }

  sendUser() {
    console.log(this.formSignUp.value);

    if (this.formSignUp.valid) {
      const userData: UserSignUp = {
        dni: this.formSignUp.value.dni,
        firstName: this.formSignUp.value.firstName,
        lastName: this.formSignUp.value.lastName,
        email: this.formSignUp.value.email,
        password: sha256(this.formSignUp.value.password)
      }

      this.signUpService.suscription(userData).subscribe((res) => {
        console.log(res);
      })
    }
  }

}
