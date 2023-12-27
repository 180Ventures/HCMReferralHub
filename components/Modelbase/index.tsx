import { ComponentProps, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  open?: any;
  setOpen?: any;
  panelClassName?: ComponentProps<"div">["className"];
  bodyNode?: any;
}

export default function ModalBase({
  panelClassName,
  bodyNode,
  open,
  setOpen,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10  overflow-y-auto w-full">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0 w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "transform overflow-hidden rounded-lg bg-white shadow-xl transition-all",
                  "w-full max-w-full sm:max-w-lg",
                  // "sm:w-full sm:max-w-lg",
                  panelClassName
                )}
              >
                {bodyNode}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
