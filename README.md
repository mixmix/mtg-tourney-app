# mtg-tourney-app

Made to make that "pairings for round 2" crush a little less brutal.

Event organisers upload PDFs exported from Wizards Event Reporter.
Players load the app on their phone to easily see which table they've been posted to.

![](screenshot.png)


## Deploying to Heroku

### Easy One Click

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This will start an app at a location like `my-app-name.herokuapp.com`. If you want to use your own domain, you tell the heroku app about your domain (e.g. this is `table.my-site.com`) and create a CNAME record which points from your domain name to the heroku app.


### Command Line (For Seasoned Pros)

Install the [heroku toolbelt](https://toolbelt.heroku.com/), and clone down this repo.
In the root of this project, run:

```bash
heruku apps:create NAME_OF_YOUR_HEROKU_APP
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-multi.git -a NAME_OF_YOUR_HEROKU_APP
git remote add heroku https://git.heroku.com/NAME_OF_YOUR_HEROKU_APP.git
git push heroku master
heroku open -a NAME_OF_YOUR_HEROKU_APP
```
