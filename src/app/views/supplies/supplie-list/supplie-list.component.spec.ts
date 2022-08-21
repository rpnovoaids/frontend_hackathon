import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieListComponent } from './supplie-list.component';

describe('SupplieListComponent', () => {
  let component: SupplieListComponent;
  let fixture: ComponentFixture<SupplieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
