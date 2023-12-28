import { useCallback, useState } from 'react';
import { Popover } from 'react-tiny-popover';

interface IProps {
  data: { id: string | number; name: string }[];
  children?: any;
  onClickItem?: (value: any) => void;
}

const PopoverBase = ({ children, onClickItem, data }: IProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onShowPopover = useCallback(() => {
    setShowDropdown(true);
  }, []);

  const onClosePopover = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const handleClickItem = (id: string | number) => {
    onClickItem && onClickItem(id);
    onClosePopover();
  };

  return (
    <Popover
      onClickOutside={onClosePopover}
      isOpen={showDropdown}
      positions={['bottom']}
      content={
        <div className="flex flex-col pt-2 pb-2 min-w-[160px] mt-2 max-h-60 overflow-auto max-w-[260px] rounded-lg border border-gray-200 bg-white font-Inter shadow">
          {data.map((value) => (
            <button
              onClick={() => handleClickItem(value.id)}
              key={value.id}
              className="flex flex-row items-center hover:opacity-75 py-2 px-4 hover:bg-slate-200"
            >
              <span className="text-sm font-medium hover:text-redOrange">{value.name}</span>
            </button>
          ))}
        </div>
      }
    >
      <div onClick={onShowPopover}>{children}</div>
    </Popover>
  );
};

export default PopoverBase;
