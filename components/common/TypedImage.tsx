import React from "react";
import Image, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface TypedImageProps extends Omit<NextImageProps, "alt"> {
  /**
   * Descriptive alt text for assistive technology.
   * Pass alt="" explicitly ONLY for purely decorative images.
   */
  alt: string;
  className?: string;
}

export function TypedImage({ alt, className, ...props }: TypedImageProps) {
  // If alt is empty, mark as role="presentation" for accessibility
  const isDecorative = alt.trim() === "";

  return (
    <Image
      alt={alt}
      role={isDecorative ? "presentation" : undefined}
      aria-hidden={isDecorative ? true : undefined}
      className={cn("transition-opacity duration-300", className)}
      {...props}
    />
  );
}
