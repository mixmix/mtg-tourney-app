# mtg-tourney-app


## Deploying to Heroku 

Install the heroku CLI, and clone down this repo.
In the root of this project, run:

```bash
heruku apps:create NAME_OF_YOUR_HEROKU_APP
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-multi.git -a NAME_OF_YOUR_HEROKU_APP
git remote add heroku https://git.heroku.com/NAME_OF_YOUR_HEROKU_APP.git
git push heroku master
heroku open -a NAME_OF_YOUR_HEROKU_APP
```
