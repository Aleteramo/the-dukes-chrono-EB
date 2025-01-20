declare module 'next/image' {
  import { ImgHTMLAttributes, DetailedHTMLProps } from 'react';

  interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    sizes?: string;
    className?: string;
  }

  export default function Image(props: ImageProps): JSX.Element;
}