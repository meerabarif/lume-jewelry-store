import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Lumé Fine Jewelry',
  className = '',
  containerClassName = '',
  fallbackSrc,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Default elegant fallback: Warm soft beige background with shimmering champagne tone
  const defaultFallback =
    fallbackSrc ||
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22600%22 height%3D%22600%22 viewBox%3D%220 0 600 600%22%3E%3Crect width%3D%22600%22 height%3D%22600%22 fill%3D%22%23F4F0EA%22%2F%3E%3Ccircle cx%3D%22300%22 cy%3D%22300%22 r%3D%22120%22 fill%3D%22none%22 stroke%3D%22%23D4AF37%22 stroke-width%3D%221.5%22 stroke-dasharray%3D%224 4%22%2F%3E%3Ctext x%3D%2250%25%22 y%3D%2248%25%22 dominant-baseline%3D%22middle%22 text-anchor%3D%22middle%22 font-family%3D%22Georgia%2C serif%22 font-size%3D%2232%22 font-style%3D%22italic%22 fill%3D%22%232C221E%22%3ELum%C3%A9%3C%2Ftext%3E%3Ctext x%3D%2250%25%22 y%3D%2255%25%22 dominant-baseline%3D%22middle%22 text-anchor%3D%22middle%22 font-family%3D%22sans-serif%22 font-size%3D%2212%22 letter-spacing%3D%224%22 fill%3D%22%238C7D75%22%3EARTISANAL JEWELRY%3C%2Ftext%3E%3C%2Fsvg%3E';

  return (
    <div className={`relative overflow-hidden bg-[#F4F0EA] ${containerClassName}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#F4F0EA] animate-pulse flex items-center justify-center">
          <span className="font-serif italic text-xs text-[#D4AF37]/50 tracking-widest">Lumé</span>
        </div>
      )}
      <img
        src={error ? defaultFallback : src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
