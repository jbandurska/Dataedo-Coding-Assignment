import { User } from '../../people/models/user.model';

export interface RandomUserResponse {
  results: [User];
}
