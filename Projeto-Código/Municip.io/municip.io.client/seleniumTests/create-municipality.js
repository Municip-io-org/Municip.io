const { Builder, By, Key, until } = require('selenium-webdriver');
const { WebDriver, WebDriverWait } = require('selenium-webdriver');
const assert = require('assert');

describe('Create municipality', function () {
  this.timeout(30000);
  let driver;
  let vars;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Create municipality', async function () {
    await driver.get("https://municip.io:4200/");
    await driver.manage().window().setRect({ width: 1936, height: 1056 });
    
    await driver.wait(until.elementLocated(By.css(".border-2"))).click();

    await driver.wait(until.elementLocated(By.css(".rounded-\\[10px\\]:nth-child(2) .text-municip-gray"))).click();

    await driver.wait(until.elementLocated(By.id("firstName"))).sendKeys("Testname");
    
    await driver.findElement(By.id("surname")).sendKeys("Testsurname");

    await driver.findElement(By.id("email")).sendKeys("testselenium@test.com");
    
    await driver.findElement(By.id("password")).sendKeys("1qaz\"WSX");
    
    await driver.findElement(By.id("municipality")).click();

    await driver.wait(until.elementLocated(By.xpath("//option[contains(text(), 'Almada')]"))).click();
    
    await driver.findElement(By.id("photo")).sendKeys("C:\\Users\\Utilizador\\Desktop\\4fE6Ncm.jpeg");

    await driver.findElement(By.css(".top-\\[1rem\\]")).click();

    await driver.wait(until.elementLocated(By.id("president"))).sendKeys("PresidenteTest");

    await driver.findElement(By.id("contact")).sendKeys("931234567");
    
    await driver.findElement(By.id("emblemPhoto")).sendKeys("C:\\Users\\Utilizador\\Desktop\\4fE6Ncm.jpeg");

    await driver.findElement(By.id("landscapePhoto")).sendKeys("C:\\Users\\Utilizador\\Desktop\\4fE6Ncm.jpeg");

    await driver.findElement(By.id("description")).sendKeys("Este Ã© um texto informativo relativo Ã  cÃ¢mara municipal de Almada.");

    await driver.findElement(By.css(".top-\\[1rem\\]")).click();


    await driver.wait(until.elementLocated(By.css(".w-\\[13rem\\]"))).click();



  });
});
