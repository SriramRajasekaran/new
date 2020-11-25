var webdriver = require("selenium-webdriver");
const LambdaTestRestClient = require('@lambdatest/node-rest-client');

const username = process.env.LT_USERNAME || 'info2sri94@gmail.com';
const accessKey = process.env.LT_ACCESS_KEY || 'yRlKMEswsCUNw1tjMu2UwakEEqfm8PiyaFEVztRO91JHtmWDZK';

//set capabilities
var caps = {
name : 'Login Example',
build : '1.0',
version : '70',
platform : 'Windows 10',
screen_resolution : '1366x768',
record_video : 'true',
record_network : 'false',
browserName : 'Chrome'
};

const { By, until } = webdriver

describe('webdriver', () => {
let driver;

beforeAll(async () => {
driver = new webdriver.Builder()
    .usingServer(
        'https://' + username + ':' + accessKey + '@hub.lambdatest.com/wd/hub'
    )
.withCapabilities(caps)
.build();

    await driver.get('https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020');
},10000);

afterAll(async () => {
await driver.quit();
}, 10000);

    test('Successful Loading', async () => {
        output = await getElementByXpath(driver,
            "//html/body/div[1]/div/div[5]/div/div/div/div/div[1]/div/div/div/div[1]/div/h1"
        );
        title = await output.getText();
        expect(title).toEqual('Aviso de Intenção de Registro de Preços 151/2020 - SAÚDE');

        test = await getElementByXpath(driver,
            "//html/body/div[1]/div/div[5]/div/div/div/div/div[1]/div/div/div/div[3]/div/div/div/div/div/div[2]/span/span[1]/span"
        );
        publication = await test.getText();
        expect(publication).toEqual('DATA DA PUBLICAÇÃO: ')

        testnew = await getElementByXpath(driver,
            "//html/body/div[1]/div/div[5]/div/div/div/div/div[1]/div/div/div/div[3]/div/div/div/div/div/div[2]/span/p[1]"
        );
        object = await testnew.getText();
        expect(object).toEqual('Registro de Preços pelo prazo de 12 meses, para aquisição de grampo galvanizado.')

        testbid = await getElementByXpath(driver,
            "/html/body/div[1]/div/div[5]/div/div/div/div/div[1]/div/div/div/div[3]/div/div/div/div/div/div[2]/span/span[6]/span"
        );
        biddingdate = await testnew.getText();
        expect(biddingdate).toEqual('DATA DA LICITAÇÃO: ')

    });
});