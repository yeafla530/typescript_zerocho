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

////////// 6. 여러가지 선언
function add5(x: number, y:number):number;
function add5(x, y) {
    return x + y
}

let aa = 123;
// 타입 강제로 바꿔줌
aa = 'hello' as unknown as number;


////////// 7. never - 빈배열
try {
    // 빈배열 : never[] 
    // const array = [];
    const array: string[] = [];
    array[0];
} catch(err) {
    err 
}

//////////////// 주의 //////////////////
/////////////// Elemtent || null  => ! 사용하지 말고 if사용
const head0 = document.querySelector('#head');

const head = document.querySelector('#head')!;
console.log(head);

const head2 = document.querySelector('#head');
if (head2) {
    head2.innerHTML = 'hello wordl'
  console.log(head);
}

///////////// 대문자 사용x
// 대문자 : 래퍼 객체 
const bb: String = 'hell'

//////////// type: customize
type World = "world" | 'hell'
// 자동완성 추천까지 해줌
const cc: World = 'world';
const dd = `hello ${cc}`
type Greeting = `hello ${World}`
const ee: Greeting = 'hello world'

//////////// rest parameter
function rest(a, ...args: string[]) {
    console.log(a, args) // 1, [2, 3]
}
rest('1', '2', '3')

/////////// tuple
const tuple: [string, number] = ['1', 1]
// 에러남
// tuple[2] = 'hello'
// 이건 됨 -_- 
tuple.push('hello')

/////////// enum - 활용 잘 안함 
// 변수들 하나의 그룹으로 묶고 싶을 때 사용
const enum Edirection {
    Up = 3,
    Down = 5,
    Left = 4,
    Right = 6,
}

const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
  } as const;


const aaa = Edirection.Up;
const bbb = Edirection.Left;

function walk(dir: Edirection) {}

// enum과 동일한 기능
type Direction = typeof ODirection[keyof typeof ODirection]
function run(dir: Direction) {}
// keyof 설명 - key만 뽑아냄
const obj1 = {a: '123', b: 'hello', c: 'world'}
const obj2 = {a: '123', b: 'hello', c: 'world'} as const;

type Key = keyof typeof obj1; // 'a' | 'b'| 'c'
type Key2 = typeof obj2[keyof typeof obj2]; // '123' | 'hello'| 'world'

///////////////////// type, interface 구분
// 간단 버전은 type
type A = { a: string };
const aaaa: A = { a: 'hello' };

// 객체지향 하고 싶을 때 사용
interface B { a: string }
const bbbb: B = { a: 'hello' };


//////////////////////// union
// union - 단, 타입추론을 잘 못한다
// 처음 타입을 잘 짜야함, 아니면 뒤로갈수록 꼬임
function add3(x: string | number, y: string | number): string | number { return x + y }
// 에러남
// const result1: string = add(1, 2)
// 에러는 안나지만 string관련 함수쓰게 될 경우 에러 발생
const result2: string | number = add(1, 2)

add3(1, 2)
add3('1', '2')
add3(1, '2')


////////////////////////// & : union, | : intersection
// union : 모든 속성이 다 있어야한다!
// 이경우는 없음
// type Z = string & number;
type Y = {hello: 'world'} & {zero: 'cho'}
// type X = {hello: 'world'} | {zero: 'cho'}
// X와 Y 둘다 만족
const y: Y = {hello: 'world', zero: 'cho'};

type Animal = {breath: true};
type Poyouryu = Animal & {bread: true};
type Human = Poyouryu & {think: true};

const zerocho: Human = {breath: true, bread: true, think: true}

/// interface
/// interface와 type를 혼합 가능
interface AA {
    breath: true

}
// 확장 {breath: true} & {bread: true}
interface BB extends AA {
    bread: true
}

const l: BB = {breath: true, bread: true}


// 인터페이스 병합/확장
interface In {
    talk: () => void
}
interface In {
    eat: () => void
    
}
interface In {
    shit: () => void
}

const abc: In = {talk() {}, eat() {}, shit() {}, sleep() {}}

interface In {
    sleep: () => void
}

////// interface vs type
interface ABB {a:string}
interface ABB {b:string}
const obj11: ABB = {a: 'hello', b: 'world'}

// type은 병합 안됨
type BBB = {a:string}
type BBB = {b:string}

const obj22: BBB = {a: 'hello', b: 'world'}


//////////// 잉여속성 검사
interface ABC {a:string}

///// 1. 이때는 에러남
const obj33: ABC = {a: 'hello', b: 'world'}
///// 2. 잉여속성검사 - 에러 안남, 그래서 많이 헷갈림
const obj44 = {a: 'hello', b: 'world'}
const obj55: ABC = obj44;


////// void
// string형식은 void형식에 할당 불가
// undefined는 가능,  null은 불가능

// 1. function void - return 값이 void - return값이 없다
function abbbb(): void {
    // return '3'
    return undefined
}

const bcccc = abbbb();


// 2. method void - method가 void함수가 들어감 - return값을 사용하지 않겠다
interface Humana {
    talk: () => void;
}
const humana: Humana = {
    talk() {return 'abc'};
}

// 3. 매개변수로 선언한 void - 매개변수가 void로 들어간 경우 - return값 사용 x
function abcb(callback: () => void): void {
    // return '3'
    return undefined
}

// 예시1
declare function forEach(arr: number[], callback: (el: number) => undefined): void;
// 매개변수에서 void는 return값 상관 안함
// declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
let target: number[] = [];
// nu
forEach([1, 2, 3], el => target.push(el));
forEach([1, 2, 3], el => {target.push(el)});


// 예시2
interface AVVC {
    talk: () => void;
}
const avvc: AVVC = {
    talk() { return 3; }
}
// 값이 3? no 
// talk의 method가 void이기 때문에 return값을 무시
// b의 type이 void가 됨
const bbbbb = avvc.talk();

//////////// unknown vs any
// any : 타입탐색을 완전히 포기
const ccb: any = avvc.talk();

// unknown 타입 정확히 모르겠을 때, 내가 직접 정의 가능
const cccc: unknown = avvc.talk();
(cccc as AVVC).talk();

// unknown 많이 사용하는 경우 - Error
try {

    // error의 경우 unknown으로 뜸 => as로 정의
} catch(error) {
    (error as Error).message 
}


/////// 타입스크립트 네이밍 룰 - 크게 2가지
// 구버전 - 영어 맨앞 붙였었음
interface IProps {}
type Ttype = string|number; 
enum EHello {}

// 현재 - 안붙임 안붙여도 마우스 올리면 타입이 다 나오기 때문
interface Props {}
type type = string|number; 
enum Hello {}

const abcd: Props = {}



