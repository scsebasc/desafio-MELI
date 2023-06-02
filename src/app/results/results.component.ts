import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from 'src/utils/interfaces/user';
import { SignInService } from 'src/utils/services/sign-in.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  formLogin: any;
  hide;

  constructor(private formBuilder: FormBuilder, private signInService: SignInService) {
    this.hide = true;
    this.formLogin = this.formBuilder.group({
      dni: ['', [Validators.required]],
      password: [null, Validators.compose([Validators.required])]
    });
   }

  ngOnInit(): void {
    this.signInService.getAccess().subscribe((res) => {
      console.log('Access success');
    });
  }

  signInUser() {
    if (this.formLogin.valid) {
      const userData: UserLogin = {
        dni: this.formLogin.value.dni,
        password: sha256(this.formLogin.value.password)
      }

      this.signInService.signInUser(userData).subscribe((res) => {
        console.log(res);
      })
    }
  }

}
