# GovDelivery Subscription Form

This form subscribes users to the GovDelivery topic specified in the 't' parameter of the form.

It uses the GovDelivery add_script_subscription JSON API.

It uses gulp.js for task automation.


## Install

```bash
$ git clone https://github.com/NREL/eere-govdelivery-subscription-api
$ npm install
```

## Development

Work in the ```src/``` folder. You can manually transpile your ES6 syntax back to ES5 using ```gulp babel```. The ```gulp watch``` task monitors changes in the src folder and runs the build task.

## Build

```bash
$ gulp build
```

## Deploy

```bash
$ gulp deploy
```

## API Documentation

GovDelivery API documentation can be found here:

http://developer.govdelivery.com/api/comm_cloud_v1/Default.htm