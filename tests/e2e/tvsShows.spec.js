const { test, expect } = require('../support');

const data = require('../support/fixtures/tvshows.json');

const { executeSQL } = require('../support/database');

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM tvshows`);
});

test('deve poder cadastrar uma nova série', async ({ page }) => {
    // const series = data.create();

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvsShows.create();
});

test('deve poder remover uma série', async ({ page, request }) => {

});

test('não deve poder cadastrar uma série quando o tiltulo já existe', async ({ page, request }) => {

});

test('não deve cadastar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

});

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {

});