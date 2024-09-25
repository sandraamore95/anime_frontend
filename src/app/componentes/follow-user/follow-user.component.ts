import { Component,Input,OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.css']
})
export class FollowUserComponent implements OnInit {
  @Input() user: any;
  isFollowing: boolean = false;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
    this.checkIfFollowing();
  }

  checkIfFollowing(): void {
    this.followService.isFollowing(this.user.id).subscribe(result => {
      this.isFollowing = result;
    });
  }

  followUser(userId: number): void {
    console.log(userId);
    this.followService.followUser(userId).subscribe(() => {
      this.isFollowing = true;
    });
  }

  unfollowUser(userId: number): void {
    this.followService.unfollowUser(userId).subscribe(() => {
      this.isFollowing = false;
    });
  }
}

