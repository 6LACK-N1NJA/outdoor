import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { createElement } from 'react'
// Parse a reach text oject and return proper jsx. 
    
const textEntityTypes = {
    paragraph: 'p',
    heading: 'h',
    list: 'ul',
    image: 'image'
}

const childTypes = {
    text: null,
    'list-item': 'li',
    bold: 'b',
    link: 'link'
}

function createElementForChild(child, index) {
    const { type, text, url } = child;
    const childType = childTypes[type];
    if (!childTypes) return <React.Fragment key={index}>{text}</React.Fragment>;
    if (childType === 'link') return <Link title={text} target="_blank" href={url}>{text}</Link>;
    return createElement('span', { key: `${index}_${type}` }, text);
}


export default function createArticleElements(reachText) {
    return reachText.map(({ type, children, level, image }, index, list) => {
        if (type === 'image') return (
            <Image
              key={index}
              src={image.formats.small.url}
              width={image.formats.small.width}
              height={image.formats.small.height}
              alt={list[index - 1].children[0]?.text || 'Image in text'}
              title={list[index - 1].children[0]?.text || `Image #${index}`}
            />
          )
          console.log(`type: ${type} ${!textEntityTypes[type] && '<- ITS HERE'} `)
        const wrapElementName = `${textEntityTypes[type]}${level ? level : ''}`;
        const childNodes = children.map((child, index) => createElementForChild(child, index))
        return createElement(
            wrapElementName || 'div', 
            // The place for adding some props to the element
            { key: `${index}_${type}` },
            childNodes
        );
    })
}