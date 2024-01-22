import { TestBed } from '@angular/core/testing';

import { TaskAdminService } from './task-admin.service';

describe('TaskAdminService', () => {
  let service: TaskAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
