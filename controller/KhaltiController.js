const axios = require('axios');

let data = {
  "token": "QUao9cqFzxPgvWJNi9aKac",
  "amount": 1000
};

let config = {
  headers: {'Authorization': 'Key test_secret_key_f59e8b7d18b4499ca40f68195a846e9b'}
};

axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
.then(response => {
  console.log(response.data);
  
})
.catch(error => {
  console.log(error);
});