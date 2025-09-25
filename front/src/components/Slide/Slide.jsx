import { useState, useEffect, useRef } from "react";

export default function Slide() {
    const [html, setHtml] = useState(`
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>CSSだけのスライド（ボタン左上）</title>
<style>
  body {
    margin: 0;
    background: #222;
    color: white;
    font-family: sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .slides {
    width: 80vw;
    max-width: 600px;
    height: 300px;
    position: relative;
    overflow: hidden;
    border: 2px solid white;
    border-radius: 10px;
  }
  input[type="radio"] {
    display: none;
  }
  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.6s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
  }
  #slide1:checked ~ .slides #s1,
  #slide2:checked ~ .slides #s2,
  #slide3:checked ~ .slides #s3 {
    opacity: 1;
    position: relative;
  }

  /* ナビゲーションを左上に固定 */
  .nav {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    gap: 10px;
    z-index: 1000;
  }
  .nav label {
    cursor: pointer;
    background: #444;
    color: white;
    padding: 8px 14px;
    border-radius: 5px;
    user-select: none;
    font-weight: bold;
    font-size: 1.1em;
    transition: background-color 0.3s;
  }
  .nav label:hover {
    background: #666;
  }
</style>
</head>
<body>

<input type="radio" name="slider" id="slide1" checked>
<input type="radio" name="slider" id="slide2">
<input type="radio" name="slider" id="slide3">

<div class="slides">
  <div class="slide" id="s1">1枚目のスライド（CSSだけ）</div>
  <div class="slide" id="s2">2枚目のスライドです！ボタンで切り替え</div>
  <div class="slide" id="s3">3枚目のスライド。JavaScript不要</div>
</div>

<div class="nav">
  <label for="slide1">1</label>
  <label for="slide2">2</label>
  <label for="slide3">3</label>
</div>

</body>
</html>
        `);

    const slideWindowRef = useRef(null);

    const openSlideWindow = () => {
        const slideWindow = window.open("", "_blank", "width=800,height=600,top=100,left=100,resizable=yes,scrollbars=yes");
        slideWindowRef.current = slideWindow;

        //slideWindow.document.write(html);
        slideWindow.document.body.innerHTML = html;
        slideWindow.document.close();

        slideWindow.focus();

    };


    useEffect(() => {
        const popup = slideWindowRef.current;
        if (popup && !popup.closed) {
            try {
                slideWindowRef.current.document.body.innerHTML = html;

            } catch (e) {
                console.error("error", e);
            }
        }
    }, [html]);

    return (
        <div className="flex flex-col justify-between">
            <textarea className="w-full h-[30vh] bg-gray-400"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
            />
            <button onClick={openSlideWindow}>
                button
            </button>
        </div>
    );

}