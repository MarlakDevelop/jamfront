import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  aSub: Subscription;
  errorRes: object | null = null;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
      }
    );
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.aSub = this.authService.signUp(this.form.value).subscribe(
      res => {},
      error => alert(error.error)
    );
  }
}
