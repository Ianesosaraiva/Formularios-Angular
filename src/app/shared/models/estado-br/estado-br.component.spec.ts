import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoBrComponent } from './estado-br.component';

describe('EstadoBrComponent', () => {
  let component: EstadoBrComponent;
  let fixture: ComponentFixture<EstadoBrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoBrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoBrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
