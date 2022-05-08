import { Check2 } from "react-bootstrap-icons"

type Props = {
  checked: boolean
  outterClass?: string | string[] | undefined
  onClick?: (e?: React.MouseEvent<HTMLElement>, id?: string) => void
}

export const Checkbox = ({ outterClass, checked, ...props }: Props) => {
  const outterCls = `checkbox-box${outterClass ? ` ${outterClass}` : ""}`
  return (
    <div className={outterCls}>
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
