import { gestureStrings, knowGestures } from "../util/gestures.js";

export default class HandGestureService {
  #gestoreEstimator;
  #handPoseDetection;
  #handsVersion;
  #detector = null;

  constructor({fingerpose, handPoseDetection, handsVersion }){
    this.#gestoreEstimator = new fingerpose.GestureEstimator(knowGestures);
    this.#handPoseDetection = handPoseDetection;
    this.#handsVersion = handsVersion;
  };
  
  async estimate(keypoints3D){
    const predictions = await this.#gestoreEstimator.estimate(
      this.#getLandMarksFromKeypoints(keypoints3D), 
      9 //porcentagem de confiança (90%).
    );
    return predictions.gestures;
  };
 
  async * detectGestures(predictions) {
    for(const hand of predictions){
      if(!hand.keypoints3D) continue;
      
      const gestures = await this.estimate(hand.keypoints3D);
      if(gestures.length === 0) continue;

      const result = gestures.reduce((previous, current) => 
        (previous.score > current.score) ? previous : current
      );

      const {x, y} = hand.keypoints.find(keypoint => keypoint.name === 'index_finger_tip');

      yield { event: result.name, x, y };
      console.log("detected", gestureStrings[result.name]);
      console.log({name : result.name});
    };
  };

  #getLandMarksFromKeypoints(keypoints3D){
    return keypoints3D.map(keypoint => [ keypoint.x, keypoint.y, keypoint.z ]);
  };

  async estimateHands(video) {
    return this.#detector.estimateHands(video, {
      flipHorizontal: true,
    });
  };

  async initializeDetector() {
    if(this.#detector) return this.#detector;

    const detectorConfig = {
      runtime: 'mediapipe', // or 'tfjs',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`,
      modelType: 'lite',
      maxHands: 2,
    };

    this.#detector = await this.#handPoseDetection.createDetector(
      this.#handPoseDetection.SupportedModels.MediaPipeHands, 
      detectorConfig
    );

    return this.#detector;
  };
};
