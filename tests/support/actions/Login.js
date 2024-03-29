const { expect } = require('@playwright/test');

export class Login {
  constructor(page) {
    this.page = page;
  }

  async do(email, password, userName) {
    await this.visit();
    await this.submit(email, password);
    await this.isLoggedIn(userName);
  }

  async visit() {
    await this.page.goto("/admin/login");

    const loginForm = this.page.locator(".login-form");
    await expect(loginForm).toBeVisible();
  }

  async submit(email, password) {
    await this.page.getByPlaceholder('E-mail').fill(email);
    await this.page.getByPlaceholder('Senha').fill(password);

    await this.page.locator('//button[text()="Entrar"]').click();
  }

  async alertHaveText(text) {
    const alert = this.page.locator('span[class$=alert]');
    await expect(alert).toHaveText(text);
  }

  async isLoggedIn(userName) {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/.*admin/);

    const loggedUser = this.page.locator('.logged-user');
    await expect(loggedUser).toHaveText(`Olá, ${userName}`);
 
    const loggoutLink = this.page.locator('a[href="/logout"]');
    await expect(loggoutLink).toBeVisible();
  }
}
