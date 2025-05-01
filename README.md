# IIS WebSocket Close frame issue MRE

## Getting started

 - Install IIS and enable WebSocket support
   - In the Server Manager, click on "Add roles and features" > "Next"
   - In Installation Type, leave "Role-based or feature-based installation" selected then click "Next"
   - In Server Selection, leave the default server selected then click "Next"
   - In Server Roles, Activates "Web Server (IIS)" then leave the default features then click "Add Features" then "Next"
   - In Features, enable Web Server > Application Development > Websocket Protocol then click "Next"
   - Click "Install"
 - Install [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
 - Install [ARR](https://www.iis.net/downloads/microsoft/application-request-routing)
 - Install [Node.JS](https://nodejs.org/en/download)
 - Download this repository in `C:\iss-ws-close-issue`
 - Make sure the default website redirects `/test` request to the test server (you can copy the `web.config` file in the default website folder)
 - Restart the default website on IIS
 - Open a Command prompt in this directory then run `npm install` then `npm start`
 - Navigate to `http://localhost/test`
 - Run the tests

## Notes

 - Test 1 always passes
 - Test 2 should fail, but may sometimes pass when testing locally
 - Test 3 always fails
 - The test server can be accessed directly at: http://localhost:5595/test, in this case all the tests should pass
