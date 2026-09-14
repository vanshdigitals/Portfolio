import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTransition } from '../context/TransitionContext';

export default function Button({ 
  label, 
  onClick, 
  href, 
  target, 
  rel, 
  className = '',
  size = 'default'
}) {
  const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.endsWith('.pdf'));
  const { navigateWithTransition } = usePageTransition();

  const Tag = href ? (isExternal ? 'a' : Link) : 'button';
  const tagProps = {
    ...(href ? { [isExternal ? 'href' : 'to']: href } : {}),
    ...(target && { target }),
    ...(rel && { rel }),
    ...(onClick && { onClick }),
    ...(!isExternal && href && !onClick ? { 
      onClick: (e) => { 
        e.preventDefault(); 
        navigateWithTransition(href); 
      } 
    } : {}),
  };

  const isHero = size === 'hero';

  return (
    <Tag
      {...tagProps}
      className={`
        group inline-flex w-fit items-center justify-center
        ${isHero ? 'h-[44px] lg:h-[48px] pl-5 lg:pl-6 pr-1.5 lg:pr-[5px] font-heading text-[15px] lg:text-[17px] gap-3 lg:gap-3' : 'h-[44px] pl-5 pr-1.5 font-heading text-[15px] gap-3'}
        rounded-full font-medium
        transition-colors duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary focus-visible:ring-offset-2
        focus-visible:ring-offset-bg
        bg-[#007BFF] hover:bg-[#006AE0] text-white
        dark:bg-[#FFD722] dark:hover:bg-[#E6C200] dark:text-[#111214]
        ${className}
      `}
    >
      <span className="leading-none whitespace-nowrap">
        {label}
      </span>
      <span className={`
        flex items-center justify-center rounded-full shrink-0
        bg-white dark:bg-[#111214] 
        text-[#111214] dark:text-white
        ${isHero ? 'w-[32px] h-[32px] lg:w-[38px] lg:h-[38px]' : 'w-[32px] h-[32px]'}
      `}>
        <ArrowRight 
          strokeWidth={2}
          className={`
            -rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0 group-active:rotate-0
            transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
            motion-reduce:transition-none
            ${isHero ? 'w-4 h-4 lg:w-[18px] lg:h-[18px]' : 'w-4 h-4'}
          `}
          aria-hidden="true"
        />
      </span>
    </Tag>
  );
}
