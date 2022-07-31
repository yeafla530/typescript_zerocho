// 1. type 구분
function numOrStr(a: number | string) {
    if (typeof a === 'string') {
      a.split(',');  
    } else {
      a.toFixed(1);
    }
  }
  
// 2. type | array
function numOrNumArr(a: number | number[]) {
    // 배열인지 아닌지 
    if (Array.isArray(a)) {
      a.slice(1);  
    } else {
      a.toFixed(1);
    }
  }
  

// 3. class 구분
// class는 그 자체로 type이 될 수 있음
class AA {
    aaa() {}
}
class BB {
    bbb() {}
}
// AB에는 instance가 들어가야함
function aOrB(params: AA|BB) {
    // class간에는 instaceof로 구분함
    if (params instanceof AA) {
        params.aaa()
    }
}

// instance의 typing은 class의 이름으로 한다
// error 
aOrB(AA())
// 올바른 경우
aOrB(new BB())


// 4. 객체 구분
// typescript가 if문에 대해 추론을 정확히 해줌
type B1 = { type: 'b', bbb: string };
type C1 = { type: 'c', ccc: string };
type D1 = { type: 'd', ddd: string };
// 아래 경우엔 a가 never가 됨
// type D1 = { type: 'c', ddd: string };


type A1 = B1 | C1 | D1 ;
// 4-1. type으로 구분
function typeCheck(a: A1) {
    if (a.type === 'b') {
        a.bbb;
    } else if (a.type === 'c') {
        a.ccc;
    } else {
        a.ddd;
    }
}

// 4-2. 속성으로 구분
function typeCheck2(a: A1) {
    if ('bbb' in a) {
        a.type;
    } else if ('ccc' in a) {
        a.type;
    } else {
        a.type;
    }
}



// 5. is
// 타입을 구분해주는 커스텀 함수를 여러분이 직접 만들 수 있어요

interface Cat { meow: number }
interface Dog { bow: number }
// custom type => Dog일때만 true
function catOrDog(a: Cat | Dog): a is Dog {
    // 타입판별을 직접 만들기
    if ((a as Cat).meow) { return false }
    return true;
}


const cat: Cat | Dog = { meow: 3 }

// 출력x
if (catOrDog(cat)) {
    console.log(cat.meow);
}
if ('meow' in cat) {
    console.log(cat.meow);
}
  


const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === 'rejected';
const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

// Promise -> Pending -> Settled(Resolved, Rejected)
const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]);
// 에러난것만 보고싶을 때
const error = promises.filter(isRejected);
// 성공한것만 걸러내고 싶을 때
const resolve = promises.filter(isFulfilled);


export{}

// readonly
interface A {
    readonly a: string;
    b: string;
  }
  const aaa: A = {a: 'hello', b: 'world'}
  //변경 불가
  aaa.a = '123'


////// index signiture : 어떤 속성이든 문자였으면 좋겠을 때 
// 두개 같은 의미
// type ABB = {a:string, b:string, c:string, d:string}
type ABB2 = {[key: string]:number}
const aaaaa: ABB2 = {a:3, b:4, c: 6, d:123}

type BBBC = 'Human' | 'Mammal' | 'Animal'
type AVV = {[key in BBBC]: number}
type AVV2 = {[key in BBBC]: BBBC}

const aacc: AVV = {Human: 123, Mammal: 546, Animal: 756}
const aacc2: AVV2 = {Human: "Human", Mammal: "Mammal", Animal: "Animal"}

// 추상
interface AP{
    readonly a: string;
    b: string;
}

// 실무에서는 굳이 class에 interface를 implement하지 않는다
// 구현
class BTF implements AP {
    private a: string = '123';
    protected b: string = 'world';
    // public은 기본
    // public c: string = 'wow'
    c: string = 'wow'
    method() {
        console.log(this.a)
        console.log(this.b)
        console.log(this.c)
    }
  }


  class C extends BTF {
    method() {
        console.log(this.a)
        // 상속받은 곳까지 호출 가능
        console.log(this.b)
        console.log(this.c)
    }
  }
  // private : 외부에서 접근 불가, 내부는 가능
  new C().a;
  // protected: 외부에서 접근 불가, 내부는 가능, 상속받은 곳까지만 호출가능 
  new C().b;
  // public : 외부에서 접근 가능
  new C().c;

//                  public        protected     private
// 클래스내부          o              o            o
// 인스턴스            o              x            x
// 상속 클래스         o              o            x


// 모양만 먼저 잡아둠
abstract class X {
    abstract work(user: User): boolean;
}
class Y extends X {
    work(user: User): boolean {
        return true;
    }
}