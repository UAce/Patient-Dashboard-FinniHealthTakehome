curl --location --request POST 'http://localhost:4000/api/patients' \
--header 'Content-Type: application/json' \
--data-raw '{
  "firstName": "Wow",
  "lastName": "Yes",
  "dateOfBirth": "12-07-1990",
  "status": "Churned",
  "addresses": [
    {
      "type": "Primary",
      "line1": "123 rue de la Marmotte",
      "city": "Seattle",
      "area": "WA",
      "country": "US",
      "postalCode": "123456"
    }
  ],
  "metadata": [{
      "key": "website",
      "value": "www.google.com"
  }, {
      "key": "someField",
      "value": "hello world"
  }]
}'

curl --location --request POST 'http://localhost:4000/api/patients' \
--header 'Content-Type: application/json' \
--data-raw '{
  "firstName": "UA",
  "lastName": "Lu",
  "dateOfBirth": "11-01-1991",
  "status": "Inquiry",
  "addresses": [
    {
      "type": "Primary",
      "line1": "123 rue de la Marmotte",
      "city": "Vancouver",
      "area": "BC",
      "country": "Canada",
      "postalCode": "123456"
    }
  ],
  "metadata": [{
      "key": "linkedin",
      "value": "www.linkedin.com"
  }, {
      "key": "phone number",
      "value": "+1(514)434-6688"
  }]
}'

curl --location --request POST 'http://localhost:4000/api/patients' \
--header 'Content-Type: application/json' \
--data-raw '{
  "firstName": "Yunnie",
  "lastName": "Lc",
  "dateOfBirth": "06-02-1994",
  "status": "Onboarding",
  "addresses": [
    {
      "type": "Primary",
      "line1": "123 rue de la Marmotte",
      "city": "Montreal",
      "area": "QC",
      "country": "Canada",
      "postalCode": "123456"
    }
  ],
  "metadata": [{
      "key": "source",
      "value": "referral"
  }]
}'

curl --location --request POST 'http://localhost:4000/api/patients' \
--header 'Content-Type: application/json' \
--data-raw '{
  "firstName": "Yueh",
  "lastName": "Liu",
  "dateOfBirth": "08-05-1996",
  "status": "Active",
  "addresses": [
    {
      "type": "Primary",
      "line1": "123 rue de la Marmotte",
      "city": "Vancouver",
      "area": "BC",
      "country": "Canada",
      "postalCode": "123456"
    }
  ],
  "metadata": [{
      "key": "hobby",
      "value": "sleeping"
  }]
}'

