/**
 * setp 3: Concurrent Mode
 */
async function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield) {
    await performUnitOfWork();
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

// 闲时执行
requestIdleCallback(workLoop);

let count = 0;

async function performUnitOfWork() {
  await sleep(20);
  // work
  console.log(count++);
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
