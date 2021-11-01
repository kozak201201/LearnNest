import { Test, TestingModule } from '@nestjs/testing';
import { KozakJwtService } from './kozak-jwt.service';

describe('KozakJwtService', () => {
  let service: KozakJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KozakJwtService],
    }).compile();

    service = module.get<KozakJwtService>(KozakJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
