
# TODO

1. Get slides working. Currently trying to get SVGs working dynamically... don't know how much time to spend
2. Make sure course works. 
3. Make sure blog posts have same links 
4. Pull papers from arxiv / bib file
5. CV page perhaps using https://github.com/mps9506/quarto-cv. I've used this extension: should document~
6. How to handle p5: https://blog.djnavarro.net/posts/2023-01-14_p5js/

# Specific tasks

## Posts

- [X] ML and SM lecture 1
- [X] ML and SM lecture 2
- [ ] Pyodide tutorial
- [ ] Aspen colloquium
- [ ] Write a post using [quarto-pyodide](https://quarto.thecoatlessprofessor.com/pyodide/)

## Talks

- [ ] "Space-time dual cat and clock models" is incomplete version that I switched to the other site
- [ ] Add dates to all talks
- [ ] Other front matter

### How to convert older talk formats to quarto

- Add the fields

```
date: 01/01/2048
date-format: long
title: "New awesomeness"
subtitle: |- 
    Lectures delivered on the moon

    We can have nice formatting and __even markdown__ here
title-slide-attributes:
    data-background-image: path/to/title_image.png
    data-background-size: auto
    data-background-opacity: "0.2"
author: Austen Lamacraft
institute: University of Cambridge
```

- The `slides:` block is set to `format:` and the `reveal_options:` block inside becomes `revealjs:`

- Add custom CSS using `theme: [default, reveal_custom.scss]` and add `reveal_custom.scss` file to folder

- If using KaTeX, add `html-math-method: katex` to `revealjs` options

- Note that KaTeX doesn't have a nice way to use persistent macros, see [this issue](https://github.com/quarto-dev/quarto-cli/issues/7518#issuecomment-1807784753), so if you have macros you should use MathJax.

- LaTeX no longer requires any escaping with backslashes or quotes around math blocks. Thus any `\_` can be replaced with `_`


Talks updates so far 

- All talks up to and including "New Rules" have been updated. Next to update: second "New Rules" talk.

## Other

- [X] Favicon
- [ ] Update links to talks in slides (switch from `/slides` to `/talks`)
- [ ] Google Scholar icon (at present only have Bootstrap icons)
- [ ] Creating citable articles including [Google Scholar indexing](https://quarto.org/docs/authoring/create-citeable-articles.html#google-scholar)


- [ ] Try out [Typst documents](https://quarto.org/docs/output-formats/typst.html)