import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HomePageComponent } from './home.page';

describe('HomePageComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should render the inspired hero title', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    httpTestingController.expectOne('http://localhost:3000/api/health').flush({
      name: 'bim-predict-backend',
      status: 'ok',
      timestamp: '2026-04-10T12:00:00.000Z',
      firebaseAdmin: {
        configured: false,
        projectId: null,
        message: 'Firebase Admin non configure.',
      },
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Evaluez la maturite BIM de votre entreprise',
    );
  });
});
