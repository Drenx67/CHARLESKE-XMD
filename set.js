const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVScGZpc2kwTHR5TEdBU3Z6M1Q4WnJkcUFIREVWUzRPbmYxQmI4aUpFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWxESE9URFptVG51VS8zcjZHSlN2c3JaZUoxcVlFR25kUXp4V0UrK2Z6bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQnJCT09FSW8rZ1pwL0VmZm5ZNzduTEdJVzZLdVJDcHM3TGgxUkhWbGxvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUUTF3cWFkRGZ6MEVXN0pFWkM2M0RPanR3RXpLSXRlVWdDRGpmNlEvdmdnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZIS2J2ekZjMmV3dTBUUEFWTklXQkJ4anlsb3Y1YWh3OVZUUUtCVy9yWEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx1WEFOMVpVOGJ0Q0pXYjBzUWMrekFtWmxZZ3R3aC9KendSZzkrWmZHVjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia09Ybmh3UzVwMTVRMThwOW92U2pZb0J6by93bkZkT09ydUVvZDllT3dXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2JXV0Q2QlJFNmZVMjMxVnY0Nk5JYkRTOVB1YzNmVUtMSGpLdGpXbmMzdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpDZStZdGp4RlhLQ25Wb2JYYXNxRnMrSVQ3emUyYnRXeXV0a25qWmt5NS9tKzJidDdtaWtKQXRMRlVaejBHaytjMnN2TXlNaitGKzVFY0pJQkIwdUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk0LCJhZHZTZWNyZXRLZXkiOiJtR2NhQ1J0cStBd2s5US9sTjZBZFEvanlSbld5UmVmZlhiMWxmMDJLcFRZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTA4NTUzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCM0I3MTI1QzJCODc1MDk5RkU4NkU0MzQ5NzQ1MDExMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MTkzMzg5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODkwODU1MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjk2QTZEQkE4NzFDNUUyQzExMjlGQzBBMzZDQTQ5REMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzE5MzM5MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg5MDg1NTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjkzQTZFRTk1QjI5QTkxOUY5NTJEMTYzOUZGNzAzMkY1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDcxOTM0MTJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTA4NTUzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2MjlCRjVEOTA1RkE4RjQwRDREMzM5MTVBQUEwQkEyNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MTkzNDE2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODkwODU1MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMkUyNUM1ODc4MURCOUVFMEI4QTMzREZBMDRBN0EyMEYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzE5MzQyMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiaXJ4aWZpSnpRbktkaHNVeF84c3VadyIsInBob25lSWQiOiJlNmIwMDJmYi1hZTg5LTRmNzYtOTcxYy1iMzdkZjNiYjI1MGUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL3dUQXVtdnhmUmdoU0t1QnUvckNvTmNISldZPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNvUlNjYnhHcWQ5OU1sTDBReGttak9hOGxuND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGNzZaQ0JDRiIsIm1lIjp7ImlkIjoiMjYzNzg5MDg1NTMzOjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qt/CdkLjihJXwnZC18J2ZivCdkYwifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09UTy9SWVFtcHlRd1FZWUV5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdmODBUT0Vpcjl6cEFsekpYcDFSV2hNSjBKakF1K21CNTliWk1zcXUzaGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNSbFpNM2RsdVBVV3QzNmpSenlKQ2VISlRRL3Q2M2RqcnlvY2lSOFpsQksxZGgzejI4TnRuaGsvRmRXSjk4bzVWRHFmTjNCRFphSm9OcnJlZWQ5SkJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPTmxYMzIvMnRpbnpJMGVZbWRtNFIzOHc2MWtKMmdNQ1lacXJjeG5BREtBWmRid3Y5OFQvQ2phc2ZldDQzNTJBR21kanYyVFlSSURsL1RPa3dXSjhBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTA4NTUzMzozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmUzL05FemhJcS9jNlFKY3lWNmRVVm9UQ2RDWXdMdnBnZWZXMlRMS3J0NFoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDcxOTMzODMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3E2In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝐷𝐸ℕ𝐵𝙊𝑌",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '3',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

