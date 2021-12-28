import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

/**Создаем класс который будет вызываться для подтверждения удачной отработки наших сервисов */
export class NotificationService {

  constructor(private snackbar: MatSnackBar) {
  }

  public showSnackBar(message: string): void {
    this.snackbar.open(message, null, {
      duration: 5000
    });
  }
}
