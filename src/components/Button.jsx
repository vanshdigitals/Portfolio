import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Button({ 
  label, 
  onClick, 
  href, 
  target, 
  rel, 
  className = '' 
}) {
  const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.endsWith('.pdf'));

  const Tag = href ? (isExternal ? 'a' : Link) : 'button';
  const tagProps = {
    ...(href ? { [isExternal ? 'href' : 'to']: href } : {}),
    ...(target && { target }),
    ...(rel && { rel }),
    ...(onClick && { onClick }),
  };

  return (
    <Tag
      {...tagProps}
      className={`
        group inline-flex items-center gap-[14px] 
        pt-[8px] pb-[8px] pl-[22px] pr-[8px]
        rounded-full cursor-pointer w-fit border-none
        bg-[#007BFF] text-white
        dark:bg-[#FFD722] dark:text-[#111214]
        hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        transition-[filter] duration-200
        ${className}
      `}
    >
      <span className="font-heading text-[15px] font-medium leading-none whitespace-nowrap">
        {label}
      </span>
      <span className="
        flex items-center justify-center w-[34px] h-[34px] rounded-full shrink-0
        bg-white dark:bg-white
        text-[#007BFF] dark:text-[#111214]
      ">
        <ArrowRight 
          size={18} 
          strokeWidth={2}
          className="
            -rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0
            transition-transform duration-[250ms] ease-[cubic-bezier(.34,1.4,.5,1)]
            motion-reduce:transition-none
          "
        />
      </span>
    </Tag>
  );
}
