const GoogleAds = () => {
    return (
        <>
            <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADS_CLIENT_ID}`}
                crossOrigin="anonymous">
            </script>

        </>
    )
}


export default GoogleAds;