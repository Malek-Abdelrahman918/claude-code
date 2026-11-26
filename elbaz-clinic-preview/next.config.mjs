/** Static export: the preview is plain HTML/CSS/JS and can be hosted anywhere (Vercel, Netlify, any CDN). */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
