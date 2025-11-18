export async function GET() {
  return new Response("Logged out", {
    headers: {
      "Set-Cookie": "token=; Path=/; Max-Age=0;",
    },
  });
}
