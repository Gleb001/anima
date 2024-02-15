# Содержание | Table of contents

* [Moveton (ru)](#moveton-ru)
* [Moveton (en)](#moveton-en)

# Moveton (ru)

## Содержание

* [Как установить библиотеку?](#как-установить-библиотеку)
* [Зачем мне использовать эту библиотеку?](#зачем-мне-использовать-эту-библиотеку)
* [Какие анимации я могу создать?](#какие-анимации-я-могу-создать)
* [Как создать анимацию?](#как-создать-анимацию)
* [Как запустить анимацию?](#как-запустить-анимацию)
* [Как остановить анимацию самостоятельно в любой момент?](#как-остановить-анимацию-самостоятельно-в-любой-момент)
* [Как получить измененные (в процессе проигрывания анимации) элементы?](#как-получить-измененные-в-процессе-проигрывания-анимации-элементы)

## Как установить библиотеку?
Данная библиотека опубликована в [NPM](https://ru.wikipedia.org/wiki/Npm). [Ссылка на npm-пакет библиотеки](https://www.npmjs.com/package/moveton). Поэтому, чтобы установить библиотеку вам нужно воспользоваться следующей командой в консоли:
```console
npm install moveton
```

После установки приступайте к следующему пункту.

## Зачем мне использовать эту библиотеку?
Целью создания данной библиотеки было упрощение работы с анимациями средствами [JavaScript](https://ru.wikipedia.org/wiki/JavaScript). Данная библиотека никак не является де-факто по обязательному использованию - причина этому сильное потребление ресурсов при эксплуатации анимаций данным способом (средствами JavaScript). Однако, если перед вами стоит задача по созданию анимации предложенным способом, то данная библиотека создана для того, чтобы упростить данный процесс.

## Какие анимации я могу создать?
В библиотеке реализована возможность создать только два вида анимации - JavaScript и CSS.

## Как создать анимацию?
Для создания любого из предложенных видов анимации (JavaScript или CSS), вам потребуется изначально указать элементы и свойства, которые вы хотите изменить. 
```js
// "получаем" html элементы
let elem1 = document.getElementById("elem1");
let elem2 = document.getElementById("elem2");

// создаём js анимацию
let js_animation = new AnimationJS(
    [elem1, elem2],
    {
        "width": "100 -> 500px",
        "height": "100 -> 500px",
        "transform": "rotate(0 -> 180deg)"
    }
);
// создаём css анимацию
let css_animation = new AnimationCSS(
    [elem1, elem2],
    {
        "width": "100 -> 500px",
        "height": "100 -> 500px",
        "transform": "rotate(0 -> 180deg)"
    }
);
```

Обратите внимание, что для создания анимации вам потребуется использовать только один формат записи, а именно:
```js
new animation(
  // список элементов, которые вы хотите изменить (пример)
  [elem_1, elem_2, ... , elem_N, elem_N+1],

  // список свойств, которые вы хотите изменить (пример)
  {
    // "наименование_свойства": "... начальное_значение -> конечное_значение ..."
    "width"     : "0 -> 500 px",           
    "transform" : "rotate(0 -> 180 deg)",
    "transform" : "matrix(0 -> 1, 0 -> 2, 0 -> 3, 0 -> 4, 0 -> 5, 0 -> 6)"
  }
);
```

## Как запустить анимацию?
После создания анимации вы можете её проиграть, но способ это сделать зависит от вида анимации. Так, например, запуск JavaScript анимации имеет следующие аргументы:
1. Функция анимации, следуя которой будет проигрываться анимация:
   * Используйте встроенные функции анимации просто написав их наименование ("linear", "ease", "ease_in", "ease_out", "bounce-end", "bounce-start");
   * [Напишите собственную функцию анимации](https://habr.com/ru/companies/unigine/articles/680996/), которая имеет следующий вид: (x) => x * x (y = x^2) и т.п.;
2. Длительность анимации (в миллисекундах);
3. Задержка перед запуском анимации (в миллисекундах) - необязательно указывать.
   
```js
let animation_js  = new animationJS(...);

// проигрывание js анимации
// первый способ (через встроенные анимации):
animation_js.start(
  "linear",  // встроенная функция y = x
  1000,
  100
);
// второй способ (через функцию анимации - гибкая настройка):
animation_js.start(
  (x) => Math.sqrt(x), // y = √x
  1000,
  100
);
```

Запуск CSS анимации гораздо лёгок в восприятии, так как имеет только один аргумент - [css свойство animation](https://developer.mozilla.org/ru/docs/Web/CSS/animation).
```js
let animation_css = new animationCSS(...);
animation_css.start("1s linear");
```

## Как остановить анимацию самостоятельно в любой момент?
Также в процессе проигрывания анимации вы можете её остановить, вернув в конечное состояние, указанное при создании анимации:
```js
// создаём анимацию
let animation = new AnimationCSS([elem], { "width": "100 -> 500px" });
// запускаем анимацию, которая длится 1000 миллисекунд
animation.start("1s ease-in");
// останавливаем анимацию сразу после начала проигрывания
animation.end();
// элемент после вызванной остановки принимает конечные значения
// в данном примере: 500px
```

## Как получить измененные (в процессе проигрывания анимации) элементы?
Сам вызов анимации является асинхронным, поэтому по завершению анимации (как принудительно, так и нет) вы можете получить измененный html элемент:
```js
let animation = new AnimationCSS([elem], { "width": "100 -> 500px" });
animation
  .start("1s linear")                      // вызов анимации
  .then((elems) => console.log(elems))     // по завершению можем получить доступ к переданным html элементам
  .catch((error) => console.log(error));   // в определённых случаях можно получить ошибку - анимация не запустилась
```



# Moveton (en)

## Table of contents

* [How do I install the library?](#how-do-i-install-the-library)
* [Why should I use this library?](#why-should-i-use-this-library)
* [What animations can I create?](#what-animations-can-i-create)
* [How to create an animation?](#how-to-create-an-animation)
* [How to start an animation?](#how-to-start-an-animation)
* [How can I stop the animation myself at any time?](#how-can-i-stop-the-animation-myself-at-any-time)
* [How do I get the elements changed (during animation playback)?](#how-do-i-get-the-elements-changed-during-animation-playback)

## How do I install the library?
This library is published in [NPM](https://en.wikipedia.org/wiki/Npm). [Link to the library's npm package](https://www.npmjs.com/package/moveton). Therefore, to install the library, you need to use the following command in the console:
```console
npm install moveton
```

After installation, proceed to the next step.

## Why should I use this library?
The purpose of creating this library was to simplify working with animations using [JavaScript](https://en.wikipedia.org/wiki/JavaScript). This library is not de facto mandatory in any way - the reason for this is the strong consumption of resources when using animations in this way (using JavaScript). However, if you are faced with the task of creating animation in the proposed way, then this library was created in order to simplify this process.

## What animations can I create?
The library has the ability to create only two types of animation - JavaScript and CSS.

## How to create an animation?
To create any of the proposed types of animation (JavaScript or CSS), you will need to initially specify the elements and properties that you want to change.

```js
// "get" html elements
let elem1 = document.getElementById("elem1");
let elem2 = document.getElementById("elem2");

// create js animation
let js_animation = new AnimationJS(
    [elem1, elem2],
    {
        "width": "100 -> 500px",
        "height": "100 -> 500px",
        "transform": "rotate(0 -> 180deg)"
    }
);
// create css animation
let css_animation = new AnimationCSS(
    [elem1, elem2],
    {
        "width": "100 -> 500px",
        "height": "100 -> 500px",
        "transform": "rotate(0 -> 180deg)"
    }
);
```

Please note that to create an animation, you will need to use only one recording format, namely:

```js
new animation(
  // list of items you want to change (example)
  [elem_1, elem_2, ... , elem_N, elem_N+1],

  // list of properties you want to change (example)
  {
    // "property name": "... initial value -> final value ..."
    "width"     : "0 -> 500 px",           
    "transform" : "rotate(0 -> 180 deg)",
    "transform" : "matrix(0 -> 1, 0 -> 2, 0 -> 3, 0 -> 4, 0 -> 5, 0 -> 6)"
  }
);
```

## How to start an animation?
After creating an animation, you can play it, but the way to do it depends on the type of animation. So for example, running a JavaScript animation has the following arguments:
1. Animation function, following which the animation will be played:
    * Use the built-in animation functions by simply writing their name ("linear", "ease", "ease_in", "ease_out", "bounce-and", "bounce-start");
    * [Write your own animation function](http://habr.com/en/companies/unigine/articles/680996/), which has the following form: (x) => x *x (y = x^2), etc;
2. Animation duration (in milliseconds)
3. The delay before the animation starts (in milliseconds) - it is not necessary to specify.

```js
let animation_js  = new animationJS(...);

// playing js animation
// the first way (via built-in animations):
animation_js.start(
  "linear",  // built-in function y = x
  1000,
  100
);
// the second way (through the animation function - flexible adjustment):
animation_js.start(
  (x) => Math.sqrt(x), // y = √x
  1000,
  100
);
```

Launching CSS animation is much easier to perceive, since it has only one argument - [css animation property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation).
```js
let animation_css = new animationCSS(...);
animation_css.start("1s linear");
```

## How can I stop the animation myself at any time?
Also, in the process of playing an animation, you can stop it by returning it to the final state specified when creating the animation:
```js
// create animation
let animation = new AnimationCSS([elem], { "width": "100 -> 500px" });
// we start an animation that lasts 1000 milliseconds
animation.start("1s ease-in");
// we stop the animation immediately after the start of playback
animation.end();
// the element after the called stop takes the final values
// in this example: 500px
```

## How do I get the elements changed (during animation playback)?
The animation call itself is asynchronous, so upon completion of the animation (both forced and not) you can get a modified html element:
```js
let animation = new AnimationCSS([elem], { "width": "100 -> 500px" });
animation
  .start("1s linear")                      // calling the animation
  .then((elems) => console.log(elems))     // upon completion, we can access the passed html elements
  .catch((error) => console.log(error));   // in certain cases, you may get an error - the animation did not start
```
