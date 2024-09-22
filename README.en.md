![desc](towxm_typer.gif)

> Currently, `AI dialogues` like Chatgpt, Kimi, and ERNIE Bot on the market all present answers to users through a `typewriter effect` that goes line by line and word by word. However, after searching for a long time, I have not found an open-source, easy-to-use, stable-performing, and markdown document typewriter component that can be used in WeChat Mini Programs.

> It seems that many people use Markdown rendering libraries for WeChat mini-programs, such as towxml. By incrementally increasing the length of the Markdown text, components are forced to re-render the entire text each time to achieve a typewriter effect. However, this approach has its drawbacks. Every time a character is typed, the entire Markdown text is parsed and rendered again, causing the already rendered old text to be `re-parsed and re-rendered`. As the text content grows, the performance degrades over time due to the repeated parsing and rendering of large texts in a short period, leading to `slower typing speeds, and eventually causing the phone to overheat and potentially explode`.


> Based on this, I have modified the source code of towxml through a completely new method, allowing Markdown documents of any length to be parsed and rendered in just `one parse`. This approach ensures a `consistent typing speed` and `low performance consumption` from start to finish.


Modifying the towxml source code to implement an AI typewriter effect for Markdown documents on WeChat mini-programs, with support for:

* Controlling the activation and deactivation of the typewriter effect.

* Customizing the typing speed.

* Specifying tags to skip the typewriter effect (e.g., tables, which can be displayed all at once without the need for individual typing).

To run the project:

1. `Open the project with VSCode.`

2. `Execute 'pnpm install'.`

3. `Run 'pnpm run dev:mp-weixin'.`

4. `Open the WeChat Developer Tools and import the project from 'dist\dev\mp-weixin'.`


