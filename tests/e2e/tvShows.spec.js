const { test } = require('../support');

const data = require('../support/fixtures/tvshows.json');

const { executeSQL } = require('../support/database');

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM tvshows`);
});

test('deve poder cadastrar uma nova série', async ({ page }) => {
    const tvShow = data.create;

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvShows.create(tvShow);
    await page.popup.haveText(`A série '${tvShow.title}' foi adicionada ao catálogo.`);
});

test('deve poder remover uma série', async ({ page, request }) => {
    const tvShow = data.to_remove;
    await request.api.postTvShow(tvShow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvShows.goTvShows();
    await page.tvShows.remove(tvShow.title);
});

test('não deve poder cadastrar uma série quando o tiltulo já existe', async ({ page, request }) => {
    const tvShow = data.duplicate;
    await request.api.postTvShow(tvShow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvShows.create(tvShow);
    await page.popup.haveText(` O título '${tvShow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('não deve cadastar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvShows.goForm();
    await page.tvShows.submit();
    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)',
    ]);
});

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const tvShow = data.search;

    tvShow.data.forEach(async (tvShow) => {
        await request.api.postTvShow(tvShow);
    });

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvShows.goTvShows();
    await page.tvShows.search(tvShow.input);
    await page.tvShows.tableHave(tvShow.outputs);
});