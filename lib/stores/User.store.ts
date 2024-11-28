import {action, makeObservable, observable} from "mobx";

class UserStore {
  user: IUser | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action
    })
  }

  setUser({
    id,
    role
  }: IUser): void {
    this.user = {
      id,
      role
    };
  }
}

export const userStore = new UserStore();