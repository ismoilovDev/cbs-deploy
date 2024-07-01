'use client';

import React from "react";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import NextJsSliderImage from "./slider-image";
import "yet-another-react-lightbox/styles.css";


export function Slider({ open, setOpen, sources }: { open: boolean, setOpen: any, sources: Slide[] }) {

   return (
      <Lightbox
         open={open}
         slides={sources}
         plugins={[Zoom]}
         carousel={{ finite: true, imageFit: "contain", }}
         close={() => setOpen(false)}
         render={{ slide: NextJsSliderImage }}
      />
   )
}
