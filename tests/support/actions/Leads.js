const { expect } = require('@playwright/test');

export class Leads {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('/');
    }

    async openModal() {
        await this.page.getByRole('button', { name: /Aperte o play/}).click();

        await expect(this.page.getByTestId('modal')
          .getByRole('heading'))
          .toHaveText('Fila de espera');  
    }

    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder('Informe seu nome').fill(name);
        await this.page.locator('#email').fill(email);

        await this.page.getByTestId('modal')    
            .getByText('Quero entrar na fila!').click();
    }

    async tostHaveText(message) {
        const toast = this.page.locator('.toast');

        await expect((toast)).toHaveText(message);
        await expect((toast)).not.toBeVisible({ timeout: 5000 });
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}