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
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: 1500,
            timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
            duration: '30s',
            preAllocatedVUs: 200, // how large the initial pool of VUs would be
            maxVUs: 500, // if the preAllocatedVUs are not enough, we can initialize more
        },
    }
    // stages: [
    //     {
    //         vus: 1,
    //         duration: '10s',
    //         target: 10,
    //         thresholds: {
    //             'VoteStartDuration': [`p(95)<${duration}`]
    //         }
    //     },
    //     {
    //         vus: 10,
    //         target: 50,
    //         duration: '20s',
    //         thresholds: {
    //             'VoteStartDuration': [`p(95)<${duration}`]
    //         }
    //     },
    //     {
    //         vus: 50,
    //         target: 100,
    //         duration: '30s',
    //         thresholds: {
    //             'VoteStartDuration': [`p(95)<${duration}`]
    //         }
    //     },
    //     {
    //         vus: 100,
    //         target: 300,
    //         duration: '60s',
    //         thresholds: {
    //             'VoteStartDuration': [`p(95)<${duration}`]
    //         }
    //     },
    //     {
    //         vus: 300,
    //         target: 500,
    //         duration: '60s',
    //         thresholds: {
    //             'VoteStartDuration': [`p(95)<${duration}`]
    //         }
    //     },



    //],
}


export default async function () {




    // idToken from e.g. frontend\src\redux\dashboard\actions.js updateAnnotator console.log
    const idToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFET2pZVVFpLVhzVUJHbkk0QkZTZiJ9.eyJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL2NvdW50cnkiOiJGaW5sYW5kIiwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9jaXR5IjoiVHVya3UiLCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL2xhdGl0dWRlIjo2MC40NTU5LCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL2xvbmdpdHVkZSI6MjIuMjc3MSwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9yb2xlcyI6WyJBc3Npc3RhbnRPcmdhbmlzZXIiLCJSZWNydWl0ZXIiXSwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9wZXJtaXNzaW9ucyI6WyJhY2Nlc3M6cmVjcnVpdG1lbnQiLCJtYW5hZ2U6ZXZlbnQiXSwiaHR0cHM6Ly9hcHAuaGFja2p1bmN0aW9uLmNvbS9lbWFpbCI6InNhbXUucm90a29AaGFja2p1bmN0aW9uLmNvbSIsImh0dHBzOi8vYXBwLmhhY2tqdW5jdGlvbi5jb20vZW1haWxfdmVyaWZpZWQiOnRydWUsImh0dHBzOi8vYXBwLmhhY2tqdW5jdGlvbi5jb20vcmVjcnVpdGVyX2V2ZW50cyI6W3sib3JnYW5pc2F0aW9uIjoianVuY3Rpb24xIiwiX2lkIjoiNjUyNTNkNzY0NzBkZTIzNGQwNzNkZWI5IiwiZXZlbnRJZCI6IjY1MjUxMmYyZDUxMGVjMzRkMDBjOTBhNyJ9LHsib3JnYW5pc2F0aW9uIjoianVua2thcmkiLCJfaWQiOiI2NTI3YmIyMDQ3MGRlMjM0ZDA5ZDQxY2IiLCJldmVudElkIjoiNjJjZDYyZmNmYjBjYzkwMDQ1NTIxMmZiIn0seyJvcmdhbmlzYXRpb24iOiJBQkIiLCJfaWQiOiI2NTJhNGUzZTQ3MGRlMjM0ZDBiZTAxYWIiLCJldmVudElkIjoiNjRlZDlkNGQxMmFhZjMzNzc0Y2JiNmRiIn0seyJvcmdhbmlzYXRpb24iOiJUaWV0b2V2cnkiLCJfaWQiOiI2NTVmMTkzNTQ1YWMxYzc4MjI2M2U0NzYiLCJldmVudElkIjoiNjQ3ODYwYzM4ZmQ1NmQwMDM2Y2M2MDMzIn0seyJvcmdhbmlzYXRpb24iOiJUaWV0b2V2cnkiLCJfaWQiOiI2NTVmMjk2MDdhYjc4MTNlYzgzYmQ4YjIiLCJldmVudElkIjoiNjQ3ODYwYzM4ZmQ1NmQwMDM2Y2M2MDMzIn1dLCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL3JlY3J1aXRlcl9vcmdhbmlzYXRpb24iOiIiLCJodHRwczovL2FwcC5oYWNranVuY3Rpb24uY29tL3JlY3J1aXRlcl9jaGFsbGVuZ2VzIjpbXSwiZ2l2ZW5fbmFtZSI6IlNhbXUiLCJmYW1pbHlfbmFtZSI6IlJvdGtvIiwibmlja25hbWUiOiJzYW11LnJvdGtvIiwibmFtZSI6IlNhbXUgUm90a28iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTE80TlpHWEgtR3R1V1Bqc1NkRXVkX2hzSTZyeDJURTBzMUNZdVZrY2dmYkE9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTE0VDExOjE3OjQyLjQ3OVoiLCJpc3MiOiJodHRwczovL2Rldi1oYWNranVuY3Rpb24uZXUuYXV0aDAuY29tLyIsImF1ZCI6IllvUkU2Z1c5aXRCekxVQVY3SzNDV1FiMHVzVUFsUWNHIiwiaWF0IjoxNzAyNTU5ODczLCJleHAiOjE3MDI1OTU4NzMsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA4ODk4NzgzOTkxNTI2MzYwNzE2IiwiYXRfaGFzaCI6Imc5a1JDUkVhc1dZMm54aXJ0V3Bzd3ciLCJzaWQiOiJzYy04S0VJUnNKUFktckV1M1N1dTRiczMyVnAzZjVqQyIsIm5vbmNlIjoid35Qa0E4UkhQUVMtcnB1Y1oweVR4bTVwczhOWTlFLlIifQ.A6Ses4RfRrKKzD5P9hya719c8JWAllv-VpqC2S91lUbKKcx5eNO39lpKSnvG60-gtBcmNZ2F5Cd8D77q5A0U_8cKEDlrkYcneR50otDfE4negVNs0vc8U-mVhljqTwg2ln9iBxDOq6Nme3YFmT1C4ojoxs_zNpEhGpPZtPanrWdlNv6N5WTuIukU2HCdasyb2ouDQcapUpIN_z5PZH5dfGBO7vArU4SmH6m_zhSntcewBwWMJ5HXnioIjjfhuB2alQy3m56Y-IKxuv3yEZd3u8OMzL13RZ8HDxElgqJvMAMH0erGKdSAT1KhT8Itj9jnVwqeQKG4_bsy7M2dnrXq7g"
    const project1 = "6550859db8d7d037d378be7e"
    const project2 = "654fed54c79f444a8114f921"
    //let res = _axios.post(`${BASE_ROUTE}/${slug}/annotator`, {}, config(idToken))
    let res = await http.post("http://localhost:2222/api/reviewing/gavel/junction-2023/vote/6550859db8d7d037d378be7e", {}, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        }
    })

    let project1Res = await http.get("http://localhost:2222/api/reviewing/gavel/projects/6550859db8d7d037d378be7e", {
        headers: {
            Authorization: `Bearer ${idToken}`,
        }
    })
    let project2Res = await http.get("http://localhost:2222/api/reviewing/gavel/projects/654fed54c79f444a8114f921", {
        headers: {
            Authorization: `Bearer ${idToken}`,
        }
    })

    check(res, {
        "vote status is 200": (r) => r.status === 200,

        'transaction time is less than threshold': res => res.timings.duration < duration
    })

    check(project1Res, {
        "get project 1 status is 200": (project1Res) => project1Res.status === 200,

        'transaction time is less than threshold': project1Res => project1Res.timings.duration < duration
    })

    check(project2Res, {
        "get project 2 status is 200": (project2Res) => project2Res.status === 200,

        'transaction time is less than threshold': project2Res => project2Res.timings.duration < duration
    })

    sleep(1)
}