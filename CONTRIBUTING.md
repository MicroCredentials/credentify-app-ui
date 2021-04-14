# Contributing

TODO

# Deployment

## Development

- Set api url in `nuxt.config.js` to `https://api-staging.credentify.eu`.
- Run: `docker build -t credentify-app-ui .`
- Run: `docker run --rm -e AWS_ACCESS_KEY_ID= -e S3_BUCKET=credentify-app-dev -e CF_DISTRO=E3VR0ZHR8W7L6Q -e AWS_SECRET_ACCESS_KEY= --rm -v $PWD:/app credentify-app-ui`. Set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with actual keys.

## Production

- Set api url in `nuxt.config.js` to `https://api.credentify.eu`.
- Run: `docker build -t credentify-app-ui .`
- Run: `docker run --rm -e AWS_ACCESS_KEY_ID= -e S3_BUCKET=credentify-app-prod -e CF_DISTRO=EY9I4YPXLCOPU -e AWS_SECRET_ACCESS_KEY= --rm -v $PWD:/app credentify-app-ui`. Set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with actual keys.
