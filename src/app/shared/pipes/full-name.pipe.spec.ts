import { User } from '../../people/models/user.model';
import { FullNamePipe } from './full-name.pipe';

describe('FullNamePipe', () => {
  const pipe = new FullNamePipe();

  const user: User = {
    name: {
      title: 'Mr',
      first: 'John',
      last: 'Watson',
    },
    picture: {
      large: '',
      medium: '',
      thumbnail: '',
    },
  };

  it('transforms a user instance to its full name representation', () => {
    expect(pipe.transform(user)).toBe('John Watson');
  });
});
