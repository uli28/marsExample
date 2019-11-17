import { TimeStampModel } from './timestamp-model';

export class MoonModel {
    constructor(public rise: TimeStampModel, public set: TimeStampModel) {
        this.rise = rise;
        this.set = set;
    }
}