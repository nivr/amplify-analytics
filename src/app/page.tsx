"use client";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import awsmobile from "../aws-exports";
import { configureAutoTrack } from "aws-amplify/analytics";
import { record } from "aws-amplify/analytics";
Amplify.configure(awsmobile);

configureAutoTrack({
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // REQUIRED, the event type, it's one of 'event', 'pageView' or 'session'
  type: "pageView",
  // OPTIONAL, additional options for the tracked event.
  options: {
    // OPTIONAL, the attributes of the event
    attributes: {
      customizableField: "attr",
    },
    appType: "singlePage",

    // OPTIONAL, provide the URL for the event.
    urlProvider: () => {
      // the default function
      return window.location.origin + window.location.pathname;
    },
  },
});

export default function Home() {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");

    // Get the referrer
    const referrer = document.referrer;

    // Get the browser and operating system
    const userAgent = navigator.userAgent;

    record({
      name: "pageViewCustomEvent",
      attributes: {
        urlFull: window.location.origin + window.location.pathname,
        urlRelative: window.location.pathname,
        utmSource,
        utmMedium,
        utmCampaign,
        referrer,
        userAgent,
        propOne: "Green",
        propTwo: "Orange",
      },
    });
  }
  return <h1>Hello, world!</h1>;
}
