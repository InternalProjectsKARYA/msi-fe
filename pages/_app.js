// pages/_app.js
import { FeatureFlagProvider } from "../context/FeatureFlagProvider";

function MyApp({ Component, pageProps }) {
  // User role is fetched from the server or defaulted to "admin"
  const userRole = pageProps.userRole || "admin";

  return (
    <FeatureFlagProvider userRole={userRole}>
      <Component {...pageProps} />
    </FeatureFlagProvider>
  );
}

export default MyApp;
