import { test, expect, request } from '@playwright/test'
import getApiData from '../../testData/getApi.json'

test("Validate the Get API @api", async () => {

    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true
    });
    const response = await apiContext.get("https://fake-json-api.mock.beeceptor.com/users");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    for (const user of responseBody) {
        console.log(user.username)

    }


    // Extract usernames
    const actualUsernames = responseBody.map((user: any) => user.username);
    const expectedUsernames = getApiData.map(user => user.username);
    console.log(actualUsernames)
    console.log(expectedUsernames)
    expect(actualUsernames).toEqual(expectedUsernames);


});




test("Mulesoft Policy Search @policySearch", async () => {
    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true
    });
    const response = await apiContext.get(
        "https://qa1-claims-exp-api-bbzxcl.ovzdxz.irl-e1.eu1.cloudhub.io/api/claims/v1/policy-search",
        {
            params: {
                page: 1,              
                postcode:'TW8 0FT'
            },
            headers: {
                "client_id": "0bd81b21874b4b34bf9823e03bf08c9c",
                "client_secret": "2038dF1C720043228A695b509aeD334d",
                "Accept": "application/json"
            }
        }
    );
    const status = response.status();
const text = await response.text(); 

console.log("Status:", status);
console.log("Raw Response:", text);

try {
    const json = JSON.parse(text);
    console.log("Parsed JSON:", json);

    // ✅ Use parsed JSON directly


const policies = json.map((item: any) => ({
    policyNumber: item.policyNumber,
    address: item.address
}));

console.log("Policies:", policies);

console.log("***********************************")
    
    json
  .filter((item: any) => item.address?.includes("Flat 21"))
  .forEach((item: any) => {
      console.log(`Policy: ${item.policyNumber} | Address: ${item.address}`);
  });
} catch (err) {
    console.log("Response is not valid JSON");
}

    
});
