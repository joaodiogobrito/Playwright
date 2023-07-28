const { HomePage } = require('./pages/HomePage.js');
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  const homepage = new HomePage(page);

  await test.step('Log in', async () => {
    await page.goto('https://demoblaze.com/')
    await homepage.loginUser();
  });;

  await test.step('Add Iphone to Cart', async () => {
    await homepage.selectProductByText('Iphone 6 32gb');
    await homepage.addToCart();
    });;

  await test.step('Add Laptop to Cart', async () => {
    await homepage.navigateToArea('Home (current)');
    await homepage.isUserLoggedIn(); //Check if user is logged in
    await homepage.navigateToArea('Laptops');  
    await homepage.tapNextButton();
    await homepage.selectProductByText('ASUS Full HD');
    await homepage.addToCart();
    });;

  await test.step('Verify Items added to Cart', async () => {
  //TODO Asserts
    await page.getByRole('cell', { name: 'ASUS Full HD' }).click();
    await page.getByRole('cell', { name: 'Iphone 6 32gb' }).click();
    });;

  
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  

  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByLabel('Total: 1020').click();
  
  //Finish Order
  await page.getByLabel('Total: 1020').fill('Joao');
  await page.getByLabel('Total: 1020').press('Tab');
  await page.getByLabel('Country:').press('Tab');
  await page.getByLabel('City:').press('Tab');
  await page.getByLabel('Credit card:').fill('111111111');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await page.getByText('Id: 2194939Amount: 1020 USDCard Number: 111111111Name: JoaoDate: 24/6/2023').click();
  await page.getByRole('button', { name: 'OK' }).click();
});