const isGithubPages = process.env.GITHUB_PAGES === "true";
// Update this if the repository is ever renamed.
const repoName = "clothes-site";
const basePath = isGithubPages ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  env: {
    // next/image doesn't prepend basePath to local src strings when
    // images.unoptimized is true, so components read this to do it manually.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
