import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TimeStampModel } from './timestamp-model';
import { MoonModel } from './moon-model';

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
    const difference = app.getDifference(new TimeStampModel('24','44'), new TimeStampModel('7','50'));
    expect(difference).toEqual(806);
  })

  it('should calculate overlap correctly where moon 1 rises before moon 2', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(new MoonModel(app.createTimeStamp("14:00"), app.createTimeStamp("22:40")),
     new MoonModel(app.createTimeStamp("15:88"), app.createTimeStamp("22:07")));
    expect(difference).toEqual(619);
  })

  it('should calculate overlap correctly where moon 2 rises before moon 1', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(new MoonModel(app.createTimeStamp("10:20"), app.createTimeStamp("22:07")), 
    new MoonModel(app.createTimeStamp("14:00"), app.createTimeStamp("22:40")));
    expect(difference).toEqual(807);
  })

  it('should calculate overlap correctly', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(new MoonModel(app.createTimeStamp("10:20"), app.createTimeStamp("22:07")), 
    new MoonModel(app.createTimeStamp("14:00"), app.createTimeStamp("22:40")));
    expect(difference).toEqual(807);
  })

  it('should calculate overlap correctly for small overlap', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(new MoonModel(app.createTimeStamp("18:55"), app.createTimeStamp("4:97")), 
    new MoonModel(app.createTimeStamp("10:39"), app.createTimeStamp("4:00")));
    expect(difference).toEqual(1045);
  })

  it('should return 1 when twilight rule is present for same set and rise', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(new MoonModel(app.createTimeStamp("12:32"), app.createTimeStamp("17:06")), 
    new MoonModel(app.createTimeStamp("17:06"), app.createTimeStamp("19:78")));
    expect(difference).toEqual(1);
  })

  it('should return 1 when twilight rule is present for same rise and set', () => {
    let app = new AppComponent();
    const difference = app.getOverlap(new MoonModel(app.createTimeStamp("22:11"), app.createTimeStamp("00:36")), 
    new MoonModel(app.createTimeStamp("07:00"), app.createTimeStamp("22:11")));
    expect(difference).toEqual(1);
  })
});
