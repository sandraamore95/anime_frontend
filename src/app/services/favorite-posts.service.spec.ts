import { TestBed } from '@angular/core/testing';

import { FavoritePostsService } from './favorite-posts.service';

describe('FavoritePostsService', () => {
  let service: FavoritePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
