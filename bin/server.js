const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const port = config.server_port

var ip = require("ip");
var fs = require('fs');
var date = new Date();
const { execSync } = require('child_process');

let md_file = "readme.md"

let content =   "# GradKnockKnock\n" +
                "邮件订阅 UoM Careers Online IT 相关 Graduate Program, \n" +
                "因为现在是挂在校园网内，请使用学校 VPN 访问,\n\n" +
                "如果还不能访问说明我没有开机...\n\n" +
                "访问地址: [" + ip.address() + ":" 
                + port + "](http:\/\/" + ip.address() + ":" 
                + port+")\n\n" + 
                "Updated at: " + date + '\n' +
                "您的打赏是我长胖的动力\n" +
                "打赏二维码" +
                "![QR](public\/QR.png)"

fs.writeFileSync(md_file, content)

execSync('git add readme.md');
execSync('git commit -m \"updated at ' + date + '\"');
execSync('git push');


server.listen(port)
debug(`Server is now running at http://localhost:${port}.`)
