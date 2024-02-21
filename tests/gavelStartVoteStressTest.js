import http from "k6/http"
import { check, sleep } from "k6"
import { Trend } from 'k6/metrics'
//const memoryUsage = require('./backend/index')

export let SignUpDuration = new Trend('VoteStartDuration')

//TO EXECUTE START GAVEL TEST: COMMENT OUT SAVE FROM end of initAnnotator in backend\modules\reviewing\gavel\controller.js
//and end of assignNextProject in backend\modules\reviewing\gavel\Annotator.js. This way the annotator is not saved and endpoint can be tested


//ramp up to gradually to 500 users
let duration = 10000
export let options = {
    stages: [
        {
            vus: 1,
            duration: '10s',
            target: 10,
            thresholds: {
                'VoteStartDuration': [`p(95)<${duration}`]
            }
        },
        {
            vus: 10,
            target: 50,
            duration: '20s',
            thresholds: {
                'VoteStartDuration': [`p(95)<${duration}`]
            }
        },
        {
            vus: 50,
            target: 100,
            duration: '30s',
            thresholds: {
                'VoteStartDuration': [`p(95)<${duration}`]
            }
        },
        {
            vus: 100,
            target: 300,
            duration: '60s',
            thresholds: {
                'VoteStartDuration': [`p(95)<${duration}`]
            }
        },
        {
            vus: 300,
            target: 500,
            duration: '60s',
            thresholds: {
                'VoteStartDuration': [`p(95)<${duration}`]
            }
        },

    ],
}


export default function () {




    // idToken from e.g. frontend\src\redux\dashboard\actions.js updateAnnotator console.log
    const idToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFET2pZVVFpLVhzVUJHbkk0QkZTZiJ9.eyJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL2NvdW50cnkiOiJGaW5sYW5kIiwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9jaXR5IjoiVHVya3UiLCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL2xhdGl0dWRlIjo2MC40NTU5LCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL2xvbmdpdHVkZSI6MjIuMjc3MSwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9yb2xlcyI6WyJBc3Npc3RhbnRPcmdhbmlzZXIiLCJSZWNydWl0ZXIiXSwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9wZXJtaXNzaW9ucyI6WyJhY2Nlc3M6cmVjcnVpdG1lbnQiLCJtYW5hZ2U6ZXZlbnQiXSwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9lbWFpbCI6InNhbXUucm90a29AaGFja2p1bmN0aW9uLmNvbSIsImh0dHBzOi8vYXBwLmhhY2tqdW5jdGlvbi5jb20vZW1haWxfdmVyaWZpZWQiOnRydWUsImh0dHBzOi8vYXBwLmhhY2tqdW5jdGlvbi5jb20vcmVjcnVpdGVyX2V2ZW50cyI6W3sib3JnYW5pc2F0aW9uIjoianVuY3Rpb24xIiwiX2lkIjoiNjUyNTNkNzY0NzBkZTIzNGQwNzNkZWI5IiwiZXZlbnRJZCI6IjY1MjUxMmYyZDUxMGVjMzRkMDBjOTBhNyJ9LHsib3JnYW5pc2F0aW9uIjoianVua2thcmkiLCJfaWQiOiI2NTI3YmIyMDQ3MGRlMjM0ZDA5ZDQxY2IiLCJldmVudElkIjoiNjJjZDYyZmNmYjBjYzkwMDQ1NTIxMmZiIn0seyJvcmdhbmlzYXRpb24iOiJBQkIiLCJfaWQiOiI2NTJhNGUzZTQ3MGRlMjM0ZDBiZTAxYWIiLCJldmVudElkIjoiNjRlZDlkNGQxMmFhZjMzNzc0Y2JiNmRiIn0seyJvcmdhbmlzYXRpb24iOiJUaWV0b2V2cnkiLCJfaWQiOiI2NTVmMTkzNTQ1YWMxYzc4MjI2M2U0NzYiLCJldmVudElkIjoiNjQ3ODYwYzM4ZmQ1NmQwMDM2Y2M2MDMzIn0seyJvcmdhbmlzYXRpb24iOiJUaWV0b2V2cnkiLCJfaWQiOiI2NTVmMjk2MDdhYjc4MTNlYzgzYmQ4YjIiLCJldmVudElkIjoiNjQ3ODYwYzM4ZmQ1NmQwMDM2Y2M2MDMzIn1dLCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL3JlY3J1aXRlcl9vcmdhbmlzYXRpb24iOiIiLCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL3JlY3J1aXRlcl9jaGFsbGVuZ2VzIjpbXSwiZ2l2ZW5fbmFtZSI6IlNhbXUiLCJmYW1pbHlfbmFtZSI6IlJvdGtvIiwibmlja25hbWUiOiJzYW11LnJvdGtvIiwibmFtZSI6IlNhbXUgUm90a28iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTE80TlpHWEgtR3R1V1Bqc1NkRXVkX2hzSTZyeDJURTBzMUNZdVZrY2dmYkE9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTEzVDExOjM3OjM2LjI1M1oiLCJpc3MiOiJodHRwczovL2Rldi1oYWNranVuY3Rpb24uZXUuYXV0aDAuY29tLyIsImF1ZCI6IllvUkU2Z1c5aXRCekxVQVY3SzNDV1FiMHVzVUFsUWNHIiwiaWF0IjoxNzAyNTQ1MTc3LCJleHAiOjE3MDI1ODExNzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4ODk4NzgzOTkxNTI2MzYwNzE2IiwiYXRfaGFzaCI6IlY0UFcwZ0xsQzNWUVZyWUFIVVdUZ3ciLCJzaWQiOiJzYy04S0VJUnNKUFktckV1M1N1dTRiczMyVnAzZjVqQyIsIm5vbmNlIjoiNWk0cTFxZHM5LV8ycnFrdWsyZ2lVaUc2bWp-NE95alEifQ.PGekaVoXvDhimqVd_zOVTh77koqBWGv5AjK8m5XOu210ikHSfm0HL7xvxNWbHAsUB7-bOK7MFMPsS1QC9rKeTHRwSuXnYaW6vkEVrL9OBh3UM0gQFgPmr7W0FAywgB0kTzsPzS3MkrFtrGBNbPr8bixx7DpZSJVQqEf8zgLoE8yL7-diHW4mIBmkn5w7f33kSpgZr5O1Tv7WinMnKD3hgHFM2_8SEqwYAfFUga4XLkd13Kl9AuV7xAk2iZEBB-UNSymnEilkuqxBWcCHOLmL70CVOAg-gpcLjSPgxHX7dlRB3sx83S7MMHXRTGN0UdQWFzfID8NGRCk0I-0xDdhTLQ"

    //let res = _axios.post(`${BASE_ROUTE}/${slug}/annotator`, {}, config(idToken))
    let res = http.post("http://localhost:2222/api/reviewing/gavel/junction-2023/annotator", {}, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        }
    })

    check(res, {
        "status is 200": (r) => r.status === 200,

        'transaction time is less than threshold': res => res.timings.duration < duration
    })

    sleep(1)
}