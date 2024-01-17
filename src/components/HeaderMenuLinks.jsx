import Link from 'next/link'

export default function HeaderMenuLinks({ menuLinks, navClass, ulClass }) {
  return (
    <nav aria-label="Global" className={navClass && navClass}>
      <ul className={ulClass && ulClass}>
        {menuLinks.map((menuLink, index, { length }) => {
          const isLast = index === length - 1
          const isComparison = menuLink.href === '/comparison'
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
                    isComparison
                      ? 'mx-3 rounded border-solid border-cyan-700 bg-orange-400 hover:bg-orange-600'
                      : ''
                  }
                >
                  <div className="block p-2 font-medium text-gray-900 hover:opacity-75">
                    {menuLink.title}
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
