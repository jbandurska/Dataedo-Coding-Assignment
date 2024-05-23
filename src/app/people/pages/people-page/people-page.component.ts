import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Timer } from '../../../shared/classes/timer';
import { FullNamePipe } from '../../../shared/pipes/full-name.pipe';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [FullNamePipe],
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.scss',
})
export class PeoplePageComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  protected user: User | null = null;
  protected isLoading = true;

  private timer!: Timer;

  private userSub!: Subscription;

  ngOnInit(): void {
    this.userSub = this.userService.user$.subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
    });
    this.userService.getNewUser();

    this.timer = new Timer(() => {
      this.getNewUser();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.timer.destroy();
  }

  protected getNewUser(): void {
    this.userService.getNewUser();
    this.isLoading = true;
  }

  protected getNewUserAndReset(): void {
    this.getNewUser();
    this.timer.reset();
  }

  protected resumeTimer(): void {
    this.timer.resume();
  }

  protected stopTimer(): void {
    this.timer.stop();
  }
}
