const { expect } = require('@playwright/test');

export class Leads {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000');
    }

    async openModal() {
        // await page.click('//button[text()="Aperte o play... se tiver coragem"]');
        await this.page.getByRole('button', { name: /Aperte o play/}).click();

        await expect(this.page.getByTestId('modal')
          .getByRole('heading'))
          .toHaveText('Fila de espera');  
        // await page.getByText('seus dados conosco').click();
        // const content = await page.content();
        // console.log(content);
    }

    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder('Informe seu nome').fill(name);
        await this.page.locator('#email').fill(email);
        // await page.locator('input[name=email]').fill('gabrielbento@gmail.com');
        // await page.locator('input[placeholder="Seu email principal"]').fill('gabrielbento@gmail.com');

        await this.page.getByTestId('modal')    
            .getByText('Quero entrar na fila!').click();
    }

    async tostHaveText(message) {
        const toast = this.page.locator('.toast');

        await expect((toast)).toHaveText(message);
        await expect((toast)).not.toBeVisible({ timeout: 5000 });
        // await expect((toast)).toBeHidden({ timeout: 5000 });
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}