
// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import chalk from 'chalk';
import dotenv from "dotenv";
import publicIp from "public-ip";
dotenv.config();


(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--start-maximized'
            ]
        });
        var page = await browser.newPage();
        
        console.log(chalk.yellow("Opening https://infra-assist.korebots.com/"))

        await page.goto(`https://infra-assist.korebots.com/`, {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });
        
        console.log(chalk.green("✅ Successfully loaded https://infra-assist.korebots.com/"))
        console.log(chalk.yellow("Attempting login with the creds from .env file"))

        await page.waitForSelector("#login > div > div > div > div.login-form-content.ng-scope > div > form > div:nth-child(2) > div.input-group > input")
        await page.focus('#login > div > div > div > div.login-form-content.ng-scope > div > form > div:nth-child(2) > div.input-group > input');
        await page.keyboard.type(process.env.KORE_EMAIL)
    
        var elements = await page.$x('//*[@id="login"]/div/div/div/div[2]/div/form/div[2]/div[2]/button')
        await elements[0].click()
    
    
        await page.waitForSelector("#sign_in_creds_pass")
        await page.type('#sign_in_creds_pass', process.env.KORE_EMAIL_PASS);
    
    
        elements = await page.$x('//*[@id="login"]/div/div/div/div[2]/div/form/div[5]/button[2]')
        await elements[0].click()
        

        await page.waitForSelector("body > div.kore-chat-window.droppable.liteTheme-one.minimize.ui-draggable.ui-resizable > div.minimized > span")
        elements = await page.$x('/html/body/div[2]/div[3]/span')
        await elements[0].click()
        console.log(chalk.green("✅ Login success"))

        await delay(6000);
    
    
        await page.waitForSelector("body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox")
        await page.type('body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox', "EnvironmentsIPWhitelist");
        await page.keyboard.press('Enter');
        console.log(chalk.green(`✅ User : EnvironmentsIPWhitelist`))

        await delay(3000);
    
        await page.waitForSelector("body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox")
        await page.type('body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox', process.env.SERVER);
        await page.keyboard.press('Enter');
        console.log(chalk.green(`✅ User : ${process.env.SERVER}`))
    
        await delay(3000);
    
        await page.waitForSelector("body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox")
        await page.type('body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox', await publicIp.v4());
        await page.keyboard.press('Enter');
        console.log(chalk.green(`✅ User : ${await publicIp.v4()}`))
    
        await delay(3000);
    
        await page.waitForSelector("body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox")
        await page.type('body > div.kore-chat-window.droppable.liteTheme-one.ui-draggable.ui-resizable > div.kore-chat-footer > div > div.chatInputBox', "yes");
        await page.keyboard.press('Enter');
    
        await delay(3000);
    
        console.log(chalk.greenBright(`✅ ${await publicIp.v4()} WHITELISTED`));
        await browser.close();
    } catch (error) {
        console.error("Something bad happend...", error);
    }
})().catch(error => { console.error("Something bad happend...", error); });;






function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}