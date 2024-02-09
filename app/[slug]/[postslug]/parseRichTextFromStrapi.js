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
    text: 'span',
    'list-item': 'li',
    link: 'link'
}

function createElementForChild(child, index) {
    const { type, text, url, children, bold } = child;
    const childType = childTypes[type];
    let mappedChildren;
    if (children?.length > 0) mappedChildren = children.map((child, index) => createElementForChild(child, index))
    if (!childType) return <span className='font-bold' key={index}>NO_TYPE_FOUND</span>;
    // In Link go to first child directly, cause it's one as ususal
    if (childType === 'link') return <Link title={children[0].text} target="_blank" href={url}>{children[0].text}</Link>;
    return createElement(childType, { key: `${index}_${type}`, className: `${bold ? 'font-bold' : ''}` }, mappedChildren || text);
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