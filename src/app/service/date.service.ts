import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment>=new BehaviorSubject(moment())

  constructor() {
  }

  changeDay(countDay:number):any{
    const value = this.date.value.add(countDay,'day');
    return this.date.next(value);
  }

  changeMonth(dir: number):any {
    const value = this.date.value.add(dir, 'month');
    return this.date.next(value);
  }

  changeDate(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      day: date.day()
    })
    this.date.next(value)
  }
}
