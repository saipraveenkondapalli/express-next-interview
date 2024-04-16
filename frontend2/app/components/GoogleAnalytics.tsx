const GoogleAnalytics = () => {
  return (
    <>
      <script
        async={true}
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
            `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
