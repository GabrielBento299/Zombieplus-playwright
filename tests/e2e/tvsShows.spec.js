const { test } = require('../support');

const data = require('../support/fixtures/tvshows.json');

const { executeSQL } = require('../support/database');

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM tvshows`);
});

test('deve poder cadastrar uma nova série', async ({ page }) => {
    const tvsShow = data.create;

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvsShows.create(tvsShow);
    await page.popup.haveText(`A série '${tvsShow.title}' foi adicionada ao catálogo.`);
});

test('deve poder remover uma série', async ({ page, request }) => {
    const tvsShow = data.to_remove;
    await request.api.postTvsShow(tvsShow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvsShows.goTvShows();
    await page.tvsShows.remove(tvsShow.title);
});

test('não deve poder cadastrar uma série quando o tiltulo já existe', async ({ page, request }) => {
    const tvsShow = data.duplicate;
    await request.api.postTvsShow(tvsShow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvsShows.create(tvsShow);
    await page.popup.haveText(` O título '${tvsShow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('não deve cadastar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvsShows.goForm();
    await page.tvsShows.submit();
    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)',
    ]);
});

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const tvsShow = data.search;

    tvsShow.data.forEach(async (tvsShow) => {
        await request.api.postTvsShow(tvsShow);
    });

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvsShows.goTvShows();
    await page.tvsShows.search(tvsShow.input);
    await page.tvsShows.tableHave(tvsShow.outputs);
});