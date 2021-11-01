import { ValidationPipe } from './validation-pipe.service';

describe('ValidationUserPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined();
  });
});
