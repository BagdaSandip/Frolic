const fetch = require('node-fetch');

async function testPost() {
  try {
    const res = await fetch('http://localhost:5000/api/institute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        InstituteName: "Test 500 Inst",
        InstituteDescription: "Checking crashes",
        InstituteCoOrdinatorID: "69aef643ec36ab2e2f43e40b"
      })
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch(e) {
    console.error(e);
  }
}
testPost();
