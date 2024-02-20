const { expect } = require('@playwright/test');

export class TvShows {
    constructor(page) {
        this.page = page;
    }

    async goForm() {
        await this.page.locator('a[href="/admin/tvshows"]').click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async create(series) {
        await this.goForm();
        
        await this.submit();
    }
}
