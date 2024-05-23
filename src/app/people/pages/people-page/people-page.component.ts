import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Timer } from '../../../shared/classes/timer';
import { FullNamePipe } from '../../../shared/pipes/full-name.pipe';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [AsyncPipe, FullNamePipe],
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.scss',
})
export class PeoplePageComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  protected user$ = this.userService.user$;

  private timer!: Timer;

  ngOnInit(): void {
    this.userService.getNewUser();
    this.timer = new Timer(() => {
      this.userService.getNewUser();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.timer.destroy();
  }

  protected getNewUser(): void {
    this.userService.getNewUser();
    this.timer.reset();
  }

  protected resumeTimer(): void {
    this.timer.resume();
  }

  protected stopTimer(): void {
    this.timer.stop();
  }
}
