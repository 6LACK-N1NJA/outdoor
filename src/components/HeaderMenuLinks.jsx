import Link from 'next/link'

export default function HeaderMenuLinks({ menuLinks, navClass, ulClass }) {
  return (
    <nav aria-label="Global" className={navClass && navClass}>
      <ul className={ulClass && ulClass}>
        {menuLinks.map((menuLink, index, { length }) => {
          const isLast = index === length - 1
          const isComparison = menuLink.href === '/gear-comparison'
          return (
            <li key={menuLink.href} className={isLast ? 'lg:ms-auto' : ''}>
              <Link
                href={menuLink.href}
                {...(menuLink.external && {
                  target: '_blank',
                  rel: 'noreferrer',
                })}
              >
                <div
                  className={
                    `block p-2 font-medium text-gray-900 ${isComparison
                      ? ' px-3 shadow-xl mx-3 rounded bg-opacity-80 bg-lime-400 hover:bg-orange-700 hover:shadow-md transition delay-20 duration-150 ease-in-out  hover:text-slate-200'
                      : ' hover:text-slate-700 hover:opacity-90'}`
                  }
                >
                    {menuLink.title}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
