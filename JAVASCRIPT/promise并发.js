/**
 * 并发请求
 */

function concurRequest(urls, maxNum) {
  return new Promise((resolve, reject) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    let i = 0;
    const result = [];
    let count = 0;
    async function request() {
      if (i === urls.length) {
        return;
      }
      const index = i;
      const url = urls[i++];
      console.log(url, 'url');
      try {
        const resp = await fetch(url);
        result[index] = resp;
      } catch (err) {
        result[index] = err;
      } finally {
        // 判断所有请求完成
        count++;
        if (count === urls.length) {
          resolve(result);
          return;
        }
        request();
      }
    }
    const times = Math.min(maxNum, urls.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}
