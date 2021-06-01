export const loadHistoday = ({
  limit=10,
  fsym='BTC',
  tsym='USD',
} = {})=>
  fetch(
    'https://min-api.cryptocompare.com/data/v2/histoday?'+
    `fsym=${fsym}&tsym=${tsym}&limit=${limit}`
  ).then(response=> response.json())
   .then(({ Data: { Data: exchangeValues }})=>
     exchangeValues
       .map(({ open, time })=> ({ open, time })))
