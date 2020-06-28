var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'qazxswedcvfrtgb' }, function(err, tunnel) {
  console.log('LT running')
});