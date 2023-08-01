import React from 'react';

type PlayerKodikProps = {
  link: string
}

const IframePlayerKodik: React.FC<PlayerKodikProps> = ({ link}) => {
  return (
      <iframe
        src={link}
        className={'overflow-hidden border-0 self-center absolute top-0 left-0 w-full h-full'}
        allowFullScreen
        allow={"autoplay *; fullscreen *"}
      />
  );
};

export default IframePlayerKodik;