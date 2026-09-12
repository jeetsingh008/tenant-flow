import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointBuilder } from './endpoint-builder';

describe('EndpointBuilder', () => {
  let component: EndpointBuilder;
  let fixture: ComponentFixture<EndpointBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndpointBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointBuilder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
