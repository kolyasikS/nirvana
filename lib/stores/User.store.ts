import {action, makeObservable, observable} from "mobx";
import {UserStoreKey} from "@lib/constants";

class UserStore {
  user: IUser | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action
    });
    this.loadState();
  }

  setUser({
    id,
    role
  }: IUser): void {
    this.user = {
      id,
      role
    };
    this.saveState();
  }

  clearUser(): void {
    this.user = null;
    localStorage.removeItem(UserStoreKey);
  }


  saveState() {
    localStorage.setItem(UserStoreKey, JSON.stringify(this.user));
  }

  loadState() {
    const savedState = localStorage.getItem(UserStoreKey);
    if (savedState) {
      this.user = JSON.parse(savedState);
    }
  }
}

export const userStore = new UserStore();