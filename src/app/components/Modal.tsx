import * as Dialog from '@radix-ui/react-dialog';
import Button from './Button';
import { type Data } from "../types/types"

interface ModalProps {
  open: boolean,
  handleModal?: (value: boolean) => void,
  item: Data
}
export default function Modal({ open, handleModal, item }: ModalProps) {

  function handleClick() {
    if (typeof handleModal === "function") {
      handleModal(false)
    }
  }

  return (
    <Dialog.Root open={open} >
      <Dialog.Portal >
        <Dialog.Overlay className="fixed inset-0 bg-neutral-950/[.09] animate-[overlayShow_6s_cubic-bezier(0.16, 1, 0.3, 1)]" onClick={handleClick} />
        <Dialog.Content className="DialogContent fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-[450px] max-h-[85vh] bg-white p-6 shadow-lg shadow-gray-500/50 rounded-sm animate-[contentShow_6s_cubic-bezier(0.16, 1, 0.3, 1)]">
          <div className='flex justify-between'>

            <Dialog.Title className="">Edit profile</Dialog.Title>
            <Dialog.Close asChild>
              <Button onClick={handleClick} styles="bg-transparent" aria-label="Close"> X</Button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="">
            Make changes to your profile here. Click save when  done.
          </Dialog.Description>
          <div>Get content - {item[0]?.id}</div>

          <Dialog.Close asChild >
            <div className='flex justify-end'>
              <Button onClick={handleClick} styles="bg-black text-white" aria-label="Close"> Close</Button>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
