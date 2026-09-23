/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isGitHubActions ? "/AudioVisualUI" : "",
  assetPrefix: isGitHubActions ? "/AudioVisualUI/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
