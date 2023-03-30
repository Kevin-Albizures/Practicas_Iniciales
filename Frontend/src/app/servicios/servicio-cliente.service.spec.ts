import { TestBed } from '@angular/core/testing';

import { ServicioClienteService } from './servicio-cliente.service';

describe('ServicioClienteService', () => {
  let service: ServicioClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
