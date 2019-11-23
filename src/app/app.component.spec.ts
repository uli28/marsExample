import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TimeStampModel } from './timestamp-model';
import { MoonModel } from './moon-model';
import { stringify } from 'querystring';
import { create } from 'domain';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should calculate amount of minutes for timestamp correctly', () => {
    let app = new AppComponent();
    const difference = app.getDifference(new TimeStampModel('24', '44'), new TimeStampModel('7', '50'));
    expect(difference).toEqual(806);
  })

  it('should calculate overlap correctly where moon 1 rises before moon 2', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(createMoon('14:00', '22:40', app), createMoon('15:88', '22:07', app));
    expect(difference).toEqual(619);
  })

  it('should calculate overlap correctly where moon 2 rises before moon 1', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(createMoon('10:20', '22:07', app), createMoon('14:00', '22:40', app));
    expect(difference).toEqual(807);
  })

  it('should calculate overlap correctly', () => {
    let app = new AppComponent();

    const difference = app.getOverlap(createMoon('10:20', '22:07', app), createMoon('14:00', '22:40', app));
    expect(difference).toEqual(807);
  })

  it('should calculate overlap correctly for big overlap', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(createMoon('18:55', '4:97', app), createMoon('10:39', '4:00', app));
    expect(difference).toEqual(1045);
  })

  it('should calculate overlap of 1 without twilight rule being present', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(createMoon('09:99', '22:97', app), createMoon('22:96', '12:00', app));
    expect(difference).toEqual(1);
  })

  it('should return 1 when twilight rule is present for same set and rise', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(createMoon('12:32', '17:06', app), createMoon('17:06', '19:78', app));
    expect(difference).toEqual(1);
  })

  it('should return 1 when twilight rule is present for same rise and set', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(createMoon('22:11', '00:36', app), createMoon('07:00', '22:11', app));
    expect(difference).toEqual(1);
  })

  it('should return 100 as difference between 22:05 and 23:05', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(createMoon('22:05', '24:45', app), createMoon('13:01', '23:05', app))
    expect(difference).toEqual(100);
  })

  it('should throw error for negative input', () => {
    let app = new AppComponent();
    expect(() => app.getOverlap(createMoon('10:00', '12:00', app),
      createMoon('-13:01', '23:05', app)))
      .toThrow(new Error('invalid input: -13:01'));
  })

  it('should throw error for string input', () => {
    let app = new AppComponent();
    expect(() => app.getOverlap(createMoon('hallo', '12:00', app),
      createMoon('abc', '23:05', app)))
      .toThrow(new Error('invalid input: hallo:undefined'));
  })

  it('should throw error for minute input over 100', () => {
    let app = new AppComponent();
    expect(() => app.getOverlap(createMoon('10:105', '12:00', app),
      createMoon('10:00', '23:05', app)))
      .toThrow(new Error('invalid input: 10:105'));
  })

  it('should throw error for minute input exactly 100', () => {
    let app = new AppComponent();
    expect(() => app.getOverlap(createMoon('10:100', '12:00', app),
      createMoon('10:00', '23:05', app)))
      .toThrow(new Error('invalid input: 10:100'));
  })

  it('should throw error for hours input over 25', () => {
    let app = new AppComponent();
    expect(() => app.getOverlap(createMoon('28:80', '12:00', app),
      createMoon('10:00', '23:05', app)))
      .toThrow(new Error('invalid input: 28:80'));
  })

  it('should throw error for hours input exactly 25', () => {
    let app = new AppComponent();
    expect(() => app.getOverlap(createMoon('25:80', '12:00', app),
      createMoon('10:00', '23:05', app)))
      .toThrow(new Error('invalid input: 25:80'));
  })

  function createMoon(rise: string, set: string, app): MoonModel {
    return new MoonModel(app.createTimeStamp(rise), app.createTimeStamp(set))
  }
});
