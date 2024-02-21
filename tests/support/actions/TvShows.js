const { expect } = require('@playwright/test');

export class TvShows {
    constructor(page) {
        this.page = page;
    }

    async goTvShows() {
        await this.page.locator('a[href="/admin/tvshows"]').click();
    }

    async goForm() {
        await this.goTvShows();
        await this.page.locator('a[href$="register"]').click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async create(tvsShow) {
        await this.goForm();

        await this.page.getByLabel('Titulo da série').fill(tvsShow.title);
        await this.page.getByLabel('Sinopse').fill(tvsShow.overview);
    
        await this.page.locator('div[id="select_company_id"]').click();
    
        await this.page.locator('div[class*="react-select__option"]').filter({ hasText: tvsShow.company }).click();
    
        await this.page.locator('div[id="select_year"]').click();
    
        await this.page.locator('div[class*="react-select__option"]').filter({ hasText: tvsShow.release_year }).click();

        await this.page.locator('input[id="seasons"]').fill(tvsShow.seasons);
    
        await this.page.locator('input[name="cover"]').setInputFiles('tests/support/fixtures' + tvsShow.cover);
    
        if (tvsShow.featured) {
          await this.page.locator('label[class*="featured"] div[class="react-switch"]').click();
        }
        
        await this.submit();
     }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target);
    
        await this.page.click('.actions button');
    }

    async tableHave(content) {
        const rows = await this.page.getByRole('row');
        await expect(rows).toContainText(content);
    }

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click();
        await this.page.locator('span[class="confirm-removal"]').click();
    }
}
