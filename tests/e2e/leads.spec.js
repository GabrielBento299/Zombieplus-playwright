const { test, expect } = require('../support');

require('dotenv').config();

const { faker } = require('@faker-js/faker');

const { executeSQL } = require('../support/database');

test.beforeAll( async () => {
  await executeSQL(`DELETE FROM leads`);
});


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  
  await page.leads.visit();
  await page.leads.openModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const toastMessage = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(toastMessage);
});

test('nao deve cadastrar quando um email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post(this.baseApi + '/leads', { 
    data: {
      name: leadName,
      email: leadEmail
    }
  });

  expect(newLead.ok()).toBeTruthy();

  await page.leads.visit();
  await page.leads.openModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.';
  await page.popup.haveText(message);
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openModal();
  await page.leads.submitLeadForm('Gabriel', 'gabrielbento.com');

  await page.leads.alertHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openModal();
  await page.leads.submitLeadForm('', 'gabrielbento@gmail.com');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openModal();
  await page.leads.submitLeadForm('Gabriel', '');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando o nenhum campo é preenchido', async ({ page }) => {  
  await page.leads.visit();
  await page.leads.openModal();
  await page.leads.submitLeadForm('', '');

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});

