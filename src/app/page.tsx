import Image from "next/image";
//import Amplify from 'aws-amplify';
import { Amplify } from "aws-amplify";
import awsmobile from '../aws-exports';
//import { record } from 'aws-amplify/analytics';
import { configureAutoTrack } from 'aws-amplify/analytics';
import { record } from 'aws-amplify/analytics';
Amplify.configure(awsmobile);

configureAutoTrack({
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // REQUIRED, the event type, it's one of 'event', 'pageView' or 'session'
  type: 'pageView',
  // OPTIONAL, additional options for the tracked event.
  options: {
    // OPTIONAL, the attributes of the event
    attributes: {
      customizableField: 'attr'
    },
    appType: 'singlePage',

    // OPTIONAL, provide the URL for the event.
    urlProvider:  () => {
      // the default function
      return window.location.origin + window.location.pathname;
    }
  }
});

record({
  name: 'albumVisit',
  attributes: { genre: '', artist: '' },
});

export default function Home() {
  return (
    <h1>Hello, world!</h1>
  );
}
