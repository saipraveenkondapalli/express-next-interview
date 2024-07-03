import Script from 'next/script';

const InfoLinksAds = () => {
    return (
        <>
            <Script
                id="infolinks-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            var infolinks_pid = 3421985;
            var infolinks_wsid = 0;
          `,
                }}
            />
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src="//resources.infolinks.com/js/infolinks_main.js"
            />
        </>
    );
};

export default InfoLinksAds;
