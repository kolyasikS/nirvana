import {action, makeObservable, observable} from "mobx";
import {UserStoreKey} from "@lib/constants";
import {isServer} from "@lib/utils";

class UserStore {
  user: IUser | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action
    });

    if (!isServer()) {
      this.loadState();
    }
  }

  setUser(user: IUser): void {
    this.user = user;
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
    if (!isServer()) {
      const savedState = localStorage.getItem(UserStoreKey);
      if (savedState) {
        this.user = JSON.parse(savedState);
      }
    }
  }
}

export const userStore = new UserStore();