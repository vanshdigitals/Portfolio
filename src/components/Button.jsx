import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTransition } from '../context/TransitionContext';

export default function Button({ 
  label, 
  onClick, 
  href, 
  target, 
  rel, 
  className = '' 
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

  return (
    <Tag
      {...tagProps}
      className={`
        group inline-flex w-fit h-[44px] items-center justify-center gap-3
        rounded-full pl-5 pr-1.5 font-heading text-[15px] font-medium
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
      <span className="
        flex items-center justify-center w-[32px] h-[32px] rounded-full shrink-0
        transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
        group-hover:scale-[1.03]
        bg-white dark:bg-[#111214] 
        text-[#111214] dark:text-white
      ">
        <ArrowRight 
          size={16} 
          strokeWidth={2}
          className="
            -rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0 group-active:rotate-0
            transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
            motion-reduce:transition-none
          "
          aria-hidden="true"
        />
      </span>
    </Tag>
  );
}
