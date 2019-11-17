import { Component } from '@angular/core';
import { TimeStampModel } from './timestamp-model';
import { DELIMITER } from './constants';
import { MoonModel } from './moon-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gram-ast-mars';
  calculatedMinutes: string;
  error: string;

  calculate(inputRiseDeimos, inputSetDeimos, inputRisePhobos, inputSetPhobos) {
    try {
      let deimos: MoonModel = this.createMoon(inputRiseDeimos.value, inputSetDeimos.value);
      let phobos: MoonModel = this.createMoon(inputRisePhobos.value, inputSetPhobos.value);
      const overlap: number = this.getOverlap(deimos, phobos);
      this.calculatedMinutes = overlap.toString();
    } catch (e) {
      this.error = e;
    }
  }

  getOverlap(deimos: MoonModel, phobos: MoonModel): number {
    if(this.haveOnePointInCommon(deimos, phobos)) {
      return 1;
    }
    let amountMinutesDeimos = this.getDifference(deimos.rise, deimos.set);
    let amountMinutesPhobos = this.getDifference(phobos.rise, phobos.set);

    let differenceRiseDeimosToPhobos = this.getDifference(deimos.rise, phobos.rise);
    let differenceRisePhobosToDeimos = this.getDifference(phobos.rise, deimos.rise);
    if (differenceRiseDeimosToPhobos < differenceRisePhobosToDeimos) {
      return this.calculateOverlap(differenceRiseDeimosToPhobos, amountMinutesDeimos, amountMinutesPhobos);
    } else {
      return this.calculateOverlap(differenceRisePhobosToDeimos, amountMinutesPhobos, amountMinutesDeimos);
    }
  }

  haveOnePointInCommon(moon1: MoonModel, moon2: MoonModel): boolean {
    if (this.isSameTimeStamp(moon1.rise, moon2.rise) ||
      this.isSameTimeStamp(moon1.rise, moon2.set) ||
      this.isSameTimeStamp(moon1.set, moon2.rise) ||
      this.isSameTimeStamp(moon1.set, moon2.set)) {
      return true;
    }
    return false;
  }

  isSameTimeStamp(timestamp1: TimeStampModel, timestamp2: TimeStampModel) {
    if (timestamp1.hour === timestamp2.hour && timestamp1.minute === timestamp2.minute) {
      return true;
    }
    else return false;
  }

  calculateOverlap(differenceRise, amountMinusOfFirstMoon, amountMinutesOfSecondMoon): number {
    if (differenceRise > amountMinusOfFirstMoon) {
      return 0;
    }

    const maxPossibleSharedInterval = amountMinusOfFirstMoon - differenceRise;
    if (amountMinutesOfSecondMoon < maxPossibleSharedInterval) {
      return amountMinutesOfSecondMoon;
    } else {
      return maxPossibleSharedInterval;
    }
  }

  createMoon(rise: string, set: string): MoonModel {
    let riseTimeStamp: TimeStampModel = this.createTimeStamp(rise);
    let setTimeStamp: TimeStampModel = this.createTimeStamp(set);
    return new MoonModel(riseTimeStamp, setTimeStamp);
  }

  createTimeStamp(value: string): TimeStampModel {
    var splitted = value.toString().split(DELIMITER);
    return new TimeStampModel(splitted[0], splitted[1]);
  }

  getDifference(from: TimeStampModel, to: TimeStampModel) {
    let amountMinutesFrom: number = this.getAmountOfMinutes(from);
    let amountMinutesTo: number = this.getAmountOfMinutes(to);
    return this.modulo((amountMinutesTo - amountMinutesFrom), (25 * 100));
  }

  getAmountOfMinutes(timestamp: TimeStampModel): number {
    let convertedHours: number = timestamp.hour * 100;
    return convertedHours + timestamp.minute;
  }

  modulo(x: number, m: number) {
    return (x % m + m) % m;
  }
}
