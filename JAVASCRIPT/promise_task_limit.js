function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
}

class SuperTask {
  constructor(maxCount = 2) {
    // 并发数量
    this.paralleCount = maxCount;
    // 正在运行的任务数
    this.runningCount = 0;
    this.tasks = [];
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this._run();
    });
  }
  // 依次运行tasks队列的任务
  _run() {
    while (this.runningCount < this.paralleCount && this.tasks.length) {
      const { task, reject, resolve } = this.tasks.shift();
      this.runningCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });
    }
  }
}

const superTask = new SuperTask();

function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10, 1); // 10s后输出，任务1 完成
addTask(5, 2); // 5s后输出，任务2 完成
addTask(3, 3); // 8s后输出，任务3 完成
addTask(4, 4); // 12s后输出，任务4 完成
addTask(5, 5); // 15s后输出，任务5 完成
