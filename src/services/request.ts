import { Observable, Observer } from "rxjs";

export const req = (method: string, endpoint: string, body: {} = {}) => {
  return new Observable((observer$: Observer<{}>) => {
    const request = new XMLHttpRequest();
    request.open(method, endpoint);
    request.setRequestHeader("content-type", "application/json");
    request.setRequestHeader("accept", "application/json");
    request.onload = () => {
      switch (request.status) {
        case 200:
          observer$.next(JSON.parse(request.response));
          observer$.complete();
          break;
        default:
          observer$.error(new Error(request.statusText));
          break;
      }
    };
    request.onerror = () => {
      observer$.error(new Error("An error occurred"));
    };
    request.send(JSON.stringify(body));
  });
};

// export const upload = (endpoint, files) => {
//     return Observable.create(observer$ => {
//         const request = new XMLHttpRequest()
//         request.open('POST', `${process.env.FS_API}${endpoint}`)

//         request.onload = () => {
//             switch(request.status) {
//                 case 200:
//                     observer$.next(JSON.parse(request.response))
//                     observer$.complete()
//                     break
//                 default:
//                     observer$.error(new Error(request.statusText))
//                     break
//             }
//         }
//         request.onerror = () => {
//             observer$.error(new Error('An error occurred'))
//         }
//         request.send(files)
//     })
// }
