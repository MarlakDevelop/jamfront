import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { TextDialogComponent } from '@components/text-dialog/text-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router) {
    this.form = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  openDialog(text: string): void {
    this.dialog.open(TextDialogComponent, {
      data: {
        text
      }
    });
  }

  submit(): void {
    this.aSub = this.authService.signIn(this.form.value).subscribe(
      res => { this.router.navigateByUrl('/messenger'); },
      error => this.openDialog('Данные не сходятся')
    );
  }
}
