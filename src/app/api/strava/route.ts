import { NextApiResponse } from "next";
import { NextResponse, type NextRequest } from "next/server";

// // Adds support for GET requests to our webhook
// app.get('/webhook', (req, res) => {
//     // Your verify token. Should be a random string.
//     const VERIFY_TOKEN = "STRAVA";
//     // Parses the query params
//     let mode = req.query['hub.mode'];
//     let token = req.query['hub.verify_token'];
//     let challenge = req.query['hub.challenge'];
//     // Checks if a token and mode is in the query string of the request

//     if (mode && token) {
//       // Verifies that the mode and token sent are valid
//       if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//         // Responds with the challenge token from the request
//         console.log('WEBHOOK_VERIFIED');
//         res.json({"hub.challenge":challenge});
//       } else {
//         // Responds with '403 Forbidden' if verify tokens do not match
//         res.sendStatus(403);
//       }
//     }
//   });
const TOKEN = "Z9nI/th63boVMVYB2YEPZWwoJljv1+2OSxAfslCxWJc=";
const MODE = "subscribe";

async function GET(request: NextRequest, res: NextApiResponse) {
  console.log("webhook event received!");
  return NextResponse.json("EVENT_RECEIVED");
}

async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const challenge = url.searchParams.get("challenge");
  const mode = url.searchParams.get("mode");
  const token = url.searchParams.get("token");

  if (!(mode && token)) return NextResponse.json({ data: {} }, { status: 400 });
  if (!(mode === MODE && token === TOKEN))
    return NextResponse.json({ data: {} }, { status: 400 });

  return NextResponse.json(
    { data: JSON.stringify({ "hub.challenge": challenge }) },
    {
      status: 200,
    },
  );
}

export { GET, POST };
