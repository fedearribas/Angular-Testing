import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);

  })

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      service.getHero(1).subscribe();

      const req = httpTestingController.expectOne('api/heroes/1');

      req.flush({ id: 1, name: 'SuperDude', strength: 100 });
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    })
  })

})