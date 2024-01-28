'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { type Data } from "../types/types"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ModalProps {
  open: boolean,
  item: Data
}
export default function Modal({ open, item }: ModalProps) {

  const router = useRouter()

  return (
    <Dialog.Root open={open} >
      <Dialog.Portal >
        <Dialog.Overlay className="fixed inset-0 bg-neutral-950/[.09] animate-[overlayShow_250ms_cubic-bezier(0.16,_1,_0.3,_1)]" onClick={() => router.push("/")} />
        <Dialog.Content className="fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-[450px] max-h-[85vh] bg-white p-6 shadow-lg shadow-gray-500/50 rounded-sm animate-[contentShow_250ms_cubic-bezier(0.16,_1,_0.3,_1)]">
          <div className='flex justify-between'>

            <Dialog.Title className="">Edit profile</Dialog.Title>
            <Dialog.Close asChild>
              <Link href="/" className="bg-transparent px-4" aria-label="Close"> X</Link>
            </Dialog.Close>
          </div>
          <Dialog.Description className="">
            Make changes to your profile here. Click save when  done.
          </Dialog.Description>
          <div>Get content - {item[0]?.id}</div>

          <Dialog.Close asChild >
            <div className='flex justify-end'>
              <Link href="/" className="bg-black text-white px-6 py-2 rounded-sm" aria-label="Close"> Close</Link>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
