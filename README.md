npm create vite@latest react-default  (此為 js+swc 版本)

npm i json-server -D
npm i axios
npm i classnames
npm install dayjs

瀏覽器安裝 redux devtools
npm i @reduxjs/toolkit
npm i react-redux

npm i react-router-dom

npm install tailwindcss @tailwindcss/vite
去 vite.config.js 設置 plugin tailwindcss()
@import "tailwindcss";

npm install @headlessui/react


https://www.bilibili.com/video/BV1ZB4y1Z7o8?spm_id_from=333.788.videopod.episodes&vd_source=d6c6c5e6ab01af32e05ebe7b7b88ef93&p=81



新增，檢查 name，若沒有重複，則打API新增，添加store
編輯，檢查 name，若沒有重複，則打API新增，撈取與ID相同的store，編輯



const isHigher = true;


// JS中所有的物件，都是從Object.prototype複製而來，Object.prototype是該物件的原型
const obj = { a: 1 };
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// 要得到一個物件，不是通過實例化類別，而是找到一個物件的原型並且複製它

// Animal是一個構造函數，用於創建新的Animal對象，他接受name及type作為參數
function Animal(name, type) {
  this.name = name;
  this.type = type;

  //   this.introduce = () => {
  //     const animalInfoDiv = document.getElementById("animal-info");
  //     animalInfoDiv.innerHTML += `<p>${this.name} 是一隻 ${this.type}。</p>`;
  //   };
}


// 使用Animal.prototype 能將方法，添加到Animal對象上，這樣所有Animal實例，可以共享此方法，而不需要在每個實例中單獨定義
// 在原型上添加方法
Animal.prototype.introduce = function () {
  // 在網頁上顯示動物介紹
  const animalInfoDiv = document.getElementById("animal-info");
  animalInfoDiv.innerHTML += `<p>${this.name} 是一隻 ${this.type}。</p>`;
};



if (isHigher) {
  function Dog(name, dogType) {
    // 使用call方法調用Animal構造函數，並將當前的this傳遞給Animal
    // 利用Animal構造函數，設置 name 和 type。 // 設置實例屬性
    // functionName.call(thisArg, arg1, arg2, ...);
    Animal.call(this, name, "狗");
    this.dogType = dogType; // 添加子類特有的屬性
  }

  // 設置了 Dog 的原型，使其繼承自 Animal 的原型。這樣做的目的是讓 Dog 實例可以訪問 Animal 原型上定義的方法和屬性。
  Dog.prototype = Object.create(Animal.prototype);


  // constructor，指向創建對象的構造函數。每當你使用 new 關鍵字創建一個對象時，該對象的 constructor 屬性會自動設置為其構造函數。
  // 創建一個原型鍊，由Animal複製而來，因此 Dog 的constructer指向 Animal，而非Dog
  Dog.prototype.constructor = Dog; // 修正 constructor 指向

  // 在 Dog 的原型上添加方法
  Dog.prototype.bark = function () {
    console.log(`${this.name} 叫：汪汪！`);
  };

  Dog.prototype.dogTypeName = function () {
    console.log(`狗的品種叫做，${this.dogType}`);
  };

  // 創建 Dog 的實例
  const myDog = new Dog("小白", "拉布拉多");

  console.log(myDog.constructor === Dog); // 檢查 myDog  原型鍊 是否指向 Dog，還是Animal

  // 調用父類的方法
  myDog.introduce(); // 小白 是一隻 狗。

  // 調用子類的方法
  myDog.bark(); // 小白 叫：汪汪！
  // 
  myDog.dogTypeName(); // 狗的品種叫做，拉不拉多
} else {
  // 使用 new創建實例，這些實例，有單獨的name及type，但可以共享  introduce 方法
  const dog = new Animal("小白", "狗");
  const cat = new Animal("小黑", "貓");
  dog.introduce();
  cat.introduce();
}


// 減少內存，因為共用方法
// 動態擴展：如果您希望在運行時動態添加新方法或屬性到對象，使用原型模式可以輕鬆實現。
// 對象繼承：當希望實現對象之間的繼承關係時，原型模式非常合適。