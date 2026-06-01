// functions/otp.js
// Cloudflare Pages Function — runs server-side at /otp
// Keep this file in the "functions" folder

const VDO_API_SECRET = 'OEVzOuuDh9atiIQgqvjVrbcxHEzPsJWrk0gllzmeHxeYuHiKKSdHsaTFM2UgTFp2';
const VDO_VIDEO_ID   = '18916769f9604b9a91bc2681ca501b7d';
const OTP_TTL        = 300;

export async function onRequestPost(context) {
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
        { status: vdoRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Function error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
