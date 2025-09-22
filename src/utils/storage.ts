class StorageManager {
  private getStorage(rememberMe: boolean): Storage {
    return rememberMe ? localStorage : sessionStorage;
  }

  setToken(token: string, rememberMe: boolean): void {
    this.getStorage(rememberMe).setItem('token', token);
  }

  getToken(rememberMe: boolean): string | null {
    return this.getStorage(rememberMe).getItem('token');
  }

  setRefreshToken(refreshToken: string, rememberMe: boolean): void {
    this.getStorage(rememberMe).setItem('refreshToken', refreshToken);
  }

  getRefreshToken(rememberMe: boolean): string | null {
    return this.getStorage(rememberMe).getItem('refreshToken');
  }

  setUser(user: any, rememberMe: boolean): void {
    this.getStorage(rememberMe).setItem('user', JSON.stringify(user));
  }

  getUser(rememberMe: boolean): any | null {
    const userData = this.getStorage(rememberMe).getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  setRememberMe(rememberMe: boolean): void {
    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
  }

  getRememberMe(): boolean {
    const stored = localStorage.getItem('rememberMe');
    return stored ? JSON.parse(stored) : false;
  }

  clearAuth(): void {
    // Clear from both storages
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
  }

  // Get current storage tokens regardless of remember me setting
  getCurrentTokens(): { token: string | null; refreshToken: string | null; rememberMe: boolean } {
    const rememberMe = this.getRememberMe();
    
    // Try to get from the preferred storage first
    let token = this.getToken(rememberMe);
    let refreshToken = this.getRefreshToken(rememberMe);
    
    // If not found in preferred storage, try the other one
    if (!token) {
      token = this.getToken(!rememberMe);
      refreshToken = this.getRefreshToken(!rememberMe);
    }
    
    return { token, refreshToken, rememberMe };
  }
}

export const storageManager = new StorageManager();