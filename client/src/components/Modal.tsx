import { FC, ReactNode } from "react"
import { createPortal } from "react-dom"
import { useModalContext } from "../hooks/useModalContext"
import { ButtonTool } from "./ButtonTool"

type ModalProps = {
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ children }) => {
  const {
    state: { isOpen },
    actions: { closeModal }
  } = useModalContext()

  if (!isOpen) return null

  return createPortal(
    <>
      <div className="modal--overlay"></div>
      <div className="modal--container">
        <ButtonTool onClick={() => closeModal()} className="modal--close">
          x
        </ButtonTool>
        <div className="modal--content">{children}</div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  )
}
