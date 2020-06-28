import React from "react"
import { useStaticQuery, graphql } from "gatsby"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

class Brick {
    constructor(name, dur) {
        this.name = name;
        this.dur = dur;
    }
}

class List {
    list: Brick[];
    constructor() {
        this.list = [];
    }
    add(brick: Brick) {
        this.list.push(brick);
    }
}

function makeList()

export default Image