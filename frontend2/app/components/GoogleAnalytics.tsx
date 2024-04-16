import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        async={true}
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />

      <Script id="google-analytics">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
