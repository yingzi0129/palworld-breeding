export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://palworldbreeding.cc/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
