import React, { useCallback } from 'react';
import clsx from 'clsx';

interface Props {
  name: string;
  hideSave?: boolean;
  disableArea?: boolean;
  setName?: (name: string) => void;
  onSaveNote?: () => void;
}

export const CreateNote = ({
  name,
  hideSave,
  disableArea,
  setName,
  onSaveNote,
}: Props) => {
  const changeName = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setName && setName(e.target.value);
    },
    [setName]
  );

  return (
    <div className='flex flex-col p-4'>
      <label
        htmlFor='notes'
        className='block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white font-Inter'
      >
        Notes
      </label>
      <textarea
        id='notes'
        disabled={disableArea}
        onChange={changeName}
        defaultValue={name}
        rows={4}
        placeholder='Notes...'
        className={clsx(
          'focus:ring-2 focus:ring-indigo-600',
          'block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
        )}
      ></textarea>
      {!hideSave && (
        <div className='flex justify-end mt-4'>
          <button
            className={clsx(
              'py-2 px-3 text-sm text-white rounded-lg bg-orangeLight'
            )}
            onClick={onSaveNote}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
