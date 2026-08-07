import { InputGroup,Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import '../../../layouts/AdminLayout/AdminLayout.css'

export default function SearchBar({
    placeholder,
    Icon,
    onChange,
    value,
    className,
    disabled=false
}){
    return(
        <>
        <InputGroup className={`search-box ${className}`}>
            <InputGroup.Text className="search-icon">
                {Icon || <FiSearch />}
            </InputGroup.Text>

            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="search-input"
            />
        </InputGroup>
        </>
    )
}
