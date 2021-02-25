import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {equalValueValidator} from '../../../forms/validators/equal-value.validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  aSub: Subscription;
  errorRes: object | null = null;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
      },
      equalValueValidator('password', 'passwordSubmit')
    );
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.aSub = this.authService.signIn(this.form.value).subscribe(
      res => {},
      error => alert(error.error)
    );
  }
}
