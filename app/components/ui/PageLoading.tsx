// Libraries
import React, {useEffect, useRef, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import LovevibeLogo from 'public/images/logos/lovevibe.png';

interface PageLoadingProps {
  logoUrl?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({logoUrl}) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const backLoadingRef = useRef<HTMLDivElement>(null);
  const loadingWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (loadingRef) {
        loadingRef.current?.classList.add('animate__fadeOutRight');
        backLoadingRef.current?.classList.add('animate__fadeOutRight');
      }

      setTimeout(() => {
        loadingWrapperRef.current.remove();
      }, 1000);
    }, 2000);
  }, []);

  return (
    <div
      ref={loadingWrapperRef}
      className="fixed z-50 h-screen w-screen overflow-hidden"
    >
      <div
        ref={loadingRef}
        className={`animate__animated pointer-events-none absolute inset-0 z-50 flex size-full items-center justify-center bg-white`}
        style={{animationDuration: `2s`}}
      >
        <Image
          className="animate__animated animate__flash animate__infinite animate__slow"
          src={logoUrl}
          width={100}
        />
      </div>
      <div
        ref={backLoadingRef}
        className={`animate__animated absolute inset-0 bg-primary
        `}
        style={{animationDelay: 0.2 + 's'}}
      />
    </div>
  );
};

PageLoading.defaultProps = {
  logoUrl: LovevibeLogo,
};
