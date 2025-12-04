import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaoGeralFinanceira } from './visao-geral-financeira';

describe('VisaoGeralFinanceira', () => {
  let component: VisaoGeralFinanceira;
  let fixture: ComponentFixture<VisaoGeralFinanceira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisaoGeralFinanceira]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaoGeralFinanceira);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
