// functions/otp.js
// Cloudflare Pages Function — handles ALL request methods
 
const VDO_API_SECRET = 'OEVzOuuDh9atiIQgqvjVrbcxHEzPsJWrk0gllzmeHxeYuHiKKSdHsaTFM2UgTFp2';
const VDO_VIDEO_ID   = '18916769f9604b9a91bc2681ca501b7d';
const OTP_TTL        = 300;
 
// Handle ALL methods (GET, POST, OPTIONS)
export async function onRequest(context) {
  // Handle CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
 
  try {
    const vdoRes = await fetch(
      `https://dev.vdocipher.com/api/videos/${VDO_VIDEO_ID}/otp`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Apisecret ${VDO_API_SECRET}`,
          'Content-Type':  'application/json',
          'Accept':        'application/json',
        },
        body: JSON.stringify({ ttl: OTP_TTL })
      }
    );
 
    const data = await vdoRes.json();
 
    if (!vdoRes.ok) {
      return new Response(
        JSON.stringify({ error: data.message || 'VdoCipher error' }),
        {
          status: vdoRes.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
 
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
 
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Function error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
