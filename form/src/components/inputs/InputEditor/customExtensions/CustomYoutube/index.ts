import { mergeAttributes } from "@tiptap/core";
import Youtube from "@tiptap/extension-youtube";

import getEmbedUrlFromYoutubeUrl from "./getEmbedUrlFromYoutubeUrl";

const CustomYoutube = Youtube.extend({
  renderHTML({ HTMLAttributes }) {
    const _HTMLAttributes = { ...HTMLAttributes };

    const embedUrl = getEmbedUrlFromYoutubeUrl({
      url: _HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: _HTMLAttributes.start || 0,
    });

    _HTMLAttributes.src = embedUrl;
    _HTMLAttributes.style =
      "position: absolute; top: 0; left: 0; width: 100%; height: 100%;";

    return [
      "div",
      {
        "data-youtube-video": "",
        style:
          "position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;",
      },
      [
        "iframe",
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            width: this.options.width,
            height: this.options.height,
            allowfullscreen: this.options.allowFullscreen,
            autoplay: this.options.autoplay,
            ccLanguage: this.options.ccLanguage,
            ccLoadPolicy: this.options.ccLoadPolicy,
            disableKBcontrols: this.options.disableKBcontrols,
            enableIFrameApi: this.options.enableIFrameApi,
            endTime: this.options.endTime,
            interfaceLanguage: this.options.interfaceLanguage,
            ivLoadPolicy: this.options.ivLoadPolicy,
            loop: this.options.loop,
            modestBranding: this.options.modestBranding,
            origin: this.options.origin,
            playlist: this.options.playlist,
            progressBarColor: this.options.progressBarColor,
          },
          _HTMLAttributes
        ),
      ],
    ];
  },
});

export default CustomYoutube;
