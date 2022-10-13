// /////////////////////////////////////////////////
// 19. 콜백을 Promise로 변경하는 범용 함수 만들기
// function findServer(it, key, cb){ //<== 여기와
//     for(let i =0; i <it.length; ++i)
//         if( key == it[i])
//         {
//             setTimeout( ()=>cb(i), 2000);
//             return;
//         }
//     setTimeout( () => cb(), 1500);
// }

// const callbackToPromise = 
// (fn) => {
//     return ((arr,key) =>{
//         return new Promise((res,rej)=>{
//             fn(arr,key, (i)=>{
//                 if(i === undefined)
//                     throw Error('error');
//                 else
//                     res(i);
//             });
//         });
//     });
// }
// findServerPromise = callbackToPromise(findServer);
// ////// client code
// console.log("독립적인 작업!!!");
// findServerPromise([15,17,23,50,60], 23)
//     .then((result)=>{
//         console.log("1 key : ", result); }
//     ).catch( (err)=>{
//         console.log('catch:', err);
//     });

// /////////////////////////////////////////////////
// 18. Promise를 지원하지 않는 find()함수를 Promise 를 지원하도록 변경
// function findServer(it, key, cb){ //<== 여기와
//     for(let i =0; i <it.length; ++i)
//         if( key == it[i])
//         {
//             setTimeout( ()=>cb(i), 2000);
//             return;
//         }
//     setTimeout( () => cb(), 1500);
// }

// const findServerPromise = (arr,key) =>{
//     return new Promise((res,rej)=>{
//         findServer(arr,key, (i)=>{
//             if(i === undefined)
//                 throw Error('error');
//             else
//                 res(i);
//         });
//     })
// }
// ////// client code
// console.log("독립적인 작업!!!");
// findServerPromise([15,17,23,50,60], 23)
//     .then((result)=>{
//         console.log("1 key : ", result); }
//     ).catch( (err)=>{
//         console.log('catch:', err);
//     });


///////////////////////////////////////
// 17. find()함수  Promise  객체  이용한 async-await 비동기 처리
/////// server code
// function findServer(it, key){
//     return new Promise((resolve,reject)=>{
//         for(let i =0; i <it.length; ++i)
//             if( key == it[i])
//             {
//                 setTimeout( ()=> resolve({idx:i, data:key}), 2000);
//                 return;
//             }
//         setTimeout( () => reject("key를 찾지 못함!!"), 1500);
//     });
// }

// //// client code
// async function taskAsync(){
//     try{
//         let result = await findServer([15,17,23,50,60], 23);
//         console.log("1. data:", result.idx, result.data);
//         result = await findServer([15,17,23,50,60], 17);
//         console.log("2. data:", result.idx, result.data);
//         result = await findServer([15,17,23,50,60], 60);
//         console.log("3. data:", result.idx, result.data);
//         console.log("all done!");
//     }
//     catch( err )
//     {
//         console.log("error : " , err);
//     }
// }

// taskAsync();
///////////////////////////////////////////////////////////////


// 16. find()함수  Promise  객체를 이용한 콜백함수 비동기 처리
////// server code
// function findServer(it, key){
//     return new Promise((resolve,reject)=>{
//         for(let i =0; i <it.length; ++i)
//             if( key == it[i])
//             {
//                 setTimeout( ()=> resolve({idx:i, data:key}), 2000);
//                 return;
//             }
//         setTimeout( () => reject("key를 찾지 못함!!"), 1500);
//     });
// }
// ////// client code
// findServer([15,17,23,50,60], 23)
//     .then( (result) => {
//         console.log("1. data:", result.idx, result.data);
//         return findServer([15,17,23,50,60], 17);
//     })
//     .then( (result) => {
//         console.log("2. data:", result.idx, result.data);
//         return findServer([15,17,23,50,60], 60);
//     })
//     .then( (result) => {
//         console.log("3. data:", result.idx, result.data);
//         console.log("all done!");
//     })
//     .catch( (err)=>{
//         console.log("error: " , err);
//     });

// 15. find()함수 기존 예제 불러오기
////// server code
// function findServer(it, key, cb){
//     for(let i =0; i <it.length; ++i)
//         if( key == it[i])
//         {
//             setTimeout( ()=>cb(undefined,i, key), 2000);
//             return;
//         }
//     setTimeout( () => cb("key를 찾지 못함!!"), 1500);
// }

////// client code
// findServer([15,17,23,50,60], 23, (err, i,key) => { 
//     console.log("key : ", i, key);
//     findServer([15,17,23,50,60], 17, (err, i,key)=>{
//         console.log("data:", i, key);
//         findServer([15,17,23,50,60], 60, (err, i, key)=>{
//             if(err == undefined)
//             {
//                 console.log("data:", i, key);
//                 console.log("done!!!!!");
//             }
//             else{
//                 console.log("error:", err);                
//             }
//         }); //3.
//     }); //2.
// }); //1.


// 14-2. async-await 를 이용한 비동기 함수 실행 제어( reject 에러)
// function fAsync1() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:1");
//         console.log("Promise:2");
//         reject("error msg");
//         return;
//         console.log("Promise:3");
//         resolve("done!!!");
//     });
// }
// function fAsync2() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:4");
//         console.log("Promise:5");        
//         resolve("2 done!!!");
//     });
// }
// function fAsync3() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:6");
//         console.log("Promise:7");        
//         resolve("3 done!!!");
//     });
// }
// async function taskAsync()
// {
//     try{
//         let result = await fAsync1();
//         console.log("Promise run : ", result);
//         result = await fAsync2();
//         console.log("2 Promise run : ", result);    
//         result = await fAsync3();
//         console.log("3 Promise run : ", result);  
//         console.log(" all done!");
//     }catch( err )
//     {
//         console.log("error:", err);
//     }
// }
// taskAsync();



// 14. async-await 를 이용한 비동기 함수 실행 제어
function fAsync1() {
    return new Promise((resolve, reject)=>{
        console.log("Promise:1");
        console.log("Promise:2");
        console.log("Promise:3");
        resolve("done!!!");
    });
}
function fAsync2() {
    return new Promise((resolve, reject)=>{
        console.log("Promise:4");
        console.log("Promise:5");        
        resolve("2 done!!!");
    });
}
function fAsync3() {
    return new Promise((resolve, reject)=>{
        console.log("Promise:6");
        console.log("Promise:7");        
        resolve("3 done!!!");
    });
}

async function taskAsync()
{
    let result = await fAsync1();
    console.log("Promise run : ", result);
    result = await fAsync2();
    console.log("2 Promise run : ", result);    
    result = await fAsync3();
    console.log("3 Promise run : ", result);  
    console.log(" all done!");
}

taskAsync();


// 13-2. 비동기 함수 실행중 reject 발생
// function fAsync1() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:1");
//         reject("error fAsync2()");
//         return;
//         console.log("Promise:2");
//         console.log("Promise:3");
//         resolve("done!!!");
//     });
// }
// function fAsync2() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:4");

//         console.log("Promise:5");        
//         resolve("2 done!!!");
//     });
// }
// function fAsync3() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:6");
//         console.log("Promise:7");        
//         resolve("3 done!!!");
//     });
// }

// fAsync1().then((result)=>{
//     console.log("Promise run : ", result);
//     return fAsync2();
// }).then((result)=>{
//     console.log("2 Promise run : ", result);    
//     return fAsync3();
// }).then((result)=>{
//     console.log("3 Promise run : ", result);  
//     console.log(" all done!");
// }).catch((err)=>{
//     console.log("err Promise run : ", err);
// });
// console.log('main done');


// 13. Promise 객체를 이용한 비동기 함수 순서 지키기
// const pro1 = new Promise((resolve, reject)=>{
//         console.log("Promise:1");
//         console.log("Promise:2");
//         console.log("Promise:3");
//         resolve("done!!!");
//     });

// function fAsync2() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:4");
//         console.log("Promise:5");        
//         resolve("2 done!!!");
//     });
// }
// function fAsync3() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:6");
//         console.log("Promise:7");        
//         resolve("3 done!!!");
//     });
// }

// pro1.then((result)=>{
//     console.log("Promise run : ", result);
//     return fAsync2();
// }).then((result)=>{
//     console.log("2 Promise run : ", result);    
//     return fAsync3();
// }).then((result)=>{
//     console.log("3 Promise run : ", result);  
//     console.log(" all done!");
// }).catch((err)=>{
//     console.log("err Promise run : ", err);
// });

// console.log('main done');



// 12. Promise 객체를 반환하는 함수()
// function fAsync() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:1");
//         console.log("Promise:2");
//         console.log("Promise:3");
//         resolve("done!!!");
//     });
// }
// function fAsync2() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:4");
//         console.log("Promise:5");        
//         resolve("2 done!!!");
//     });
// }
// function fAsync3() {
//     return new Promise((resolve, reject)=>{
//         console.log("Promise:6");
//         console.log("Promise:7");        
//         resolve("3 done!!!");
//     });
// }

// fAsync().then((result)=>{
//     console.log("Promise run : ", result);
//     return fAsync2();
// }).then((result)=>{
//     console.log("2 Promise run : ", result);
//     const pro = fAsync3();
//     return pro;
// }).then((result)=>{
//     console.log("3 Promise run : ", result);  
//     console.log(" all done!");
// }).catch((err)=>{
//     console.log("err Promise run : ", err);
// });


// 11. Promise 객체의 resolve, reject 처리
// const pro = new Promise((resolve, reject)=>{
//     console.log("Promise:1");
//     //if(에러가 있다면..)
//     reject("error msg");
//     return;
//     console.log("Promise:2");

//     console.log("Promise:3");

//     resolve("done!!!");
// });

// pro.then((result)=>{
//     console.log("Promise run : ", result);
// }).catch((err)=>{
//     console.log("Promise run : ", err);
// });

// 10. Promise 객체의 resolve 처리
// const pro = new Promise((resolve, reject)=>{
//     console.log("Promise:1");
//     console.log("Promise:2");
//     console.log("Promise:3");
//     resolve("done!!!");
// });

// pro.then((result)=>{
//     console.log("Promise run : ", result);
// });


// 9. Promise 객체 생성
// new Promise((resolve, reject)=>{
//     console.log("Promise:1");
//     console.log("Promise:2");
//     console.log("Promise:3");    
// });


// 8. find() 함수가 비동기 함수이면서 순서대로 처리해하한다면
// 콜백함수를 화살표 함수로 변경
// function findServer(it, key, cb){ //<== 여기와
//     for(let i =0; i <it.length; ++i)
//         if( key == it[i])
//         {
//             setTimeout( ()=>cb(undefined,i, key), 2000);
//             return;
//         }
//     setTimeout( () => cb("key를 찾지 못함!!"), 1500);
// }

// ////// client code
// findServer([15,17,23,50,60], 23, (err, i,key)=>{ // callbackfunction
//     console.log("1 key : ", i, key);
//     findServer([15,17,23,50,60], 17, (err, i,key)=>{
//         console.log("2 data:", i, key);
//         findServer([15,17,23,50,60], 60, (err, i, key)=>{
//             if(err == undefined)
//             {
//                 console.log("3 data:", i, key);
//                 console.log("4 done!!!!!"); //마지막.
//             }
//             else{
//                 console.log("error:", err);                
//             }
//         }); //3.        
    
//     }); //2. 
// }); //1.
// console.log("독립적인 작업!!!");


// 7. find() 함수가 비동기 함수이면서 순서대로 처리해하한다면(순서가 있음)
// function findServer(it, key, cb){ //<== 여기와
//     for(let i =0; i <it.length; ++i)
//         if( key == it[i])
//         {
//             setTimeout( ()=>cb(undefined,i, key), 2000);
//             return;
//         }
//     setTimeout( () => cb("key를 찾지 못함!!"), 1500);
// }

// ////// client code
// function handleClient(err, i,key){ // callbackfunction
//     console.log("key : ", i, key);
//     findServer([15,17,23,50,60], 17, (err, i,key)=>{
//         console.log("data:", i, key);
//         findServer([15,17,23,50,60], 60, (err, i, key)=>{
//             if(err == undefined)
//             {
//                 console.log("data:", i, key);
//                 console.log("done!!!!!"); //마지막.
//             }
//             else{
//                 console.log("error:", err);                
//             }
//         }); //3.
        
    
//     }); //2.
    
// }

// findServer([15,17,23,50,60], 23, handleClient); //1.


// 6. find() 함수가 긴 작업의 함수라면 모의 비동기 함수로 변경(순서가 없음)
// function findServer(it, key, cb){ //<== 여기와
//     for(let i =0; i <it.length; ++i)
//         if( key == it[i])
//         {
//             setTimeout( ()=>cb(undefined,i, key), 2000);
//             return;
//         }
//     setTimeout( () => cb("key를 찾지 못함!!"), 1500);
// }

// ////// client code
// function handleClient(err, i,key){ // callbackfunction
//     console.log("key : ", i, key);
// }

// findServer([15,17,23,50,60], 23, handleClient); //1.
// findServer([15,17,23,50,60], 17, (err, i,key)=>{console.log("data:", i, key);}); //2.
// findServer([15,17,23,50,60], 100, (err, i, key)=>{
//     if(err == undefined)
//     {
//         console.log("data:", i, key);
//     }
//     else{
//         console.log("error:", err);
//     }
// }); //3.
// console.log("done!!!!!"); //마지막.



// 5. 원소가 없을 때 find() 함수 처리
// function findServer(it, key, cb){ //<== 여기와
//     for(let i =0; i <it.length; ++i)
//         if( key == it[i])
//         {
//             cb(undefined,i, key); //<== 여기가 빠짐
//             return;
//         }
//     cb("key를 찾지 못함!!");
// }

// ////// client code
// function handleClient(err, i,key){ // callbackfunction
//     console.log("key : ", i, key);
// }
// findServer([15,17,23,50,60], 23, handleClient); 
// findServer([15,17,23,50,60], 23, (err, i,key)=>{console.log("data:", i, key);});
// findServer([15,17,23,50,60], 100, (err, i, key)=>{
//     if(err == undefined)
//     {
//         console.log("data:", i, key);
//     }
//     else{
//         console.log("error:", err);
//     }
// });


// 4. setTimeout()을 이용한 긴 작업 구현과 콜백 Hell
// function longTask1(num,  cb )
// {
//     console.log('start longtask:', num);

//     setTimeout(()=>{        
//         cb(num);
//     }, Math.floor(Math.random()*5000)+1000);
// }
// function longTask2(num,  cb )
// {
//     console.log('start longtask:', num);

//     setTimeout(()=>{        
//         cb(num);
//     }, Math.floor(Math.random()*5000)+1000);
// }
// function longTask3(num,  cb )
// {
//     console.log('start longtask:', num);

//     setTimeout(()=>{        
//         cb(num);
//     }, Math.floor(Math.random()*5000)+1000);
// }

// longTask1( 1, (r)=>{console.log('end longtask:', r); } );
// longTask2( 2, (r)=>{
//     console.log('end longtask:', r); 
//     //if(오류 없어?)
//     longTask3( 3, (r)=>{
//         console.log('end longtask:', r); 
//         //if(오류 없어?)
//         // 다음 작업......................
//     } );        
// } );

// 3. 긴 시간의 작업을 수행하는 함수와 콜백
// function longTask(num,  cb )
// {
//     console.log('start longtask:', num);

//     cb(num);
// }
// longTask( 1, (r)=>{console.log('end longtask:', r); } );

// 2. 콜백함수를 이용한 find()   예제
// //////// server code
// function findServer(lt, key, cb) //callbackfunction
// {
//     for(let i = 0 ; i < lt.length; ++i)
//         if( key == lt[i])
//         {
//             cb(i, key);
//             return;
//         }
// }
// ////////// client code
// function handleClient(i,key)
// {
//     console.log("key : ", i, key);
// }
// findServer([15,17,23,50,60], 23, handleClient);
// findServer([15,17,23,50,60], 23, (i,key)=>{console.log("data:",i,key);});  //callback function

// 1. 클라이언트 코드와 서비스 코드 find()   예제
// //////// server code
// function findServer(lt, key)
// {
//     for(let i = 0 ; i < lt.length; ++i)
//         if( key == lt[i])
//         {
//             console.log("item:", i, key);
//             return;
//         }
// }
// ////////// client code
// findServer([15,17,23,50,60], 23);

// console.log("hello nodejs");
// console.log("hello nodejs");
// console.log("hello nodejs");
// console.log("hello nodejs");
// console.log("hello nodejs");