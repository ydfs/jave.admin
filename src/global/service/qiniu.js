import request from "./../request/axios.js";
import API from "./../request/api.js";
import * as qiniu from "qiniu-js";

const qiniuService = {
  token: ({ file_name }) => {
    return request.get(API.qiniuToken, { file_name }).then((res) => {
      return res.data;
    });
  },
  upload: ({
    file,
    token,
    key,
    mimeType = null,
    params = {},
    progressCallback,
  }) => {
    // mimeType = mimeType || ['image/*'];
    return new Promise((resolve, reject) => {
      const fname = file.name;
      const config = { useCdnDomain: true };
      const putExtra = { fname, params, mimeType };
      const observable = qiniu.upload(file, key, token, putExtra, config);
      observable.subscribe({
        next(res) {
          typeof progressCallback === "function" && progressCallback(res);
        },
        error(err) {
          reject(err);
        },
        complete(res) {
          resolve(res);
        },
      });
    });
  },
  store: ({ file_name, path }) => {
    return request.post(API.qiniuStore, { file_name, path });
  },
  start: async ({ file }, progressCallback) => {
    const file_name = file.name;
    const { token, key, url } = await qiniuService.token({ file_name });
    await qiniuService.upload({
      file,
      token,
      key,
      progressCallback,
    });

    await qiniuService.store({
      file_name,
      path: key,
    });

    return {
      imageUrl: url.preview,
      name: file_name,
    };
  },
};

export default qiniuService;
