module.exports = {
  reactStrictMode: true,
  images:{
    domains:["firebasestorage.googleapis.com","hfc-resto.appspot.com","images.app.goo.gl","lh3.googleusercontent.com"]
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },
}