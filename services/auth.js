import { get } from '../api/axios';

// get user info
export function getUser() {
  return get('/user')
    .then(res => res);
}
