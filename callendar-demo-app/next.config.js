/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_USERNAME: "calendarAppUser",
    MONGODB_PASSWORD: "ZF91VQWt78ozmPyX",
    MONGODB_CLUSTER: "cluster0.yryfe69.mongodb.net",
    MONGODB_DATABASE: "calendars",
    MONGODB_CONFIG: "?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
