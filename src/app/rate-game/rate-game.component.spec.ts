import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateGameComponent } from './rate-game.component';

describe('RateGameComponent', () => {
  let component: RateGameComponent;
  let fixture: ComponentFixture<RateGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
