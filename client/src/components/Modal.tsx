import { FC, ReactNode } from "react"
import { createPortal } from "react-dom"
import { useAppContext } from "../hooks/useAppContext"
import { useModalContext } from "../hooks/useModalContext"
import { ButtonTool } from "./ButtonTool"

type ModalProps = {
  children: ReactNode
  showClose: boolean
}

export const Modal: FC<ModalProps> = ({ children, showClose = false }) => {
  const {
    state: { isOpen },
    actions: { closeModal }
  } = useModalContext()

  const {
    state: { theme }
  } = useAppContext()

  if (!isOpen) return null

  return createPortal(
    <>
      <div className="modal--overlay"></div>
      <div className={`${theme} modal--container`}>
        {showClose && (
          <ButtonTool onClick={() => closeModal()} className="modal--close">
            X
          </ButtonTool>
        )}
        <div className="modal--content">{children}</div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  )
}
