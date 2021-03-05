import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TextDialogComponent } from '../../../shared/components/text-dialog/text-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  aSub: Subscription;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.form = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
      }
    );
  }

  ngOnInit(): void {
  }

  openDialog(text: string): void {
    this.dialog.open(TextDialogComponent, {
      data: {
        text
      }
    });
  }

  submit(): void {
    this.aSub = this.authService.signUp(this.form.value).subscribe(
      res => this.openDialog('Регистрация прошла успешно'),
      error => this.openDialog('Пользователь с данным именем уже зарегистрирован')
    );
  }
}
