#### Spotify-Rails web app
###### Required libraries/dependencies
- Ruby/Rails
- PostgreSQL

###### Steps to setup the app
1. Download code from github
2. Cd into app
3. Run `bundle install`
4. Run `rails db:create`
5. Run `bin/dev`
6. Now the app is running and live on localhost:3000 in browser

###### To use stripe for payments
You need to set generate your own personal keys on stripe.com
then set them in the credentials file
Run `EDITOR=vi rails credentials:edit --environment=development`
example of what we use

```
stripe:
  pk:
  sk:
  wh_secret:
  connect_client_id:
```

The public key and secret key are found on dashboard of stripe.com
The wh secret is gotten from the stripe listen --forward-to command from stripe CLI
The connect client id is found inside of the connect onboarding settings and the oauth page

###### To listen to webhooks locally
Stripe has a CLI library for listening to webhooks first install and login
then you can Run `stripe listen --forward-to localhost:3000/stripe/webhooks`
copy the wh secret key and put it in the credentials file as mentioned above^