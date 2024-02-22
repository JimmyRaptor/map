function getFrames(from, to, step) {
  // 这里实现getFrames的逻辑
}

self.addEventListener("message", (event) => {
  const { from, to, step } = event.data;
  const frames = getFrames(from, to, step);
  self.postMessage({ frames });
});
