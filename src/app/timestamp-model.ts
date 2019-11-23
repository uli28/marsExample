import { DELIMITER } from './constants';

export class TimeStampModel {
    public hour: number;
    public minute: number;
    
    constructor(hourInput: string, minuteInput: string) {
        let convertedHour: number = Number.parseInt(hourInput);
        let convertedMinute: number = Number.parseInt(minuteInput);
        if (convertedHour >= 0 && convertedHour <= 24) {
            this.hour = convertedHour;
        } else {
            throw new Error('invalid input: ' + hourInput + DELIMITER + minuteInput);
        }

        if (convertedMinute >= 0 && convertedMinute <= 99) {
            this.minute = convertedMinute;
        } else {
            throw new Error('invalid input: ' + hourInput + DELIMITER + minuteInput);
        }
    }
}