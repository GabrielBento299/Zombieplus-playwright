const { test: base, expect } = require('@playwright/test');

const { LandigPage } = require('../pages/LandingPage');
const { LoginPage } = require('../pages/LoginPage');
const { Toast } = require('../pages/Components');
const { MoviesPage } = require('../pages/MoviesPages');

const test = base.extend({
    page: async ({page}, use) => {
        await use({
            ...page,
            landing: new LandigPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        });
    }
});

export { test, expect };