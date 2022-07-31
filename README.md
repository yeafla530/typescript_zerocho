# ts-all-in-one
- [typescript 공식문서](https://www.typescriptlang.org/)
- [typescript 플레이그라운드](https://www.typescriptlang.org/play)
- [typescript 핸드북 필독](https://www.typescriptlang.org/docs/handbook/intro.html)
- [typescript 버전 수정 내역](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)



## 실습할 자료 링크(소스 코드 버전에 따라 변동 가능)
- [axios](https://github.com/axios/axios/blob/v1.x/index.d.ts)
- [react](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)
- [nodejs](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts)
- [express](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts)
- [jQuery](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/JQuery.d.ts)
- [redux](https://github.com/reduxjs/redux/blob/master/src/index.ts)

애초에 ts인 redux, 패키지 내부에서 d.ts를 제공하는 axios, @types 패키지가 별도로 존재하는 react, node, express, jquery로 구분됨. @types는 DefinitelyTyped라는 프로젝트로, 커뮤니티에서 라이브러리 타이핑을 제공하는 것.



## 강의 진행 방향

* 타입스크립트는 문법도 중요하나 남이 사용한 타입을 분석하는 능력이 중요 
* 웹게임 만들기는 TS교육에 알맞지 않았음
* 남이쓴 복잡한 타입을 분석하는 방향으로 강의 진행
* 핸드북 쭉 읽고 TS 1.1부터 역방향으로 최신 기능들까지 읽기
* 라이브러리의 타입을 분석하고 응용하고 수정하기가 강의 목적



## TS로 변환시

* TS가 JS보다 안정적
* 황당한 에러들을 줄여줌
* JS보다 자유도는 줄어듦



## 기본 지식

- 메인 룰: **⭐typescript는 최종적으로 javascript로 변환**된다. 순전한 typescript 코드를 돌릴 수 있는 것은 deno(=tsc와 같은 기능)이나 대중화되지가 않았음. 브라우저, 노드는 모두 js 파일을 실행한다.
- **typescript는 언어이자 컴파일러(tsc)**이다. **컴파일러는 ts 코드를 js로 바꿔준다**.
- **tsc는 tsconfig.json(tsc --init 시 생성)에 따라 ts 코드를 js(tsc 시 생성)로 바꿔준다.** 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 **tsconfig.json 설정을 반드시 봐야한다**.
- 단순히 **타입 검사만 하고싶다면 tsc --noEmit** 하면 된다.
  - **tsc에서 컴파일 뿐 아니라 타입검사**도 진행
- 개인 의견: tsconfig.json에서 그냥 **esModuleInterop: true, strict: true 두 개만 주로 켜놓는 편. strict: true가 핵심**임.
- ts 파일을 실행하는 게 아니라 **결과물인 js를 실행**해야 한다.
- **에디터가 필수가 됨**. VS Code나 웹스톰 반드시 필요. 메모장으로 코딩 불가능한 지경에 이름.



## 시작

* vscode, node 설치
* 폴더 생성 후 `npm init -y`실행 > package.json 생성됨
* 해당 폴더가 `node 프로젝트가 됨` 
* package.json은 node 프로젝트의 설정들을 모아놓은 파일
* `npm i typescript` 실행 > tsc 실행할 수 있게 됨
* `npx tsc` 실행 > 명령어 사용법 나옴
* `npx tsc --init ` > tsconfig.json 생성됨
* **tsconfig.json** > `"allowJs": true` 주석 해제
  * "allowJs": ts, js 동시에 쓸 수 있음
  * "target": "es2016" == ts를 es2016으로 변경, ES3까지 가능
  * "module":어떤 모듈 시스템 쓸건지 (ES2022, commonjs 등)
  * "strict":true **필수** > false시 ts쓰는 의미가 줄어든다



## ts 문법

- 기본적으로 **변수**, 속성, **매개변수**, 리턴값에 **타입이 붙었다**고 생각하면 됨.
```typescript
const a: string = '5';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
// 쓰지말기 - 어떤 타입이든 쓸 수 있음
// any 쓰는 상황을 줄이기
const f: any = true;
// true만 받기
const g: true = true;
// 5만 받기
const h: 5 = 5;

// 중급
// const f: symbol = Symbol.for('abc');
// const g: bigint = 10000000n;


/////////////////// 타입 정의 방법 /////////////////
// 자리 헷갈릴때
// 1. 콜론(:)을 찾는다
// 2. 뒤를 지워본다 const add = (x, y) => x + y
// 3. 말이되는 js가 되어야 한다

//////////// 1. 함수
function add(x: number, y: number): number {return x + y}


/////////// 2. 화살표 함수
// => number : return 값이 number
// const add: (x:number, y:number) => number = (x, y) => x + y;
type Add = (x:number, y:number) => number
const add1: Add = (x, y) => x + y;

/////////// 3. interface - 핵심
// 흔치는 않음
interface Add2 {
    (x: number, y:number): number
}
const add2: Add2 = (x, y) => x + y;

//////////// 4. object
const obj: {lat: number, lon: number} = {lat: 37.5, lon: 127.5}

/////////// 5. 배열
const arr: string[] = ['123', '456']
const arr2: number[] = [123, 456]
// 제네릭 방법 - 어려움
const arr3: Array<number> = [123, 456]
// 튜플 - 길이도 동일해야함
const arr4: [number, number, string] = [123, 456, 'hello']
```
- ts가 추론해주는 타입이 있는데 이런 건 그냥 그대로 사용하면 됨. **ts가 추론하지 못하는 경우에만 직접 타이핑**할 것.
```typescript
const a = 5;
const b = '3';
const c = a + b;
// return 생략해도 추론 가능
function add(x: number, y: number) { return x + y }
```
- **: 뒷부분, as 뒷부분, <> 부분, interface, type, function 일부를 제외하면 자바스크립트와 동일. 제외하고 생각**하는 연습을 초반에 해야 함.
```typescript
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
const obj = { lat: 37.5, lon: 127.5 };

const a = document.querySelector('#root') as HTMLDivElement;
const a = document.querySelector('#root');

function add<T>(x: T, y: T): T { return x + y }
function add(x, y) { return x + y }

interface A {};
type A = {};
```
- 자바스크립트에 비해서 자유도가 확 줄어듦(ex: 변수에 문자열을 넣었다가 숫자로 바꾸는 등의 행동 어려워짐)
```typescript
let x = 5;
x = 'hello';
```
- **any를 최대한 쓰지 않는 것을 목표로 할 것.**
- **never, unknown, any 타입 주의**하기. any는 최대한 피하고 쓰더라도 나중에 꼭 제대로 타이핑하기.
[never 좋은 설명 글](https://ui.toast.com/weekly-pick/ko_20220323)
```typescript
try {
    // 빈배열 : never[] 
    // const array = [];
    const array: string[] = [];
    array[0];
} catch(err) {
    err 
}
```
- 최대한 **! 대신 if를 쓸 것**
  - Element||null일 경우 어떤게 나오든 상관없이 실행하겠다는 의미로 !사용 (null이 나오지 않는다는 강한 믿음이 있을 때 사용함)
```typescript
const head:Element = document.querySelector('#head')!;
console.log(head);

// 안전 
const head2 = document.querySelector('#head');
if (head2) {
    head2.innerHTML = 'hello wordl'
  	console.log(head);
}
```
- string과 String은 다름. 소문자로 하는 것 기억하기.
```typescript
const a: string = 'hello';
const b: String = 'hell';
```
- 템플릿 리터럴 타입이 존재(유니언 등 사용 가능)
```typescript
type World = "world" | "hell";

// type Greeting = "hello world"
type Greeting = `hello ${World}`;
```
- 배열, 튜플 문법
```typescript
let arr: string[] = [];
let arr2: Array<string> = [];
function rest(...args: string[]) {}

const tuple: [string, number] = ['1', 1];
tuple[2] = 'hello';
tuple.push('hello');
```
- enum, keyof, typeof
```typescript
// 변수들 하나의 그룹으로 묶고 싶을 때 사용
// js로 안남음
const enum Edirection {
    Up,
    Down,
    Left,
    Right,
}
const aaa = Edirection.Up;
const bbb = Edirection.Left;


// js로 남음
// 웬만하면 남기는게 좋음
// as const : 이 값 그대로 사용하겠다 (ODirection.Up type number > 0 으로 정의 )
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
 
EDirection.Up;
           
(enum member) EDirection.Up = 0
 
ODirection.Up;
           
(property) Up: 0
 
// Using the enum as a parameter
// dir : Edirection 4개지 원소중 하나여야 함
function walk(dir: EDirection) {}
 
// It requires an extra line to pull out the keys
// enum과 동일한 기능
type Direction = typeof ODirection[keyof typeof ODirection]
function run(dir: Direction) {}
// keyof 설명 - key만 뽑아냄
const obj1 = {a: '123', b: 'hello', c: 'world'}
const obj2 = {a: '123', b: 'hello', c: 'world'} as const;

type Key = keyof typeof obj1; // key : 'a' | 'b'| 'c'
type Key2 = typeof obj2[keyof typeof obj2]; // value :'123' | 'hello'| 'world'

 
walk(EDirection.Left);
run(ODirection.Right);
```
- 객제 타이핑: type과 interface 구분하기
```typescript
// 간단 버전은 type
type A = { a: string };
const aaaa: A = { a: 'hello' };

// 객체지향 하고 싶을 때 사용
interface B { a: string }
const bbbb: B = { a: 'hello' };
```
- union, intersection
```typescript
// union - 단, 타입추론을 잘 못한다
function add(x: string | number, y: string | number): string | number { return x + y }
add(1, 2)
add('1', '2')
add(1, '2')

type A = {
    a: string;
}
type B = {
    b: string;
}

const aa: A | B = { a: 'hello', b: 'world' };
const bb: A & B = { a: 'hello', b: 'world' };



type Animal = {breath: true};
type Poyouryu = Animal & {bread: true};
type Human = Poyouryu & {think: true};

const zerocho: Human = {breath: true, bread: true, think: true}
```
- interface끼리는 서로 합쳐짐.
```typescript
interface A { a: string }
interface A { b: string }
const obj1: A = { a: 'hello', b: 'world' }

type B = { a: string }
type B = { b: string }
const obj2: B = { a: 'hello', b: 'world' }
```

- 객체 리터럴은 잉여 속성 검사가 있음.
```typescript
type A = { hello: string };
const a: A = { hello: 'world', why: 'error' };

const b = { hello: 'world', why: 'error' };
const c: A = b;

interface AA {
    breath: true

}
// 확장 {breath: true} & {bread: true}
interface BB extends AA {
    bread: true
}

const d: BB = {breath: true, bread: true}
```

- void 타입은 return값을 사용하지 안 겠다는 뜻(메서드나 매개변수에서는 리턴값 사용 가능, but 조심해야 함)
```typescript
declare function forEach<T>(arr: T[], callback: (el: T) => undefined): void;
// declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
let target: number[] = [];
forEach([1, 2, 3], el => target.push(el));

interface A {
    talk: () => void;
}
const a: A = {
    talk() { return 3; }
}
```
- 타입만 선언하고 싶을 때 declare(구현은 다른 파일에 있어야 함)
```typescript
declare const a: string;
declare function a(x: number): number;
declare class A {}

// 추후 declare module, declare global, declare namespace도 배움
```

- 타입간 대입 가능 표
![image](https://user-images.githubusercontent.com/10962668/179646513-3c3be896-3bbc-4784-848b-06bc47e8b129.png)

- 타입 가드
```typescript
function numOrStr(a: number | string) {
  if (typeof a === 'string') {
    a.split(',');  
  } else {
    a.toFixed(1);
  }
}

function numOrNumArr(a: number | number[]) {
  if (Array.isArray(a)) {
    a.slice(1);  
  } else {
    a.toFixed(1);
  }
}

type B = { type: 'b', bbb: string };
type C = { type: 'c', ccc: string };
type D = { type: 'd', ddd: string };
type A = B | C | D;
function typeCheck(a: A) {
  if (a.type === 'b') {
    a.bbb;
  } else if (a.type === 'c') {
    a.ccc;
  } else {
    a.ddd;
  }
}

interface Cat { meow: number }
interface Dog { bow: number }
function catOrDog(a: Cat | Dog): a is Dog {
  if ((a as Cat).meow) { return false }
  return true;
}
const cat: Cat | Dog = { meow: 3 }
if (catOrDog(cat)) {
    console.log(cat.meow);
}
if ('meow' in cat) {
    console.log(cat.meow);
}

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === 'rejected';
const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]);
const errors = promises.filter(isRejected);
```
class인 경우 instanceof 연산자도 가능!
- readonly
```typescript
interface A {
  readonly a: string;
  b: string;
}
```
- class에 private, protected 추가됨
```typescript
class B implements A {
  private a: string;
  protected b: string;
}
class C extends B {}
new C().a;
new C().b;
```
- abstract class, abstract method
```typescript
abstract class X {
  abstract work(user: User): boolean;
}
class Y extends X {
  work(user: User): boolean {
    return true;
  }
}
```
- abstract class, abstract 생성자
```typescript
const constructor: abstract new (...args: any) => any = ...
```
- class vs interface

런타임에서 있냐 없냐.

- optional
```typescript
function abc(a: number, b?: number, c: number?) {}
abc(1)
abc(1, 2)
abc(1, 2, 3)

let obj: { a: string, b?: string }  = { a: 'hello', b: 'world' }
obj = { a: 'hello' };
```

- 제네릭은 타입에 대한 함수라고 생각하면 됨. 추론을 활용하기
```typescript
function add<T>(x: T, y: T): T { return x + y }
add<number>(1, 2);
add(1, 2);
add<string>('1', '2');
add('1', '2');
add(1, '2');
```
- 제네릭 선언 위치 기억하기
```typescript
function a<T>() {}
class B<T>() {}
interface C<T> {}
type D<T> = {};
const e = <T>() => {};
```
- 제네릭 기본값, extends
```typescript
function add<T extends string>(x: T, y: T): T { return x + y }
add(1, 2);
add('1', '2')

// <T extends {...}> // 특정 객체
// <T extends any[]> // 모든 배열
// <T extends (...args: any) => any> // 모든 함수
// <T extends abstract new (...args: any) => any> // 생성자 타입
// <T extends keyof any> // string | number | symbol
```
- 함수에서 공변성과 반공변성 주의!
```typescript
function a(x: string): number {
  return 0;
}
type B = (x: string) => number | string;
let b: B = a;

function a(x: string): number | string {
  return 0;
}
type B = (x: string) => number;
let b: B = a;

function a(x: string | number): number {
  return 0;
}
type B = (x: string) => number;
let b: B = a;

function a(x: string): number {
  return 0;
}
type B = (x: string | number) => number;
let b: B = a;
```
- 함수 오버로딩
```typescript
function add(x: number, y: number): number
function add(x: string, y: string): string
function add(x: any, y: any) {
  return x + y;
}

interface Add {
  (x: number, y: number): number;
  (x: string, y: string): string;
}
const add: Add = (x: any, y: any) => x + y;
```
- infer는 타입 내에서 추론된 값으로 다시 새로운 타입을 만드는 것(밑에 utility types 참고).
- 타입스크립트는 건망증이 심하다
```typescript
try {
  await axios.get();
} catch (err) {
  console.error(err.response?.data);
}
```

## utility types로 알아보기
[링크](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- Partial
```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
- Required
```typescript
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```
- ReadOnly
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```
- Pick
```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
- Record
```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```
- Exclude
```typescript
type Exclude<T, U> = T extends U ? never : T;
```
- Extract
```typescript
type Extract<T, U> = T extends U ? T : never;
```
- Omit
```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```
- NonNullable
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```
- Parameters
```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```
- ConstructorParameters
```typescript
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```
- ReturnType
```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
- InstanceType
```typescript
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```
- 기타
```typescript
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;

function applyStringMapping(symbol: Symbol, str: string) {
    switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
        case IntrinsicTypeKind.Uppercase: return str.toUpperCase();
        case IntrinsicTypeKind.Lowercase: return str.toLowerCase();
        case IntrinsicTypeKind.Capitalize: return str.charAt(0).toUpperCase() + str.slice(1);
        case IntrinsicTypeKind.Uncapitalize: return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str;
}

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> { }
```

# ts 라이브러리 분석
- package.json의 types 속성에 적힌 파일이 메인 타이핑 파일임.
- npmjs.com에서 패키지를 검색했을 때 패키지 우측에 TS로 뜨면 ts 지원 라이브러리이고, DT로 뜨면 @types를 설치해야 하며, 그것마저도 없으면 직접 타이핑해야 함
- 첫 번째 줄부터 보기 보다는 마지막 줄 exports default나 export = 부분을 보고 거슬러 올라가는 게 좋음
- 제네릭이 제일 읽기 어려워서 제네릭 부분은 따로 필기하면서 보는게 좋음

## jQuery의 타이핑
```typescript
$( "p" ).removeClass( "myClass noClass" ).addClass( "yourClass" );
$(["p", "t"]).text("hello");
const tag = $( "ul li" ).addClass(function( index ) {
  return "item-" + index;
});
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data('name') + '입니다';
});
```

```typescript
export = jQuery;

declare const jQuery: JQueryStatic;
declare const $: JQueryStatic;

interface JQueryStatic {
  <TElement extends HTMLElement = HTMLElement>(html: JQuery.htmlString, ownerDocument_attributes?: Document | JQuery.PlainObject): JQuery<TElement>;
  <TElement extends Element = HTMLElement>(selector: JQuery.Selector, context?: Element | Document | JQuery | JQuery.Selector): JQuery<TElement>;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  addClass(className_function: JQuery.TypeOrArray<string> | ((this: TElement, index: number, currentClassName: string) => string)): this;
  removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;
  on<TType extends string>(
    events: TType,
    handler: JQuery.TypeEventHandler<TElement, undefined, TElement, TElement, TType> | false
  ): this;
}
```


## axios의 타이핑
index.d.ts

```typescript
declare const axios: AxiosStatic;
export default axios;

export interface AxiosStatic extends AxiosInstance {
  create(config?: CreateAxiosDefaults): AxiosInstance;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  Axios: typeof Axios;
  AxiosError: typeof AxiosError;
  readonly VERSION: string;
  isCancel(value: any): value is Cancel;
  all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
  isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
  toFormData(sourceObj: object, targetFormData?: GenericFormData, options?: FormSerializerOptions): GenericFormData;
  formToJSON(form: GenericFormData|GenericHTMLFormElement): object;
}

export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): AxiosPromise<R>;
  <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): AxiosPromise<R>;

  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  };
}

export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export interface AxiosResponse<T = any, D = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
```

## react의 타이핑
[소스 링크](https://github.com/ZeroCho/ts-react/tree/master/2.%EB%81%9D%EB%A7%90%EC%9E%87%EA%B8%B0)

export = React; declare namespace React, declare global, namespace JSX
```typescript
import React = require('react');
import * as React from 'react';
React.useEffect
```
return에 무엇이 들어갈 수 있을까? JSX, string, null?
```typescript
function App(): JSX.Element {
  ...
}

const App: FC<{}> = () => <div />;

interface Element extends React.ReactElement<any, any> { }

interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
}

type JSXElementConstructor<P> =
        | ((props: P) => ReactElement<any, any> | null)
        | (new (props: P) => Component<any, any>);
      
class Component<P, S> {
  render(): ReactNode;
}

interface FunctionComponent<P = {}> {
//    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null; // React17
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactFragment = {} | Iterable<ReactNode>;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
}

type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}

type VFC<P = {}> = VoidFunctionComponent<P>;

interface VoidFunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
```
훅 타이핑
```typescript
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T|null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;

interface MutableRefObject<T> {
    current: T;
}
interface RefObject<T> {
    readonly current: T | null;
}

function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
function useEffect(effect: EffectCallback, deps?: DependencyList): void;

type EffectCallback = () => (void | Destructor);
type DependencyList = ReadonlyArray<unknown>;
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };

function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```

tsconfig.json "jsx": "react"로

```typescript
import * as React from 'react';
import { useState, useCallback, useRef } from 'react';

const WordRelay = () => {
    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef(null);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        const input = inputEl.current;
        if (word[word.length - 1] === value[0]) {
          setResult('딩동댕');
          setWord(value);
          setValue('');
          if (input) {
            input.focus();
          }
        } else {
          setResult('땡');
          setValue('');
          if (input) {
            input.focus();
          }
        }
    }, [word, value]);

    const onChange = useCallback((e) => {
        setValue(e.currentTarget.value) 
    }, []);

    return (
        <>
          <div>{word}</div>
          <form onSubmit={onSubmitForm}>
            <input
              ref={inputEl}
              value={value}
              onChange={onChange}
            />
            <button>입력!</button>
          </form>
          <div>{result}</div>
        </>
      );
};

export default WordRelay;
```


## redux의 타이핑
```typescript

```

```typescript
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T
}

export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D
  getState(): S
}

export interface Middleware<
  _DispatchExt = {}, // TODO: remove unused component (breaking change)
  S = any,
  D extends Dispatch = Dispatch
> {
  (api: MiddlewareAPI<D, S>): (
    next: D
  ) => (action: D extends Dispatch<infer A> ? A : never) => any
}
```

## react-redux의 타이핑
```typescript
export const useSelector = /*#__PURE__*/ createSelectorHook()

export function createSelectorHook(
  context = ReactReduxContext
): <TState = unknown, Selected = unknown>(
  selector: (state: TState) => Selected,
  equalityFn?: EqualityFn<Selected>
) => Selected {
}

export const useDispatch = /*#__PURE__*/ createDispatchHook()

export function createDispatchHook<
  S = unknown,
  A extends Action = AnyAction
  // @ts-ignore
>(context?: Context<ReactReduxContextValue<S, A>> = ReactReduxContext) {
  const useStore =
    // @ts-ignore
    context === ReactReduxContext ? useDefaultStore : createStoreHook(context)

  return function useDispatch<
    AppDispatch extends Dispatch<A> = Dispatch<A>
  >(): AppDispatch {
    const store = useStore()
    // @ts-ignore
    return store.dispatch
  }
}
```
[Provider 소스 링크](https://github.com/ZeroCho/ts-react/blob/master/react-redux-immer/client.tsx)
[훅 소스 링크](https://github.com/ZeroCho/ts-react/blob/master/react-redux-immer/App.tsx)

## Node의 타이핑

<reference path="..."은 해당 파일의 타입들을 끌고 오는 것. 요즘 할 필요 없음
d.ts 파일에 declare module 'fs:promises'로 import 'fs:promises' 할 때 어떤 타입이 될 지 작성할 수 있음.

```typescript
function createServer(requestListener?: RequestListener): Server;
type RequestListener = (req: IncomingMessage, res: ServerResponse) => void;
```

```typescript
function readFile(path: PathLike | number, options: { encoding?: null; flag?: string; } | undefined | null, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void;

function readFile(path: PathLike | FileHandle, options?: { encoding?: null, flag?: string | number } | null): Promise<Buffer>;
  
type PathLike = string | Buffer | URL;

function join(...paths: string[]): string;
```

## Express의 타이핑
```typescript
export = e;
declare function e(): core.Express;
declare namespace e {
    var json: typeof bodyParser.json;
    var urlencoded: typeof bodyParser.urlencoded;
}
  
interface RequestHandler<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>
> extends core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}

import * as core from 'express-serve-static-core';
```
타입 확장을 위한 장치
```typescript
// This extracts the core definitions from express to prevent a circular dependency between express and serve-static
declare global {
    namespace Express {
        // These open interfaces may be extended in an application-specific manner via declaration merging.
        // See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)
        interface Request {}
        interface Response {}
        interface Application {}
    }
}
  
export interface Request<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> extends http.IncomingMessage,
        Express.Request {}

import { ParsedQs } from 'qs';

export {};

export type Query = ParsedQs;

export interface ParamsDictionary {
    [key: string]: string;
}
export interface RequestHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
    (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
        next: NextFunction,
    ): void;
}
  
export interface NextFunction {
    (err?: any): void;
    /**
     * "Break-out" of a router by calling {next('router')};
     * @see {https://expressjs.com/en/guide/using-middleware.html#middleware.router}
     */
    (deferToNext: 'router'): void;
    /**
     * "Break-out" of a route by calling {next('route')};
     * @see {https://expressjs.com/en/guide/using-middleware.html#middleware.application}
     */
    (deferToNext: 'route'): void;
}

export interface Express extends Application {
    request: Request;
    response: Response;
}
  
export interface Application<
    Locals extends Record<string, any> = Record<string, any>
> extends EventEmitter, IRouter, Express.Application {
  use: ApplicationRequestHandler<this>;
}
  
export type ApplicationRequestHandler<T> = IRouterHandler<T> &
    IRouterMatcher<T> &
    ((...handlers: RequestHandlerParams[]) => T);
  
export type RequestHandlerParams<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> =
    | RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
    | ErrorRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
    | Array<RequestHandler<P> | ErrorRequestHandler<P>>;
  

```
passport 타이핑
```typescript
declare global {
    namespace Express {
        // tslint:disable-next-line:no-empty-interface
        interface AuthInfo {}
        // tslint:disable-next-line:no-empty-interface
        interface User {}

        interface Request {
            authInfo?: AuthInfo | undefined;
            user?: User | undefined;

            // These declarations are merged into express's Request type
            login(user: User, done: (err: any) => void): void;
            login(user: User, options: any, done: (err: any) => void): void;
            logIn(user: User, done: (err: any) => void): void;
            logIn(user: User, options: any, done: (err: any) => void): void;

            logout(options: { keepSessionInfo?: boolean }, done: (err: any) => void): void;
            logout(done: (err: any) => void): void;
            logOut(options: { keepSessionInfo?: boolean }, done: (err: any) => void): void;
            logOut(done: (err: any) => void): void;

            isAuthenticated(): this is AuthenticatedRequest;
            isUnauthenticated(): this is UnauthenticatedRequest;
        }

        interface AuthenticatedRequest extends Request {
            user: User;
        }

        interface UnauthenticatedRequest extends Request {
            user?: undefined;
        }
    }
}
```

passport-local 타이핑
```typescript
import { Strategy as PassportStrategy } from "passport-strategy";
import express = require("express");

interface IStrategyOptions {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback?: false | undefined;
}

interface IStrategyOptionsWithRequest {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback: true;
}

interface IVerifyOptions {
    message: string;
}

interface VerifyFunctionWithRequest {
    (
        req: express.Request,
        username: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void
    ): void;
}

interface VerifyFunction {
    (
        username: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void
    ): void;
}

declare class Strategy extends PassportStrategy {
    constructor(
        options: IStrategyOptionsWithRequest,
        verify: VerifyFunctionWithRequest
    );
    constructor(options: IStrategyOptions, verify: VerifyFunction);
    constructor(verify: VerifyFunction);

    name: string;
}
```