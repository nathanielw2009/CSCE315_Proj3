import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerSettingsComponent } from './organizer-settings.component';

describe('OrganizerSettingsComponent', () => {
  let component: OrganizerSettingsComponent;
  let fixture: ComponentFixture<OrganizerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
