import React from 'react';
import Script from "next/script";
import {Box} from "@mui/material";

type PlayerKodikProps = {
  imdbID: string,
  width?: string | number,
  height?: string | number,
}

const PlayerKodik:React.FC<PlayerKodikProps> = ({imdbID, width, height}) => {
  //imdbID: "${imdbID}",
  return (
    <>
      <Box id="kodik-player"  width={width ?? 'auto'} />
      {/*<iframe
        src={`//kodik.cc/find-player/?imdbID=${imdbID}`}
        width={width ?? 610}
        height={height ?? 370}
        frameBorder="0"
        allowFullScreen
        allow={"autoplay *; fullscreen *"}
      />*/}
      <Script strategy="lazyOnload">
        {`
          var kodikAddPlayers = {
            onDomReady: true,
            foundCallback: function (data, link) { console.log("FOUND"); },
            notFoundCallback: function (data) { console.log("NOT FOUND"); },
            imdbID: "${imdbID}",
            width: "${width ?? 610}",
            height: "${height ?? 370}"
          };
        `}
      </Script>
    </>
  )
}

export default PlayerKodik