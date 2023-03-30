import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSecComponent } from './perfil-sec.component';

describe('PerfilSecComponent', () => {
  let component: PerfilSecComponent;
  let fixture: ComponentFixture<PerfilSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
