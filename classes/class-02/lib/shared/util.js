function suportsWorkerType(){
  let supports = false;
  const tester = {
    get type() { supports = true }
  }
  try {
    new Worker('blob://', tester).terminate();//for afraid memory link,the scaping, this form went end Worker, end the process.
  } finally {
    return supports; 
  };
};

function prepareRunChecker({ timerDelay }){
  let lastEvent = Date.now();
  return {
    shouldRun() {
      const result = (Date.now() - lastEvent) > timerDelay;
      if(result) lastEvent = Date.now();

      return result;
    },
  };
};
export { 
  prepareRunChecker,
  suportsWorkerType
};
