import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className='relative'>
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='relative flex h-6 w-6 items-center cursor-pointer justify-center rounded-full hover:text-primary'
      >
        <span className='absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1'>
          <span className='absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75'></span>
        </span>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='25'
          viewBox='0 0 25 25'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.5 23C13.6 23 14.5 22.1 14.5 21H10.5C10.5 22.1 11.4 23 12.5 23ZM19 17V11.5C19 8.43 16.87 5.86 14 5.18V4.5C14 3.67 13.33 3 12.5 3C11.67 3 11 3.67 11 4.5V5.18C8.13 5.86 6 8.43 6 11.5V17L4 19V20H21V19L19 17Z'
            fill='#898989'
          />
          <circle
            cx='20'
            cy='5'
            r='4'
            fill='#7785DE'
            stroke='white'
            strokeWidth='2'
          />
        </svg>
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className='px-4.5 py-3'>
          <h5 className='text-sm font-medium text-bodydark2 px-3 font-Inter'>Notification</h5>
        </div>

        <ul className='flex h-auto flex-col overflow-y-auto'>
          <li>
            <Link
              className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 px-3 font-Inter'
              href='#'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  Edit your information in a swipe
                </span>{' '}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className='text-xs'>12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
