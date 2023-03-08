const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐 
const RockNRoll = new GestureDescription('rock-n-roll');
//rock n roll
//-----------------------------------------------------------------------------
RockNRoll.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
RockNRoll.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
RockNRoll.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

for(let finger of [Finger.Middle, Finger.Ring]) {
  RockNRoll.addCurl(finger, FingerCurl.FullCurl, 0.9);
};

for(let finger of [Finger.Index, Finger.Pinky]) {
  RockNRoll.addCurl(finger, FingerCurl.NoCurl, 0.9); 
};

// Rock 
// -----------------------------------------------------------------------------
  
// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
};
// Paper
// -----------------------------------------------------------------------------
  
// no finger should be curled
for(let finger of Finger.all) {
    ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

const knowGestures = [
  ScrollDownGesture, 
  ScrollUpGesture,
  RockNRoll,
];

const gestureStrings = {
  'scroll-down': '✊️',
  'scroll-up': '🖐',
  'rock-n-roll': '🤘'
};

export { knowGestures, gestureStrings };
