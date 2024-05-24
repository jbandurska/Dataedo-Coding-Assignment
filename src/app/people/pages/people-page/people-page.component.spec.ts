import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { FullNamePipe } from '../../../shared/pipes/full-name.pipe';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { PeoplePageComponent } from './people-page.component';

describe('PeoplePageComponent', () => {
  let component: PeoplePageComponent;
  let fixture: ComponentFixture<PeoplePageComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const user = {
    name: {
      title: 'Mr',
      first: 'John',
      last: 'Watson',
    },
    picture: {
      large: 'large',
      medium: 'medium',
      thumbnail: 'thumbnail',
    },
  };

  const userServiceStub = () => {
    const userSubject = new BehaviorSubject<User | null>(null);
    return {
      user$: userSubject.asObservable(),
      getNewUser: () => userSubject.next(user),
    };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullNamePipe, PeoplePageComponent],
      providers: [
        {
          provide: UserService,
          useValue: userServiceStub(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PeoplePageComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should display user after ngOnInit', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    let nameParagraph = compiled.querySelector('p.name');
    expect(nameParagraph).toBeFalsy();

    fixture.detectChanges();

    nameParagraph = compiled.querySelector('p.name');
    expect(nameParagraph).toBeTruthy();
    expect(nameParagraph?.textContent).toContain('John Watson');
  });
});
