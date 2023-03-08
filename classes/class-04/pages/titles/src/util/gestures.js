const { GestureDescription, Finger, FingerCurl } = window.fp;

const scrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const scrollUpGesture = new GestureDescription('scroll-up'); // 🖐 
const clickGesture = new GestureDescription('click');
const rockNRoll = new GestureDescription('rock-n-roll');
//rock n roll
//-----------------------------------------------------------------------------
rockNRoll.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
rockNRoll.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
rockNRoll.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

for(let finger of [Finger.Middle, Finger.Ring]) {
  rockNRoll.addCurl(finger, FingerCurl.FullCurl, 0.9);
};

for(let finger of [Finger.Index, Finger.Pinky]) {
  rockNRoll.addCurl(finger, FingerCurl.NoCurl, 0.9); 
};

// Rock 
// -----------------------------------------------------------------------------
  
// thumb: half curled
// accept no curl with a bit lower confidence
scrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
scrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    scrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    scrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
};

// Paper
// -----------------------------------------------------------------------------
  
// no finger should be curled
for(let finger of Finger.all) {
    scrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}


// Click
// -----------------------------------------------------------------------------
clickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8)
clickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5)

clickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
clickGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.4)

clickGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0)
clickGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9)

clickGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0)
clickGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.9)

clickGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0)
clickGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.9)


const knowGestures = [
  scrollDownGesture, 
  scrollUpGesture,
  rockNRoll,
  clickGesture,
];

const gestureStrings = {
  'scroll-down': '✊️',
  'scroll-up': '🖐',
  'rock-n-roll': '🤘',
  'click': '🤏', 
};

export { knowGestures, gestureStrings };
