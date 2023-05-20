/**
 * 函数开始
 * fetch
 * 引发错误
 * 函数结束
 * fetch结束 得到数据 缓存数据
 *
 * 第二次执行
 * 函数开始
 * fetch
 * 交付data
 * 函数继续
 * 函数结束
 * @returns
 */
function getUser() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => resolve('1111'), 3000);
  //   });
  return fetch();
}

function m1() {
  // other work
  return getUser();
}

function m2() {
  // other work
  return m1();
}

function m3() {
  // other work
  return m2();
}

function main() {
  // other work
  const user = m3();
  console.log(user);
}

function run(func) {
  let caches = [];
  let i = 0;
  const _originFetch = window.fetch;
  // 发起请求
  window.fetch = (...args) => {
    if (caches[i]) {
      if (caches[i].status === 'fulfilled') {
        return caches[i].data;
      } else if (caches[i].status === 'rejected') {
        return caches[i].err;
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null,
    };
    caches[i++] = result;
    const prom = _originFetch(...args)
      .then((resp) => resp.json())
      .then(
        (resp) => {
          result.status = 'fulfilled';
          result.data = resp;
        },
        (err) => {
          result.status = 'rejected';
          result.err = err;
        },
      );
    // 报错
    throw prom;
  };

  try {
    func();
  } catch (err) {
    if (err instanceof Promise) {
      function reRun() {
        func();
        i = 0;
      }
      err.then(reRun).catch(reRun);
    }
  }
}

run(main);
