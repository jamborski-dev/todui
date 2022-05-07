import { Check2 } from "react-bootstrap-icons"

type Props = {
  checked: boolean
  onClick?: (e?: React.MouseEvent<HTMLElement>, id?: string) => void
}

export const Checkbox = ({ checked, ...props }: Props) => {
  return (
    <div className="checkbox-box">
      <input className="checkbox--hidden" type="checkbox" checked={checked} readOnly />
      <div className={`checkbox--custom ${checked ? "checked" : ""}`} {...props}>
        {checked && (
          <span className="checkbox-icon">
            <Check2 />
          </span>
        )}
      </div>
    </div>
  )
}
